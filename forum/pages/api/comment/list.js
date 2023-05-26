import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler( req, res )  {

  const client = await connectDB
  const db = client.db('forum')
  let result = await db.collection('comment').find({ parentId: new ObjectId( req.query.parentId ) }).toArray()
  res.status(200).json(result)
}