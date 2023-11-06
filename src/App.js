import React, { useState, useEffect } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navigation from './components/Navbar';
import { UserProvider, useUser } from './contexts/userContext';
import { loginWithToken } from './pages/services/authService';
import './styles.css';

import Beers from './pages/beers/Beers';
import AddBeer from './pages/beers/AddBeer';
import UpdateBeer from './pages/beers/UpdateBeer';
import Breweries from './pages/breweries/Breweries';
import AddBreweries from './pages/breweries/AddBreweries';
import UpdateBrewery from './pages/breweries/UpdateBreweries';
import Suppliers from './pages/suppliers/Suppliers';
import AddSuppliers from './pages/suppliers/AddSuppliers';
import UpdateSupplier from './pages/suppliers/UpdateSupplier';
import Categories from './pages/categories/Categories';
import AddCategories from './pages/categories/AddCategories';
import UpdateCategory from './pages/categories/UpdateCategories';
import KegSize from './pages/kegsizes/KegSize';
import AddKegSize from './pages/kegsizes/AddKegSize';
import UpdateKegsize from './pages/kegsizes/UpdateKegsize';
import Users from './pages/users/Users';
import AddUsers from './pages/users/AddUsers';
import UpdateUser from './pages/users/UpdateUser';
import TapList from './pages/taplist/TapList'
import UntappedList from './pages/taplist/UntappedList';
import Deliveries from './pages/taplist/Deliveries';
import Login from './pages/users/Login';

//import Router from './components/Routers'

const Layout = () => {
  return(
    <>
    <Navigation />
    <Outlet />
    </>
  )
}

// Protect the application and give access on login
// function ProtectedRoute() {
//   const { user } = useUser();

//   if (user.isAuthenticated) {
//     return (
//       <>
//         {/* <Navigation />
//         <Outlet /> */}
//         <Layout />
//       </>
//     );
//   }

//   return <Navigate to="/" />;
// }

// const ConditionalRoute = () => {
//   const { user } = useUser();

//   if (user.isAuthenticated) {
//     // User is authenticated, redirect to the authenticated page
//     return <Navigate to="/beers" />;
//   } else {
//     // User is not authenticated, redirect to the login page
//     return (
//       <>
//        <Navigate to='/' />;
//        </>
//     )
//   }
// }


const router = createBrowserRouter([

  // Public Route for login page
  {
    path: "/",
    element: <>
      {/* <ConditionalRoute /> */}
      {/* <Login /> */}
      <Layout /> 
      <Beers /> 
    </>,
  },

  // For beer display, add and update
  {
    path: "/beers",
    element: (
      <>
      {/* <ProtectedRoute /> */}
        <Layout />
        {/* <Outlet />  */}
      </>
    ),
    children: [
      {
        index: true, // The root path for the "Beers" route
        element: <Beers />, // Display the Beers component when accessing "/beers"
      },
      {
        path: "add",
        element: <AddBeer />,
      },
      {
        path: "update/:id",
        element: <UpdateBeer />,
      },
    ],
  },
  // Define other sections and routes similarly

  // For breweries display, add and update
  {
    path: "/breweries",
    element: (
      <>
      {/* <ProtectedRoute /> */}
        <Layout />
        {/* <Outlet /> */}
      </>
    ),
    children: [
      {
        index: true, // The root path for the "Beers" route
        element: <Breweries />, // Display the Beers component when accessing "/beers"
      },
      {
        path: "add",
        element: <AddBreweries />,
      },
      {
        path: "update/:id",
        element: <UpdateBrewery />,
      },
    ],
  },

  // For categories display, add and update
  {
    path: "/categories",
    element: (
      <>
      {/* <ProtectedRoute /> */}
        <Layout />
        {/* <Outlet />  */}
      </>
    ),
    children: [
      {
        index: true, // The root path for the "Beers" route
        element: <Categories />, // Display the Beers component when accessing "/beers"
      },
      {
        path: "add",
        element: <AddCategories />,
      },
      {
        path: "update/:id",
        element: <UpdateCategory />,
      },
    ],
  },

  // For kegsizes display, add and update
  {
    path: "/kegsizes",
    element: (
      <>
      {/* <ProtectedRoute /> */}
        <Layout />
        {/* <Outlet />  */}
      </>
    ),
    children: [
      {
        index: true, // The root path for the "Beers" route
        element: <KegSize />, // Display the Kegsize component when accessing "/kegsizes"
      },
      {
        path: "add",
        element: <AddKegSize />,
      },
      {
        path: "update/:id",
        element: <UpdateKegsize />,
      },
    ],
  },

  // For Suppliers display, add and update
  {
    path: "/suppliers",
    element: (
      <>
      {/* <ProtectedRoute /> */}
        <Layout />
        {/* <Outlet />  */}
      </>
    ),
    children: [
      {
        index: true, // The root path for the "Beers" route
        element: <Suppliers />, // Display the Kegsize component when accessing "/kegsizes"
      },
      {
        path: "add",
        element: <AddSuppliers />,
      },
      {
        path: "update/:id",
        element: <UpdateSupplier />,
      },
    ],
  },

  // For Users display, add and update
  {
    path: "/users",
    element: (
      <>
      {/* <ProtectedRoute /> */}
        <Layout />
        {/* <Outlet /> */}
      </>
    ),
    children: [
      {
        index: true, 
        element: <Users />,
      },
      {
        path: "add",
        element: <AddUsers />,
      },
      {
        path: "update/:id",
        element: <UpdateUser />,
      },
    ],
  },

   // For Taplist display
   {
    path: "/taplist",
    element: (
      <>
      {/* <ProtectedRoute /> */}
        <Layout />
        {/* <Outlet /> */}
      </>
    ),
    children: [
      {
        index: true,
        element: <TapList />,
      },
    ],
  },

     // For Untaplist display
     {
      path: "/untaplist",
      element: (
        <>
        {/* <ProtectedRoute /> */}
          <Layout />
          {/* <Outlet /> */}
        </>
      ),
      children: [
        {
          index: true,
          element: <UntappedList />,
        },
      ],
    },

   // For Deliverias display
   {
    path: "/deliveries",
    element: (
      <>
      {/* <ProtectedRoute /> */}
        <Layout />
        {/* <Outlet /> */}
      </>
    ),
    children: [
      {
        index: true,
        element: <Deliveries />,
      },
    ],
  },

  // {
  //   path: 'conditional',
  //   element: <ConditionalRoute />,
  // },

]);



function App() {
  // Define your router and routes...

  // const navigate = useNavigate();
  // const { dispatch } = useUser();

  // useEffect(() => {
  //   const storedToken = localStorage.getItem('token');
  //   if (storedToken) {
  //     console.log('Token found:', storedToken);
  //     // Log in the user with the token
  //     loginWithToken(storedToken)
  //       .then((response) => {
  //         console.log('Login with token successful:', response);
  //         // Handle user login and additional actions here
  //         // dispatch({ type: 'SET_USER_DATA', payload: response.data });
  //         navigate('/beers'); // Redirect to the desired page
  //       })
  //       .catch((error) => {
  //         // Handle any errors, e.g., token invalid
  //         console.error('Login with token failed:', error.message);
  //         // You may choose to remove the invalid token here
  //         localStorage.removeItem('token');
  //         navigate('/'); // Redirect to the login page
  //       });
  //   }
  // }, [navigate, dispatch]);


  // Wrap the component using useNavigate inside the RouterProvider
  return (
    <UserProvider>
      <div className='App'>
      <RouterProvider router={router}>
    </RouterProvider>
      </div>
      </UserProvider>
  );
}


// function MainApp() {

//   return (
//     <div className="App">
//     <UserProvider>
//     <RouterProvider router={router}>
//     </RouterProvider>
//     </UserProvider>
//     </div>
//   );
// }


export default App;
