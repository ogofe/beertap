// import { ChakraProvider } from '@chakra-ui/react';

import React, { useState, useEffect, createContext } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navigation from './components/Navbar';
import { UserProvider, useUser } from './contexts/userContext';
import { loginWithToken } from './pages/services/authService';
import './styles.css';
import {PageLoader, Notification} from './components'
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
import PasswordReset from './pages/users/PasswordReset';

//import Router from './components/Routers'
export const API_URL = 'https://beer.binsoft.online/api'

export const GlobalStore = createContext({})

const Layout = () => {
  return(
    <div className="w-100">
    <Navigation />
    <Outlet />
    </div>
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


const BaseRouter = createBrowserRouter([

  // Public Route for login page
  {
    path: "/",
    element: <Navigate to="/beers" replace />,
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


const AuthRouter = createBrowserRouter([

  // Public Route for login page
  {
    path: "/login",
    element: <>
      {/* <ConditionalRoute /> */}
      <Login />
    </>,
  },

  // Public Route for password-reset page
  {
    path: "/password-reset",
    element: <>
      {/* <ConditionalRoute /> */}
      <PasswordReset /> 
    </>,
  },

  // Public Route for login page
  {
    path: "/*",
    element: <>
      {/* <ConditionalRoute /> */}
      <Navigate to='/login' replace />
    </>,
  },

]);



function App() {
  const [isAuthenticated, setAuthState] = useState(false)
  // always loading before mounting route based on authetication
  const [isLoading, setLoadingState] = useState(true) 
  const [notificationVisible, setNotificationVisibility] = useState(false) 
  const [notification, setNotification] = useState(null)
  const [authUser, setAuthUser] = useState(null)
  // const navigate = useNavigate()

  function notify({ level, title, body, timeout }){
    setNotification({ title, body, level })
    const _timeout = timeout || 5000 // 5 seconds default
    setNotificationVisibility(true)
    setTimeout(() => {setNotificationVisibility(false); setNotification(null)}, _timeout)
  }

  function dismissNotification(){
    setNotification(null)
    setNotificationVisibility(false)
  }

  function translateError(err) {
    // if ( err.message ) {
    //   return err.message
    // }

    if ( err.code ) {
      switch(err.code){
        case 'ERR_NETWORK': {
          return {title: 'Network Error', body: 'Please check your internet connection!'}
        }
        case 'ERR_TYPE': {
          return {title: 'Data Error', body: 'Please fill in the correct details!'}
        }
        case 'ERR_BAD_RESPONSE': {
          return {title: 'Server Error', body: 'A server error occured! Please contact the developer.'}
        }
        default : {
          return {title: 'Network Error', body: 'Please check your internet connection!'}
        }
      }
    } else {
      return {title: 'Server Error', body: 'Something went terribly wrong, please contact the developer!'}
    }
  }


  const generalContext = {
    // app state
    'apiUrl': API_URL,
    isAuthenticated,
    authUser,

    // methods
    onLogin: authenticate,
    onLogout: logout,
    notify,
    dismissNotification,
    translateError,
  }

  function renderApp(){
    setLoadingState(false)
  }

  function authenticate(authData){
    // receive token and confirm from api
    // then store token to session storage (session restarts when browser is closed)
    // set the auth state to true
    localStorage.setItem('isAuthenticated', true)
    localStorage.setItem('authUser', JSON.stringify(authData)) // user, token
    setLoadingState(true)
    window.location.href = '/'
    setAuthState(true)
  }

  function logout(){
    setLoadingState(true)
    setAuthState(false)
    localStorage.setItem('isAuthenticated', false)
    localStorage.setItem('authUser', null)
    localStorage.removeItem('token');
    // dispatch({ type: 'LOGOUT' });
    window.location.href = '/'
  }

  function init(){
    // get authentication status from the api  using session storage token
    // some logic
    // after auth logic and confirmation
    // set auth state
    const loggedIn = JSON.parse(localStorage.getItem('isAuthenticated'))
    const user = JSON.parse(localStorage.getItem('authUser'))

    if(loggedIn && loggedIn === true && user !== null) {
      setAuthState(true)
      setAuthUser(user)
    }

    // timer to set loading state false after 1.5 seconds of confirmation
    setTimeout(() => setLoadingState(false), 2500)
  }

  useEffect(() => {
    init()
  }, [isAuthenticated])

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

  if (isLoading){
    return <PageLoader />
  }

  if(!isAuthenticated){
    return(
      <GlobalStore.Provider value={generalContext}>
      <UserProvider>
        <div className='App'>
          <RouterProvider router={AuthRouter}>
          </RouterProvider>
        </div>
      </UserProvider>
      </GlobalStore.Provider>
    )
  }

  if(isAuthenticated){
    // Wrap the component using useNavigate inside the RouterProvider
    return (
      <GlobalStore.Provider value={generalContext}>
      <UserProvider>
        <div className='App'>
          <Notification onClose={dismissNotification} show={notificationVisible} title={notification?.title} body={notification?.body} />
          <RouterProvider router={BaseRouter}>
          </RouterProvider>
        </div>
      </UserProvider>
      </GlobalStore.Provider>
    );
  }
}



export default App;

