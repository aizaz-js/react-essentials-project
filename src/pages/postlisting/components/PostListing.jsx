import React, { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { Search } from 'lucide-react';
import { CreatePost } from './CreatePost';

const HEADER = ['ID', 'TITLE', 'DESCRIPTION', 'ACTIONS'];
const limit = 10;

export function PostListing() {
  const navigate = useNavigate();
  const [postListingData, setPostListingData] = useState([]);
  const [post, setPost] = useState({
    postId: null,
    postTitle: '',
    postBody: '',
  });
  const [PostListingError, setPostListingError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState({
    saveLoading: false,
    dataLoading: true,
  });
  const [createPost, setCreatePost] = useState(false);

  const filteredData =
    search.trim().length > 0
      ? postListingData.filter(
          item =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.body.toLowerCase().includes(search.toLowerCase())
        )
      : postListingData;

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${limit}`)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        return response.json();
      })
      .then(data => setPostListingData(data))
      .catch(error => setPostListingError(error.message))
      .finally(() => setLoading(prev => ({ ...prev, dataLoading: false })));
  }, [currentPage]);

  function handleSaveClick(id) {
    setLoading(prev => ({ ...prev, saveLoading: true }));

    const updatedPost = {
      title: post.postTitle,
      body: post.postBody,
    };

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    })
      .then(response => {
        if (!response.ok) throw new Error(`HTTP Error : ${response.status} ${response.statusText}`);
        return response.json();
      })
      .then(updatedData => {
        setPostListingData(prev => prev.map(item => (item.id === id ? { ...item, ...updatedData } : item)));
        setPost(prev => ({ ...prev, postId: null, postTitle: '', postBody: '' }));
      })
      .finally(() => setLoading(prev => ({ ...prev, saveLoading: false })));
  }

  const handleCellClick = id => navigate(generatePath(ROUTES.POST, { id }));

  const handleEditClick = (id, title, body) =>
    setPost(prev => ({ ...prev, postId: id, postTitle: title, postBody: body }));

  const handleDeleteClick = id => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setPostListingData(prev => {
        const updatedData = prev.filter(item => item.id !== id);
        if (updatedData.length === 0 && currentPage > 1) {
          setCurrentPage(prev => prev - 1);
        }
        return updatedData;
      });
    });
  };

  const handleCancelClick = () => {
    setPost(prev => ({ ...prev, postId: null, postTitle: '', postBody: '' }));
  };

  const handleSearchInput = e => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleNextClick = () => setCurrentPage(prev => prev + 1);
  const handlePrevClick = () => setCurrentPage(prev => prev - 1);
  const handleCreateClick = () => setCreatePost(true);
  const AddNewPost = newPost => {
    setPostListingData(prev => [newPost, ...prev]);
    setCreatePost(false);
    setPost({ postId: null, postTitle: '', postBody: '' });
  };
  return (
    <main>
      {createPost ? (
        <CreatePost backButton={setCreatePost} onPostAdded={AddNewPost} />
      ) : (
        <div>
          <header>
            <h1>Post Listing</h1>
            <div className="header-listing">
              <div className="search-input">
                <Search className="seach-icon" />
                <input type="search" placeholder="Search posts..." value={search} onChange={handleSearchInput} />
              </div>
              <button onClick={handleCreateClick}>Create</button>
            </div>
          </header>

          {loading.dataLoading ? (
            <div className="main-loader">
              <div className="loader"></div>
            </div>
          ) : PostListingError ? (
            <p className="error">Error: {PostListingError}</p>
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
                  {filteredData.length > 0 ? (
                    filteredData?.map(item => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          {post.postId === item.id ? (
                            <textarea
                              className="input"
                              value={post.postTitle}
                              onChange={e => setPost(prev => ({ ...prev, postTitle: e.target.value }))}
                            />
                          ) : (
                            <p onClick={() => handleCellClick(item.id)}>{item.title}</p>
                          )}
                        </td>
                        <td>
                          {post.postId === item.id ? (
                            <textarea
                              className="input"
                              value={post.postBody}
                              onChange={e => setPost(prev => ({ ...prev, postBody: e.target.value }))}
                            />
                          ) : (
                            <p onClick={() => handleCellClick(item.id)}>{item.body}</p>
                          )}
                        </td>
                        <td>
                          <div className="button-listing">
                            {post.postId === item.id ? (
                              <>
                                <button onClick={() => handleSaveClick(item.id)} disabled={loading.saveLoading}>
                                  {loading.saveLoading ? <span className="button-loader"></span> : 'Save'}
                                </button>
                                <button onClick={() => handleCancelClick(item.id)}>Cancel</button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => handleEditClick(item.id, item.title, item.body)}>Edit</button>
                                <button onClick={() => handleDeleteClick(item.id)}>Delete</button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} align="center">
                        No items to show
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {filteredData?.length > 0 ? (
                <div className="pagination">
                  <button onClick={handlePrevClick} disabled={currentPage === 1}>
                    Prev
                  </button>
                  <span>
                    Page {currentPage} of {limit}
                  </span>
                  <button onClick={handleNextClick} disabled={currentPage === limit}>
                    Next
                  </button>
                </div>
              ) : (
                ''
              )}
            </>
          )}
        </div>
      )}
    </main>
  );
}
