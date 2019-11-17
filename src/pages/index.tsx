import logowhite from '../images/logo_white.png';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {JSAPIKey} from '../config';
import {loadScript} from '../tools/scriptasyncLoad';
import Axios from 'axios';
import {BackUri} from '../config';
import {AppId, RedirectUri} from '../config';
import withLocation from './withlocation.js';


export default withLocation((props:any) => {
  const mapRef = useRef();
  const width = useState(0);
  const show = useState(false);
  const isLogin = useState(false);
  const showMarker = useState([]);

  function multiNodes(options: any) {
    let map = new kakao.maps.Map(mapRef.current, options);
    Axios.get(`https://www.snufoodfighter.com/api/eventTgt?eventName=${props.search.eventName}`)
    .then(res => {
      console.log(res.data)
      res.data.participants.map((item:any) => {
        console.log(item.location, item.name)
          
        if(item.location) {
          let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(item.location.lat, item.location.lng)
          });
          var content = '<div class="wrap" style="position: absolute;left: 0;bottom: 40px;width: 288px;height: 132px;margin-left: -144px;text-align: left;overflow: hidden;font-size: 12px;line-height: 1.5;">' + 
            '    <div class="info" style="width: 286px;height: 120px;border-radius: 5px;border-bottom: 2px solid #ccc;border-right: 1px solid #ccc;overflow: hidden;background: #fff; border: 0;box-shadow: 0px 1px 2px #888;">' + 
            '        <div class="title" style="padding: 5px 0 0 10px;height: 30px;background: #eee;border-bottom: 1px solid #ddd;font-size: 18px;font-weight: bold;">' + 
            `            ${item.name.match(/^.*\./)}` + 
            '        </div>' + 
            '        <div class="body">' + 
            '            <div class="desc" style="padding: 10px; width: 250px; white-space: normal">' + 
            `${res.data.reward[item._id]}` + 
            '            </div>' + 
            '        </div>' + 
            '    </div>' +    
            '</div>';
          var overlay = new kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: marker.getPosition()       
          });
          kakao.maps.event.addListener(marker, 'click', function() {
            let tmpShow:any = showMarker[0];
            let f = tmpShow.findIndex((e:any) => {
              return e === item.name.match(/^.*\./)[0]
            });
            if(f === -1) {
              overlay.setMap(map);
              tmpShow.push(item.name.match(/^.*\./)[0]);
              showMarker[1](tmpShow);
            }  
            else {
              overlay.setMap(null);
              tmpShow.splice(f, 1);
              showMarker[1](tmpShow);
            }
          });
          overlay.setMap(null);  
        }
        /*
              let infowindow = new kakao.maps.InfoWindow({
        map: map,
        position: new kakao.maps.LatLng(37.478701, 126.951267),
        content: `<div style="padding:5px;">여러개</div>`
      });
        */
      })
    })
  }

  function singleNode(options: any) {
    if(props.search.lat && props.search.lat !== "undefined") {
      options.center = new kakao.maps.LatLng(props.search.lat, props.search.lng)
    }
    let map = new kakao.maps.Map(mapRef.current, options);
    if(props.search.lat && props.search.lat !== "undefined") {
        let infowindow = new kakao.maps.InfoWindow({
        map: map,
        position: new kakao.maps.LatLng(props.search.lat, props.search.lng),
        content: `<div style="padding:5px;">${props.search.name}</div>`
      });
    }
    else {
      let infowindow = new kakao.maps.InfoWindow({
        map: map,
        position: new kakao.maps.LatLng(37.478701, 126.951267),
        content: `<div style="padding:5px;">준비중</div>`
      });
    }
  }

  useEffect(() => {
    loadScript(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`)
    .then(() => {
      kakao.maps.load(() => {
        let options = {
            center: new kakao.maps.LatLng(37.478701, 126.951267),
            level: 4
        };
        if(props.search.eventName) {
          multiNodes(options)
        }
        else {
          singleNode(options)
        }
        // infowindow.close();
        /*
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(37.478701, 126.951267)
        });
        marker.setMap(map);*/
        // marker.setMap(null); // 제거 의미
      })
    })
    .catch(err => {
      console.log(err);
    })      
    width[1](window.innerWidth);
  }, []);

  useEffect(() => {
    Axios.get(`${BackUri}/kakao_oauth/islogin`, {withCredentials: true})
    .then((ans) => {
      if(ans.data.islogin) {
        isLogin[1](true);
      }
      else {
        isLogin[1](false);
      }
      console.log(ans.data);
    })
  }, []);
  

  return (<div>
      <div ref={mapRef} style={{position: "absolute", left: "0%", top: "0%", width: "100vw", height: "100vh"}} className="map"/>
      <SearchBar width={width[0]}>
      </SearchBar>
      <img style={{position: "absolute", right: "10px", top: "20px", width: "40px", borderRadius:"20px", zIndex:"1"}}
       src={logowhite} onClick={() => show[1](!show[0])}/>
       <SideBar style={{display: show[0]?"block":"none"}}>
       <div className="back" onClick={() => {
         show[1](!show[0]);
       }}></div>
       <div className="bar">
        <img style={{position: "absolute", left: "50%", top: "50px", width: "80px", transform: "translate(-50%, -50%)", borderRadius:"20px", zIndex:"3"}}
        src={logowhite} onClick={() => show[1](!show[0])}/>
         <hr className="item"/>
         {isLogin[0]?  <div className="item" onClick={() => window.location.href="/register"}>정보변경</div>: <div className="item" onClick={() => window.location.href="/login"}>회원가입</div>}
         <br/>
         {isLogin[0]? 
          <>
            <div className="item" onClick={() => {
              Axios.get(`${BackUri}/kakao_oauth/logout`, {withCredentials: true})
              .then((res)=> {
                console.log(res);
              });
            }}>logout</div><br/>
            <div className="item" onClick={() => {
              Axios.get(`${BackUri}/kakao_oauth/secess`, {withCredentials: true})
              .then((res)=> {
                console.log(res);
              });
            }}>탈퇴</div><br/>
            <div className="item" onClick={() => window.location.replace(`https://kauth.kakao.com/oauth/authorize?client_id=${AppId}&redirect_uri=${RedirectUri}&response_type=code&scope=gender,talk_message,account_email,age_range,birthday`)}
          >reload</div>
          </>: ""}
       </div>
      </SideBar>
    </div>
  );
});

const SearchBar = styled.div.attrs((props:any) => {})`
  position: absolute; top: 20px; left: 10px;
  width: ${props => props.width-70}px;
  height: 36px;
  opacity: 0.8;
  border-radius: 4px;
  background-color: #ffffff;
  z-index: 1;
`;

const SideBar = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  position: absolute; top: 0; left: 0;
  .back {
    position: absolute; top; 0; left: 0;
    width: calc(100% - 150px);
    height: 100%;
    background-color: #707070;
    opacity: 0.3;
  }
  .bar {
    position: absolute; top; 0px; right: 0;
    width: 150px;
    height: 100%; 
    background-color: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, -0.16, 0);
    .item {
      position: relative; top: 100px;
      padding-left: 15px;
      cursor: pointer;
    }
  }
`;