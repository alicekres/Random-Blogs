import classes from './post-header.module.css';
import Image from 'next/image';

function PostHeader(props) {
  const { title, date, image } = props;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <header className={classes.header}>
      <div>
        <div>
          <h1>{title}</h1>
        </div>
        <div className={classes.date}>{formattedDate}</div>
      </div>
      <div className={classes.img}>
        <Image src={image} alt={title} width={200} height={150} />
      </div>
    </header>
  );
}

export default PostHeader;
