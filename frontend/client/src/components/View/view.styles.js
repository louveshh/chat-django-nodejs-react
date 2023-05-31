import styled from "styled-components";

export const ViewContainer = styled.main`
  display: inline-block;
  maxx-width: 100%;
  postion: relative;
`;

export const PanelWrapper = styled.div`
  margin-top: 2rem;
  position: absolute;
  background-color: ${props => props.theme.primaryColor};
`;
