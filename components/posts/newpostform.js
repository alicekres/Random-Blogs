import classes from './newpostform.module.css';
import { useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import { PASSCODE } from '../../constants';

function NewPostForm() {
  const titleInputRef = useRef();
  const dateInputRef = useRef();
  const imageInputRef = useRef();
  const excerptInputRef = useRef();
  const postInputRef = useRef();
  const isFeaturedInputRef = useRef();
  const secretPasscodeInputRef = useRef();

  const notificationCtx = useContext(NotificationContext);

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredExcerpt = excerptInputRef.current.value;
    const enteredPost = postInputRef.current.value;
    const enteredFeature = isFeaturedInputRef.current.value;
    const enteredPasscode = secretPasscodeInputRef.current.value;

    const newPost = {
      title: enteredTitle,
      date: enteredDate,
      image: enteredImage,
      excerpt: enteredExcerpt,
      text: enteredPost,
      isFeatured: enteredFeature,
    };

    if (enteredPasscode === PASSCODE) {
      notificationCtx.showNotification({
        title: 'Sending the post',
        message: 'Post is on the way... :)',
        status: 'pending',
      });

      fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          return response.json().then((data) => {
            throw new Error('Something went wrong');
          });
        })
        .then((data) =>
          notificationCtx.showNotification({
            title: 'Success',
            message: 'Post has been added',
            status: 'success',
          })
        )
        .catch((error) =>
          notificationCtx.showNotification({
            title: 'Error',
            message: error.message || 'Something went wrong',
            status: 'error',
          })
        );
    } else if (!enteredPasscode || enteredPasscode !== PASSCODE) {
      notificationCtx.showNotification({
        title: 'Please enter valid passcode',
        status: 'alert',
      });
    }
  }
  return (
    <section className={classes.post}>
      <h1>Add a New Post</h1>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" required ref={titleInputRef}></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="date">Date</label>
            <input type="text" id="date" required ref={dateInputRef}></input>
            <span className={classes.span}>Example: 1. January 2025</span>
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Image's URL</label>
          <input type="url" id="image" required ref={imageInputRef}></input>
        </div>
        <div className={classes.control}>
          <label htmlFor="excerpt">Excerpt</label>
          <textarea
            rows="3"
            id="excerpt"
            required
            ref={excerptInputRef}
          ></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="post">Post Text</label>
          <textarea id="post" rows="5" required ref={postInputRef}></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor="isFeatured">
            Do you want your post to be featured?
          </label>
          <select ref={isFeaturedInputRef}>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="">Secret passcode for allowing the new post</label>
          <input
            type="text"
            id=""
            required
            ref={secretPasscodeInputRef}
          ></input>
        </div>
        <div className={classes.actions}>
          <button>Add a Post</button>
        </div>
      </form>
    </section>
  );
}

export default NewPostForm;
