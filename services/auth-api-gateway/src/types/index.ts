
export interface User {
    id: string;
    email: string;
    role: string;
  }
  
  export interface AuthPayload {
    userId: string;
    email: string;
    role: string;
  }