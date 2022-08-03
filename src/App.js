import React, { useState, useRef, useEffect } from 'react'
import TodoInsert from './components/TodoInsert'
import TodoTemplate from './components/TodoTemplate'
import TodoList from './components/TodoList'
import TodoEdit from './components/TodoEdit'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
function App() {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [todos, setTodos] = useState([])
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [insertToggle, setInsertToggle] = useState(false)

  const onToggle = async id => {
    await axios.patch(`http://localhost:4000/todos/check/${id}`)
    setTodos(todos =>
      todos.map(todo =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    )
  }

  const nextId = useRef(1)

  const onInsertToggle = () => {
    setInsertToggle(prev => !prev)
  }
  const onChangeSelectedTodo = todo => {
    setSelectedTodo(selectedTodo => todo)
  }

  const onRemove = id => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  const onUpdate = (id, text) => {
    setTodos(todos =>
      todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
    )
    onInsertToggle()
  }

  const onInsert = async text => {
    try {
      const data = await axios({
        url: 'http://localhost:4000/todos',
        method: 'POST',
        data: { text },
      })
      setTodos(todos => [...todos, data.data])
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios({
          url: 'http://localhost:4000/todos',
          method: 'GET',
        })
        setTodos(todos => [...data.data])
        setIsLoading(false)
      } catch (e) {
        setError(e)
      }
    }
    getData()
  }, [])
  if (error) {
    return <>에러: {error.message}</>
  }

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList
        todos={todos}
        onToggle={onToggle}
        onRemove={onRemove}
        onChangeSelectedTodo={onChangeSelectedTodo}
        onInsertToggle={onInsertToggle}
      />
      {insertToggle && (
        <TodoEdit selectedTodo={selectedTodo} onUpdate={onUpdate} />
      )}
    </TodoTemplate>
  )
}

export default App
