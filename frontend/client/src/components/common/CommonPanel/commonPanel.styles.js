import styled from 'styled-components';
import { configDisplay } from 'config/config';

export const CommonPanel = styled.div`
  display: flex;
  flex-flow: column;
  width: 20%;
  justify-content: start;
  flex-flow: column;
  align-self: start;
  min-height: ${configDisplay.DISPLAY_SIZE}px;
  margin: 0px 5px;
  padding: 0px 10px;
  border 1px solid ${(props) => props.theme.view.white};;
  border-radius: 5px;
`;
