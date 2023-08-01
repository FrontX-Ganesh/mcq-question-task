import React, { useState } from "react";
import QuestionsData from "./McqQuestions";
import ResultQuiz from "./ResultQuiz";
import { useDispatch, useSelector } from 'react-redux';
import { setUserAnswer } from "../action";
import "../css/McqQuiz.css";

const McqQuiz = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [selectedAnswerIndexes, setSelectedAnswerIndexes] = useState({});
  const dispatch = useDispatch();
  const allQuestions = QuestionsData.length;
  const allAnswers = useSelector((state) => state.quiz.answers);
  const [showResult, setShowResult] = useState(false);
  const [allSelectedOptions, setAllSelectedOptions] = useState({})

  const handleAnswerClick = (questionId, answerIndex) => {
    setSelectedAnswerIndexes((prevState) => ({
        ...prevState,
        [questionId]: answerIndex,
      }));
  
    dispatch(setUserAnswer({ questionId, answerIndex }));
  };

  const getSelectedAnswerIndex = (questionId) => {
    return selectedAnswerIndexes[questionId] !== undefined
      ? selectedAnswerIndexes[questionId]
      : null;
  };

  const submitQuiz = (answers) => {
    let questionAnsers = [];
    for (let i = 0; i < allQuestions; i++) {
        const questionId = QuestionsData[i].id;
        const answerIndex = answers[questionId];
        questionAnsers.push({ questionId, answerIndex });
    }
    console.log(questionAnsers);
    setAllSelectedOptions(questionAnsers);
    setShowResult(true);
  };

  return (
    <>  {
        !showResult ?
        <div className="box">
            {`${QuestionsData[questionNumber].id}. ${QuestionsData[questionNumber].question}`}
            {QuestionsData[questionNumber].answerOptions.map((answer, index) => {
                const isSelected = getSelectedAnswerIndex(QuestionsData[questionNumber].id) === index;
                return (
                <button
                    className={`answerButton ${
                        isSelected ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => handleAnswerClick(QuestionsData[questionNumber].id, index)}
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
                onClick={() => submitQuiz(allAnswers)}
                >
                Submit
                </button>
            </div>
        </div>
        :
        <ResultQuiz data={allSelectedOptions} />
        }
    </>
  );
};

export default McqQuiz;
