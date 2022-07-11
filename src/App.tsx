import "./styles/App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { Link, Route, Routes, useLocation, Location } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { routes, RoutesInterface } from "./data/routes";

interface BreadCrumbsInterface {
  to: string | null;
  name: string;
}

function App() {
  let location = useLocation();
  const pageName = "Jbzd.com.pl";
  const [breadcrumbs, setBreadcrumbs] = useState<BreadCrumbsInterface[]>([]);

  const getFullNameOfCrumb = (routes: RoutesInterface[], url: string): any => {
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
        : "404")
    );
  };

  const createBreadCrumb = (routes: RoutesInterface[], location: Location) => {
    const arr = location.pathname.split("/");
    const url = [];
    const splitted: string[] = Array.from(new Set(arr));
    for (let i = 0; i < splitted.length; i++) {
      if (i === splitted.length - 1) {
        if (splitted[i] === "") {
          url.push({
            to: null,
            name: "Strona Główna",
          });
        } else {
          url.push({
            to: null,
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
    document.title = pageName + " - " + url[url.length - 1].name;
    setBreadcrumbs(url);
  };

  useEffect(() => {
    createBreadCrumb(routes, location);
    // eslint-disable-next-line
  }, [location]);

  const generatePageTree = (tab: RoutesInterface[]) =>
    tab.map((route: RoutesInterface, index: number) => {
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
            (breadcrumb: BreadCrumbsInterface, index: number) => (
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
