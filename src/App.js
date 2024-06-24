import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/HomePage";
import Task1 from "./pages/task1";
import Task2 from "./pages/task2";
import Task3 from "./pages/task3";
import NotFound from "./pages/not_found";
import RealTimeMap from "./pages/real_time_map/RealTimeMap";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/coordinate" element={<Task1 />} />
        <Route path="/polygons" element={<Task2 />} />
        <Route path="/real_time_map" element={<RealTimeMap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
