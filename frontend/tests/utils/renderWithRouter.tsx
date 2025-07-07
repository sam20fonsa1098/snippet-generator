import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

export function renderWithRouter(component: React.ReactElement, routePath = '/', routeElement?: React.ReactElement) {
  const routes = [
    {
      path: routePath,
      element: routeElement ?? component,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: [routePath],
  });

  return render(<RouterProvider router={router} />);
}
