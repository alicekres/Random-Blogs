import AllPosts from '../../components/posts/all-posts';
import Head from 'next/head';
import { Fragment } from 'react';
import { MongoClient } from 'mongodb';

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Blogs</title>
        <meta name="description" content="All posts and blogs." />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.password}@${process.env.mongodb_clustername}.yafmg.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  let client;

  client = await MongoClient.connect(connectionString);

  const db = client.db();

  const postsCollection = db.collection('posts');

  const posts = await postsCollection.find().sort({ _id: -1 }).toArray();

  client.close();

  return {
    props: {
      posts: posts.map((post) => ({
        title: post.title,
        date: post.date,
        image: post.image,
        excerpt: post.excerpt,
        isFeatured: post.isFeatured,
        text: post.text,
        id: post._id.toString(),
      })),
    },
    revalidate: 60,
  };
}

export default AllPostsPage;
