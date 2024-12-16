import { useState } from 'react';

export function ToDoList() {
  const [inputValue, setInputValue] = useState('');
  const [storeValue, setStoreValue] = useState([]); //correct naming conventions
  const [valueIndex, setValueIndex] = useState(null);
  const [editValue, setEditValue] = useState('');

  function handleInputClick(e) {
    setInputValue(e.target.value);
  }

  function handleAddClick() {
    if (inputValue) {
      setStoreValue(prev => [...prev, inputValue]);
      setInputValue('');
    }
  }

  function handleEditClick(index) {
    setValueIndex(index);
    setEditValue(storeValue[index]);
  }

  function handleEditChange(e) {
    setEditValue(e.target.value);
  }

  function handleSaveClick(index) {
    setStoreValue(prev => {
      return prev.map((todoValue, i) => {
        if (i === index) {
          return editValue;
        } else {
          return todoValue;
        }
      });
    });
    setValueIndex(null);
    setEditValue('');
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputClick} />
      <button onClick={handleAddClick}>Add</button>
      <ul>
        {storeValue.map((item, index) => (
          <li key={index}>
            {valueIndex === index ? <input type="text" value={editValue} onChange={handleEditChange} /> : <p>{item}</p>}
            <button>Delete</button>
            {valueIndex === index ? (
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
