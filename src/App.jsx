import { useState } from "react";
import "./App.css";

function TodoApp() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Complete project",
      description: "Finish the shopping list app",
      isCompleted: false,
    },
  ]);
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
  return (
    <div className="todo-app">
      <div className="app-content">
        <h1>MY TODO LIST</h1>
        <form onSubmit={handleSubmit} className="todo-form">
          <div className="form-row">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="form-row">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />
          </div>
          <button type="submit">Add Todo</button>
        </form>
        <div className="todos-container">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className={`todo-item ${todo.isCompleted ? "completed" : ""}`}
              onClick={() => toggleComplete(todo.id)}
            >
              {" "}
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoApp;
