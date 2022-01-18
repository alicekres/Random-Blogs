import PostContent from '../../components/posts/post-detail/post-content';
import Head from 'next/head';
import { MongoClient, ObjectId } from 'mongodb';
import PostHeader from '../../components/posts/post-detail/post-header';
import { Fragment } from 'react';

function PostDetailPage(props) {
  const { title, text, excerpt } = props.postData;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} />
      </Head>
      <PostHeader
        image={props.postData.image}
        date={props.postData.date}
        title={title}
      />
      <PostContent>
        <p>{text}</p>
      </PostContent>
    </Fragment>
  );
}

export async function getStaticPaths() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.password}@${process.env.mongodb_clustername}.yafmg.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  let client;

  client = await MongoClient.connect(connectionString);

  const db = client.db();

  const postsCollection = db.collection('posts');

  const posts = await postsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    paths: posts.map((post) => ({ params: { postId: post._id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const postId = context.params.postId;

  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.password}@${process.env.mongodb_clustername}.yafmg.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  let client;

  client = await MongoClient.connect(connectionString);

  const db = client.db();

  const postsCollection = db.collection('posts');

  const selectedPost = await postsCollection.findOne({ _id: ObjectId(postId) });

  client.close();

  return {
    props: {
      postData: {
        id: selectedPost._id.toString(),
        title: selectedPost.title,
        date: selectedPost.date,
        image: selectedPost.image,
        excerpt: selectedPost.excerpt,
        isFeatured: selectedPost.isFeatured,
        text: selectedPost.text,
      },
    },
    revalidate: 60,
  };
}

export default PostDetailPage;
