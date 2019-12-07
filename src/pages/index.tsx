import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    // KakaoMap load
    loadScript(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`)
      .then(() => {
        kakao.maps.load(async () => {
          const options = {
            center: new kakao.maps.LatLng(37.478701, 126.951267),
            level: 4,
          };
          if (props.search.eventName) {
            setMap(await eventNodes(options, mapRef, props.search, showOverlay, markers[0], markers[1]));
          } else {
            setMap(await singleNode(options, mapRef, props.search));
          }
          mapOn[1](true);
        });
      })
      .catch(() => null);
  }, [mapOn, markers, props.search, showOverlay]);

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
      />
    </div>
  );
});
