import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders with default placeholder', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} placeholder="Search users..." />);
    
    const input = screen.getByPlaceholderText('Search users...');
    expect(input).toBeInTheDocument();
  });

  it('displays the current value', () => {
    const mockOnChange = vi.fn();
    render(<SearchBar value="test search" onChange={mockOnChange} />);
    
    const input = screen.getByDisplayValue('test search');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'hello');
    
    expect(mockOnChange).toHaveBeenCalledTimes(5);
    expect(mockOnChange).toHaveBeenCalledWith('h');
    expect(mockOnChange).toHaveBeenCalledWith('e');
    expect(mockOnChange).toHaveBeenCalledWith('l');
    expect(mockOnChange).toHaveBeenCalledWith('l');
    expect(mockOnChange).toHaveBeenCalledWith('o');
  });

  it('updates value when controlled', async () => {
    const user = userEvent.setup();
    const mockOnChange = vi.fn();
    const { rerender } = render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Search...');
    await user.type(input, 'test');
    
    rerender(<SearchBar value="test" onChange={mockOnChange} />);
    expect(input).toHaveValue('test');
  });
});

