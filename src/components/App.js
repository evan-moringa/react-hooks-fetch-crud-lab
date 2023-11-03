import React, { useState, useEffect } from "react";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false); // To control the form display
  const [newQuestion, setNewQuestion] = useState('');

  useEffect(() => {
    
    fetch('http://localhost:4000/questions')
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, [questions]);




  const handleNewQuestion = (event) => {
    event.preventDefault();

    
    const newQuestionObject = {
      text: newQuestion,
    
    };

    fetch(`http://localhost:4000/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestionObject),
    })
      .then((response) => response.json())
      .then((data) => {
      
        setQuestions([...questions, data]);
        
        setNewQuestion('');
      })
      .catch((error) => {
        console.error('Error creating a new question:', error);
      });
  };

  


  const deleteQuestion = async (id) => {
    try {
      // Make a DELETE request to the API to delete the question by its id
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting the question');
      }

      // Remove the question from the client-side state
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (error) {
      console.error('Error deleting the question:', error);
    }
  };

  

  return (

    <div className="App">
      <button onClick={() => setShowForm(!showForm)}>New Question</button>
      <QuestionList questions={questions} onDelete={deleteQuestion} />

      {showForm && (
        <form onSubmit={handleNewQuestion}>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Enter your new question"
          />
          <button type="submit">Submit</button>
        </form>
      )}

      
    </div>
    
    

    
  );
}

export default App;
