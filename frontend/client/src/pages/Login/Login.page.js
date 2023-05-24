
import Layout from 'components/base/Layout/Layout';
import { useLogin } from './login.hooks';

const LoginPage = () => {
	const { onSubmit, onChange, email, password, loading } = useLogin();
	return (
		<Layout title='Auth Site | Login' content='Login page'>
			{process.env.REACT_APP_API_KEY}
			<h1>Log into your Account</h1>
			<form onSubmit={onSubmit}>
				<div >
					<label htmlFor='email'>
						Email
					</label>
					<input
						type='email'
						name='email'
						onChange={onChange}
						value={email}
						required
					/>
				</div>
				<div>
					<label htmlFor='password'>
						Password
					</label>
					<input
						type='password'
						name='password'
						onChange={onChange}
						value={password}
						required
					/>
				</div>
				{loading ? (
					<div>
						<span>Loading...</span>
					</div>
				) : (
					<button>Login</button>
				)}
			</form>
		</Layout>
	);
};

export default LoginPage;