import CommonLeftArrow from 'components/common/CommonLeftArrow/CommonLeftArrow.component';
import CommonRightArrow from 'components/common/CommonRightArrow/CommonRightArrow.component';
import { usePaginationCities } from './paginationBiomes.hooks';
import {
  StyledWrapper,
  StyledTitle,
  StyledInformation,
  StyledButton,
  StyledPaginationWrapper,
  StyledPageInfo,
} from './paginationBiomes.styles';

const PaginationCities = () => {
  const { allBiomes, newPage, newTotal, t, handlePageUp, handlePageDown } =
    usePaginationCities();
  return (
    <>
      <StyledTitle>{t('panelAdd.biome')}</StyledTitle>
      <StyledWrapper>
        {allBiomes?.map((biome) => (
          <StyledInformation key={biome} color={biome.rgb}>
            {biome.name === '-' ? '-' : t(`biome.${biome.name}`)}
          </StyledInformation>
        ))}
        <StyledPaginationWrapper>
          <StyledButton onClick={handlePageDown}>
            <CommonLeftArrow />
          </StyledButton>
          <StyledPageInfo>
            {`${t('panelAdd.page')} ${newPage} / ${newTotal}`}
          </StyledPageInfo>
          <StyledButton onClick={handlePageUp}>
            <CommonRightArrow />
          </StyledButton>
        </StyledPaginationWrapper>
      </StyledWrapper>
    </>
  );
};

export default PaginationCities;
