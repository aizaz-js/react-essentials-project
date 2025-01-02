import React, { useState } from 'react';

export const ToDoLists = () => {
  const [todoValue, setTodoValue] = useState('');
  const [todos, setTodos] = useState([]);

  const handleInputValue = e => setTodoValue(e.target.value);

  const handleDeleteClick = index => setTodos(prev => prev.filter((_, i) => i !== index));

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      setTodos(prev => [...prev, todoValue]);
      setTodoValue('');
    }
  };
  return (
    <div>
      <input type="text" value={todoValue} onChange={handleInputValue} onKeyDown={handleKeyDown} />
      <ul>
        {todos.map((item, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteClick(index)}>X</button>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
