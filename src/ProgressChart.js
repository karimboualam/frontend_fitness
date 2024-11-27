import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressChart = () => {
    const [chartData, setChartData] = useState(null); // Initialisation à null pour éviter les erreurs.
    const [loading, setLoading] = useState(true); // État de chargement.
    const [error, setError] = useState(null); // État des erreurs API.

    useEffect(() => {
        // Appel à l'API
        axios
            .get("http://localhost:8000/api/progress/") // URL API.
            .then((response) => {
                console.log("Data from API:", response.data); // ligne pour afficher les données dans la console :
                const data = response.data;
                if (data && data.length > 0) {
                    const labels = data.map((item) => item.date);
                    const values = data.map((item) => item.value);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: "User Progress",
                                data: values,
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "rgba(75,192,192,1)",
                                borderWidth: 2,
                            },
                        ],
                    });
                } else {
                    // Si aucune donnée n'est renvoyée par l'API.
                    setChartData({
                        labels: [],
                        datasets: [
                            {
                                label: "User Progress",
                                data: [],
                                backgroundColor: "rgba(75,192,192,0.4)",
                                borderColor: "rgba(75,192,192,1)",
                                borderWidth: 2,
                            },
                        ],
                    });
                }
                setLoading(false); // Fin du chargement.
            })
            .catch((error) => {
                console.error("API Error:", error);
                setError("Failed to fetch progress data."); // Définit un message d'erreur.
                setLoading(false); // Fin du chargement même en cas d'erreur.
            });
    }, []);

    // Gestion des états de chargement et des erreurs
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Progress Chart</h2>
            <Line data={chartData} />
        </div>
    );
};

export default ProgressChart;
