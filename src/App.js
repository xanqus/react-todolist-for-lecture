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
    try {
      await axios({
        url: `http://localhost:4000/todos/check/${id}`,
        method: 'PATCH',
      })
      setTodos(todos =>
        todos.map(todo =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo
        )
      )
    } catch (e) {
      setError(e)
    }
  }

  const nextId = useRef(1)

  const onInsertToggle = () => {
    setInsertToggle(prev => !prev)
  }
  const onChangeSelectedTodo = todo => {
    setSelectedTodo(selectedTodo => todo)
  }

  const onRemove = async id => {
    try {
      await axios({
        url: `http://localhost:4000/todos/${id}`,
        method: 'DELETE',
      })
      setTodos(todos => todos.filter(todo => todo.id !== id))
    } catch (e) {
      setError(e)
    }
  }

  const onUpdate = async (id, text) => {
    try {
      await axios({
        url: `http://localhost:4000/todos/${id}`,
        method: 'PATCH',
        data: { text, perform_date: '2022-08-04 12:12:12' },
      })
      setTodos(todos =>
        todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
      )
      onInsertToggle()
    } catch (e) {
      setError(e)
    }
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
    console.log(error)
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
