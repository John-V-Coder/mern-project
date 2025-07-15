import { useEffect, useState } from "react";
import TaskCard from "@/components/TaskCard";
import TaskDialog from "@/components/TaskDialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to load tasks", err);
    }
  };

  const handleSaveTask = async (taskData) => {
    const isEditing = !!taskData._id;
    const url = isEditing ? `/api/tasks/${taskData._id}` : "/api/tasks";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      });

      if (res.ok) {
        await fetchTasks();
      }
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleToggle = async (id) => {
    try {
      await fetch(`/api/tasks/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchTasks();
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const openEdit = (task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <Button onClick={() => { setEditingTask(null); setDialogOpen(true); }}>
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onEdit={openEdit}
              onToggle={handleToggle}
            />
          ))
        ) : (
          <p className="text-zinc-500 dark:text-zinc-400">No tasks yet.</p>
        )}
      </div>

      <TaskDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        onSave={handleSaveTask}
        taskToEdit={editingTask}
      />
    </div>
  );
}
