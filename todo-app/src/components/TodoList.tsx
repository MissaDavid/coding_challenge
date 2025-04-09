import TodoItem from "./TodoItem";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { TodoItem as TodoItemType } from "@/types.tsx";

interface TodoListProps {
  todos: TodoItemType[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: TodoItemType) => void;
}

export default function TodoList({ todos, onToggleComplete, onDelete, onEdit }: TodoListProps) {
  const completedTodos = todos.filter(todo => todo.is_completed);
  const activeTodos = todos.filter(todo => !todo.is_completed);

  // Check if there are any todos
  if (todos.length === 0) {
    return (
      <Alert className="bg-blue-50 text-blue-800 border-blue-200">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No tasks yet. Create your first task to get started!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {activeTodos.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3">Active Tasks</h2>
          {activeTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-3">Completed Tasks</h2>
          {completedTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}