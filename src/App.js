import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { mainRoutes, mainUserRoutes } from './configs/routes.configs';
import MainTemplate from './modules/main/templates/main.templates';
import GuardUser from './guard/guard.user';
import './App.css';

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

  const renderMainUserRoutes = () =>
    mainUserRoutes.map((route, index) => {
      const { path, Element } = route;
      return (
        <Route
          key={index}
          path={path}
          element={
            <GuardUser
              children={
                <MainTemplate>
                  <Element />
                </MainTemplate>
              }
            />
          }
        />
      );
    });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {renderMainRoutes()}
          {renderMainUserRoutes()}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
