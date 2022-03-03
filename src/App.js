import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { mainRoutes } from './configs/routes.configs';
import MainTemplate from './modules/main/templates/main.templates';
import './App.css';
import User from './modules/main/pages/user/user.component';
import GuardUser from './guard/guard.user';

function App() {
  const renderMainRoutes = () =>
    mainRoutes.map((route, index) => {
      const { path, Element } = route;
      return (
        <Route
          key={index}
          path={path}
          element={<MainTemplate children={<Element />} />}
        />
      );
    });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {renderMainRoutes()}
          <Route
            path='/user'
            element={
              <GuardUser
                children={
                  <MainTemplate>
                    <User />
                  </MainTemplate>
                }
              />
            }
          />

          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
