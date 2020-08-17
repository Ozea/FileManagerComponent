import { combineReducers } from 'redux';
import mainNavigationReducer from './MainNavigation/mainNavigationReducer';
import controlPanelContentReducer from './ControlPanelContent/controlPanelContentReducer';

export default combineReducers({
  mainNavigation: mainNavigationReducer,
  controlPanelContent: controlPanelContentReducer
});