import ContactForm from '../components/contact/contact-form';
import Head from 'next/head';
import { Fragment } from 'react';

function ContactPage() {
  return (
    <Fragment>
      <Head>
        <title>Contact Me</title>
        <meta
          name="description"
          content="Page for contacting and sending messages to the author."
        />
      </Head>
      <ContactForm />
    </Fragment>
  );
}

export default ContactPage;
