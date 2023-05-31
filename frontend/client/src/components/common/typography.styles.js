import styled from "styled-components";

export const SectionTitle = styled.h2`
  letter-spacing: 0rem;
  margin: 0;
  font: 700 normal 1.25rem/2rem ${({ theme }) => theme.font.gotham};
  text-align: left;
  color: ${({ theme }) => theme.color.black};
`;