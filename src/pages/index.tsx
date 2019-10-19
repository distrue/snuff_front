import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import {JSAPIKey} from '../config';
import {default as $S} from 'scriptjs';


export default () => {
  const mapRef = useRef();

  useEffect(() => {
    $S(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`, () => {
        kakao.maps.load(() => {
            var container = document.getElementById('map');
            console.log(container);
            console.log(kakao.maps);
            var options = {
                center: new kakao.maps.LatLng(33.450701, 126.570667),
                level: 3
            };

            var map = new kakao.maps.Map(mapRef.current, options);
        })
    })
  }, []);

  return (<div>
      <div ref={mapRef} style={{position: "absolute", left: "0%", top: "0%", width: "100vw", height: "100vh"}} className="map">
          tmp
      </div>
      <SearchBar>
      </SearchBar>
    </div>
  );
};

const SearchBar = styled.div`
  position: absolute; top: 20px; left: 50vw; transform: translate(-50%, 0%);
  width: 343px;
  height: 36px;
  opacity: 0.8;
  border-radius: 4px;
  background-color: #ffffff;
  z-index: 1;
`;
