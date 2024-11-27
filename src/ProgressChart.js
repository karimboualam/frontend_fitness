import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const ProgressChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        axios.get("http://localhost:8000/api/progress/")  // Remplacez par l'URL de votre API
            .then(response => {
                const data = response.data;
                const labels = data.map(item => item.date);
                const values = data.map(item => item.value);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "User Progress",
                            data: values,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderWidth: 2,
                        }
                    ]
                });
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Progress Chart</h2>
            <Line data={chartData} />
        </div>
    );
};

export default ProgressChart;
