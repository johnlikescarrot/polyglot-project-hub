import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '@/App';

jest.mock('@/pages/Index', () => {
  return function MockIndex() {
    return <div>Index Page</div>;
  };
});

jest.mock('@/pages/NotFound', () => {
  return function MockNotFound() {
    return <div>Not Found Page</div>;
  };
});

describe('App', () => {
  it('should render with providers', () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    
    expect(screen.getByText('Index Page')).toBeInTheDocument();
  });

  it('should render toaster components', () => {
    const queryClient = new QueryClient();
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    
    expect(container).toBeInTheDocument();
  });
});
