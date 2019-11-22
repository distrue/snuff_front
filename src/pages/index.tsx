import logowhite from '../images/logo_white.png';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {JSAPIKey} from '../config';
import {loadScript} from '../tools/scriptasyncLoad';
import Axios from 'axios';
import {BackUri} from '../config';
import withLocation from './withlocation.js';
import { multiNodes, singleNode } from '../components/kakaoMap';
import SideBar from '../components/sideBar';

export default withLocation((props:any) => {
  const mapRef = useRef();
  const width = useState(0);
  const show = useState(false);
  const isLogin = useState(false);
  const showMarker = useState([]);

  useEffect(() => { // KakaoMap load
    loadScript(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`)
    .then(() => {
      kakao.maps.load(() => {
        let options = {  center: new kakao.maps.LatLng(37.478701, 126.951267), level: 4 };
        if(props.search.eventName) return multiNodes(options, mapRef, props.search, showMarker)
        return singleNode(options, mapRef, props.search)
      })
    })
    .catch(err => console.log(err))      
    width[1](window.innerWidth)
  }, []);

  useEffect(() => { // Login Check
    Axios.get(`${BackUri}/kakao_oauth/islogin`, {withCredentials: true})
    .then((ans) => {
      if(ans.data.islogin) return isLogin[1](true)
      isLogin[1](false) 
    })
  }, []);

  return (<div>
      <div ref={mapRef} style={{position: "absolute", left: "0%", top: "0%", width: "100vw", height: "100vh"}} className="map"/>
      <SearchBar width={width[0]}/>
      <img className="logoIcon" src={logowhite} onClick={() => show[1](!show[0])}/>
      <SideBar show={show[0]} isLogin={isLogin}/>
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
