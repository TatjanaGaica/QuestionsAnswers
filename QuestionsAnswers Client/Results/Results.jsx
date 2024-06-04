import "../src/App.css";
import "../src/index.css";
import "./Results.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Results() {
  const location = useLocation();
  const tagIds = location.state.tagIds
    .map((checked, index) => {
      if (checked) return index + 1;
    })
    .filter((res) => res != null);

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7042/Question/GetQuestions", {
      method: "POST",
      body: JSON.stringify({
        tagIds: tagIds,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [tagIds]);

  return (
    <div>
      <h1>Search results</h1>
      {questions.map((question) => {
        return (
          <Link to={`../QuestionPage/${question.id}`} key={question.id}>
            <h2>{question.text}</h2>
          </Link>
        );
      })}
    </div>
  );
}

export default Results;
