import Axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import { BackUri } from '../config';
import ReactDOMServer from 'react-dom/server';

function overlayItem(item: any) {
  return (
    <OverlayStyle>
      <div className="info">
        <div className="title">{item.name.match(/^.*\./)}</div>
        <div className="body">
          <div className="desc">
            맛: {item.rating.taste} / 양: {item.rating.quantity} / 분위기: {item.rating.atmosphere} / 서비스:{' '}
            {item.rating.service} <br />
            가격: {item.rating.price} <br /> {item.content.match(/메뉴.*/)[0]}
          </div>
        </div>
      </div>
    </OverlayStyle>
  );
}

function overlayReward(item: any, cnt: string) {
  return (
    <OverlayStyle>
      <div className="info">
        <div className="title">{item.name.match(/^.*\./)}</div>
        <div className="body">
          <div className="desc">
            <b>{cnt}</b>
            <br />
            맛: {item.rating.taste} / 양: {item.rating.quantity} / 분위기: {item.rating.atmosphere} / 서비스:{' '}
            {item.rating.service} <br />
            가격: {item.rating.price} <br /> {item.content.match(/메뉴.*/)[0]}
          </div>
        </div>
      </div>
    </OverlayStyle>
  );
}

export function getQuery(
  region: string,
  foodtype: string,
  topValue: number,
  phrase: string,
  map: any,
  showOverlay: any,
  setShowOverlay: any,
  markers: any,
  setMarkers: any,
) {
  let askUrl = `${BackUri}/api/rcmd?`;
  if (region) askUrl = askUrl.concat(`region=${region}&`);
  if (foodtype) askUrl = askUrl.concat(`foodtype=${foodtype}&`);
  if (topValue) askUrl = askUrl.concat(`rating=${topValue}&`);
  if (phrase) askUrl = askUrl.concat(`phrase=${phrase}&`);
  console.log(askUrl, region, foodtype, topValue, phrase);
  return Axios.get(askUrl)
    .then((res) => {
      for (let item of res.data) {
        try {
          if (!item.location || item.location.lat === 0) break;
          const marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(item.location.lat, item.location.lng),
          });
          markers.push(marker);
          const content = ReactDOMServer.renderToStaticMarkup(overlayItem(item));
          const overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition(),
          });
          kakao.maps.event.addListener(marker, 'click', function() {
            const name: string = item.name.match(/^.*\./)[0];
            const tmpShow: { [k: string]: any } = showOverlay;
            if (!tmpShow.hasOwnProperty(name)) {
              tmpShow[name] = overlay;
              overlay.setMap(map);
              console.log(tmpShow);
              setShowOverlay(tmpShow);
            } else {
              overlay.setMap(null);
              delete tmpShow[name];
              console.log(tmpShow);
              setShowOverlay(tmpShow);
            }
          });
          kakao.maps.event.addListener(marker, 'clear', function() {
            marker.setMap(null);
          });
          overlay.setMap(null);
        } catch (err) {
          console.log(err);
        }
      }
      setMarkers(markers);
    })
    .catch((err) => {
      console.log(err.response);
    });
}

export function searchNodes(
  map: any,
  findRegion: never[],
  findFoodtype: never[],
  topValue: number,
  phrase: string,
  visible: any,
  markers: any,
  setMarkers: any,
) {
  const pms = [];
  for (let marker of markers) {
    try {
      marker.setMap(null);
    } catch (err) {
      console.log(err);
    }
  }
  markers = [];
  for (let item in visible[0]) {
    try {
      visible[0][item].setMap(null);
    } catch (err) {
      console.log(err);
    }
  }
  for (let region of findRegion) {
    for (let foodtype of findFoodtype) {
      const pm = getQuery(
        region as string,
        foodtype as string,
        topValue,
        phrase,
        map,
        visible[0],
        visible[1],
        markers,
        setMarkers,
      );
      pms.push(pm);
    }
  }
  Promise.all(pms);
}

export function eventNodes(options: any, mapRef: any, query: any, visible: any, markers: any, setMarkers: any) {
  const map = new kakao.maps.Map(mapRef.current, options);
  Axios.get(`${BackUri}/api/eventTgt?eventName=${query.eventName}`).then((res) => {
    res.data.participants.map((item: any) => {
      if (item.location) {
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(item.location.lat, item.location.lng),
        });
        markers.push(marker);
        let content;
        try {
          content = ReactDOMServer.renderToStaticMarkup(overlayReward(item, res.data.reward[item._id]));
        } catch (err) {
          content = '';
        }
        var overlay = new kakao.maps.CustomOverlay({
          content: content,
          map: map,
          position: marker.getPosition(),
        });
        kakao.maps.event.addListener(marker, 'click', function() {
          const name: string = item.name.match(/^.*\./)[0];
          const tmpShow: { [k: string]: any } = visible[0];
          if (!tmpShow.hasOwnProperty(name)) {
            tmpShow[name] = overlay;
            overlay.setMap(map);
            console.log(tmpShow);
            visible[1](tmpShow);
          } else {
            overlay.setMap(null);
            delete tmpShow[name];
            console.log(tmpShow);
            visible[1](tmpShow);
          }
        });
        overlay.setMap(null);
      }
      setMarkers(markers);
    });
  });
  return map;
}

export function singleNode(options: any, mapRef: any, query: any) {
  if (query.lat && query.lat !== 'undefined') options.center = new kakao.maps.LatLng(query.lat, query.lng);

  return new kakao.maps.Map(mapRef.current, options);
}

const OverlayStyle = styled.div`
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
  .info {
    width: 286px;
    height: 120px;
    border-radius: 5px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
    border: 0;
    box-shadow: 0px 1px 2px #888;
    .title {
      padding: 5px 0 0 10px;
      height: 30px;
      background: #eee;
      border-bottom: 1px solid #ddd;
      font-size: 18px;
      font-weight: bold;
    }
    .body {
      .desc {
        padding: 10px;
        width: 250px;
        white-space: normal;
      }
    }
  }
`;
