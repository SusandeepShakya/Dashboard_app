import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import ProtectedRoute from '../ProtectedRoute';

describe('ProtectedRoute', () => {
  it('renders children when user is authenticated', () => {
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: {
            isAuthenticated: true,
            user: { username: 'testuser' },
            token: 'test-token',
          },
        },
      }
    );
    
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('does not render children when user is not authenticated', () => {
    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      {
        preloadedState: {
          auth: {
            isAuthenticated: false,
            user: null,
            token: null,
          },
        },
      }
    );
    
    // When not authenticated, Navigate component redirects
    // The content should not be visible
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });
});

