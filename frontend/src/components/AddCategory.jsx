import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/add_category", { category })
      .then((result) => {
        if (result.data.status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center h-75">
      <div className="p-3 rounded w-24 border">
        <h2>Adicionar Categoria</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="category">
              <strong>Categoria:</strong>
            </label>
            <input
              type="text"
              name="category"
              id="category"
              placeholder="Crie uma Categoria.."
              onChange={(e) => setCategory(e.target.value)}
              className="form-control rounded-0"
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Add Categoria
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
