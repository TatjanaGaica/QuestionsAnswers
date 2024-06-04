import "../src/App.css";
import "../src/index.css";
import "./QuestionPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Answers from "./Answers";

function QuestionPage() {
  const { id } = useParams();

  const [question, setQuestion] = useState({ tags: [] });

  useEffect(() => {
    fetch("https://localhost:7042/Question/GetQuestion", {
      method: "POST",
      body: JSON.stringify({
        questionId: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestion(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7042/Question/GetAnswers", {
      method: "POST",
      body: JSON.stringify({
        questionId: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAnswers(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const [newAnswer, setAnswer] = useState("");

  const addAnswer = () => {
    const answer = newAnswer.trim();
    if (answer) {
      fetch("https://localhost:7042/Question/AddAnswer", {
        method: "PUT",
        body: JSON.stringify({
          questionId: id,
          answerText: answer,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setAnswer("");
          setAnswers(answers.concat({ id: data.id, text: data.text }));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const editAnswer = (id, answerText) => {
    console.trace();
    console.log("editAnswer");
    fetch("https://localhost:7042/Question/EditAnswer", {
      method: "POST",
      body: JSON.stringify({
        answerId: id,
        answerText: answerText,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        setAnswers(
          answers.map((answer) => {
            if (answer.id == id) {
              return { id: answer.id, text: answerText, questionId: answer.id };
            } else {
              return {
                id: answer.id,
                text: answer.text,
                questionId: answer.id,
              };
            }
          })
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const deleteAnswer = (id) => {
    fetch("https://localhost:7042/Question/DeleteAnswer", {
      method: "DELETE",
      body: JSON.stringify({
        answerId: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        setAnswers(answers.filter((answer) => answer.id != id));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function clearAllInputs() {
    var allInputs = document.querySelectorAll("input");
    allInputs.forEach((singleInput) => (singleInput.value = ""));
  }

  function onInputClick() {
    addAnswer();
    clearAllInputs();
  }
  return (
    <div>
      <h1>Answers</h1>
      <h2>Q: {question.text}</h2>
      {question.tags.map((tag, index) => (
        <div key={index} className="tag ">
          {tag.text}{" "}
        </div>
      ))}
      <Answers
        answers={answers}
        editAnswer={editAnswer}
        deleteAnswer={deleteAnswer}
      ></Answers>
      <input
        type="text"
        placeholder="Your answer here..."
        onChange={(e) => setAnswer(e.target.value)}
        required
      ></input>
      <button onClick={onInputClick}>Submit</button>
    </div>
  );
}

export default QuestionPage;
