import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

export const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    background-color: #f2f2f2;
    color: #333;
    border-radius: 4px;
  }
  .Toastify__toast--warning {
    background-color: ${(props) => props.theme.view.secondary};
    border: 1px solid ${(props) => props.theme.view.black};
    color: ${(props) => props.theme.view.white};
  }
`;
