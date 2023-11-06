import React, {useState} from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Navigation from './Navbar';

// Import all your page components here
import Beers from '../pages/beers/Beers';
import AddBeer from '../pages/beers/AddBeer';
import UpdateBeer from '../pages/beers/UpdateBeer';
import Breweries from '../pages/breweries/Breweries';
import AddBreweries from '../pages/breweries/AddBreweries';
import UpdateBrewery from '../pages/breweries/UpdateBreweries';
import Suppliers from '../pages/suppliers/Suppliers';
import AddSuppliers from '../pages/suppliers/AddSuppliers';
import UpdateSupplier from '../pages/suppliers/UpdateSupplier';
import Categories from '../pages/categories/Categories';
import AddCategories from '../pages/categories/AddCategories';
import UpdateCategory from '../pages/categories/UpdateCategories';
import KegSize from '../pages/kegsizes/KegSize';
import AddKegSize from '../pages/kegsizes/AddKegSize';
import UpdateKegsize from '../pages/kegsizes/UpdateKegsize';
import Users from '../pages/users/Users';
import AddUsers from '../pages/users/AddUsers';
import UpdateUser from '../pages/users/UpdateUser';
import TapList from '../pages/taplist/TapList'
import Deliveries from '../pages/taplist/Deliveries';
import Login from '../pages/users/Login';

// Define the Routers component
function Routers() {
  return (
        <>
                <Navigation />
                <Outlet />
        </>
  );
}

// Create your router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/beers",
    element: <Beers />,
    children: [
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
  {
    path: "/breweries",
    element: <Breweries />,
    children: [
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
  {
    path: "/categories",
    element: <Categories />,
    children: [
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
  {
    path: "/kegsizes",
    element: <KegSize />,
    children: [
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
  {
    path: "/suppliers",
    element: <Suppliers />,
    children: [
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
  {
    path: "/users",
    element: <Users />,
    children: [
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
  {
    path: "/taplist",
    element: <TapList />,
  },
  {
    path: "/deliveries",
    element: <Deliveries />,
  },
]);

export { Routers, router };
