import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import SnippetDetailPage from '../../app/routes/snippets.$id';

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');
  return {
    ...actual,
    useLoaderData: () => ({
      id: 'abc123',
      text: 'const a = 10;',
      summary: 'declares a constant',
    }),
  };
});

describe('SnippetDetailPage', () => {
  it('renders snippet details', () => {
    render(
      <MemoryRouter>
        <SnippetDetailPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Snippet Details/)).toBeInTheDocument();
    expect(screen.getByText(/ID:/)).toHaveTextContent('abc123');
    expect(screen.getByText('const a = 10;')).toBeInTheDocument();
    const summaryElement = screen.getByText('Summary:').closest('p');
    expect(summaryElement).toHaveTextContent('Summary: declares a constant');
  });
});
