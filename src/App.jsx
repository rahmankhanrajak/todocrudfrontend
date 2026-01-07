import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";
import { useRefreshMutation } from "./store/authApi";
import { setAccessToken, authReady } from "./store/authSlice";

const PrivateRoute = ({ children }) => {
  const { accessToken, isAuthReady } = useSelector((state) => state.auth);

  if (!isAuthReady) {
    return <div>Loading...</div>;
  }

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await refresh().unwrap();
        dispatch(setAccessToken(res.accessToken));
      } catch {
      } finally {
        dispatch(authReady()); 
      }
    };

    restoreSession();
  }, [dispatch, refresh]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/todos"
          element={
            <PrivateRoute>
              <Todos />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
