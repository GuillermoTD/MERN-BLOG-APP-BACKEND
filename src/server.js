import { dbConnection } from './config/mainDB.js';
import app,{port} from './index.js';
// import {dbConnection} from "./config/mainDB.js"
import mongoose from "mongoose"

const uri = "mongodb+srv://test01:qwerty123123@cluster0.pai7l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

dbConnection()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

