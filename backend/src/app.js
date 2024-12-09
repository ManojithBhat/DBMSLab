import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.send("API is running");
})

//route import 
import userRouter from './routes/user.route.js';
app.use("/auth",userRouter)
//http://localhost:8000/auth/register

import counsellorRouter from './routes/counsellor.route.js';
app.use("/auth/counsellor",counsellorRouter)

export {app}