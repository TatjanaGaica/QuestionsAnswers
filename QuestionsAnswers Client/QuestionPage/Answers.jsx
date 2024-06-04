import Answer from "./Answer";

function Answers(props) {
  console.log(props);
  return props.answers.map((answer) => {
    return (
      <Answer
        key={answer.id}
        answer={answer}
        editAnswer={props.editAnswer}
        deleteAnswer={props.deleteAnswer}
      ></Answer>
    );
  });
}

export default Answers;
