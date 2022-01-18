import { Fragment } from 'react';
import NewPostForm from '../components/posts/newpostform';
import Head from 'next/head';

function NewPostPage() {
  return (
    <Fragment>
      <Head>
        <title>Add a new post blog</title>
        <meta
          name="description"
          content="Page for adding a new post. Accessible only by the author."
        />
      </Head>
      <NewPostForm />
    </Fragment>
  );
}

export default NewPostPage;
