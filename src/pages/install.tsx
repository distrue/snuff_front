import React, { useEffect, useRef, useState } from 'react';
import withLocation from './withlocation.js';
import Header from '../components/header';

export default withLocation((props: any) => {
  return (
    <div>
      <Header />
      <h2>스누푸파 간편앱 추가하기</h2>
      <h4>Android</h4>
      <div style={{ width: '230px' }}>android의 경우, 모바일 chrome 앱을 통해 추가할 수 있습니다.</div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ width: '170px', paddingTop: '10px' }}>
          <img style={{ width: '150px' }} src="https://snuffstatic.s3.ap-northeast-2.amazonaws.com/android_1.jpg" />
          <br />
          1. chrome browser의 우측 상단 버튼을 누릅니다. (update 되어있는 경우 ...으로 나타남)
        </div>
        <div style={{ width: '170px', paddingTop: '10px' }}>
          <img style={{ width: '150px' }} src="https://snuffstatic.s3.ap-northeast-2.amazonaws.com/android_2.jpg" />
          <br />
          2. "홈 화면에 추가"를 눌러줍니다.
        </div>
        <div style={{ width: '170px', paddingTop: '10px' }}>
          <img style={{ width: '150px' }} src="https://snuffstatic.s3.ap-northeast-2.amazonaws.com/android_3.jpg" />
          <br />
          3. "확인"을 누르면 바탕화면에서 PuPa 앱을 사용할 수 있습니다.
        </div>
      </div>
      <h4>iOS</h4>
      <div style={{ width: '230px' }}>iOS의 경우, 설치되어있는 Safari 앱을 통해 추가할 수 있습니다.</div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ width: '170px', paddingTop: '10px' }}>
          <img style={{ width: '150px' }} src="https://snuffstatic.s3.ap-northeast-2.amazonaws.com/ios_1.jpeg" />
          <br />
          1. safari browser가 아닌 경우, URL을 복사해 safari에서 열어줍니다.
        </div>
        <div style={{ width: '170px', paddingTop: '10px' }}>
          <img style={{ width: '150px' }} src="https://snuffstatic.s3.ap-northeast-2.amazonaws.com/ios_2.jpeg" />
          <br />
          2. safari의 하단의 공유 버튼을 눌러줍니다.
        </div>
        <div style={{ width: '170px', paddingTop: '10px' }}>
          <img style={{ width: '150px' }} src="https://snuffstatic.s3.ap-northeast-2.amazonaws.com/ios_3.jpeg" />
          <br />
          3. 메뉴 중 "홈 화면에 추가"를 선택해줍니다.
        </div>
        <div style={{ width: '170px', paddingTop: '10px' }}>
          <img style={{ width: '150px' }} src="https://snuffstatic.s3.ap-northeast-2.amazonaws.com/ios_4.jpeg" />
          <br />
          4. "확인"을 누르면 바탕화면에서 PuPa 앱을 사용할 수 있습니다.
        </div>
      </div>
    </div>
  );
});
