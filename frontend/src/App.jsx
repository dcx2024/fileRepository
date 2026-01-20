import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Explore from './pages/ExplorePage';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import the wrapper

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignupForm/>}/>
        
        {/* Protected Routes Group */}
        <Route element={<ProtectedRoute />}>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;