import { useState } from "react";
import "./QuestionPage.css";

function Answer(props) {
  const [editAnswer, setAnswer] = useState(props.answer.text);

  function clickEditAnswer() {
    props.editAnswer(props.answer.id, editAnswer);
    setIsEdit(false);
  }

  function clickDeleteAnswer() {
    props.deleteAnswer(props.answer.id);
  }

  const [isEdit, setIsEdit] = useState(false);

  function startEdit() {
    setIsEdit(true);
  }

  function cancelEdit() {
    setIsEdit(false);
  }

  return (
    <div>
      {isEdit ? (
        <div>
          <input
            type="text"
            name="dataType"
            id="dataType"
            placeholder="New answer here..."
            value={editAnswer}
            onChange={(e) => setAnswer(e.target.value)}
          ></input>
          <button onClick={clickEditAnswer}>Submit</button>
          <button onClick={cancelEdit}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2 onClick={startEdit}>{props.answer.text}</h2>
          <button className="delete-btn" onClick={clickDeleteAnswer}>
            &#215;
          </button>
        </div>
      )}
    </div>
  );
}

export default Answer;
