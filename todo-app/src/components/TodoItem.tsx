import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Trash2, Edit } from "lucide-react";
import { TodoItem as TodoItemType } from "@/types.tsx";

interface TodoItemProps {
  todo: TodoItemType;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: TodoItemType) => void;
}

export default function TodoItem({ todo, onToggleComplete, onDelete, onEdit }: TodoItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formattedDate = todo.due_date ? new Date(todo.due_date).toLocaleDateString() : null;

  return (
    <Card className={`mb-3 border-l-4 ${todo.is_completed ? "border-l-green-500" : "border-l-blue-500"}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-2">
          <Checkbox
            checked={todo.is_completed}
            onCheckedChange={() => onToggleComplete(todo.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <div
              onClick={() => setIsExpanded(!isExpanded)}
              className="cursor-pointer"
            >
              <h3 className={`font-medium ${todo.is_completed ? "line-through text-gray-500" : ""}`}>
                {todo.title}
              </h3>

              {isExpanded && todo.description && (
                <p className="mt-2 text-gray-600 text-sm whitespace-pre-wrap">
                  {todo.description}
                </p>
              )}

              {todo.due_date && (
                <div className="flex items-center mt-2 text-xs text-gray-500">
                  <Calendar size={14} className="mr-1" />
                  <span>{formattedDate}</span>
                  {todo.due_date && new Date(todo.due_date) < new Date() && !todo.is_completed && (
                    <span className="ml-2 text-red-500 flex items-center">
                      <Clock size={14} className="mr-1" /> Overdue
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(todo)}
              className="h-8 w-8"
            >
              <Edit size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              className="h-8 w-8 text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}