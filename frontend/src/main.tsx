import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx'
import App from './App.tsx'
import Weather from './pages/Weather/Weather.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';


const queryClient = new QueryClient()


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          element: <Weather />,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              lazy: () => import("./pages/DetailedForecast/DetailedForecast.tsx"),
              errorElement: <ErrorPage />,
            },
            {
              path: "/24timmar",
              lazy: () => import("./pages/TwentyFourHours/TwentyFourHours.tsx"),
              errorElement: <ErrorPage />,
            },
            {
              path: "/10dagar",
              lazy: () => import("./pages/TenDays/TenDays.tsx"),
              errorElement: <ErrorPage />,
            },
            {
              path: "*",
              element: <NotFound />
            },
          ],
        }, 
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
  ]
)




createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>
);
