export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
    company: {
      name: string;
    };
  }
  
  export interface ApiState {
    data: User[];
    loading: boolean;
    error: string | null;
  }
  
  export interface FilterState {
    search: string;
    currentPage: number;
    itemsPerPage: number;
  }