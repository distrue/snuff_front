import React, { useEffect, useState } from 'react';
import search from '../../images/search.png';
import filter from '../../images/filter.png';
import home from '../../images/home.png';

import { searchNodes, getQuery } from '../../components/kakaoMap';
import FilterBox from './filterbox';
import SearchBar from './style';

export default ({ mapOn, map, query, showMarker, markers, setMarkers, bottomSet }: any) => {
  const width = useState(0);
  const [phrase, setPhrase] = useState('');
  const [filterShow, setFilterShow] = useState(true);
  const [findRegion, setFindRegion] = useState([]);
  const [findFoodtype, setFindFoodtype] = useState([]);
  const [topValue, setTopValue] = useState(3.75);
  const [infoEvent, setEvent] = React.useState('');

  function checkOption(type: string, to: string) {
    let clone;
    let idx;
    switch (type) {
      case 'phrase':
        setPhrase(to);
        break;
      case 'region':
        clone = findRegion as string[];
        idx = findRegion.findIndex((item) => item === to);
        if (idx === -1) clone.push(to);
        else clone.splice(idx, 1);
        setFindRegion(clone as never[]);
        break;
      case 'foodtype':
        clone = findFoodtype as string[];
        idx = findFoodtype.findIndex((item) => item === to);
        if (idx === -1) clone.push(to);
        else clone.splice(idx, 1);
        setFindFoodtype(clone as never[]);
        break;
    }
  }

  useEffect(() => {
    if (query.phrase) {
      setPhrase(query.phrase);
      getQuery('', '', 0, query.phrase, map, showMarker[0], showMarker[1], markers, setMarkers, bottomSet).then(() => {
        setFilterShow(false);
      });
    }
    if (query.eventName) {
      setFilterShow(false);
      setEvent(query.eventName);
    }
  }, [map, mapOn, markers, query.eventName, query.phrase, setMarkers, showMarker]);

  useEffect(() => {
    width[1](window.innerWidth);
  }, [width]);

  return (
    <SearchBar width={width[0]}>
      <img alt="" src={filter} className="filter" onClick={() => setFilterShow(!filterShow)} />
      <input value={phrase} onChange={(e) => checkOption('phrase', e.target.value)} />
      <img
        alt=""
        src={search}
        className="search"
        onClick={() => {
          searchNodes(map, findRegion, findFoodtype, topValue, phrase, showMarker, markers, setMarkers, bottomSet);
          setEvent('');
        }}
      />
      {query.pwa === true ? (
        <div className="install">
          <img
            alt=""
            src={home}
            onClick={() => {
              window.location.href = '/install';
            }}
          />
          <div className="desc">웹앱 설치완료</div>
        </div>
      ) : (
        <div className="install">
          <img
            alt=""
            src={home}
            onClick={() => {
              window.location.href = '/install';
            }}
          />
          <div className="desc">웹앱 추가</div>
        </div>
      )}
      <FilterBox
        filterShow={filterShow}
        checkOption={checkOption}
        setTopValue={setTopValue}
        infoEvent={infoEvent}
        findRegion={findRegion}
        findFoodtype={findFoodtype}
      />
    </SearchBar>
  );
};
