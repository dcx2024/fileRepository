import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Explore from './pages/ExplorePage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Main Landing Page: Displays Recent 20 */}
        <Route index element={<HomePage />} />
        
        {/* Full Archive Page: Displays everything */}
        <Route path='/explore' element={<Explore />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;