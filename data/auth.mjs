import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.mjs";


// 객체 만들기
const userSchema = new Mongoose.Schema(
{
  userid:{type:String,require:true},
  name:{type:String,require:true},
  email:{ type:String,require:true},
  password:{type:String,require:true},
  url:String},
  {versionKey:false}
)

useVirtualId(userSchema)

const User = Mongoose.model("User",userSchema) //"User으로 넣으면 USERS 복수로 됨"

export async function createUser(user) {
  return new User(user).save().then((data)=>data.id)
}

export async function findByUserid(userid) {
  return User.findOne({userid})}

export async function findByid(id) {
  return User.findById(id)
}
