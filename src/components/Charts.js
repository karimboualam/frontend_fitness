import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Enregistrement des modules nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Charts = ({ progressData }) => {
  // Filtrer les données par métrique
  const filterByMetric = (metric) => {
    return progressData.filter((item) => item.metric === metric);
  };

  // Créer les données pour le graphique
  const createChartData = (filteredData) => ({
    labels: filteredData.map((item) => item.date),
    datasets: [
      {
        label: filteredData[0]?.metric || "Data",
        data: filteredData.map((item) => item.value),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
  });

  const poidsData = createChartData(filterByMetric("Poids"));
  const distanceData = createChartData(filterByMetric("Distance"));
  const mesureData = createChartData(filterByMetric("Mesure"));

  return (
    <div className="container mt-4">
      <h2>Progress Charts</h2>
      <div className="row">
        <div className="col-md-4">
          <h4>Poids</h4>
          {poidsData.labels.length > 0 ? <Line data={poidsData} /> : <p>No data for Poids</p>}
        </div>
        <div className="col-md-4">
          <h4>Distance</h4>
          {distanceData.labels.length > 0 ? <Line data={distanceData} /> : <p>No data for Distance</p>}
        </div>
        <div className="col-md-4">
          <h4>Mesure</h4>
          {mesureData.labels.length > 0 ? <Line data={mesureData} /> : <p>No data for Mesure</p>}
        </div>
      </div>
    </div>
  );
};

export default Charts;
