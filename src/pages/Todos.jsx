import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../store/todosApi";
import { useLogoutMutation } from "../store/authApi";
import { logout } from "../store/authSlice";
import { todosApi } from "../store/todosApi";

export default function Todos() {
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: todos = [] } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [logoutReq] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutReq().unwrap();
    dispatch(logout());
    dispatch(todosApi.util.resetApiState());
    navigate("/login", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateTodo({ id: editingId, title });
      setEditingId(null);
    } else {
      await addTodo({ title });
    }
    setTitle("");
  };

  return (
    <div>
      <h2>Todos</h2>
      <button onClick={handleLogout}>Logout</button>

      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>{editingId ? "Update" : "Add"}</button>
      </form>

      {todos.map((t) => (
        <div key={t.id}>
          <span>{t.title}</span>
          <button onClick={() => { setEditingId(t.id); setTitle(t.title); }}>Edit</button>
          <button onClick={() => deleteTodo(t.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
