/* eslint-disable camelcase */
import Layout from 'components/Layout/Layout.component';
import CommonSpinner from 'components/common/CommonSpinner/CommonSpinner.component';
import CommonInput from 'components/common/CommonInput/CommonInput.component';
import CommonButton from 'components/common/CommonButton/CommonButton.component';
import { useRegister } from './register.hooks';
import {
  DetailsContainer,
  DetailsWrapper,
  StyledDetails,
  StyledForm,
} from './register.styles';

const RegisterPage = () => {
  const {
    onSubmit,
    onChange,
    t,
    first_name,
    last_name,
    email,
    password,
    loading,
  } = useRegister();

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
                  type="text"
                  name="first_name"
                  label={t('registerPage.firstName')}
                  onChange={onChange}
                  value={first_name}
                  required
                />

                <CommonInput
                  type="text"
                  name="last_name"
                  label={t('registerPage.lastName')}
                  onChange={onChange}
                  value={last_name}
                  required
                />

                <CommonInput
                  type="email"
                  name="email"
                  label={t('registerPage.email')}
                  onChange={onChange}
                  value={email}
                  required
                />
                <CommonInput
                  type="password"
                  name="password"
                  label={t('registerPage.password')}
                  onChange={onChange}
                  value={password}
                  required
                  autoComplete="new-password"
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
export default RegisterPage;
