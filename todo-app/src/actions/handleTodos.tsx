import {CreateTodoData, TodoItem, UpdateTodoData} from "@/types.tsx";
import {authFetch} from "@/actions/handleAuthentication.tsx";
import {getCurrentUser} from "@/actions/handleAuthentication.tsx";

const API_BASE_URL = "/api/todos"

export const fetchAllTodos = async (): Promise<TodoItem[]> => {
  console.log("Fetching all todos...");
  const user = getCurrentUser();
  
  if (!user) {
    console.error("No user found when fetching todos");
    throw new Error("User not authenticated");
  }
  
  console.log("Fetching todos for authenticated user");
  const todos = await authFetch(`${API_BASE_URL}`);
  console.log("Fetched todos:", todos);
  return todos;
};

export const fetchTodoById = async (id: number): Promise<TodoItem> => {
  console.log("Fetching todo by id:", id);
  const todo = await authFetch(`${API_BASE_URL}/${id}`);
  console.log("Fetched todo:", todo);
  return todo;
};

export const createTodo = async (todoData: CreateTodoData): Promise<TodoItem> => {
  console.log("Creating new todo:", todoData);
  const user = getCurrentUser();
  
  if (!user) {
    console.error("No user found when creating todo");
    throw new Error("User not authenticated");
  }
  
  const todoWithOwner = {
    ...todoData,
    owner: user.id
  };
  
  console.log("Creating todo with owner:", todoWithOwner);
  const newTodo = await authFetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoWithOwner),
  });
  
  console.log("Created todo:", newTodo);
  return newTodo;
};

export const updateTodo = async (id: number, todoData: UpdateTodoData): Promise<TodoItem> => {
  console.log("Updating todo:", id, todoData);
  const updatedTodo = await authFetch(`${API_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });
  
  console.log("Updated todo:", updatedTodo);
  return updatedTodo;
};

export const deleteTodo = async (id: number): Promise<void> => {
  console.log("Deleting todo:", id);
  await authFetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  console.log("Deleted todo:", id);
};