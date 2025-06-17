
// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
// import { AiOutlineMenu } from "react-icons/ai";
// import { MdViewModule } from "react-icons/md";

// export default function Sidebar({ isOpen, toggle }) {
//   const location = useLocation();

//   const items = [
//     { path: "/", label: "Dashboard", icon: <FiHome /> },
//     { path: "/users", label: "Customers", icon: <FiUsers /> },
//     { path: "/settings", label: "Comapny", icon: <FiSettings /> },
//     {path: "/modules", label: "Modules", icon: <MdViewModule />}
    
//   ];


//   return (
//     <div className={`bg-white shadow-md min-h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-24"} p-4`}>
//       <div className="flex items-center justify-between mb-6">
//         {isOpen && <span className="text-xl font-bold text-purple-600">SKYLABS</span>}
//         <button onClick={toggle} ><AiOutlineMenu className="cursor-pointer text-black" size={24}/></button>
//       </div>
//       <nav>
//         {items.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`flex items-center gap-3 p-3 rounded-md hover:bg-purple-100 hover:text-black  text-black font-bold ${
//               location.pathname === item.path ? "bg-purple-500  text-white font-bold" : ""
//             }`}
//           >
//             {item.icon}
//             {isOpen && <span>{item.label}</span>}
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// }



import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiSettings } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { MdViewModule } from "react-icons/md";

export default function Sidebar({ isOpen, toggle }) {
  const location = useLocation();
  const role = localStorage.getItem("role");

  const items = [
    { path: "/", label: "Dashboard", icon: <FiHome />, roles: ["Customer"] },
    { path: "/superadmin/dashboard", label: "Dashboard", icon: <FiHome />, roles: ["superadmin"] },
    { path: "/users", label: "Customers", icon: <FiUsers />, roles: ["superadmin"] },
    { path: "/settings", label: "Company", icon: <FiSettings />, roles: ["superadmin"] },
    { path: "/modules", label: "Modules", icon: <MdViewModule />, roles: ["superadmin"] },
    { path: "/usermodules", label: "Modules", icon: <MdViewModule />, roles: ["Customer"] },
  ];

  return (
    <div className={`bg-white shadow-md min-h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-24"} p-4`}>
      <div className="flex items-center justify-between mb-6">
        {isOpen && <span className="text-xl font-bold text-purple-600">SKYLABS</span>}
        <button onClick={toggle}><AiOutlineMenu className="cursor-pointer text-black" size={24} /></button>
      </div>
      <nav>
        {items
          .filter((item) => item.roles.includes(role))
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-md hover:bg-purple-100 hover:text-black text-black font-bold ${
                location.pathname === item.path ? "bg-purple-500 text-white" : ""
              }`}
            >
              {item.icon}
              {isOpen && <span>{item.label}</span>}
            </Link>
          ))}
      </nav>
    </div>
  );
}
