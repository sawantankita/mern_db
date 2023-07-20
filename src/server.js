//works great

const { MongoClient } = require('mongodb');
const mongoURI = 'mongodb+srv://sawantankita0203:IOcrAqq9OAdxmc9T@cluster0.qv3jpok.mongodb.net/textdata?retryWrites=true&w=majority';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000; // Update with your desired port number
app.use(express.json());
// Enable CORS
app.use(cors());

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('textdata');
    const collection = db.collection('text1');
   
    // Endpoint to save the text
    app.post('/api/saveText', (req, res) => {
      const { text } = req.body;
      
      // Insert the text into the collection
      collection.insertOne({ text })
        .then(() => {
          res.status(200).json({ message: 'Text saved successfully' });
        })
        .catch(error => {
          console.error('Error saving text:', error);
          res.status(500).json({ message: 'Error saving text' });
        });
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

startServer();
