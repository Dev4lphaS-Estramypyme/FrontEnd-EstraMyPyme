export interface Admin {
    id: number;
    email: string;
    password: string;
    name: string;
    active: boolean;
    roleName: 'Admin' | 'Student' | 'Teacher';
  }