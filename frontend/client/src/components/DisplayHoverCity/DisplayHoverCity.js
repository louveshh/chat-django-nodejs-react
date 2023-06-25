import { useDisplayHoverCity } from './displayHoverCity.hooks';
import {
  StyledDisplayUl,
  StyledInformation,
  StyledTitle,
  StyledSubTitle,
  StyledDescription,
  StyledDisplayWrapper,
} from './displayHover.styles';

const DisplayHoverCity = () => {
  const { newCityInfo } = useDisplayHoverCity();
  return (
    <>
      <StyledSubTitle>Last Hovered City:</StyledSubTitle>
      <StyledDisplayWrapper>
        <StyledDisplayUl>
          {newCityInfo &&
            [...newCityInfo].map(([key, value]) => (
              <StyledInformation>
                <StyledTitle>{key}</StyledTitle>
                <StyledDescription>{value}</StyledDescription>
              </StyledInformation>
            ))}
        </StyledDisplayUl>
      </StyledDisplayWrapper>
    </>
  );
};

export default DisplayHoverCity;
