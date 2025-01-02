import { MoveLeft } from 'lucide-react';
import React, { useState } from 'react';

export const CreatePost = ({ backButton, onPostAdded }) => {
  const [newPost, setNewPost] = useState([
    {
      newTitle: '',
      newBody: '',
    },
  ]);

  const [loading, setLoading] = useState({
    saveLoading: false,
    dataLoading: false,
  });

  const [formError, setFormError] = useState([
    {
      titleError: '',
      bodyError: '',
    },
  ]);

  const [showError, setShowError] = useState(false);

  const handleInputClick = (value, name, index) => {
    setNewPost(prev => {
      const updatedPost = [...prev];
      updatedPost[index] = { ...updatedPost[index], [name]: value };
      return updatedPost;
    });

    if (showError) {
      isValidForm();
    }
  };

  const isValidForm = () => {
    let valid = true;
    const errors = newPost.map(post => {
      const error = { titleError: '', bodyError: '' };

      if (!post.newTitle) {
        error.titleError = 'Title is required';
        valid = false;
      } else if (post.newTitle.length < 5) {
        error.titleError = 'Title must be at least 5 characters long';
        valid = false;
      } else if (post.newTitle.length > 100) {
        error.titleError = 'Title must be at most 100 characters long';
        valid = false;
      }

      if (!post.newBody) {
        error.bodyError = 'Body is required';
        valid = false;
      } else if (post.newBody.length < 5) {
        error.bodyError = 'Body must be at least 5 characters long';
        valid = false;
      } else if (post.newBody.length > 100) {
        error.bodyError = 'Body must be at most 100 characters long';
        valid = false;
      }

      return error;
    });

    setFormError(errors);
    return valid;
  };

  const submitForm = event => {
    event.preventDefault();

    setLoading(prev => ({ ...prev, saveLoading: true }));
    setShowError(true);
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
        setNewPost([{ newTitle: '', newBody: '' }]);
      });
  };

  const handleCancelClick = () => {
    setNewPost([{ newTitle: '', newBody: '' }]);
    setFormError([
      {
        titleError: '',
        bodyError: '',
      },
    ]);
  };

  const addRow = () => {
    setNewPost(prev => [...prev, { newTitle: '', newBody: '' }]);
    setFormError(prev => [...prev, { titleError: '', bodyError: '' }]);
  };

  const deleteRow = index => {
    setNewPost(prev => prev.filter((_, i) => i !== index));
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
            <form onSubmit={submitForm}>
              <div className="button-listing">
                <button type="submit" disabled={loading.saveLoading}>
                  {loading.saveLoading ? <span className="button-loader"></span> : 'Add '}
                </button>
                <button type="button" onClick={handleCancelClick}>
                  Cancel
                </button>
              </div>
              {newPost.map((item, index) => (
                <div key={index} className="input-listing">
                  <div className="feild">
                    <label>Title</label>
                    <textarea
                      value={item.newTitle}
                      onChange={e => handleInputClick(e.target.value, 'newTitle', index)}
                      placeholder="Add Title..."
                      type="text"
                    />
                    {formError?.[index]?.titleError && <p className="form-error">{formError?.[index]?.titleError}</p>}
                  </div>
                  <div className="feild">
                    <label>Body</label>
                    <textarea
                      value={item.newBody}
                      onChange={e => handleInputClick(e.target.value, 'newBody', index)}
                      placeholder="Add Body..."
                      type="text"
                    />
                    {formError?.[index]?.bodyError && <p className="form-error">{formError?.[index]?.bodyError}</p>}
                  </div>
                  {index === 0 ? (
                    <button onClick={addRow} type="button">
                      +
                    </button>
                  ) : (
                    <button onClick={() => deleteRow(index)} type="button">
                      -
                    </button>
                  )}
                </div>
              ))}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
