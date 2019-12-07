import React, { useEffect, useRef, useState } from 'react';
import close from '../images/close_black.png';
import styled from 'styled-components';
import { JSAPIKey } from '../config';
import loadScript from '../tools/scriptasyncLoad';
import withLocation from './withlocation.js';
import { eventNodes, singleNode } from '../components/kakaoMap';
import SearchBar from '../components/searchBar';

export default withLocation((props: any) => {
  const mapRef: any = useRef();
  const showOverlay = useState({});
  const markers = useState([]);
  const [Amap, setMap] = useState({});
  const mapOn = useState(false);
  const [bottomCnt, setBottomCnt] = useState("");
  const [bottomCntShow, setBottomCntShow] = useState(false);
  const [bottomImg, setBottomImg] = useState([]);
  const [bottomImgShow, setBottomImgShow] = useState(false);
  let bottomSet:any = useState({
    setBottomCnt: "",
    setBottomCntShow: "",
    setBottomImg: "",
    setBottomImgShow: ""
  });

  useEffect(() => {
    bottomSet[1]({
      setBottomCnt: setBottomCnt,
      setBottomCntShow: setBottomCntShow,
      setBottomImg: setBottomImg,
      setBottomImgShow: setBottomImgShow
    });
    // KakaoMap load
    loadScript(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`)
      .then(() => {
        kakao.maps.load(async () => {
          const options = {
            center: new kakao.maps.LatLng(37.478701, 126.951267),
            level: 4,
          };
          if (props.search.eventName) {
            setMap(await eventNodes(options, mapRef, props.search, showOverlay, markers[0], markers[1], bottomSet[0]));
          } else {
            setMap(await singleNode(options, mapRef, props.search));
          }
          mapOn[1](true);
        });
      })
      .catch(() => null);
  }, []);

  return (
    <div>
      <div
        ref={mapRef}
        style={{
          position: 'absolute',
          left: '0%',
          top: '0%',
          width: '100vw',
          height: '100vh',
        }}
        className="map"
      />
      <SearchBar
        mapOn={mapOn[0]}
        showMarker={showOverlay}
        map={Amap}
        query={props.search}
        markers={markers[0]}
        setMarkers={markers[1]}
        bottomSet={bottomSet[0]}
      />
      <BottomStyle>
        <div className="detailReview" style={{display: bottomCntShow?"block":"none"}}>
          <img
          alt={''}
          src={close}
          style={{
            width: '24px',
            height: '24px',
            position: 'absolute',
            top: '14px',
            right: '5%',
          }}
          onClick={() => {
            setBottomCntShow(false);
          }}
        />
        {bottomCnt}
        </div>
        <div className="detailImage" style={{display: bottomImgShow?"block":"none"}}>
        <img
          alt={''}
          src={close}
          style={{
            width: '24px',
            height: '24px',
            position: 'absolute',
            top: '14px',
            right: '5%',
          }}
          onClick={() => {
            setBottomImgShow(false);
          }}
        />
        {bottomImg.length >= 0? bottomImg.map(item => <img alt="" key={item} src={item}/>):""}
        </div>
        <button className="cntshow" onClick={() => {
            setBottomCntShow(!bottomCntShow);
          }}>리뷰</button>
          <button className="imgshow" onClick={() => {
            setBottomImgShow(!bottomImgShow);
          }}>사진</button>
     </BottomStyle>
    </div>
  );
});

const BottomStyle = styled.div`
width: 100vw;
.detailReview {
  width: calc(80%-30px); height: 20vh;
  padding: 30px;
  padding-top: 50px;
  position: fixed; bottom: 20vh; left: 0;
  background-color: white;
  overflow: scroll;
  z-index:3;
}
.detailImage {
  width: calc(80%-30px); height: 20vh;
  position: fixed; bottom: 20vh; left: 10px;
  padding: 20px;
  background-color: white;
  overflow: scroll;
  z-index:4;
  img {
    width: 20%;
  }
}
.cntshow {
    position: fixed; left: 0px; bottom: 130px;
    height: 30px; width: 60px; z-index: 2; background-color: white;
  }
  .imgshow {
    position: fixed; left: 0px; bottom: 100px;
    height:30px; width: 60px; z-index: 2; background-color: white;
  }
`;