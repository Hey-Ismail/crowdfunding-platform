const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Get the connection string from .env
const uri = process.env.MONGODB_URL;
// Create a new MongoClient
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();

        //creating databse
        const database = client.db("crowdfundingplatform_db")
        const newCampaignCollection = database.collection("new-campaign")


        app.post('/newCampaign', async (req, res) => {
            const campaign = req.body;
            const result = await newCampaignCollection.insertOne(campaign);
            res.send(result);
        });

        // Get all campaigns
        app.get('/campaigns', async (req, res) => {
            const cursor = newCampaignCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        // Get single campaign by ID
        app.get('/campaigns/:id', async (req, res) => {
            const id = req.params.id;
            const { ObjectId } = require('mongodb');
            const query = { _id: new ObjectId(id) };
            const result = await newCampaignCollection.findOne(query);
            res.send(result);
        });

        console.log("You successfully connected to MongoDB!");
    } catch (err) {
        console.dir(err);
    }
}

// Call the function to connect when server starts
connectToMongoDB();

app.get('/', (req, res) => {
    res.send('MongoDB server is running.');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});