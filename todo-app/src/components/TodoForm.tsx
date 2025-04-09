import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { TodoItem, CreateTodoData, UpdateTodoData } from "@/types.tsx";

interface TodoFormProps {
  onAddTodo: (todoData: CreateTodoData | UpdateTodoData) => void;
  editingTodo: TodoItem | null;
  onCancelEdit: () => void;
}

export const TodoForm = ({ onAddTodo, editingTodo, onCancelEdit }: TodoFormProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Set form values when editing an existing todo
  useEffect(() => {
    if (editingTodo) {
      setIsFormOpen(true);
      setTitle(editingTodo.title || "");
      setDescription(editingTodo.description || "");
      setDueDate(editingTodo.due_date ? new Date(editingTodo.due_date).toISOString().split('T')[0] : "");
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todoData = {
      title,
      description,
      due_date: dueDate ? new Date(dueDate).toISOString() : null,
    };

    onAddTodo(todoData);
    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setIsFormOpen(false);
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div className="mb-6">
      {!isFormOpen && !editingTodo ? (
        <Button
          onClick={() => setIsFormOpen(true)}
          className="w-full flex items-center justify-center"
        >
          <Plus size={16} className="mr-2" /> Add New Task
        </Button>
      ) : (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex justify-between items-center">
              {editingTodo ? "Edit Task" : "Add New Task"}
              <Button
                variant="ghost"
                size="sm"
                onClick={resetForm}
                className="h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="What needs to be done?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Add details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date (optional)</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingTodo ? "Update Task" : "Add Task"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}