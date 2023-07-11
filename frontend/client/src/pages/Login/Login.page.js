import Layout from 'components/Layout/Layout.component';
import CommonSpinner from 'components/common/CommonSpinner/CommonSpinner.component';
import CommonInput from 'components/common/CommonInput/CommonInput.component';
import CommonButton from 'components/common/CommonButton/CommonButton.component';
import { useLogin } from './login.hooks';
import {
  DetailsContainer,
  DetailsWrapper,
  StyledDetails,
  StyledForm,
} from './login.styles';

const LoginPage = () => {
  const { onSubmit, onChange, t, email, password, loading } = useLogin();
  return (
    <Layout title="Auth Site | Login" content="Login page">
      {loading ? (
        <CommonSpinner />
      ) : (
        <DetailsContainer>
          <DetailsWrapper>
            <StyledDetails>
              <StyledForm onSubmit={onSubmit}>
                <CommonInput
                  label={t('loginPage.login')}
                  type="email"
                  name="email"
                  onChange={onChange}
                  value={email}
                  aria="Input Email"
                  required
                />
                <CommonInput
                  label={t('loginPage.password')}
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={password}
                  aria="Input password"
                  autoComplete="current-password"
                  required
                />
                <CommonButton aria="Login Button" type="submit">
                  {t('loginPage.login')}
                </CommonButton>
              </StyledForm>
            </StyledDetails>
          </DetailsWrapper>
        </DetailsContainer>
      )}
    </Layout>
  );
};

export default LoginPage;
