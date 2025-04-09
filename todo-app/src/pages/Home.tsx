import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import TodoList from "@/components/TodoList.tsx";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {TodoForm} from "@/components/TodoForm.tsx";
import {handleLogout, fetchCurrentUser, getCurrentUser} from "@/actions/handleAuthentication.tsx";
import {fetchAllTodos, createTodo, updateTodo, deleteTodo} from "@/actions/handleTodos.tsx";
import {TodoItem, CreateTodoData, UpdateTodoData, User} from "@/types.tsx";

const Home = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [todosLoaded, setTodosLoaded] = useState(false);

  useEffect(() => {
    const loadUserAndTodos = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Loading user and todos...");
        
        // First, try to get the current user from memory
        let currentUser = getCurrentUser();
        console.log("Current user from memory:", currentUser);
        
        // If not available, fetch it from the API
        if (!currentUser) {
          console.log("Fetching user from API...");
          currentUser = await fetchCurrentUser();
          console.log("User from API:", currentUser);
        }
        
        if (currentUser) {
          setUser(currentUser);
          
          // Only fetch todos if we haven't already
          if (!todosLoaded) {
            // Now fetch todos
            console.log("Fetching todos...");
            const fetchedTodos = await fetchAllTodos();
            console.log("Fetched todos:", fetchedTodos);
            setTodos(fetchedTodos);
            setTodosLoaded(true);
          }
        } else {
          console.error("No user found, redirecting to login");
          setError("No user found. Please log in again.");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Failed to load user or todos:", error);
        setError(error instanceof Error ? error.message : "An unknown error occurred");
        navigate("/signin");
      } finally {
        setLoading(false);
      }
    };

    loadUserAndTodos();
  }, [navigate, todosLoaded]);

  const handleAddOrUpdateTodo = async (todoData: CreateTodoData | UpdateTodoData) => {
    try {
      if (editingTodo) {
        // Update existing todo
        const updatedTodo = await updateTodo(editingTodo.id, todoData as UpdateTodoData);
        setTodos(todos.map(t => t.id === updatedTodo.id ? updatedTodo : t));
        setEditingTodo(null);
      } else {
        // Add new todo
        const newTodo = await createTodo(todoData as CreateTodoData);
        setTodos([...todos, newTodo]);
      }
    } catch (error) {
      console.error("Failed to save todo:", error);
      setError(error instanceof Error ? error.message : "Failed to save todo");
    }
  };

  const handleToggleComplete = async (todoId: number) => {
    try {
      const todo = todos.find(t => t.id === todoId);
      if (todo) {
        const updatedTodo = await updateTodo(todoId, { is_completed: !todo.is_completed });
        setTodos(todos.map(t => t.id === todoId ? updatedTodo : t));
      }
    } catch (error) {
      console.error("Failed to toggle todo:", error);
      setError(error instanceof Error ? error.message : "Failed to toggle todo");
    }
  };

  const handleDeleteTodo = async (todoId: number) => {
    try {
      await deleteTodo(todoId);
      setTodos(todos.filter(todo => todo.id !== todoId));
    } catch (error) {
      console.error("Failed to delete todo:", error);
      setError(error instanceof Error ? error.message : "Failed to delete todo");
    }
  };

  const handleEditTodo = (todo: TodoItem) => {
    setEditingTodo(todo);
    // Scroll to form
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleLogoutSubmit = async () => {
    try {
      await handleLogout();
      navigate("/signin");
    } catch (error) {
      console.error("Failed to logout:", error);
      setError(error instanceof Error ? error.message : "Failed to logout");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-500">Please wait while we fetch your tasks</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Error</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <Button onClick={() => navigate("/signin")}>Return to Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">My Tasks</h1>
            {user && <p className="text-sm text-gray-500">Welcome, {user.username}</p>}
          </div>
          <Button variant="outline" size="sm" onClick={handleLogoutSubmit}>
            <LogOut size={16} className="mr-2" /> Logout
          </Button>
        </header>

        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <TodoForm
            onAddTodo={handleAddOrUpdateTodo}
            editingTodo={editingTodo}
            onCancelEdit={() => setEditingTodo(null)}
          />

          <TodoList
            todos={todos}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;