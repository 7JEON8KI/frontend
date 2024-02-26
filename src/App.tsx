import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import mealRoutes from "./routes/mealRoutes";
import boRoutes from "./routes/boRoutes";

export default function App() {
  /* 웹 접근성 포커스링 처리 */
  document.addEventListener("keydown", function (e) {
    const key = e.key || e.keyCode;
    // Tab 키를 눌렀을 때만 클래스를 추가하여 키보드 포커스임을 표시
    if (key === "Tab" || key === 9) {
      document.body.classList.add("user-is-tabbing");
    }
  });

  document.addEventListener("mousedown", function () {
    // 마우스 클릭 시 클래스 제거
    document.body.classList.remove("user-is-tabbing");
  });

  return (
    <Router>
      <Routes>
        {mealRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <Routes>
        {boRoutes.map((route, index) => (
          <Route key={index} path={`/bo${route.path}`} element={<route.component />} />
        ))}
      </Routes>
    </Router>
  );
}
