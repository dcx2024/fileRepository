import React from 'react';
// 1. Change createBrowserRouter to createHashRouter
import { Route, createHashRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Explore from './pages/ExplorePage';

const App = () => {
  // 2. Update the function call here
  const router = createHashRouter(
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
