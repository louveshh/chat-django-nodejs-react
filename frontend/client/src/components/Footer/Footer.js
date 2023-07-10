import { StyledFooter } from './footer.styles';
import { useFooter } from './footer.hooks';

const Footer = () => {
  const { t } = useFooter();
  return (
    <StyledFooter>{`${t('footer.author')}${t('footer.name')}`}</StyledFooter>
  );
};

export default Footer;
