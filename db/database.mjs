import mysql from "mysql2";
import { config } from "../config.mjs";
import MongoDb from "mongodb";

let db;

export async function connectDB(){
  return (await MongoDb.MongoClient.connect(config.db.host)).withSession((client)=>{
    db=client.db()
    // console.log(db)
  })
}



