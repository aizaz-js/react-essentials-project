import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { PostListing } from '@pages/postlisting';
import { Post } from '@pages/post';
import { ROUTES } from './routes';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<PostListing />} />
      <Route path={ROUTES.POST} element={<Post />} />
    </>
  )
);
