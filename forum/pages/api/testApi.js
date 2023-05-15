import { connectDB } from "@/util/database"

export default async function handler( req, res ) {
  const client = await connectDB
  const db = client.db( 'forum' )
  let result = await db.collection( 'post' ).find().toArray()

  if( req.method == 'POST' ) {
    return res.status(200).json('보내고 싶은 메세지, 안써도 그만')  
  } else if ( req.method == 'GET' ) {
    let result = await db.collection( 'post' ).find().toArray()
    return res.status(200).json(result)
  }
  
}