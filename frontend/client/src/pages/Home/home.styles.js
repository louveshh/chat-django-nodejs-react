import styled from 'styled-components';
import { CommonPanel } from 'components/common/CommonPanel/commonPanel.styles';

export const DetailsContainer = styled.div`
  display: flex;
  min-height: 50%;
`;

export const DetailsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
export const StyledDetails = styled(CommonPanel)`
  padding: 10px 20px;
  min-width: 250px;
  min-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  gap: 10px;
`;

export const StyledTitle = styled.span`
  color: ${(props) => props.theme.view.white};
  font-size: 17px;
  font-weight: 800;
  align-text: center;
`;

export const StyledInfo = styled.span`
  color: ${(props) => props.theme.view.white};
  font-weight: 800;
  font-size: 12px;
`;

export const StyledInfoContent = styled.span`
  color: ${(props) => props.theme.view.white};
  font-weight: 500;
  font-size: 12px;
`;
