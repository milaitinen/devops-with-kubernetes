import './App.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const backendUrl = 'http://localhost:8081'

const App = () => {
  const [inputText, setInput] = useState('')
  const [todoList, setTodoList] = useState([])

  const fetchTodos = async () => {
    const res = await axios(`${backendUrl}/todos`)
    setTodoList(res.data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = { headers: {"content-type": "text/plain"} }
    await axios.post(`${backendUrl}/todos`, inputText, options)
    fetchTodos()
    setInput('')
  }

  const handleChange = (event) => {
    setInput(event.target.value)
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      <img src={`${backendUrl}/files/image.jpg`} alt='todays-img' />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="new-todo-input"
          value={inputText}
          onChange={handleChange}
        />
        <button type="submit" id="create-todo-btn">
          Create TODO
        </button>
      </form>

      <ul id="todo-list">
        {todoList.map((todo, i) => <li key={i}>{todo}</li>)}
      </ul>
  </div>
  );
}

export default App;
