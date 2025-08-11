import { useState, useEffect } from "react";
import "./App.css";

function TodoApp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      title,
      description,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setDescription("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditId(id);
    setEditTitle(todoToEdit.title);
    setEditDescription(todoToEdit.description);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) =>
        todo.id === editId
          ? { ...todo, title: editTitle, description: editDescription }
          : todo,
      ),
    );
    setEditId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") {
      return !todo.isCompleted;
    }
    if (filter === "completed") {
      return todo.isCompleted;
    }
    return true;
  });

  return (
    <div className="todo-app">
      <div className="app-content">
        <h1>MY TODO LIST</h1>
        {editId ? (
          <form onSubmit={saveEdit} className="todo-form">
            <div className="form-group">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Edit title"
                required
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Edit description"
                required
              />
            </div>
            <button type="submit">Save Changes</button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="todo-form">
            <div className="form-group">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                required
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
              />
            </div>
            <button type="submit">Add Todo</button>
          </form>
        )}

        <div className="filter-buttons">
          <button
            onClick={() => setFilter("all")}
            className={filter === "all" ? "active" : ""}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={filter === "active" ? "active" : ""}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={filter === "completed" ? "active" : ""}
          >
            Completed
          </button>
        </div>

        <div className="todos-container">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.isCompleted ? "completed" : ""}`}
            >
              <div
                className="todo-content"
                onClick={() => toggleComplete(todo.id)}
              >
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <div className="todo-actions">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(todo.id);
                  }}
                  aria-label="Edit todo"
                >
                  ✏️
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTodo(todo.id);
                  }}
                  aria-label="Delete todo"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;