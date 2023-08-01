import React, { useEffect, useState } from "react";
import QuestionsData from "./McqQuestions";
import "../css/ResultQuiz.css";
const ResultQuiz = ({ data }) => {
  const [totalMarks, setTotalMarks] = useState(0);
  const calculatePoints = (submittedAnswer, correctAnswer) => {
    return submittedAnswer === correctAnswer ? 1 : 0;
  };

  useEffect(() => {
    let totalPoints = 0;
    for (const result of data) {
      const question = QuestionsData.find((q) => q.id === result.questionId);
      const submittedAnswerIndex = result.answerIndex;
      const correctAnswerIndex = question.answerOptions.findIndex(
        (option) => option.isCorrect
      );
      totalPoints += calculatePoints(submittedAnswerIndex, correctAnswerIndex);
    }
    setTotalMarks(totalPoints);
  }, [data]);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Question / question id (as per your convenience)</th>
            <th>Submitted ans</th>
            <th>Correct ans</th>
            <th>Correct</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
          {data.map((result) => {
            const question = QuestionsData.find(
              (q) => q.id === result.questionId
            );
            const submittedAnswer = result.answerIndex;
            const correctAnswer = question.answerOptions.findIndex(
              (option) => option.isCorrect
            );
            const isCorrect = submittedAnswer === correctAnswer;
            const points = calculatePoints(submittedAnswer, correctAnswer);

            return (
              <tr key={result.questionId}>
                <td>{` Question ${result.questionId}`}</td>
                <td>{result.answerIndex + 1}</td>
                <td>{question.answerNumber}</td>
                <td>{isCorrect ? "Correct" : "Incorrect"}</td>
                <td>{points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="total_marks">Total Marks - {totalMarks} / 10</div>
      {
        totalMarks > 5 ? <div className="success_msg">Congrats you are selected</div> : <div className="fail_msg">Show better luck next time.</div>
      }
    </>
  );
};

export default ResultQuiz;
