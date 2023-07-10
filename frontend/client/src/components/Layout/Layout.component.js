import { Helmet } from 'react-helmet';

import Navbar from 'components//Navbar/Navbar.component';
import Ocean from 'components//Ocean/Ocean';
import Footer from 'components/Footer/Footer';
import { StyledLayout } from './layout.styles';

const Layout = ({ title, content, children }) => (
  <>
    <StyledLayout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Helmet>
      <Navbar />
      {children}
      <Ocean />
    </StyledLayout>
    <Footer />
  </>
);

export default Layout;
