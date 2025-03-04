import React, { useState } from "react";
import "./quizs.css"

// Sample quiz questions
const questions = [
  {
    questionText: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    questionText: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars',
  },
  {
    questionText: 'Who wrote "Romeo and Juliet"?',
    options: ['Shakespeare', 'Dickens', 'Hemingway', 'Austen'],
    correctAnswer: 'Shakespeare',
  },
  {
    questionText: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correctAnswer: 'Pacific',
  },
];

function Quizs() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // restart after completion
  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setSelectedAnswer(null);
  };

  // handle user answers
  const handleAnswer = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    setSelectedAnswer(answer); // Set the selected answer
  };

  // next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null); // reset selected answer
    } else {
      setQuizCompleted(true);
    }
  };

  // calculate scores
  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      if (answer === questions[index].correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  return (
    <div className="quizs">
      {!quizCompleted ? (
        <div className="questions">
          <div className="header">
            <h2>Q{currentQuestionIndex + 1}:</h2>
            <h3>{questions[currentQuestionIndex].questionText}</h3>
          </div>
          <div className="question">
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={option} className="answers-list">
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleAnswer(option)} // Select the answer
                />
                <label
                  htmlFor={`option-${index}`}
                  style={{
                    cursor: "pointer",
                    backgroundColor: selectedAnswer === option ? "#d3f8e2" : "",
                  }}
                >
                  {option}
                </label>
              </div>
            ))}
            <button className="next" onClick={handleNext} disabled={!selectedAnswer}>Next</button>
          </div>
        </div>
      ) : (
        <div className="end">
          <h2>Quiz Completed!</h2>
          <p>Your score: {calculateScore()} / {questions.length}</p>
          <button onClick={handleRestart} className="restart-button">
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default Quizs;
