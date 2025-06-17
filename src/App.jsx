// import React, { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import { Routes, Route, useLocation } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Users from "./pages/Users";
// import Settings from "./pages/Setting";
// import Header from "./components/Header";
// import Login from "./pages/Login";
// import Customer from "./pages/Customer";
// import Module from "./pages/Module";


// export default function App() {
//   const location = useLocation();
//   const [isSidebarOpen, setSidebarOpen] = useState(true);


//    const isLoginPage = location.pathname === "/login";


//    if (isLoginPage) {
//     // Render Login Page Only — no sidebar/header
//     return (
//       <div className="min-h-screen">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </div>
//     );
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(!isSidebarOpen)} />
//       <div className="flex flex-col flex-1">
//         <Header />
//         <main className="flex-1 p-6">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/users" element={<Users />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/customer" element={<Customer />} />
//             <Route path="/modules" element={<Module />}/>
//           </Routes>
//         </main>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Setting";
import Login from "./pages/Login";

import Module from "./pages/Module";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Unauthorized from "./pages/Unauthorized";

import ProtectedRoute from "./components/ProtectedRoute";
import UserModule from "./pages/UserModule";

export default function App() {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const token = localStorage.getItem("authToken");
  const role = localStorage.getItem("role");
  const isLoginPage = location.pathname === "/login";

  // 🔁 Redirect logged-in user away from login
  if (isLoginPage && token) {
    if (role === "superadmin") return <Navigate to="/superadmin/dashboard" replace />;
    if (role === "Customer") return <Navigate to="/" replace />;
  }

  // 🟡 Show Login Page without sidebar/header
  if (isLoginPage) {
    return (
      <div className="min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">
          <Routes>
            {/* 🟢 Customer Route */}
            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={["Customer"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* 🟢 Super Admin Routes */}
            <Route
              path="/superadmin/dashboard"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="/modules"
              element={
                <ProtectedRoute allowedRoles={["superadmin"]}>
                  <Module />
                </ProtectedRoute>
              }
            />

            <Route
              path="/usermodules"
              element={
                <ProtectedRoute allowedRoles={["Customer"]}>
                  <UserModule />
                </ProtectedRoute>
              }
            />

            {/* 🛑 Unauthorized Page */}
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* 🔁 Fallback to proper dashboard */}
            <Route
              path="*"
              element={
                token ? (
                  <Navigate
                    to={role === "superadmin" ? "/superadmin/dashboard" : "/"}
                    replace
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
