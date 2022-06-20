import "./styles/App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./routes/Index";
import ErrorPage from "./components/ErrorPage";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Waitings from "./routes/Waitings";
import React, { useEffect, useState } from "react";
import MikroBlog from "./routes/MikroBlog";
import Upload from "./routes/Upload";

function App() {
  let location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<any>([]);

  const getFullNameOfCrumb = (
    routes: Array<{ path: string; pageName: string; otherPages: any }>,
    url: string
  ): any => {
    return (
      routes.find((item) => item.path.indexOf(url) > -1)?.pageName ||
      (routes.find((item) => item.otherPages)
        ? getFullNameOfCrumb(
            [
              ...routes
                .map((item) => item.otherPages || [])
                .filter((item) => item.length > 0)
                .flat(),
            ],
            url
          )
        : url)
    );
  };

  const createBreadCrumb = (routes: any, location: any) => {
    const arr = location.pathname.split("/");
    const url = [];
    const splitted: any = Array.from(new Set(arr));
    for (let i = 0; i < splitted.length; i++) {
      if (i === splitted.length - 1) {
        if (splitted[i] === "") {
          url.push({
            name: "Strona Główna",
          });
        } else {
          url.push({
            name: getFullNameOfCrumb(routes, splitted[i]),
          });
        }
      } else {
        if (splitted[i] === "") {
          url.push({
            to: "/",
            name: "Strona Główna",
          });
        } else {
          url.push({
            to: splitted.slice(0, i + 1).join("/"),
            name: getFullNameOfCrumb(routes, splitted[i]),
          });
        }
      }
    }
    setBreadcrumbs(url);
  };

  const routes = [
    {
      pageName: "Strona Główna",
      path: "/",
      element: <Index />,
      otherPages: [
        {
          pageName: "Oczekujące",
          path: "/oczekujace",
          element: <Waitings />,
        },
        {
          pageName: "Mikroblog",
          path: "/mikroblog",
          element: <MikroBlog />,
          otherPages: [
            {
              pageName: "Mikroblog - Gorące",
              path: "/mikroblog/gorace",
              element: <MikroBlog />,
            },
          ],
        },
        {
          pageName: "Dodaj",
          path: "/upload",
          element: <Upload />,
        },
      ],
    },
    {
      pageName: "Błąd 404",
      path: "*",
      element: <ErrorPage />,
    },
  ];

  useEffect(() => {
    createBreadCrumb(routes, location);
    // eslint-disable-next-line
  }, [location]);

  const generatePageTree = (tab: Array<Object>) =>
    tab.map((route: any, index: number) => {
      return (
        <React.Fragment key={index}>
          <Route path={route.path} element={route.element} />
          {route.otherPages && generatePageTree(route.otherPages)}
        </React.Fragment>
      );
    });

  return (
    <div className="App">
      <Navigation />
      <main>
        <h5 className="breadcrumbs">
          {breadcrumbs.map(
            (breadcrumb: { to: string; name: string }, index: number) => (
              <React.Fragment key={index}>
                {breadcrumb?.to ? (
                  <Link to={breadcrumb.to}>{breadcrumb.name}</Link>
                ) : (
                  <span>{breadcrumb.name}</span>
                )}
                {breadcrumbs.length !== index + 1 && <span>{" > "}</span>}
              </React.Fragment>
            )
          )}
        </h5>
        <Routes>{generatePageTree(routes)}</Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
