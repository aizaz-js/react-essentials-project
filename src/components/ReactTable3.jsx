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

export function ReactTable3() {
  const [editData, setEditData] = useState(TABLE_DATA);
  const [editTableId, setEditTableId] = useState(null);
  const [changeName, setChangeName] = useState('');
  const [changeDescription, setChangeDescription] = useState('');

  function handleEditClick(id, initialName, initialDescription) {
    setEditTableId(id);
    setChangeName(initialName);
    setChangeDescription(initialDescription);
  }

  function handleSaveClick(id) {
    setEditData(prevData =>
      prevData.map(row => (row.id === id ? { ...row, name: changeName, description: changeDescription } : row))
    );
    setEditTableId(null);
  }

  function handleDeleteClick(id) {
    setEditData(prevData => prevData.filter(row => row.id !== id));
  }

  return (
    <table>
      <thead>
        <tr>
          {TABLE_HEADER?.map(data => (
            <th key={data}>{data}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {editData?.map((value, id) => (
          <tr key={id}>
            <td>
              {editTableId === value.id ? (
                <input type="text" value={changeName} onChange={e => setChangeName(e.target.value)} />
              ) : (
                value.name
              )}
            </td>
            <td>
              {editTableId === value.id ? (
                <input type="text" value={changeDescription} onChange={e => setChangeDescription(e.target.value)} />
              ) : (
                value.description
              )}
            </td>
            <td>
              {editTableId === value.id ? (
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
