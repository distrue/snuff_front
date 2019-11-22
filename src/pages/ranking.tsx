import crown from '../images/crown.png';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import { Helmet } from 'react-helmet';

import withLocation from './withlocation.js';
import { default as Header } from '../components/header';

export default withLocation((props: any) => {
  let result = useState({
    taste: 0,
    quantity: 0,
    atmosphere: 0,
    service: 0,
    title: 'unknown',
    totScore: 0,
    ranking: 1,
  });
  useEffect(() => {
    console.log(props.search.name);
    Axios.get(`https://www.snufoodfighter.com/api/ranking?name=${props.search.name}`)
      .then((res) => {
        let cal = 1;
        switch (String(res.data.rating.total)) {
          case '4.875':
            cal = 1;
            break;
          case '4.75':
            cal = 3;
            break;
          case '4.625':
            cal = 9;
            break;
          case '4.5':
            cal = 22;
            break;
          case '4.375':
            cal = 48;
            break;
          case '4.25':
            cal = 85;
            break;
          case '4.125':
            cal = 125;
            break;
          case '4':
            cal = 167;
            break;
          case '3.875':
            cal = 201;
            break;
          case '3.75':
            cal = 224;
            break;
          case '3.625':
            cal = 238;
            break;
          case '3.5':
            cal = 243;
            break;
          case '3.375':
            cal = 246;
            break;
        }
        result[1]({
          taste: res.data.rating.taste,
          quantity: res.data.rating.quantity,
          atmosphere: res.data.rating.atmosphere,
          service: res.data.rating.service,
          title: res.data.title,
          totScore: res.data.rating.total,
          ranking: cal,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        {/*<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />*/}
      </Helmet>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          top: '90px',
          left: '0px',
          width: '100vw',
        }}
      >
        <TowerStyle>
          <div className="topl"></div>
          <div className="downl"></div>
          <div className="topr"></div>
          <div className="downr"></div>
          <img src={crown} className="crownicon" />
          <div className="crowncnt">{result[0].ranking}</div>
        </TowerStyle>
        <ResultStyle>
          <div className="title">"{result[0].title}"</div>
          <div className="normal1">은</div>
          <div className="ctr">
            <div className="dtl">
              <div className="col1">통합점수</div>
              <div className="col2">{result[0].totScore}</div>
            </div>
            <div className="dtl">
              <div className="col1">맛</div>
              <div className="col2">{result[0].taste}</div>
            </div>
            <div className="dtl">
              <div className="col1">양</div>
              <div className="col2">{result[0].quantity}</div>
            </div>
            <div className="dtl">
              <div className="col1">분위기</div>
              <div className="col2">{result[0].atmosphere}</div>
            </div>
            <div className="dtl">
              <div className="col1">서비스</div>
              <div className="col2">{result[0].service}</div>
            </div>
            <div className="dtl">
              <div className="col1">246개 식당</div>
              <div className="col3">중</div>
            </div>
            <div className="dtl" style={{ position: 'relative', top: '-10px', left: '0px' }}>
              <div className="col5">{result[0].ranking}</div>
              <div className="col4">등입니다.</div>
            </div>
            <img src={crown} className="crownicon" />
          </div>
        </ResultStyle>
      </div>
    </>
  );
});

const ResultStyle = styled.div`
  display: block;
  position: relative;
  width: 200px;
  height: 400px;
  left: -30px;
  .ctr {
    display: flex;
    position: absolute;
    top: 100px;
    left: 81px;
    flex-direction: column;
    .crownicon {
      position: absolute;
      top: 230px;
      left: -20px;
      width: 21.2px;
      height: 16.2px;
    }
    .dtl {
      position: relative;
      display: block;
      width: 100px;
      height: 30px;
      margin-bottom: 10px;
      .col1 {
        color: #1eccf9;
        position: absolute;
        top: 0px;
        left: 0px;
      }
      .col2 {
        position: absolute;
        top: 0px;
        left: 70px;
      }
      .col3 {
        position: absolute;
        top: 0px;
        left: 85px;
      }
      .col4 {
        position: absolute;
        top: 0px;
        left: 55px;
        width: 80px;
      }
      .col5 {
        position: absolute;
        top: -2px;
        left: 20px;
        text-align: center;
        width: 33px;
        height: 20px;
        font-size: 20px;
        font-weight: bold;
        font-stretch: normal;
        line-height: 1.2;
        letter-spacing: -0.01px;
        text-align: left;
        color: #000000;
      }
    }
  }
  .title {
    position: absolute;
    top: 41px;
    left: 41px;
    width: 142px;
    height: 29px;
    font-size: 24px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.21;
    letter-spacing: -0.01px;
    text-align: left;
    color: #000000;
  }
  .normal1 {
    position: absolute;
    top: 55px;
    left: 191px;
    width: 10px;
    height: 15px;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: left;
    color: #707070;
  }
`;

const TowerStyle = styled.div`
  display: block;
  position: relative;
  width: 165px;
  height: 400px;
  .topl {
    position: absolute;
    top: 0px;
    left: 41px;
    width: 81.5px;
    height: 200.3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 200px 41px;
    border-color: transparent transparent #ffffff transparent;
    -webkit-filter: drop-shadow(-1px -1px 1px rgba(0, 0, 0, 0.5));
    filter: drop-shadow(0 3px 6px 0 rgba(0, 0, 0, 0.16));
  }
  .topr {
    position: absolute;
    top: 0px;
    left: 81px;
    width: 81.5px;
    height: 200.3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 41px 200px 0;
    border-color: transparent transparent #ffffff transparent;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
    filter: drop-shadow(0 3px 6px 0 rgba(0, 0, 0, 0.16));
  }
  .downl {
    position: absolute;
    top: 200.3px;
    left: 0px;
    width: 41px;
    height: 0;
    border-style: solid;
    border-width: 0 0 200px 41px;
    border-color: transparent transparent #1eccf9 transparent;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
    filter: drop-shadow(0 3px 6px 0 rgba(0, 0, 0, 0.16));
  }
  .downr {
    position: absolute;
    top: 200.3px;
    left: 81px;
    width: 41px;
    height: 0;
    border-style: solid;
    border-width: 0 41px 200px 0;
    border-color: transparent transparent #1eccf9 transparent;
    -webkit-filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5));
    filter: drop-shadow(0 3px 6px 0 rgba(0, 0, 0, 0.16));
  }
  .crownicon {
    position: absolute;
    top: 170px;
    left: 51px;
    width: 63.6px;
    height: 48.6px;
  }
  .crowncnt {
    position: absolute;
    top: 190px;
    left: 81px;
    transform: translate(-50%, 0%);
    width: 20px;
    height: 12px;
    font-family: Handon3gyeopsalOTF600g;
    font-size: 18px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.17;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    z-index: 1;
  }
`;
