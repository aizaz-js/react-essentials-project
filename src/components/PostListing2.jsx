import React, { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';

const HEADER = ['ID', 'TITLE', 'DESCRIPTION', 'ACTIONS'];

export function PostListing2() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [dataId, setDataId] = useState(null);
  const [dataTitle, setDataTitle] = useState('');
  const [dataBody, setDataBody] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const listingPerPage = 10;

  const filteredData =
    search.trim().length > 0
      ? data.filter(
          item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.body.toLowerCase().includes(search.toLowerCase())
        )
      : data;

  const indexOfLastRow = currentPage * listingPerPage;
  const indexOfFirstRow = indexOfLastRow - listingPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / listingPerPage);

  const navigate = useNavigate();

  // Fetch data from API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  // Handle adding a new post (POST)
  const handleAddPost = () => {
    const newPost = { title: 'New Post', body: 'This is a new post.' };
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost),
    })
      .then(response => response.json())
      .then(newPost => setData(prev => [newPost, ...prev]))
      .catch(error => setError(error.message));
  };

  // Handle updating a post (PUT)
  const handleSaveClick = id => {
    const updatedPost = { title: dataTitle, body: dataBody };
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPost),
    })
      .then(response => response.json())
      .then(updatedPost => setData(prev => prev.map(item => (item.id === id ? updatedPost : item))))
      .catch(error => setError(error.message))
      .finally(() => {
        setDataId(null);
        setDataTitle('');
        setDataBody('');
      });
  };

  // Handle partial updates (PATCH)
  const handlePartialUpdate = id => {
    const partialUpdate = { title: dataTitle }; // Example: Only update the title
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partialUpdate),
    })
      .then(response => response.json())
      .then(updatedPost => setData(prev => prev.map(item => (item.id === id ? updatedPost : item))))
      .catch(error => setError(error.message));
  };

  // Handle deleting a post (DELETE)
  const handleDeleteClick = id => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' })
      .then(() => setData(prev => prev.filter(item => item.id !== id)))
      .catch(error => setError(error.message));
  };

  return (
    <main>
      <header>
        <h1>Post Listing</h1>
        <button onClick={handleAddPost}>Add New Post</button>
        <input
          type="search"
          placeholder="Search posts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search posts"
        />
      </header>

      {loading ? (
        <div className="main-loader">
          <div className="loader"></div>
        </div>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                {HEADER.map(item => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {dataId === item.id ? (
                        <textarea className="input" value={dataTitle} onChange={e => setDataTitle(e.target.value)} />
                      ) : (
                        <p onClick={() => navigate(generatePath(ROUTES.POST, { id: item.id }))}>{item.title}</p>
                      )}
                    </td>
                    <td>
                      {dataId === item.id ? (
                        <textarea className="input" value={dataBody} onChange={e => setDataBody(e.target.value)} />
                      ) : (
                        <p>{item.body}</p>
                      )}
                    </td>
                    <td>
                      <div className="button-listing">
                        {dataId === item.id ? (
                          <>
                            <button onClick={() => handleSaveClick(item.id)}>Save</button>
                            <button onClick={() => handlePartialUpdate(item.id)}>Save Partial</button>
                          </>
                        ) : (
                          <button onClick={() => handleEditClick(item.id, item.title, item.body)}>Edit</button>
                        )}
                        <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={HEADER.length} style={{ textAlign: 'center' }}>
                    No items to show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </main>
  );
}
