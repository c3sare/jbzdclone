import './styles/App.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Index from './routes/Index';
import ErrorPage from './components/ErrorPage';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Waitings from './routes/Waitings';
import React, { useEffect, useState } from 'react';
import MikroBlog from './routes/MikroBlog';
import Upload from './routes/Upload';

function App() {
  let location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<any>(null);

  const getFullNameOfCrumb = (routes:Array<{path: string, pageName: string, otherPages: any}>, url:string):any => {
    return routes.find(item => item.path.indexOf(url) > -1)?.pageName ||
    (routes.find(item => item.otherPages) ? getFullNameOfCrumb([...routes.map(item => item.otherPages || []).filter(item => item.length > 0).flat()], url) : url);
  }

  const createBreadCrumb = (routes: any, location: any) => {
    const arr = location.pathname.split("/");
    const url = [];
    const splitted:any = Array.from(new Set(arr));
    for(let i=0;i<splitted.length;i++) {
      if(i===splitted.length-1) {
        if(splitted[i] === "") {
          url.push(<span>Strona Główna</span>);
        } else {
          url.push(<span>{" > "}</span>)
          url.push(<span>{getFullNameOfCrumb(routes, splitted[i])}</span>);
        }
      } else {
        if(splitted[i] === "") {
          url.push(<Link to={splitted.slice(0, i+1).join("/")}>Strona Główna</Link>);
        } else {
          url.push(<span>{" > "}</span>)
          url.push(<Link to={splitted.slice(0, i+1).join("/")}>{getFullNameOfCrumb(routes, splitted[i])}</Link>)
        }
      }
    }
    return url;
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
        },
        {
          pageName: "Mikroblog",
          path: "/mikroblog/gorace",
          element: <MikroBlog/>
        },
        {
          pageName: "Dodaj",
          path: "/upload",
          element: <Upload/>
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
    // const localization = String(
    //   routes.find((item:any) => item.path === location.pathname)?.pageName ||
    //   routes[0].pageName+" - "+routes[0].otherPages?.find((item: any) => item.path === location.pathname)?.pageName
    //   );
    setBreadcrumbs(createBreadCrumb(routes, location));
    // eslint-disable-next-line
  }, [location])

  const generatePageTree = (tab: Array<Object>) => 
    tab.map((route:any, index: number) => {
      return (
        <React.Fragment key={index}>
          <Route path={route.path} element={route.element} />
          {route.otherPages &&
            generatePageTree(route.otherPages)
          }
        </React.Fragment>
      )
  });

  return (
      <div className="App">
        <Navigation/>
        <main>
          <h5 className="breadcrumbs">{breadcrumbs}</h5>
          <Routes>
            {generatePageTree(routes)}
          </Routes>
        </main>
        <Footer/>
      </div>
  );
}

export default App;
