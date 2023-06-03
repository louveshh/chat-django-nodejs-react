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
import Ocean from './../Ocean/Ocean';

const View = () => {
  const { activeMode } = useView();
  return (
    <Layout title="Auth Site | Dashboard" content="Dashboard page">
      <ViewContainer>
        <ToggleMode />
        <PanelWrapper>
          <Map />
          <Board />
        </PanelWrapper>
      </ViewContainer>
    </Layout>
  );
};

export default View;
