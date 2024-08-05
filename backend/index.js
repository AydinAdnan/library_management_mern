import express, { request, response } from "express"
import { PORT ,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();
app.use(express.json()); //middleware for parsing request body

app.use(cors()); //with no arg allows everything

//to allow custom orgin
// app.use(
//     cors({
//         origin: ["http://localhost:3000"],
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// );

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send("TEST MERN")
});

app.use('/books',booksRoute);


mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("Connected to MongoDB");
        app.listen(PORT,() =>{
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) =>{
        console.log("Error connecting to MongoDB:", error);
    })
