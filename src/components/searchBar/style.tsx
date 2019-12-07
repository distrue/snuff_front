import styled from 'styled-components';

// @ts-ignore
export default styled.div.attrs((props: any) => {})`
  position: absolute;
  top: 20px;
  left: 10px;
  width: ${(props) => props.width - 70}px;
  height: 36px;
  opacity: 0.8;
  border-radius: 4px;
  background-color: #ffffff;
  z-index: 1;
  input {
    border: 0px solid black;
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translate(0%, -50%);
    height: 24px;
    font-size: 20px;
    width: ${(props) => props.width - 180}px;
  }
  .filter {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translate(0%, -50%);
    width: 30px;
  }
  .search {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0%, -50%);
    width: 30px;
    z-index: 3;
  }
  .install {
    position: absolute;
    left: calc(100% + 10px);
    top: 50%;
    transform: translate(0%, -50%);
    width: 40px;
    height: 40px;
    z-index: 2;
    border-radius: 50%;
    background-color: white;
    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
    }
    .desc {
      position: absolute;
      top: calc(100% + 5px);
      left: 50%;
      transform: translate(-50%, 0%);
      color: #000000;
      font-size: 12px;
      width: 48px;
      word-wrap: nowrap;
      word-break: keep-all;
      background-color: white;
    }
  }
  .filterBox {
    position: absolute;
    top: 120%;
    left: 10px;
    width: 220px;
    height: 260px;
    background-color: white;
    overflow-x: scroll;
    padding: 10px;
    display: flex;
    flex-direction: column;
    .row {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 200px;
      height: auto;
      position: relative;
      .item {
        position: relative;
        display: block;
        height: 20px;
        display: block;
        input {
          position: absolute;
          top: 5px;
          left: 0;
          width: 20px;
        }
        label {
          position: absolute;
          top: 0;
          left: 24px;
          font-size: 16px;
        }
      }
    }
    .rc-slider {
      z-index: 1;
      .rc-slider-handle {
        height: 10px;
      }
    }
    .rc-slider-mark-text {
      width: 40px;
      height: 80px;
      word-break: normal;
    }
  }
`;
