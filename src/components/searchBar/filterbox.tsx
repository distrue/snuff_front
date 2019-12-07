import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default ({ filterShow, checkOption, setTopValue, infoEvent, findRegion, findFoodtype }: any) => {
  const region: { [k: string]: string } = {
    봉천: '봉천',
    낙성대: '낙성대',
    샤로수길: '샤로수길',
    녹두: '녹두',
    신림: '신림',
    설입역: '서울대입구역',
  };
  const foodtype = ['양식', '일식', '한식', '중식', '디저트'];
  const marks = {
    10: 'top (0%)',
    25: '4.75 (15%)',
    40: '4.5 (40%)',
    60: '4.25 (60%)',
    80: '4.0 (80%)',
    95: '3.75 (95%)',
    100: '',
  };
  const markScore: any = {
    25: 4.75,
    40: 4.5,
    60: 4.25,
    80: 4.0,
    95: 3.75,
    100: 3,
  };

  function checkAll(type: string, e: any) {
    let target: string[] = [];
    switch (type) {
      case 'region':
        target = Object.keys(region);
        break;
      case 'foodtype':
        target = foodtype;
        break;
    }
    target.forEach((item: any) => {
      const it = document.getElementById(`${type}-${item}`);
      if (e.target.checked) {
        if (type === 'region' && findRegion.findIndex((ite: any) => ite === region[item]) >= 0) return;
        if (type === 'foodtype' && findFoodtype.findIndex((ite: any) => ite === item) >= 0) return;
        if (it !== null && it !== undefined) it.click();
      } else {
        if (type === 'region' && findRegion.findIndex((ite: any) => ite === region[item]) === -1) return;
        if (type === 'foodtype' && findFoodtype.findIndex((ite: any) => ite === item) === -1) return;
        if (it !== null && it !== undefined) it.click();
      }
    });
  }

  return (
    <div
      className="filterBox"
      style={{
        display: filterShow ? 'block' : 'none',
      }}
    >
      <div className="row">지역</div>
      <div className="row">
        <div
          className="item"
          style={{
            width: '55px',
          }}
        >
          <input id="region-all" type="checkbox" onChange={(e) => checkAll('region', e)} />
          <label htmlFor="region-all">모두</label>
        </div>
        {Object.keys(region).map((item) => (
          <div
            className="item"
            style={{
              width: `${item.length > 2 ? 15 + 18 * item.length : 55}px`,
            }}
          >
            <input id={`region-${item}`} type="checkbox" onChange={() => checkOption('region', region[item])} />
            <label htmlFor={`region-${item}`}>{item}</label>
          </div>
        ))}
      </div>
      <div className="row">종류</div>
      <div className="row">
        <div
          className="item"
          style={{
            width: '55px',
          }}
        >
          <input id="foodtype-all" type="checkbox" onChange={(e) => checkAll('foodtype', e)} />
          <label htmlFor="foodtype-all">모두</label>
        </div>
        {foodtype.map((item) => (
          <div
            className="item"
            style={{
              width: `${item.length > 2 ? 10 + 20 * item.length : 55}px`,
            }}
          >
            <input id={`foodtype-${item}`} type="checkbox" onClick={() => checkOption('foodtype', item)} />
            <label htmlFor={`foodtype-${item}`}>{item}</label>
          </div>
        ))}
      </div>
      <div className="row">점수</div>
      <div
        className="row"
        style={{
          height: '60px',
          marginLeft: '10px',
        }}
      >
        <Slider
          style={{
            width: '180px',
            height: '40px',
          }}
          min={11}
          marks={marks}
          onChange={(e) => setTopValue(markScore[e])}
          step={null}
          defaultValue={95}
        />
      </div>
      <div className="row">이벤트</div>
      <div className="row">
        <button
          type="button"
          className="item"
          style={{
            width: '130px',
            cursor: 'pointer',
            zIndex: 2,
            border: '1px solid black',
            backgroundColor: infoEvent ? '#ff9014' : '#cccccc',
          }}
          onClick={() => {
            infoEvent ? window.location.reload() : (window.location.href = '/?eventName=Su101');
          }}
        >
          샤이좋은식당
        </button>
      </div>
    </div>
  );
};
