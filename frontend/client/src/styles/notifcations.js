import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

export const StyledToastContainer = styled(ToastContainer)`
  &&&.Toastify__toast-container {
    @media (max-width: 650px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .Toastify__toast {
    background-color: #f2f2f2;
    color: #333;
    border-radius: 4px;
    @media (max-width: 650px) {
      max-width: 250px;
      padding: 0px;
      font-size: 10px;
      align-self: center;
      margin: 10px 0px 2px 0px;
    }
  }
  .Toastify__toast--warning {
    background-color: ${(props) => props.theme.view.secondary};
    border: 1px solid ${(props) => props.theme.view.black};
    color: ${(props) => props.theme.view.white};
  }
`;
