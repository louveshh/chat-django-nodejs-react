import Panel from 'components/Panel/Panel.component';
import ToggleMode from 'components/ToggleMode/ToggleMode.component';
import Layout from 'components/Layout/Layout.component';
import { useModes } from './modes.hooks';
import { ViewContainer, PanelWrapper } from './modes.styles';

const ModesPage = () => {
  useModes();
  return (
    <Layout title="Auth Site | Dashboard" content="Dashboard page">
      <ViewContainer>
        <ToggleMode />
        <PanelWrapper>
          <Panel />
        </PanelWrapper>
      </ViewContainer>
    </Layout>
  );
};

export default ModesPage;
