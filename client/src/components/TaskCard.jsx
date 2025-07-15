import { CheckCircleIcon, TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function TaskCard({ task, onDelete, onEdit, onToggle }) {
  return (
    <div className="bg-white dark:bg-zinc-900 shadow-sm border dark:border-zinc-700 rounded-xl p-4 flex justify-between items-start gap-4">
      <div className="flex-1">
        <h3 className={`text-lg font-semibold ${task.completed ? "line-through text-zinc-500" : ""}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(task._id)}
          aria-label="Toggle Complete"
        >
          <CheckCircleIcon className={`h-5 w-5 ${task.completed ? "text-green-500" : "text-zinc-400"}`} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(task)}
          aria-label="Edit Task"
        >
          <PencilSquareIcon className="h-5 w-5 text-blue-500" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task._id)}
          aria-label="Delete Task"
        >
          <TrashIcon className="h-5 w-5 text-red-500" />
        </Button>
      </div>
    </div>
  );
}
