import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt'

export default async function handler( req, res ) {
  if ( req.method == 'POST' ) {
    const client = await connectDB
    const db = client.db( 'forum' )

    let hash = await bcrypt.hash( req.body.password, 10 )
    req.body.password = hash

    await db.collection('user_cred').insertOne( req.body )

    res.status(200).json('가입완료')
  }
}