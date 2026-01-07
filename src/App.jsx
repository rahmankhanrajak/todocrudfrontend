import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { setTokenGetter } from "./store/todosApi";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todos from "./pages/Todos";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  const { accessToken } = useAuth();

  useEffect(() => {
    setTokenGetter(() => accessToken);
  }, [accessToken]);

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

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}





// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Todos from "./pages/Todos";

// const PrivateRoute = ({ children }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// };

// export default function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />

//           <Route
//             path="/todos"
//             element={
//               <PrivateRoute>
//                 <Todos />
//               </PrivateRoute>
//             }
//           />

//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }