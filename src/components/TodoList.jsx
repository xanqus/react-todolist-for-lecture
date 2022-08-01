import React from 'react'
import TodoListItem from './TodoListItem'
import '../styles/TodoList.scss'

const TodoList = ({ todos, onToggle, onRemove }) => {
  return (
    <ul className="TodoList">
      {todos.map((todo, index) => (
        <TodoListItem
          todo={todo}
          key={index}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </ul>
  )
}

export default TodoList
