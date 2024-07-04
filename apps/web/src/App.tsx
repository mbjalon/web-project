import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import ItemPage from "@/pages/ItemPage.tsx";

const LogPurchase = lazy(() => import("./pages/LogPurchase.tsx"));
const SearchGoods = lazy(() => import("./pages/SearchGoods.tsx"));
const SearchShelves = lazy(() => import("./pages/SearchShelves.tsx"));
const Admin = lazy(() => import("./pages/Admin.tsx"));
const Global = lazy(() => import("./pages/Global.tsx"));
const Login = lazy(() => import("./components/account/Login.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    Component: Global,
    children: [
      {
        path: "",
        element: <Navigate to="/login" replace />,
      },
      {
        path: "/log-purchase",
        Component: LogPurchase,
      },
      {
        path: "/search-goods",
        Component: SearchGoods,
      },
      {
        path: "/search-shelves",
        Component: SearchShelves,
      },
      {
        path: "/admin",
        Component: Admin,
      },
    ],
  },
  {
    path: "/item",
    Component: ItemPage,
  },
  {
    path: "/login",
    Component: Login,
  },
]);

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
