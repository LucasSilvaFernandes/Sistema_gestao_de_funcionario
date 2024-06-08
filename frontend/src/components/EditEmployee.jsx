import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const [category, setCategory] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    salary: "",
    address: "",
    category_id: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/category")
      .then((result) => {
        if (result.data.status) {
          setCategory(result.data.Result)
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:3001/auth/employee/" + id)
      .then((result) => {
        setEmployee({
          ...employee,
          name: result.data.Result[0].name,
          email: result.data.Result[0].email,
          address: result.data.Result[0].address,
          salary: result.data.Result[0].salary,
          category_id: result.data.Result[0].category_id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/auth/edit_employee/" + id, employee)
      .then((result) => {
        navigate('/dashboard/employee')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h2 className="text-center">Editar Funcionário</h2>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label mt-2">
              Name
            </label>
            <input
              type="text"
              name="inputName"
              id="inputName"
              placeholder="Digite seu nome"
              value={employee.name}
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label mt-2">
              Email
            </label>
            <input
              type="email"
              name="inputEmail"
              id="inputEmail"
              placeholder="Digite seu e-mail"
              value={employee.email}
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label mt-2">
              Salário
            </label>
            <input
              type="text"
              name="inputSalary"
              id="inputSalary"
              placeholder="Digite seu salário"
              value={employee.salary}
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label mt-2">
              Endereço
            </label>
            <input
              type="text"
              name="inputAddress"
              id="inputAddress"
              placeholder="Digite seu endereço"
              value={employee.address}
              className="form-control rounded-0"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="category" className="form-label mt-2">
              Categoria
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={employee.category_id}
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c, index) => {
                return (
                  <option key={index} value={c.id}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100 mt-2">
              Editar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
