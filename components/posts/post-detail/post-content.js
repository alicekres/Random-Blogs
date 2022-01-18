import classes from './post-content.module.css';

function PostContent(props) {
  return <section className={classes.content}>{props.children}</section>;
}

export default PostContent;
