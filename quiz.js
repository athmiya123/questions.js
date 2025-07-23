import React, { useState } from 'react';
import questions from '../data/questions';

const TOTAL_QUESTIONS = 5;

const getRandomIndex = (usedIndexes) => {
  const availableIndexes = questions
    .map((_, i) => i)
    .filter(i => !usedIndexes.includes(i));
  return availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
};

export default function Quiz() {
  const [usedIndexes, setUsedIndexes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(getRandomIndex([]));
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');
  const [feedback, setFeedback] = useState('');
  const [questionCount, setQuestionCount] = useState(1);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = () => {
    if (!selected) return;

    if (selected === currentQuestion.correctAnswer) {
      setScore(score + 1);
      setFeedback('✅ Correct!');
    } else {
      setFeedback(❌ Incorrect! The correct answer was: ${currentQuestion.correctAnswer});
    }

    setTimeout(() => {
      const newUsed = [...usedIndexes, currentIndex];
      if (questionCount >= TOTAL_QUESTIONS) {
        setFinished(true);
        return;
      }

      const nextIndex = getRandomIndex(newUsed);
      setUsedIndexes(newUsed);
      setCurrentIndex(nextIndex);
      setSelected('');
      setFeedback('');
      setQuestionCount(questionCount + 1);
    }, 1000);
  };

  const restartQuiz = () => {
    setUsedIndexes([]);
    setCurrentIndex(getRandomIndex([]));
    setScore(0);
    setSelected('');
    setFeedback('');
    setQuestionCount(1);
    setFinished(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>🧠 Quiz App</h1> {finished ? (
        <>
          <h2>🎉 Quiz Finished</h2>
          <p>Your final score: <strong>{score}</strong> / {TOTAL_QUESTIONS}</p>
          <button onClick={restartQuiz}>Restart Quiz</button>
        </>
      ) : (
        <>
          <h3>Question {questionCount} of {TOTAL_QUESTIONS}</h3>
          <p>{currentQuestion.text}</p>
          {currentQuestion.options.map((option) => (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selected === option}
                  onChange={(e) => setSelected(e.target.value)}
                />
                {option}
              </label>
            </div>
          ))}

          <button onClick={handleAnswer} disabled={!selected}>
            Submit Answer
          </button>

          {feedback && <p style={{ marginTop: '10px' }}>{feedback}</p>}
          <p>Score: {score}</p>
        </>
      )}
 </div>
  );
}

