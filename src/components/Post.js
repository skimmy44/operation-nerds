import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Post = ({ postObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState(postObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Do you really want to delete this post? 🥲");
    if (ok) {
      await dbService.doc(`posts/${postObj.id}`).delete();
      await storageService.refFromURL(postObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`posts/${postObj.id}`).update({
      text: newPost,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPost(value);
  };
  return (
    <div className="post">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container postEdit">
            <input
              type="text"
              placeholder="Edit your post"
              value={newPost}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Update Post" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{postObj.text}</h4>
          {postObj.attachmentUrl && <img src={postObj.attachmentUrl} />}
          {isOwner && (
            <div class="post__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Post;