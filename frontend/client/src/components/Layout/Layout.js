import { Helmet } from 'react-helmet';
import Navbar from '../Navbar/Navbar';

const Layout = ({ title, content, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Navbar />
    <div>{children}</div>
  </>
);

export default Layout;
