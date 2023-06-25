import { usePaginationCities } from './paginationCities.hooks';
import {
  StyledWrapper,
  StyledTitle,
  StyledDisplayUl,
  StyledInformation,
} from './paginationCities.styles';

const PaginationCities = () => {
  const {} = usePaginationCities();
  return (
    <>
      <StyledTitle>xd</StyledTitle>
      <StyledWrapper>
        <StyledDisplayUl>
          <StyledInformation>1</StyledInformation>
          <StyledInformation>2</StyledInformation>
        </StyledDisplayUl>
      </StyledWrapper>
    </>
  );
};

export default PaginationCities;
