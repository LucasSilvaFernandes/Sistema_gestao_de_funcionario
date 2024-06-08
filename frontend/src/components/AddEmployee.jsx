import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });

  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/category")
      .then((result) => {
        if (result.data.status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("password", employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('image', employee.image);
    formData.append('category_id', employee.category_id);

    axios
      .post("http://localhost:3001/auth/add_employee", formData)
      .then((result) => {
        if (result.data.status) {
          navigate('/dashboard/employee')
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h2 className="text-center">Adicionar Funcionário</h2>
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
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputPassword" className="form-label mt-2">
              Senha
            </label>
            <input
              type="password"
              name="inputPassword"
              id="inputPassword"
              placeholder="Digite seu e-mail"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <label htmlFor="inputSalary" className="form-label mt-2">
              Salário
            </label>
            <input
              type="text"
              name="inputSalary"
              id="inputSalary"
              placeholder="Digite seu salário"
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
              onChange={(e) =>
                setEmployee({ ...employee, category_id: e.target.value })
              }
            >
              {category.map((c, index) => {
                return <option key={index} value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="inputGroupFile01" className="form-label mt-2">
              Selecione uma Imagem
            </label>
            <input
              type="file"
              name="image"
              id="inputGroupFile01"
              className="form-control rounded-0"
              onChange={(e) =>
                setEmployee({ ...employee, image: e.target.files[0] })
              }
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100 mt-2">
              Add Funcionário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
