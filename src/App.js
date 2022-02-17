import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { mainRoutes } from './configs/routes.configs';
// import Home from './modules/main/pages/home/home.component';
import MainTemplate from './modules/main/templates/main.templates';
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

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {renderMainRoutes()}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
