import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import ErrorAlert from '../ErrorAlert';

describe('ErrorAlert', () => {
  it('renders error message', () => {
    render(<ErrorAlert message="Something went wrong" />);

    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('displays warning icon', () => {
    render(<ErrorAlert message="Test error" />);

    const alert = screen.getByText('⚠️');
    expect(alert).toBeInTheDocument();
  });

  it('does not show retry button when onRetry is not provided', () => {
    render(<ErrorAlert message="Test error" />);

    expect(screen.queryByText('Retry')).not.toBeInTheDocument();
  });

  it('shows retry button when onRetry is provided', () => {
    const mockOnRetry = vi.fn();
    render(<ErrorAlert message="Test error" onRetry={mockOnRetry} />);

    const retryButton = screen.getByText('Retry');
    expect(retryButton).toBeInTheDocument();
  });

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnRetry = vi.fn();
    render(<ErrorAlert message="Test error" onRetry={mockOnRetry} />);

    const retryButton = screen.getByText('Retry');
    await user.click(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it('has correct styling classes', () => {
    render(<ErrorAlert message="Test error" />);

    const alert = screen.getByText('Test error').closest('div');
    expect(alert).toHaveClass('ml-3');
  });
});

