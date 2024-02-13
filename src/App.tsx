import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import mealRoutes from "./routes/mealRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        {mealRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </Router>
  );
}
