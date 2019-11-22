import logoFull from '../images/logocolor.png';
import closeBlack from '../images/close_black.png';

import React from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { BackUri } from '../config';
import withLocation from './withlocation.js';

export default withLocation((props: any) => {
  React.useEffect(() => {
    Axios.get(`${BackUri}/kakao_oauth/register`, { withCredentials: true }).then((ans) => {
      if (ans.data.isRegister === true) {
        window.location.replace('/');
      }
      console.log(ans.data);
    });
  }, []);
  return (
    <div>
      <SimpleHeader>
        <div className="slogan">회원가입</div>
        <img src={closeBlack} className="close" onClick={() => window.history.back()} />
      </SimpleHeader>
      <MainBlock>
        <div className="title">스누푸파</div>
        <img src={logoFull} className="logo" />
        <div className="des">수많은 음식점을 거친 스누푸파의 리뷰!</div>
      </MainBlock>
    </div>
  );
});

const SimpleHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100vw;
  height: 52px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  .slogan {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    height: 19px;
    font-family: NanumSquareR;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.19;
    letter-spacing: 0px;
    text-align: center;
    color: #2b2d30;
  }
  .close {
    position: absolute;
    right: 16px;
    width: 20px;
    height: 20px;
    top: 14px;
  }
`;

const MainBlock = styled.div`
  position: absolute;
  top: 114px;
  left: 50vw;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: column;
  .title {
    height: 29px;
    font-family: Handon3gyeopsalOTF600g;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.21;
    text-align: center;
    letter-spacing: -0.01px;
    color: #000000;
  }
  .logo {
    padding: 20px 0px 20px 0px;
    position: relative;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
  .des {
    width: 166px;
    height: 51px;
    font-family: Handon3gyeopsalOTF600g;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: -0.01px;
    text-align: center;
    color: #000000;
  }
`;
