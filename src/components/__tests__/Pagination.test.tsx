import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import Pagination from '../Pagination';

describe('Pagination', () => {
  it('renders page numbers correctly', () => {
    const mockOnPageChange = vi.fn();
    const mockOnItemsPerPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
        itemsPerPage={10}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    const mockOnPageChange = vi.fn();
    const mockOnItemsPerPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
        itemsPerPage={10}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );
    
    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('bg-blue-500');
  });

  it('disables Previous button on first page', () => {
    const mockOnPageChange = vi.fn();
    const mockOnItemsPerPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
        itemsPerPage={10}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );
    
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    const mockOnPageChange = vi.fn();
    const mockOnItemsPerPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
        itemsPerPage={10}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when clicking page number', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = vi.fn();
    const mockOnItemsPerPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
        itemsPerPage={10}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );
    
    const page2Button = screen.getByText('2');
    await user.click(page2Button);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when clicking Next button', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = vi.fn();
    const mockOnItemsPerPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
        itemsPerPage={10}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );
    
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange when clicking Previous button', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = vi.fn();
    const mockOnItemsPerPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
        itemsPerPage={10}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );
    
    const previousButton = screen.getByText('Previous');
    await user.click(previousButton);
    
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onItemsPerPageChange when changing items per page', async () => {
    const user = userEvent.setup();
    const mockOnPageChange = vi.fn();
    const mockOnItemsPerPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
        itemsPerPage={10}
        onItemsPerPageChange={mockOnItemsPerPageChange}
      />
    );
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '20');
    
    expect(mockOnItemsPerPageChange).toHaveBeenCalledWith(20);
  });

  it('hides items per page selector when showItemsPerPage is false', () => {
    const mockOnPageChange = vi.fn();
    const mockOnItemsPerPageChange = vi.fn();
    
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
        itemsPerPage={10}
        onItemsPerPageChange={mockOnItemsPerPageChange}
        showItemsPerPage={false}
      />
    );
    
    expect(screen.queryByText('Show')).not.toBeInTheDocument();
  });
});

