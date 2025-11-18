import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import DataTable, { Column } from '../DataTable';

const mockData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', company: { name: 'Acme Corp' } },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', company: { name: 'Tech Inc' } },
];

const mockColumns: Column[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'company.name', label: 'Company' },
];

describe('DataTable', () => {
  it('renders loading state', () => {
    render(
      <DataTable
        data={[]}
        loading={true}
        columns={mockColumns}
      />
    );
    
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('renders empty message when no data', () => {
    render(
      <DataTable
        data={[]}
        loading={false}
        columns={mockColumns}
        emptyMessage="No users found"
      />
    );
    
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders table with data', () => {
    render(
      <DataTable
        data={mockData}
        loading={false}
        columns={mockColumns}
      />
    );
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
  });

  it('renders column headers', () => {
    render(
      <DataTable
        data={mockData}
        loading={false}
        columns={mockColumns}
      />
    );
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Company')).toBeInTheDocument();
  });

  it('handles nested object keys', () => {
    render(
      <DataTable
        data={mockData}
        loading={false}
        columns={mockColumns}
      />
    );
    
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('Tech Inc')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnEdit = vi.fn();
    
    render(
      <DataTable
        data={mockData}
        loading={false}
        columns={mockColumns}
        onEdit={mockOnEdit}
      />
    );
    
    const editButtons = screen.getAllByLabelText('Edit');
    await user.click(editButtons[0]);
    
    expect(mockOnEdit).toHaveBeenCalledWith(mockData[0]);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnDelete = vi.fn();
    
    render(
      <DataTable
        data={mockData}
        loading={false}
        columns={mockColumns}
        onDelete={mockOnDelete}
      />
    );
    
    const deleteButtons = screen.getAllByLabelText('Delete');
    await user.click(deleteButtons[0]);
    
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('renders Actions column when onEdit or onDelete is provided', () => {
    render(
      <DataTable
        data={mockData}
        loading={false}
        columns={mockColumns}
        onEdit={vi.fn()}
      />
    );
    
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('does not render Actions column when neither onEdit nor onDelete is provided', () => {
    render(
      <DataTable
        data={mockData}
        loading={false}
        columns={mockColumns}
      />
    );
    
    expect(screen.queryByText('Actions')).not.toBeInTheDocument();
  });

  it('uses custom render function when provided', () => {
    const columnsWithRender: Column[] = [
      {
        key: 'name',
        label: 'Name',
        render: (value) => <strong>{value.toUpperCase()}</strong>
      },
    ];
    
    render(
      <DataTable
        data={mockData}
        loading={false}
        columns={columnsWithRender}
      />
    );
    
    expect(screen.getByText('JOHN DOE')).toBeInTheDocument();
  });
});

