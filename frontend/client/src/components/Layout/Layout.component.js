import { Helmet } from 'react-helmet';

import Navbar from 'components//Navbar/Navbar.component';
import Ocean from 'components//Ocean/Ocean';

const Layout = ({ title, content, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Navbar />
    {children}
    <Ocean />
  </>
);

export default Layout;
