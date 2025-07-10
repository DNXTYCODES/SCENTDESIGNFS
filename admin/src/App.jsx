import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Popup from "./pages/Popup";
import Login from "./components/Login";
import EditProducts from "./pages/EditProducts"; // Add this import
import EditProduct from "./pages/EditProduct"; // Add this import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/popup" element={<Popup token={token} />} />
                {/* Add route for Edit Products */}
                <Route path="/edit-products" element={<EditProducts token={token} />} />
                <Route path="/admin/edit-product/:id" element={<EditProduct token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;

























// import React, { useEffect, useState } from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";
// import { Routes, Route } from "react-router-dom";
// import Add from "./pages/Add";
// import List from "./pages/List";
// import Orders from "./pages/Orders";
// import Popup from "./pages/Popup";
// import Login from "./components/Login";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const backendUrl = import.meta.env.VITE_BACKEND_URL;
// export const currency = "$";

// const App = () => {
//   const [token, setToken] = useState(
//     localStorage.getItem("token") ? localStorage.getItem("token") : ""
//   );

//   useEffect(() => {
//     localStorage.setItem("token", token);
//   }, [token]);

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <ToastContainer />
//       {token === "" ? (
//         <Login setToken={setToken} />
//       ) : (
//         <>
//           <Navbar setToken={setToken} />
//           <hr />
//           <div className="flex w-full">
//             <Sidebar />
//             <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
//               <Routes>
//                 <Route path="/add" element={<Add token={token} />} />
//                 <Route path="/list" element={<List token={token} />} />
//                 <Route path="/orders" element={<Orders token={token} />} />
//                 <Route path="/popup" element={<Popup token={token} />} />
//               </Routes>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;
