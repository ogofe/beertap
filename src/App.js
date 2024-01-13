// import { ChakraProvider } from '@chakra-ui/react';

import React, { useState, useEffect, createContext } from 'react';
import { RouterProvider, createBrowserRouter, Outlet, Routes, Navigate, useNavigate } from 'react-router-dom';
import Navigation from './components/Navbar';
import { UserProvider, useUser } from './contexts/userContext';
import { loginWithToken } from './pages/services/authService';
import axios from 'axios';

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

  const axiosClient = axios.create({
    baseURL: API_URL,
    headers:{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authUser?.token}`
    }
  })

  // Add a response interceptor
  axiosClient.interceptors.response.use(
    (response) => {
      // 2xx response codes; return response
      return response;
    },
    (error) => {
      // Check if the response status is a redirect (3xx)

      if (error.response.status === 401 && Boolean(authUser?.token)) {
        // Assuming the user is logged in but the token is expired
        logout()
        console.log(" Token Is Expired! ")
      }
        // console.log(" Token Is Expired! ", error)

      // Handle other errors here
      return Promise.reject(error);
    }
  );

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
    axios: axiosClient,
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
    sessionStorage.setItem('isAuthenticated', true)
    sessionStorage.setItem('authUser', JSON.stringify(authData)) // user, token
    setLoadingState(true)
    window.location.href = '/'
    setAuthState(true)
  }

  function logout(){
    setLoadingState(true)
    setAuthState(false)
    sessionStorage.setItem('isAuthenticated', false)
    sessionStorage.setItem('authUser', null)
    sessionStorage.removeItem('token');
    // dispatch({ type: 'LOGOUT' });
    window.location.href = '/'
  }

  function init(){
    // get authentication status from the api  using session storage token
    // some logic
    // after auth logic and confirmation
    // set auth state
    const loggedIn = JSON.parse(sessionStorage.getItem('isAuthenticated'))
    const user = JSON.parse(sessionStorage.getItem('authUser'))

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

