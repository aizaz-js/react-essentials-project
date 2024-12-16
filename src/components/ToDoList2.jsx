import React, { useState } from 'react';

export function ToDoList2() {
  const [inputValue, SetInputValue] = useState('');
  const [toDoValue, setToDoValue] = useState([]);
  const [listIndex, setListIndex] = useState('');
  const [toDoEdit, setToDoEdit] = useState('');

  function handleInputClick(e) {
    SetInputValue(e.target.value);
  }
  function handleAddClick() {
    if (inputValue) {
      setToDoValue(prev => [...prev, inputValue]);
      SetInputValue('');
    }
  }

  function handleEditClick(index) {
    setListIndex(index);
    setToDoEdit(toDoValue[index]);
  }

  function handleSaveClick(index) {
    setToDoValue(prev => prev.map((item, i) => (i === index ? toDoEdit : item)));
    setToDoEdit('');
    setListIndex('');
  }

  function handleDeleteClick() {}

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputClick} />
      <button onClick={handleAddClick}>Add</button>
      <ul>
        {toDoValue.map((item, index) => (
          <li key={index}>
            {listIndex === index ? (
              <input type="text" value={toDoEdit} onChange={e => setToDoEdit(e.target.value)} />
            ) : (
              <p>{item}</p>
            )}
            <button>Delete</button>
            {listIndex === index ? (
              <button onClick={() => handleSaveClick(index)}>Save</button>
            ) : (
              <button onClick={() => handleEditClick(index)}>Edit</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
