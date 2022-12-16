import MikroBlog from "../routes/MikroBlog";
import Upload from "../routes/Upload";
import Index from "../routes/Index";
import Obr from "../routes/obr/Index";
import ErrorPage from "../components/ErrorPage";
import Waitings from "../routes/Waitings";

export interface RoutesInterface {
  path: string;
  pageName: string;
  element: JSX.Element;
  otherPages: RoutesInterface[];
}

export const routes: RoutesInterface[] = [
  {
    pageName: "Strona Główna",
    path: "/",
    element: <Index />,
    otherPages: [
      {
        pageName: "Oczekujące",
        path: "/oczekujace",
        element: <Waitings />,
        otherPages: [],
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
            otherPages: [],
          },
        ],
      },
      {
        pageName: "Dodaj",
        path: "/upload",
        element: <Upload />,
        otherPages: [],
      },
      {
        pageName: "",
        path: "/obr/:id/:title",
        element: <Obr/>,
        otherPages: []
      }
    ],
  },
  {
    pageName: "Błąd 404",
    path: "*",
    element: <ErrorPage />,
    otherPages: [],
  },
];
