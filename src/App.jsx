import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-activity"
              element={
                <ProtectedRoute>
                  <AddActivity />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
