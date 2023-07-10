import { Helmet } from 'react-helmet';

import Navbar from 'components//Navbar/Navbar.component';
import Ocean from 'components//Ocean/Ocean';
import Footer from 'components/Footer/Footer';

const Layout = ({ title, content, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Navbar />
    {children}
    <Ocean />
    <Footer />
  </>
);

export default Layout;
