import { useState } from 'react';

const HEADER = ['NAME', 'DESCRIPTION', 'ACTION'];
const PLAYER_DATA = [
  { id: 1, name: 'John Doe', description: 'Software Engineer' },
  { id: 2, name: 'Jane Smith', description: 'Graphic Designer' },
  { id: 3, name: 'Michael Brown', description: 'Data Analyst' },
  { id: 4, name: 'Emily Johnson', description: 'Product Manager' },
  { id: 5, name: 'Chris Davis', description: 'Marketing Specialist' },
  { id: 6, name: 'Sarah Wilson', description: 'Human Resources Manager' },
];

export function ReactTable4() {
  const [editMode, setEditMode] = useState(PLAYER_DATA);
  const [editId, setEditId] = useState(null);
  const [nameChange, setNameChange] = useState('');
  const [descriptionChange, setDescriptionChange] = useState('');

  function handleEditClick(id, initialName, initialDescription) {
    setEditId(id);
    setNameChange(initialName);
    setDescriptionChange(initialDescription);
  }

  function handleSaveClick(id) {
    setEditMode(prevData =>
      prevData.map(row => (row.id === id ? { ...row, name: nameChange, description: descriptionChange } : row))
    );
    setEditId(null);
  }

  function handleDeleteClick(id) {
    setEditMode(prevData => prevData.filter(row => row.id !== id));
  }

  return (
    <table>
      <thead>
        <tr>
          {HEADER.map(item => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {editMode.map((item, id) => (
          <tr key={id}>
            <td>
              {editId === item.id ? (
                <input type="text" value={nameChange} onChange={e => setNameChange(e.target.value)} />
              ) : (
                item.name
              )}
            </td>
            <td>
              {editId === item.id ? (
                <input type="text" value={descriptionChange} onChange={e => setDescriptionChange(e.target.value)} />
              ) : (
                item.description
              )}
            </td>
            <td>
              {editId === item.id ? (
                <button onClick={() => handleSaveClick(item.id)}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(item.id, item.name, item.description)}>Edit</button>
              )}

              <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
