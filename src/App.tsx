import './styles/App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Index from './routes/Index';
import ErrorPage from './components/ErrorPage';
import { Route, Routes, useLocation } from 'react-router-dom';
import Waitings from './routes/Waitings';
import React, { useEffect, useState } from 'react';

function App() {
  let location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<String | null>(null);

  const routes = [
    {
      pageName: "Strona Główna",
      path: "/",
      element: <Index/>,
      otherPages: [
        {
          pageName: "Oczekujące",
          path: "/oczekujace",
          element: <Waitings/>
        }
      ]
    },
    {
      pageName: "Błąd 404",
      path: "*",
      element: <ErrorPage/>
    }
  ]

  useEffect(() => {
    const localization = String(
      routes.find((item:any) => item.path === location.pathname)?.pageName ||
      routes[0].pageName+" -> "+routes[0].otherPages?.find((item: any) => item.path === location.pathname)?.pageName
      );
    setBreadcrumbs(localization)
  }, [location])

  const generatePageTree = (tab: any) : any => {
    return tab.map((route:any, index: number) => {
      return (
        <React.Fragment key={index}>
          <Route path={route.path} element={route.element} />
          {route.otherPages &&
            generatePageTree(route.otherPages)
          }
        </React.Fragment>
      )
    });
  }

  return (
      <div className="App">
        <Navigation/>
        <main>
          <h5>{breadcrumbs}</h5>
          <Routes>
            {generatePageTree(routes)}
          </Routes>
        </main>
        <Footer/>
      </div>
  );
}

export default App;
