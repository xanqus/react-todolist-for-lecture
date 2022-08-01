import React, { useState, useRef } from 'react'
import TodoInsert from './components/TodoInsert'
import TodoTemplate from './components/TodoTemplate'
function App() {
  const [todos, setTodos] = useState([])
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [insertToggle, setInsertToggle] = useState(false)

  const nextId = useRef(1)

  const onInsert = text => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    }
    setTodos(todos => todos.concat(todo))
    nextId.current++
  }

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <button
        onClick={() => {
          console.log(todos)
        }}
      >
        check
      </button>
    </TodoTemplate>
  )
}

export default App
