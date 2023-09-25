const express =  require('express');
const { ConnectToDB } = require('./db');
const { userRouter } = require('./Router/userRouter');
const cors = require("cors");
const { empRouter } = require('./Router/empRouter');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send({msg : "welcome!"});
})
app.use('/user', userRouter);
app.use('/emp', empRouter);

app.listen(8080, async() =>{
    try {
        await ConnectToDB;
        console.log("server runing...")
    } catch (error) {
        throw new Error(error);
    }
})