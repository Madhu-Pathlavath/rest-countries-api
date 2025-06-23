import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from 'react-dom/client'
import App from "./App"
import CountryDetail from './components/CountryDetail'
import Home from "./components/Home"
import Error from './components/Error'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":countryName",
        element: <CountryDetail />,
      },
    ]
  },
  {
    path: "/error/:countryName",
    element: <Error />,
  },
  {
    path: "*",
    element: <Error />,
  }
])

const root = createRoot(document.getElementById("root"))
root.render(<RouterProvider router={router} />)
