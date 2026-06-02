import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTask("");
  };

  const deleteTask = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          📝 To-Do List
        </h1>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">
              No tasks added yet.
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between border p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                  />

                  <span
                    className={
                      todo.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }
                  >
                    {todo.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteTask(todo.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;