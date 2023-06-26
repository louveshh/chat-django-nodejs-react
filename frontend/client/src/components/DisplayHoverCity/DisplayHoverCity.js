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
      <StyledTitle>Last Hovered City:</StyledTitle>
      <StyledDisplayWrapper>
        <StyledDisplayUl>
          {newCityInfo &&
            [...newCityInfo].map(([key, value]) => (
              <StyledInformation key={key}>
                <StyledSubTitle>{key}</StyledSubTitle>
                <StyledDescription>{value}</StyledDescription>
              </StyledInformation>
            ))}
        </StyledDisplayUl>
      </StyledDisplayWrapper>
    </>
  );
};

export default DisplayHoverCity;
