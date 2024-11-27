import React, { useState } from "react";
import DataManager from "./components/DataManager";
import Charts from "./components/Charts";

const App = () => {
  const [progressData, setProgressData] = useState([]);

  return (
    <div className="container">
      <h1 className="text-center my-4">Progress Tracker</h1>
      <DataManager onUpdate={setProgressData} />
      <Charts progressData={progressData} />
    </div>
  );
};

export default App;
