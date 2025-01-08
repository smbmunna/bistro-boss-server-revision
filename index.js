const express= require('express'); 
const cors= require('cors'); 

require('dotenv').config()

const app= express(); 
const port= process.env.PORT || 5000; 

//middlewares
app.use(cors()); 
app.use(express.json()); 

//MongoDB Connection String

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cfuzedb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    //collections
    const menuCollection= client.db('bistrobossdb').collection('menu'); 
    const reviewsCollection= client.db('bistrobossdb').collection('reviews'); 
    
    //get all menu
    app.get('/menu', async(req, res)=>{
      const menu= await menuCollection.find().toArray(); 
      res.send(menu); 
    })

    //get all reviews
    app.get('/reviews', async(req, res)=>{
      const reviews= await reviewsCollection.find().toArray(); 
      res.send(reviews); 
    })

  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


//endpoints
app.get('/', async(req, res)=>{
    await res.send('Bistroboss server is running'); 
})

app.listen(port,()=>{
    console.log(`Bistro Boss server is running on port ${port}`); 
    
})