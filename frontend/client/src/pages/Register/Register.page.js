/* eslint-disable camelcase */
import Layout from 'components/Layout/Layout';
import { useRegister } from './register.hooks';

const RegisterPage = () => {
  const {
    onSubmit,
    onChange,
    first_name,
    last_name,
    email,
    password,
    loading,
  } = useRegister();

  return (
    <Layout title="Auth Site | Register" content="Register page">
      <h1>Register for an Account</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            name="first_name"
            onChange={onChange}
            value={first_name}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            onChange={onChange}
            value={last_name}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={onChange}
            value={email}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={password}
            required
          />
        </div>
        {loading ? (
          <div role="status">
            <span>Loading...</span>
          </div>
        ) : (
          <button type="submit">Register</button>
        )}
      </form>
    </Layout>
  );
};

export default RegisterPage;
