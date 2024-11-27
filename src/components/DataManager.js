import React, { useState, useEffect } from "react";
import axios from "axios";

const DataManager = ({ onUpdate }) => {
  const [progressData, setProgressData] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    metric: "Poids", // Défaut : "Poids"
    value: "",
    user: 1,
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProgressData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/progress/");
      setProgressData(response.data);
      onUpdate(response.data); // Mise à jour des données dans App.js
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProgressData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8000/api/progress/${editingId}/`, formData);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:8000/api/progress/", formData);
      }
      fetchProgressData();
      setFormData({ date: "", metric: "Poids", value: "", user: 1 }); // Reset du formulaire
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/progress/${id}/`);
      fetchProgressData();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      date: item.date,
      metric: item.metric,
      value: item.value,
      user: item.user,
    });
  };

  return (
    <div className="container mt-4">
      <h2>Manage Progress</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-4">
          <input
            type="date"
            className="form-control"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </div>
        <div className="col-md-4">
          {/* Drop-down pour la sélection des métriques */}
          <select
            className="form-control"
            value={formData.metric}
            onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
            required
          >
            <option value="Poids">Poids</option>
            <option value="Distance">Distance</option>
            <option value="Mesure">Mesure</option>
          </select>
        </div>
        <div className="col-md-4">
          <input
            type="number"
            className="form-control"
            placeholder="Value"
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            required
          />
        </div>
        <div className="col-md-12">
          <button type="submit" className="btn btn-primary">
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <ul className="list-group mt-4">
        {progressData.map((item) => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            {item.date} - {item.metric}: {item.value}
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(item)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataManager;
