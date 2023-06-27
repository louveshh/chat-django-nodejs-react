import { ViewContainer, PanelWrapper } from './view.styles';
import Panel from '../Panel/Panel.component';
import ToggleMode from '../ToggleMode/ToggleMode.component';
import Layout from '../Layout/Layout.component';
import { useView } from './view.hooks';

const View = () => {
  useView();
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

export default View;
