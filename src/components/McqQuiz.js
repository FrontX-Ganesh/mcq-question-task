import React, { useState } from "react";
import QuestionsData from "./McqQuestions";
import "../css/McqQuiz.css";

const McqQuiz = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswerIndex(answerIndex);
  };

  return (
    <div className="box">
      {`${QuestionsData[questionNumber].id}. ${QuestionsData[questionNumber].question}`}
      {QuestionsData[questionNumber].answerOptions.map((answer, index) => {
        return (
          <button
            className={`answerButton ${
              selectedAnswerIndex === index ? "selected" : ""
            }`}
            key={index}
            onClick={() => handleAnswerClick(index)}
          >
            {answer.answerText}
          </button>
        );
      })}

      <div className="pre_next_buttons">
        <button
          className="pre_button"
          style={{ display: questionNumber === 0 ? "none" : "block" }}
          onClick={() => setQuestionNumber(questionNumber - 1)}
        >
          Previous
        </button>
        <button
          className="next_button"
          style={{ display: questionNumber === 9 ? "none" : "block" }}
          onClick={() => setQuestionNumber(questionNumber + 1)}
        >
          Next
        </button>
        <button
          className="next_button"
          style={{ display: questionNumber === 9 ? "block" : "none" }}
          onClick={() => setQuestionNumber(questionNumber + 1)}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default McqQuiz;
