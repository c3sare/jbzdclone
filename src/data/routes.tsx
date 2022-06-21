import MikroBlog from "../routes/MikroBlog";
import Upload from "../routes/Upload";
import Index from "../routes/Index";
import ErrorPage from "../components/ErrorPage";
import Waitings from "../routes/Waitings";

export interface RoutesInterface {
    path: string,
    pageName: string,
    element: JSX.Element,
    otherPages: Array<{
      path: string,
      pageName: string,
      element: JSX.Element,
      otherPages: any
    }>
}

export const routes = [
    {
      pageName: "Strona Główna",
      path: "/",
      element: <Index />,
      otherPages: [
        {
          pageName: "Oczekujące",
          path: "/oczekujace",
          element: <Waitings />,
          otherPages: []
        },
        {
          pageName: "Mikroblog",
          path: "/mikroblog",
          element: <MikroBlog />,
          otherPages: [
            {
              pageName: "Gorące",
              path: "/mikroblog/gorace",
              element: <MikroBlog />,
              otherPages: []
            },
          ],
        },
        {
          pageName: "Dodaj",
          path: "/upload",
          element: <Upload />,
          otherPages: []
        },
      ],
    },
    {
      pageName: "Błąd 404",
      path: "*",
      element: <ErrorPage />,
      otherPages: []
    },
  ];