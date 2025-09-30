import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeLayout from './components/homelayout.jsx';
import Home from './components/Home.jsx';
import MainLayout from './components/mainlayout.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Dashboard from './components/Dashboard.jsx';
import TouristsDirectory from './components/TouristsDirectory.jsx';
import IncidentsAndAlerts from './components/Incidents & Alerts.jsx';
import ReportsAnalytics from './components/Reports & Analytics.jsx';
import HelpSupport from './components/Help & Support.jsx';
import MapGeoFencing from './components/Map & Geo-fencing.jsx';
import SettingsAdmin from './components/Settings & Admin.jsx';
import Contact from './components/Contact.jsx';
import Login from './components/Login.jsx'
import Profile from './components/Profile.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<HomeLayout/>,
      children:[
          {
           path:"/",
           element:<Home/>,
          },
          {
            path:"/services",
            element:<Services/>
          },
          {
            path:"/About",
            element:<About/>
          },
          {
            path:"/Contact",
            element:<Contact/>,
          },
          {
            path:"/Login",
            element:<Login/>
          },
          {
            path:"/Profile",
            element:<Profile/>,
          },
      ]
   },

  {
    path:"/",
    element:<MainLayout />,
    children:[
      {
        path:"/services",
        element:<Services/>
      },
      {
        path:"/Dashboard",
        element:<Dashboard/>

      },
      {
        path:"/Tourists",
        element:<TouristsDirectory/>
      },
      {
        path:"/Incidents",
        element:<IncidentsAndAlerts/>
      },
      {
        path:"/Reports-Analytics",
        element:<ReportsAnalytics/>

      },
      {
        path:"/Help-Support",
        element:<HelpSupport/>
      },
      {
        path:"/map-geo-fencing",
        element:<MapGeoFencing/>
      },
      {
        path:"/settings-admin",
        element:<SettingsAdmin/>
      },
     
    ]
  },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
