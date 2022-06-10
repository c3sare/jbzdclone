import './styles/App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Index from './routes/Index';
import ErrorPage from './components/ErrorPage';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Waitings from './routes/Waitings';
import React from 'react';

function App() {

  const generatePageTree = (tab: any) : any => {
    return tab.map((route:any, index: number) => {
      return (
        <React.Fragment key={index}>
          <Route path={route.path} element={route.element}/>
          {route.otherPages &&
            generatePageTree(route.otherPages)
          }
        </React.Fragment>
      )
    });
  }

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

  return (
    <Router>
      <div className="App">
        <Navigation/>
        <main>
          <Routes>
            {generatePageTree(routes)}
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
