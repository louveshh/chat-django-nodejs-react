import CommonLeftArrow from 'components/common/CommonLeftArrow/CommonLeftArrow.component';
import CommonRightArrow from 'components/common/CommonRightArrow/CommonRightArrow.component';
import { usePaginationCities } from './paginationCities.hooks';
import {
  StyledWrapper,
  StyledTitle,
  StyledInformation,
  StyledButton,
  StyledPaginationWrapper,
  StyledPageInfo,
} from './paginationCities.styles';

const PaginationCities = () => {
  const { newBiomes, newPage, newTotal, handlePageUp, handlePageDown } =
    usePaginationCities();
  return (
    <>
      <StyledTitle>Biomes Backend Pagination:</StyledTitle>
      <StyledWrapper>
        <StyledInformation>
          {newBiomes?.length > 0 ? newBiomes[0] : '-'}
        </StyledInformation>
        <StyledInformation>
          {newBiomes?.length > 1 ? newBiomes[1] : '-'}
        </StyledInformation>
        <StyledPaginationWrapper>
          <StyledButton onClick={handlePageDown}>
            <CommonLeftArrow />
          </StyledButton>
          <StyledPageInfo>{`Page: ${newPage} / ${newTotal}`}</StyledPageInfo>
          <StyledButton onClick={handlePageUp}>
            <CommonRightArrow />
          </StyledButton>
        </StyledPaginationWrapper>
      </StyledWrapper>
    </>
  );
};

export default PaginationCities;
