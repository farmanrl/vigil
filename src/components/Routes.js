import { isAuthenticated } from '../redux/auth';
import App from './App';
import SignIn from './SignIn';
import MapContainer from './MapContainer';
import Home from './Home';

export const paths = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  MAP: '/heatmap',
  HOME: '/home',
};


const requireAuth = (getState) => {
  return (nextState, replace) => {
    if (!isAuthenticated(getState())) {
      replace(paths.SIGN_IN);
    }
  };
};

const requireUnauth = (getState) => {
  return (nextState, replace) => {
    if (isAuthenticated(getState())) {
      replace(paths.MAP);
    }
  };
};


export const getRoutes = (getState) => {
  return {
    path: paths.ROOT,
    component: App,
    indexRoute: { onEnter: (nextState, replace) => replace('/sign-in') },
    childRoutes: [
      {
        path: paths.MAP,
        component: MapContainer,
        onEnter: requireAuth(getState)
      },
      {
        path: paths.HOME,
        component: Home,
        onEnter: requireAuth(getState)
      },
      {
        path: paths.SIGN_IN,
        component: SignIn,
        onEnter: requireUnauth(getState)
      },
    ]
  };
};
