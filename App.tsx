import { RouterProvider } from 'react-router-dom';
import List from '@/pages/manage/List';
import './App.css';
import routerConfig from '@/router'
function App() {
  return (
    <RouterProvider router={routerConfig }></RouterProvider>
  );
}

export default App;