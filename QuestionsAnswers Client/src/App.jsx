import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../Home/Home.jsx";
import Results from "../Results/Results.jsx";
import QuestionPage from "../QuestionPage/QuestionPage";
import NoPage from "../NoPage/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/Results" element={<Results />} />
        <Route path="/QuestionPage/:id" element={<QuestionPage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}
