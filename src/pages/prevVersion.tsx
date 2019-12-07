import today1 from '../images/today_1.png';
import today2 from '../images/today_2.png';
import today3 from '../images/today_3.png';

import filter from '../images/filter.png';
import search from '../images/search.png';

import map from '../images/map.png';

import swipe from '../images/swipe.png';

import React from 'react';
import styled from 'styled-components';

import { default as Header } from '../components/header';

export default () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100vw',
      }}
    >
      <Header />
      <TodayStyled>
        <div className="title">Today</div>
        <div className="subtitle">오늘의 추천 식당을 살펴보세요!</div>
        <div className="board">
          <div className="imgs">
            <img src={today1} />
            <div className="title">전주한상차림</div>
            <div className="score">3.6</div>
          </div>
          <div className="imgs">
            <img src={today2} />
          </div>
          <div className="imgs">
            <img src={today3} />
          </div>
        </div>
      </TodayStyled>
      <SearchStyled>
        <div className="title">검색</div>
        <div className="subtitle">키워드를 사용하여 직접 검색해보세요.</div>
        <img className="filter" src={filter} />
        <img className="search" src={search} />
        <input className="searchBar" placeholder="검색어를 입력하세요." />
      </SearchStyled>
      <SwipeUnit>
        <div className="des">스와이프하면 지도로 이동합니다.</div>
        <img className="icon" src={swipe} />
      </SwipeUnit>
      <img src={map} style={{ width: '100%', display: 'block', position: 'fixed', bottom: '0px', left: '0px' }}></img>
    </div>
  );
};

const TodayStyled = styled.div`
  display: block;
  width: 100%;
  height: 386px;
  position: relative;
  .title {
    position: absolute;
    top: 21px;
    left: 17px;
    width: 54px;
    height: 20px;
    font-family: Handon3gyeopsalOTF600g;
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.2;
    letter-spacing: -0.01px;
    text-align: center;
    color: #2b2d30;
  }
  .subtitle {
    position: absolute;
    top: 47px;
    left: 16px;
    width: 148px;
    height: 15px;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.17;
    letter-spacing: 0px;
    text-align: left;
    color: #000000;
  }
  .board {
    position: absolute;
    top: 72px;
    left: 0px;
    width: 100%;
    height: 274px;
    padding-top: 26px;
    padding-left: 16px;
    display: flex;
    flex-direction: row;
    .imgs {
      display: block;
      width: 132px;
      height: 236px;
      margin-right: 16px;
      position: relative;
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(81, 81, 81, 0), rgba(54, 54, 54, 0.94));
      z-index: 1;
      img {
        display: block;
        top: 0%;
        left: 0%;
        width: 136px;
        height: 242px;
        opacity: 0.7;
        z-index: 0;
      }
      .title {
        position: absolute;
        left: 10px;
        top: 177px;
        width: 84px;
        height: 19px;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.19;
        letter-spacing: 0px;
        text-align: center;
        color: #ffffff;
        z-index: 2;
      }
      .score {
        position: absolute;
        top: 207px;
        left: 92px;
        width: 34px;
        height: 24px;
        font-size: 24px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.21;
        letter-spacing: -0.01px;
        text-align: center;
        color: #ff9014;
        z-index: 2;
      }
    }
    background-color: #f4f5fa;
  }
`;

const SearchStyled = styled.div`
  display: block;
  width: 100%;
  height: 186px;
  position: relative;
  .title {
    position: absolute;
    left: 17px;
    top: 12px;
    font-size: 20px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.2;
    letter-spacing: -0.01px;
    text-align: center;
    color: #2b2d30;
  }
  .subtitle {
    position: absolute;
    left: 17px;
    top: 41px;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.17;
    letter-spacing: 0px;
    text-align: left;
    color: #000000;
  }
  .filter {
    position: absolute;
    left: 16px;
    top: 88px;
    width: 24px;
    height: 24px;
  }
  .search {
    position: absolute;
    left: 56px;
    top: 88px;
    width: 24px;
    height: 24px;
    z-index: 1;
  }
  .searchBar {
    position: absolute;
    left: 48px;
    top: 80px;
    padding-left: 40px;
    width: 75vw;
    height: 36px;
    border-radius: 4px;
    background-color: #f4f5fa;
    border: 0px solid black;
  }
`;

const SwipeUnit = styled.div`
  display: block;
  width: 100%;
  height: 120px;
  position: relative;
  .icon {
    width: 28px;
    height: 28px;
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translate(-50%, 0%);
  }
  .des {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 155px;
    height: 15px;
    font-family: Handon3gyeopsalOTF300g;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.17;
    letter-spacing: 0px;
    text-align: left;
    color: #b0b3bb;
  }
`;
