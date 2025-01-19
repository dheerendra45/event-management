export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'candidate';
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  type: 'Virtual' | 'Hybrid';
  capacity: number;
  registeredUsers: string[];
}