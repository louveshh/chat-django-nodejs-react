import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import { configDisplay } from 'config/config';

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: #f2f2f2;
    color: #333;
    border-radius: 4px;
    @media (max-width: 650px) {
      transform: scale(${configDisplay.SCALE});
      width: unset;
      min-width: 70px;
    }
  }
  .Toastify__toast--warning {
    background-color: ${(props) => props.theme.view.secondary};
    border: 1px solid ${(props) => props.theme.view.black};
    color: ${(props) => props.theme.view.white};
  }
`;
