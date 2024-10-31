import React from "react";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import RootLayout from "./layouts/RootLayout";
import { useSelector } from "react-redux";
import Register from "./pages/Register";
import MyProfile from "./components/MyProfile";
import Login from "./pages/Login";
import AddArticle from "./components/AddArticle";
import About from "./pages/About";
import UserProfile from "./components/UserProfile";
import ArticleDetail from "./components/ArticleDetail";
const App = () => {
  const admin = useSelector((state)=>state.app.admin);
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes admin={admin}>
          <RootLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home/>,
        },
        {
          path:'/about',
          element:<About/>
        },
        {
          path:"/article/:id",
          element:<ArticleDetail/>
        },
        {
          path:'/profile',
          element: admin? <MyProfile/>:<Navigate to='/'/>
        },
        {
          path:'/userProfile',
          element: admin? <UserProfile/>:<Navigate to='/'/>
        },
        {
          path:'/write',
          element: admin?<AddArticle/>: <Navigate t='/'/>
        },
      ],
    },
    {
      path: "/register",
      element: admin? <Navigate to='/'/> : <Register />,
    },
    {
      path: "/login",
      element: admin? <Navigate to='/'/> : <Login />,
    },
   
  ]);
  return <RouterProvider router={routes} />;
};

export default App;
