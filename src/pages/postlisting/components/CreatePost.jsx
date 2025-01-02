import { MoveLeft } from 'lucide-react';
import React, { useState } from 'react';

export const CreatePost = ({ backButton, onPostAdded }) => {
  const [newPost, setNewPost] = useState({
    newTitle: '',
    newBody: '',
  });
  const [loading, setLoading] = useState({
    saveLoading: false,
    dataLoading: false,
  });
  const [formError, setFormError] = useState({
    titleError: '',
    bodyError: '',
  });

  const handleInputClick = (value, name) => {
    setNewPost(prev => ({ ...prev, [name]: value }));
  };

  const isValidForm = () => {
    setFormError({
      titleError: '',
      bodyError: '',
    });

    let valid = true;
    if (!newPost.newTitle) {
      setFormError(prev => ({ ...prev, titleError: 'Title is required' }));
      valid = false;
    } else if (newPost.newTitle.length < 5) {
      setFormError(prev => ({ ...prev, titleError: 'Title must be at least 5 characters long' }));
      valid = false;
    } else if (newPost.newTitle.length > 100) {
      setFormError(prev => ({ ...prev, titleError: 'Title must be at most 100 characters long' }));
      valid = false;
    }

    if (!newPost.newBody) {
      setFormError(prev => ({ ...prev, bodyError: 'Body is required' }));
      valid = false;
    } else if (newPost.newBody.length < 5) {
      setFormError(prev => ({ ...prev, bodyError: 'Body must be at least 5 characters long' }));
      valid = false;
    } else if (newPost.newBody.length > 100) {
      setFormError(prev => ({ ...prev, bodyError: 'Body must be at most 100 characters long' }));
      valid = false;
    }

    return valid;
  };

  const handleAddClick = event => {
    event.preventDefault();
    setLoading(prev => ({ ...prev, saveLoading: true }));

    if (!isValidForm()) {
      setLoading(prev => ({ ...prev, saveLoading: false }));
      return;
    }

    const { newTitle, newBody } = newPost;
    const postToAdd = {
      title: newTitle,
      body: newBody,
    };
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postToAdd),
    })
      .then(response => response.json())
      .then(data => {
        onPostAdded(data);
        setNewPost({ newTitle: '', newBody: '' });
      });
  };

  const handleCancelClick = () => {
    setNewPost({ newTitle: '', newBody: '' });
    setFormError({
      titleError: '',
      bodyError: '',
    });
  };

  return (
    <>
      {loading.dataLoading ? (
        <div className="main-loader">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="create-post">
          <header>
            <div className="back-button" onClick={() => backButton(false)}>
              <MoveLeft className="text-black" />
            </div>
            <h1>Create Post</h1>
          </header>
          <div className="form-container">
            <form onSubmit={handleAddClick}>
              <div className="button-listing">
                <button type="submit" disabled={loading.saveLoading}>
                  {loading.saveLoading ? <span className="button-loader"></span> : 'Add '}
                </button>
                <button type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
              <div className="input-listing">
                <div className="feild">
                  <label htmlFor="title">Title</label>
                  <textarea
                    value={newPost.newTitle}
                    onChange={e => handleInputClick(e.target.value, 'newTitle')}
                    placeholder="Add Title..."
                    id="title"
                    type="text"
                  />
                  {formError.titleError && <p className="form-error">{formError.titleError}</p>}
                </div>
                <div className="feild">
                  <label htmlFor="title">Body</label>
                  <textarea
                    value={newPost.newBody}
                    onChange={e => handleInputClick(e.target.value, 'newBody')}
                    placeholder="Add Body..."
                    id="body"
                    type="text"
                  />
                  {formError.bodyError && <p className="form-error">{formError.bodyError}</p>}
                </div>
                <button type="button">+ </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
