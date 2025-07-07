import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import SnippetsPage from '../../app/routes/snippets._index';
import { renderWithRouter } from '../utils/renderWithRouter';
import { useNavigation } from '@remix-run/react';


vi.mock('@remix-run/react', async () => {
  const navigation = { state: 'submitting' } as ReturnType<typeof useNavigation>;
  const actual = await vi.importActual('@remix-run/react');
  return {
    ...actual,
    useLoaderData: () => [
      { id: '1', text: 'console.log("hello")', summary: 'logs hello' },
      { id: '2', text: 'let x = 5;', summary: 'declare x' },
    ],
    useNavigation: () => navigation,
  };
});

describe('SnippetsPage', () => {
  it('renders a list of snippets', () => {
    renderWithRouter(<SnippetsPage />, '/snippets');

    expect(screen.getByText('console.log("hello")')).toBeInTheDocument();
    expect(screen.getByText('let x = 5;')).toBeInTheDocument();
  });

  it('shows loading state when submitting', async () => {
    renderWithRouter(<SnippetsPage />, '/snippets');
    
    expect(screen.getByText(/Creating snippet/i)).toBeInTheDocument();
  });
});
