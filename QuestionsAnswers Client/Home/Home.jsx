import "../src/App.css";
import "../src/index.css";
import "./Home.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("https://localhost:7042/Question/GetTags")
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
        setSelectedTags(data.map(() => false));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [selectedTags, setSelectedTags] = useState([]);

  const handleOnChange = (position) => {
    const updatedCheckedState = selectedTags.map((item, index) =>
      index === position ? !item : item
    );
    setSelectedTags(updatedCheckedState);
  };

  const [newQuestion, setQuestion] = useState("");
  const [newTagId, setTagId] = useState("1");

  const addQuestion = () => {
    const question = newQuestion.trim();
    const tagId = newTagId;
    if (question) {
      fetch("https://localhost:7042/Question/AddQuestion", {
        method: "PUT",
        body: JSON.stringify({
          question: question,
          tagIds: [tagId],
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(() => {
          setQuestion("");
          setTagId(tagId);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <div>
      <h1>QuestionsAnswers App</h1>
      <div className="row">
        <div className="column">
          <h2>Pick the keywords and browse away!</h2>
          {tags.map((tag, index) => {
            return (
              <label key={index} className="container" htmlFor="tag">
                <input
                  type="checkbox"
                  checked={selectedTags[index]}
                  onChange={() => handleOnChange(index)}
                ></input>
                {tag.text}
              </label>
            );
          })}
          <Link to="/Results" state={{ tagIds: selectedTags }}>
            <button>Proceed</button>
          </Link>
        </div>
        <div className="column">
          <h2>Want to ask a question? Go ahead!</h2>
          <div>
            <input
              type="text"
              placeholder="Your question here..."
              value={newQuestion}
              onChange={(e) => setQuestion(e.target.value)}
              required
            ></input>
            <p>Choose tag</p>
            <select onChange={(e) => setTagId(e.target.value)}>
              {tags.map((tag) => {
                return (
                  <option key={tag.id} value={tag.id} required>
                    {tag.text}
                  </option>
                );
              })}
            </select>
          </div>
          <></>
          <Link to="/Results" state={{ tagIds: [] }}>
            <button onClick={addQuestion}>Submit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
