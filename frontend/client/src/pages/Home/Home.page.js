import Layout from 'components/Layout/Layout.component';
import { useHome } from './home.hooks';
import {
  DetailsContainer,
  DetailsWrapper,
  StyledDetails,
  StyledTitle,
  StyledInfo,
  StyledInfoContent,
} from './home.styles';

const HomePage = () => {
  const { user, t } = useHome();
  return (
    <Layout title="Auth Site | Dashboard" content="Dashboard page">
      {user !== null && (
        <DetailsContainer>
          <DetailsWrapper>
            <StyledDetails>
              <StyledTitle>{t('homePage.title')}</StyledTitle>
              <StyledInfo>
                {t('homePage.firstName')}
                <StyledInfoContent>{user?.first_name}</StyledInfoContent>
              </StyledInfo>
              <StyledInfo>
                {t('homePage.lastName')}
                <StyledInfoContent>{user?.last_name}</StyledInfoContent>
              </StyledInfo>
              <StyledInfo>
                {t('homePage.email')}
                <StyledInfoContent>{user?.email}</StyledInfoContent>
              </StyledInfo>
            </StyledDetails>
          </DetailsWrapper>
        </DetailsContainer>
      )}
    </Layout>
  );
};

export default HomePage;
