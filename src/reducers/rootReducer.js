import { combineReducers } from 'redux';
import mainNavigationReducer from './MainNavigation/mainNavigationReducer';
import controlPanelContentReducer from './ControlPanelContent/controlPanelContentReducer';
import fileManagerReducer from './FileManager/fileManagerReducer';
import sessionReducer from './Session/sessionReducer';

export default combineReducers({
  mainNavigation: mainNavigationReducer,
  controlPanelContent: controlPanelContentReducer,
  fileManager: fileManagerReducer,
  session: sessionReducer,
});