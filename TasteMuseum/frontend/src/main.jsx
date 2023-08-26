import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/Auth/LoginScreen.jsx';
import RegisterScreen from './screens/Auth/RegisterScreen.jsx';
import ProfilScreen from './screens/Auth/ProfileScreen';
import Hero from './components/Hero';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App /> }>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Private Route */}
      <Route path='' element={<PrivateRoute />} >
        <Route path='/profile' element={<ProfilScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>   
);
