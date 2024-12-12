import { useState } from 'react';

const TABLE_HEADER = ['NAME', 'DESCRIPTION', 'ACTION'];
const TABLE_DATA = [
  { id: 1, name: 'Abdullah Shafiq', description: 'Opener Batsman' },
  { id: 2, name: 'Saim Ayub', description: 'Second Batsman' },
  { id: 3, name: 'Babar Azam', description: 'One Down' },
  { id: 4, name: 'Saud Shakeel', description: 'Two Down' },
  { id: 5, name: 'Shaheen Shah Afridi', description: 'Fast Bowler' },
  { id: 6, name: 'Naseem Shah', description: 'Fast Bowler' },
];

export function ReactTable2() {
  const [editable, setEditable] = useState(TABLE_DATA);
  const [editableId, setEditableId] = useState(null);
  const [nameChange, setNameChange] = useState('');
  const [changeDescription, setChangeDescription] = useState('');

  const handleEditClick = (id, currentName, currentDescription) => {
    setEditableId(id);
    setNameChange(currentName);
    setChangeDescription(currentDescription);
  };

  const handleSaveClick = id => {
    setEditable(prevData =>
      prevData.map(row => (row.id === id ? { ...row, name: nameChange, description: changeDescription } : row))
    );
    setEditableId(null);
  };

  const handleDeleteClick = id => {
    setEditable(prevData => prevData.filter(row => row.id !== id));
  };

  return (
    <table border="1" cellPadding="8" cellSpacing="0">
      <thead>
        <tr>
          {TABLE_HEADER.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {editable.map(value => (
          <tr key={value.id}>
            <td>
              {editableId === value.id ? (
                <input type="text" value={nameChange} onChange={e => setNameChange(e.target.value)} />
              ) : (
                value.name
              )}
            </td>
            <td>
              {editableId === value.id ? (
                <input type="text" value={changeDescription} onChange={e => setChangeDescription(e.target.value)} />
              ) : (
                value.description
              )}
            </td>
            <td>
              {editableId === value.id ? (
                <button onClick={() => handleSaveClick(value.id)}>Save</button>
              ) : (
                <button onClick={() => handleEditClick(value.id, value.name, value.description)}>Edit</button>
              )}
              <button onClick={() => handleDeleteClick(value.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
