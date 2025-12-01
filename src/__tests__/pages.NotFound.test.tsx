import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '@/pages/NotFound';

describe('NotFound Page', () => {
  const renderNotFound = () => {
    return render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
  };

  it('should render 404 heading', () => {
    renderNotFound();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('should render error message', () => {
    renderNotFound();
    expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument();
  });

  it('should have return home link', () => {
    renderNotFound();
    const link = screen.getByRole('link', { name: /Return to Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('should render with correct styling classes', () => {
    const { container } = renderNotFound();
    expect(container.querySelector('.min-h-screen')).toBeInTheDocument();
    expect(container.querySelector('.text-center')).toBeInTheDocument();
  });
});
