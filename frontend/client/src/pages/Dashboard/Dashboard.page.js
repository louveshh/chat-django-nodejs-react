import Layout from 'components/Layout/Layout';
import { useDashboard } from './dashboard.hooks';

const DashboardPage = () => {
	const { user, loading } = useDashboard();

	return (
		<Layout title='Auth Site | Dashboard' content='Dashboard page'>
			{loading || user === null ? (
				<div>
					<span>Loading...</span>
				</div>
			) : (
				<>
					<h1>Dashboard</h1>
					<p>User Details</p>
					<ul>
						<li>First Name: {user?.first_name}</li>
						<li>Last Name: {user?.last_name}</li>
						<li>Email: {user?.email}</li>
					</ul>
				</>
			)}
		</Layout>
	);
};

export default DashboardPage;