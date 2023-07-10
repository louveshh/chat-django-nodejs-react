import Layout from 'components/Layout/Layout.component';
import { useUnknown } from './unknown.hooks';
import {
  DetailsContainer,
  DetailsWrapper,
  StyledDetails,
  StyledTitle,
  StyledSubTitle,
} from './unknown.styles';

const UnknownPage = () => {
  const { counting, t } = useUnknown();
  return (
    <Layout title="Auth Site | Dashboard" content="Dashboard page">
      <DetailsContainer>
        <DetailsWrapper>
          <StyledDetails>
            <StyledTitle>{t('unknownPage.title')}</StyledTitle>
            <StyledSubTitle>{`${t(
              'unknownPage.redirect'
            )} ${counting}`}</StyledSubTitle>
          </StyledDetails>
        </DetailsWrapper>
      </DetailsContainer>
    </Layout>
  );
};

export default UnknownPage;
