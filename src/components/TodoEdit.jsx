import { useEffect, useState } from 'react'
import '../styles/TodoEdit.scss'

function ToDoEdit({ selectedTodo, onUpdate }) {
  const [value, setValue] = useState('')
  const onChange = e => {
    setValue(e.target.value)
  }
  const onSubmit = e => {
    e.preventDefault()
    onUpdate(selectedTodo.id, value)
    setValue('') //value 초기화
    //기본이벤트(새로고침) 방지
  }
  useEffect(() => {
    if (selectedTodo) {
      setValue(prevText => selectedTodo.text)
    }
    console.log(selectedTodo)
  }, [selectedTodo])
  return (
    <div className="background">
      <form onSubmit={onSubmit} className="todoedit__insert">
        <h2>수정하기</h2>
        <input
          onChange={onChange}
          value={value}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  )
}

export default ToDoEdit
