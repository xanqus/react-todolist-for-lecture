import React from 'react'
import TodoListItem from './TodoListItem'
import '../styles/TodoList.scss'

const TodoList = ({
  todos,
  onToggle,
  onRemove,
  onChangeSelectedTodo,
  onInsertToggle,
}) => {
  return (
    <ul className="TodoList">
      {todos.map((todo, index) => (
        <TodoListItem
          todo={todo}
          key={index}
          onToggle={onToggle}
          onRemove={onRemove}
          onChangeSelectedTodo={onChangeSelectedTodo}
          onInsertToggle={onInsertToggle}
        />
      ))}
    </ul>
  )
}

export default TodoList
