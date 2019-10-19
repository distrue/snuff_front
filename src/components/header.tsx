import logoColor from '../images/logo_white.png';
import assignment from '../images/assignment.png';
import user from '../images/user.png';

import React from 'react';
import styled from 'styled-components';

export default () => {
  return (
    <MainStyled>
      <img
        src={assignment}
        style={{ width: '24px', height: '24px', position: 'absolute', top: '14px', left: '5%' }}
      />
      <img
        src={logoColor}
        style={{
          objectFit: 'contain',
          width: '44px',
          height: '44px',
          position: 'absolute',
          top: '4px',
          left: '50%',
          transform: 'translate(-50%, 0%)',
        }}
      />
      <img
        src={user}
        style={{ width: '24px', height: '24px', position: 'absolute', top: '14px', right: '5%' }}
      />
    </MainStyled>
  );
};

const MainStyled = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 52px;
  box-shadow: 0pt 1pt 2pt 0pt rgba(0, 0, 0, 0.16);
`;
