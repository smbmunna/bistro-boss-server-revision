const express= require('express'); 
const cors= require('cors'); 

const app= express(); 
const port= process.env.PORT || 5000; 

//middlewares
app.use(cors()); 
app.use(express.json()); 

//endpoints
app.get('/', async(req, res)=>{
    await res.send('Bistroboss server is running'); 
})

app.listen(port,()=>{
    console.log(`Bistro Boss server is running on port ${port}`); 
    
})