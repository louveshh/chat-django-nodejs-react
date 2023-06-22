import styled from 'styled-components';
import CommonToggle from 'components/common/CommonToggle/CommonToggle.component';

export const ToggleContainer = styled.div`
  display: flex;
`;

export const ToggleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
}
`;
export const ToggleStyledWrapper = styled.div`
  min-width: 100px;
`;

export const ToggleStyled = styled(CommonToggle)``;
