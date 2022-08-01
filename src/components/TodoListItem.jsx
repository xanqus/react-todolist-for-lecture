import React from 'react'
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
  MdModeEditOutline,
} from 'react-icons/md'
import cn from 'classnames'
import '../styles/TodoListItem.scss'

const TodoListItem = ({
  todo,
  onToggle,
  onRemove,
  onChangeSelectedTodo,
  onInsertToggle,
}) => {
  const { id, text, checked } = todo
  return (
    <li className="TodoListItem">
      <div
        className={cn('checkbox', { checked: checked })}
        onClick={() => {
          onToggle(id)
        }}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div
        className="edit"
        onClick={() => {
          onChangeSelectedTodo(todo)
          onInsertToggle()
        }}
      >
        <MdModeEditOutline />
      </div>
      <div
        className="remove"
        onClick={() => {
          onRemove(id)
        }}
      >
        <MdRemoveCircleOutline />
      </div>
    </li>
  )
}

export default TodoListItem
