import { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Login,
  Dashboard,
  Home,
  Category,
  Employee,
  Profile,
  AddCategory,
  AddEmployee,
  EditEmployee,
  Start,
  EmployeeLogin,
  EmployeeDetail,
  PrivateRouter,
} from "./components";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/adminlogin" element={<Login />} />
        <Route path="/employee_login" element={<EmployeeLogin />} />
        <Route path="/employee_detail/:id" element={<EmployeeDetail />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRouter>
              <Dashboard />
            </PrivateRouter>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="/dashboard/employee" element={<Employee />} />
          <Route path="/dashboard/category" element={<Category />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/add_category" element={<AddCategory />} />
          <Route path="/dashboard/add_employee" element={<AddEmployee />} />
          <Route path="/dashboard/add_employee" element={<AddEmployee />} />
          <Route
            path="/dashboard/edit_employee/:id"
            element={<EditEmployee />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
