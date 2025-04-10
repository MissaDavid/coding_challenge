export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface TodoItem {
  id: number;
  owner: number;
  title: string;
  description: string;
  is_completed: boolean;
  created_at: string;
  due_date: string | null;
}

export interface CreateTodoData {
  title: string;
  description: string;
  is_completed?: boolean;
  due_date?: string | null;
}

export interface UpdateTodoData {
  title?: string;
  description?: string;
  is_completed?: boolean;
  due_date?: string | null;
}