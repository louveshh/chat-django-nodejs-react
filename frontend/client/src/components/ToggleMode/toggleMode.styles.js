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
  ${(props) => {
    if (props.checked) {
      return `
        cursor: not-allowed !important;
    `;
    }
    return `
    cursor: pointer;
  `;
  }}
`;

export const ToggleStyled = styled(CommonToggle)``;
