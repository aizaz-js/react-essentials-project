import { RouterProvider } from 'react-router-dom';
import { router } from './routes/createBrowserRouter';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
