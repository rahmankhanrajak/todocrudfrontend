import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../store/todosApi";
import { useLogoutMutation } from "../store/authApi";

export default function Todos() {
  const { user, logout: logoutContext } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const { data: todos = [], isLoading } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error("Logout error:", error);
    }
    logoutContext();
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      await updateTodo({ id: editingId, title });
    } else {
      await addTodo({ title });
    }

    setTitle("");
    setEditingId(null);
  };

  const handleEdit = (todo) => {
    setTitle(todo.title);
    setEditingId(todo.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete?")) return;
    await deleteTodo(id);
  };

  return (
    <div>
      <h2>Todos</h2>
      {/* <p>
        Logged in as: <b>{user?.name}</b>
      </p> */}

      <button onClick={handleLogout}>Logout</button>

      <hr />

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      <hr />

      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : todos.length === 0 ? (
          <p>No todos yet</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                border: "1px solid #ccc",
                margin: "8px 0",
                padding: 8,
              }}
            >
              {editingId !== todo.id && <p>{todo.title}</p>}

              {editingId === todo.id && (
                <>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <button onClick={handleSubmit}>Save</button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setTitle("");
                    }}
                    style={{ marginLeft: 6 }}
                  >
                    Cancel
                  </button>
                </>
              )}

              {editingId !== todo.id && (
                <div style={{ marginTop: 6 }}>
                  <button onClick={() => handleEdit(todo)}>Edit</button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    style={{ marginLeft: 6 }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}