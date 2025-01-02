import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';
import { ROUTES } from '../../../routes/routes';
import { ToDoLists } from '../../../components';

export const Post = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [postError, setPostError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [postLoading, setPostLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(postErr => {
        setPostError(postErr.message);
      })
      .finally(() => setPostLoading(false));
  }, [id]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then(comments => setComments(comments))
      .catch(commentErr => setCommentError(commentErr.message))
      .finally(() => setCommentLoading(false));
  }, [id]);

  return (
    <>
      <div className="main-card">
        <Link className="back-button" to={ROUTES.DEFAULT}>
          <MoveLeft className="text-black" />
        </Link>
        {postLoading ? (
          <div className="post-loader">
            <p className="loader"></p>
          </div>
        ) : postError ? (
          <p className="error"> Post is Not Showing due to {postError}</p>
        ) : (
          <>
            <h1>Post</h1>
            <div className="data-card">
              <h2>{data.title}</h2>
              <p>{data.body}</p>
            </div>
          </>
        )}
        {commentLoading ? (
          <div className="comment-loader">
            <p className="loader"></p>
          </div>
        ) : commentError ? (
          <p className="error"> Comments are Not Showing due to {commentError}</p>
        ) : (
          <div className="comments-wrapper">
            <h1>Comments</h1>
            <div className="comments-container">
              {comments.map(item => (
                <div key={item.id} className="comments">
                  <h2>{item.name}</h2>
                  <span>{item.email}</span>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
