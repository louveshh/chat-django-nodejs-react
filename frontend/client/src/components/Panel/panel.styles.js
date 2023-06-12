import styled from 'styled-components';

export const PanelWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1100px) {
    justify-content: center;
    flex-direction: column;
  }
`;

export const LeftPanel = styled.div`
  min-width: 210px;
  width: 20%;
  @media (max-width: 1100px) {
    order: 2;
  }
`;
export const MainPanel = styled.div``;

export const RightPanel = styled.div`
  display: flex;
  padding-right: 1rem;
  flex-flow: column;
  min-width: 210px;
  width: 20%;
  align-self: stretch;
  justify-content: start;

  @media (max-width: 1100px) {
    align-self: center;
    order: 3;
    align-items: center;
    width: 50%;
    min-height: 400px;
    padding-right: 0;
    flex-grow: 1;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;
