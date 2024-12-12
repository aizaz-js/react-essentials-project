import React, { useState } from 'react';

const TABLE_HEADER = ['NAME', 'DESCRIPTION', 'ACTIONS'];

const TABLE_DATA = [
  {
    id: 1,
    name: 'Michael',
    description: 'I am a UI developer',
  },
  {
    id: 2,
    name: 'Trevor',
    description: 'I am a frontend developer',
  },
  {
    id: 3,
    name: 'Franklin',
    description: 'I am a backend developer',
  },
  {
    id: 4,
    name: 'Tommy',
    description: 'I am a full-stack developer',
  },
  {
    id: 5,
    name: 'Carl',
    description: 'I am a bubble developer',
  },
];

export function ReactTable() {
  const [editData, setEditData] = useState(TABLE_DATA);
  const [editingId, setEditingId] = useState(null);
  const [changeName, setChangeName] = useState('');
  const [changeDescription, setChangeDescription] = useState('');

  function handleEditClick(id, currentName, currentDescription) {
    setEditingId(id);
    setChangeName(currentName);
    setChangeDescription(currentDescription);
  }

  function handleSaveClick(id) {
    setEditData(prevData =>
      prevData.map(row => (row.id === id ? { ...row, name: changeName, description: changeDescription } : row))
    );
    setEditingId(null);
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            {TABLE_HEADER.map((value, id) => (
              <th key={id}>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {editData.map(data => (
            <tr key={data.id}>
              <td>
                {editingId === data.id ? (
                  <input required type="text" value={changeName} onChange={e => setChangeName(e.target.value)} />
                ) : (
                  data.name
                )}
              </td>
              <td>
                {editingId === data.id ? (
                  <input
                    type="text"
                    required
                    value={changeDescription}
                    onChange={e => setChangeDescription(e.target.value)}
                  />
                ) : (
                  data.description
                )}
              </td>
              <td className="button_wrapper">
                {editingId === data.id ? (
                  <button onClick={() => handleSaveClick(data.id)}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(data.id, data.name, data.description)}>Edit</button>
                )}

                <button onClick={() => setEditData(prevData => prevData.filter(row => row.id !== data.id))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
