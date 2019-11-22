import logowhite from '../images/logo_white.png';

import React from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import {BackUri} from '../config';


export default ({show, isLogin}:any) => {
    return(<SideBar>
        <div className="bar">
          <img className="logoIcon" src={logowhite} onClick={() => show[1](!show[0])}/>
          <hr className="item"/>
          {isLogin[0]?
          <div className="item" onClick={() => window.location.href="/register"}>정보변경</div>:
          <div className="item" onClick={() => window.location.href="/login"}>회원가입</div>} <br/>
          {isLogin[0]? <>
            <div className="item" onClick={() => Axios.get(`${BackUri}/kakao_oauth/logout`, {withCredentials: true}).then((res)=> console.log(res))}>logout</div><br/>
            <div className="item" onClick={() => Axios.get(`${BackUri}/kakao_oauth/secess`, {withCredentials: true}).then((res)=> console.log(res))}>탈퇴</div><br/>
          </>:""}
        </div>
    </SideBar>)
}

const SideBar = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: ${props => props.show?"block":"none"};
  position: absolute; top: 0; left: 0;
  .back {
    position: absolute; top: 0; left: 0;
    width: calc(100% - 150px);
    height: 100%;
    background-color: #707070;
    opacity: 0.3;
  }
  .bar {
    position: absolute; top: 0px; right: 0;
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
  .logoIcon {
    position:  absolute;
    left:  50%; top:  50px; width:  80px; 
    transform: translate(-50%, -50%);
    border-radius: 20px; z-index: 3;
  }
`;