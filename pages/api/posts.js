import { MongoClient } from 'mongodb';

async function handler(req, res) {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.password}@${process.env.mongodb_clustername}.yafmg.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  let client;

  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to the database"' });
    return;
  }

  if (req.method === 'POST') {
    const { title, date, image, excerpt, isFeatured, text } = req.body;

    if (
      !title ||
      title.trim() === '' ||
      !date ||
      !image ||
      !excerpt ||
      !isFeatured ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input!' });
      return;
    }

    const newPost = {
      title,
      date,
      image,
      excerpt,
      isFeatured,
      text,
    };

    const db = client.db();

    try {
      const result = await db.collection('posts').insertOne(newPost);
      newPost.id = result.insertedId;
      client.close;
      res.status(201).json({ message: 'Post was added', message: newPost });
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }
  }

  if (req.method === 'GET') {
    const db = client.db();

    const documents = await db
      .collection('posts')
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ posts: documents });
  }
  client.close();
}

export default handler;
