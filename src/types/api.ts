/**
 * API and Data Types
 */

export interface Course {
  id: number;
  name: string;
  description: string | null;
  price: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  created_at?: string;
}

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  enrolled_at: string;
  completed_at?: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
