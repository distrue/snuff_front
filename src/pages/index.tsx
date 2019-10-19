import logowhite from '../images/logo_white.png';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {JSAPIKey} from '../config';
import {loadScript} from '../tools/scriptasyncLoad';

export default () => {
  const mapRef = useRef();
  const width = useState(0);

  useEffect(() => {
    loadScript(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`)
    .then(() => {
      kakao.maps.load(() => {
        let container = document.getElementById('map');
        console.log(container);
        console.log(kakao.maps);
        let options = {
            center: new kakao.maps.LatLng(37.478701, 126.951267),
            level: 4
        };
        let map = new kakao.maps.Map(mapRef.current, options);
      })
    })
    .catch(err => {
      console.log(err);
    })      
    width[1](window.innerWidth);
  }, []);

  return (<div>
      <div ref={mapRef} style={{position: "absolute", left: "0%", top: "0%", width: "100vw", height: "100vh"}} className="map"/>
      <SearchBar width={width[0]}>
      </SearchBar>
      <img style={{position: "absolute", right: "10px", top: "20px", width: "40px", borderRadius:"20px", zIndex:"2"}}
       src={logowhite} onClick={() => window.location.href="/login"}/>
    </div>
  );
};

const SearchBar = styled.div.attrs((props:any) => {})`
  position: absolute; top: 20px; left: 10px;
  width: ${props => props.width-70}px;
  height: 36px;
  opacity: 0.8;
  border-radius: 4px;
  background-color: #ffffff;
  z-index: 1;
`;
