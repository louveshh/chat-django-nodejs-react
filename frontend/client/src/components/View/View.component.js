import 'react-toggle/style.css';
import Board from '../Board/Baord';
import { useView } from './view.hooks';
import { configView } from '../../config/config';
import { ViewContainer, PanelWrapper } from './view.styles';
import Map from '../Map/Map';
import ToggleMode from '../ToggleMode/ToggleMode.component';
import ToggleTheme from '../ToggleTheme/ToggleTheme.component';
import ToggleLanguage from '../ToggleLanguage/ToggleLanguage.component';
import Layout from '../Layout/Layout';

const View = () => {
  const { activeMode } = useView();
  return (
    <Layout title="Auth Site | Dashboard" content="Dashboard page">
      <ViewContainer>
        <ToggleLanguage />
        <ToggleTheme />
        <ToggleMode />
        <PanelWrapper>
          {configView.mapModes.includes(activeMode) && <Map />}
          {configView.boardModes.includes(activeMode) && <Board />}
        </PanelWrapper>
      </ViewContainer>
    </Layout>
  );
};

export default View;