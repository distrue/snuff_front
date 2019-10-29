import logowhite from '../images/logo_white.png';

import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {JSAPIKey} from '../config';
import {loadScript} from '../tools/scriptasyncLoad';
import Axios from 'axios';
import {BackUri} from '../config';
import {AppId, RedirectUri} from '../config';


export default () => {
  const mapRef = useRef();
  const width = useState(0);
  const show = useState(false);
  const isLogin = useState(false);

  useEffect(() => {
    loadScript(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${JSAPIKey}&autoload=false`)
    .then(() => {
      kakao.maps.load(() => {
        let options = {
            center: new kakao.maps.LatLng(37.478701, 126.951267),
            level: 4
        };
        let map = new kakao.maps.Map(mapRef.current, options);
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(37.478701, 126.951267)
        });
        marker.setMap(map);
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
      <img style={{position: "absolute", right: "10px", top: "20px", width: "40px", borderRadius:"20px", zIndex:"2"}}
       src={logowhite} onClick={() => show[1](!show[0])}/>
       <SideBar style={{display: show[0]?"block":"none"}}>
        <img style={{position: "absolute", right: "10px", top: "20px", width: "40px", borderRadius:"20px", zIndex:"2"}}
       src={logowhite} onClick={() => show[1](!show[0])}/>
       <div className="back"></div>
       <div className="bar">
         {isLogin[0]?  <div onClick={() => window.location.href="/register"}>정보변경</div>: <div onClick={() => window.location.href="/login"}>회원가입</div>}
         <br/>
         {isLogin[0]? 
          <>
            <div onClick={() => {
              Axios.get(`${BackUri}/kakao_oauth/logout`, {withCredentials: true})
              .then((res)=> {
                console.log(res);
              });
            }}>logout</div><br/>
            <div onClick={() => {
              Axios.get(`${BackUri}/kakao_oauth/secess`, {withCredentials: true})
              .then((res)=> {
                console.log(res);
              });
            }}>탈퇴</div><br/>
            <div onClick={() => window.location.replace(`https://kauth.kakao.com/oauth/authorize?client_id=${AppId}&redirect_uri=${RedirectUri}&response_type=code&scope=gender,talk_message,account_email,age_range,birthday`)}
          >reload</div>
          </>: ""}
       </div>
      </SideBar>
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

const SideBar = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 1;
  position: absolute; top: 0; left: 0;
  .back {
    position: absolute; top; 0; left: 0;
    width: calc(100% - 150px);
    height: 100%;
    background-color: #707070;
    opacity: 0.3;
  }
  .bar {
    position: absolute; top; 0; right: 0;
    width: 150px;
    height: 100%; 
    background-color: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(0, 0, -0.16, 0);
  }
`;