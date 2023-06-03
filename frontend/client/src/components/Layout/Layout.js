import { Helmet } from 'react-helmet';
import Navbar from '../Navbar/Navbar';
import Ocean from './../Ocean/Ocean';

const Layout = ({ title, content, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Navbar />
    <Ocean>{children}</Ocean>
  </>
);

export default Layout;
