import { connectDB } from "@/util/database";

export default async function write( req, res ) {
  const client = await connectDB
  const db = client.db( 'forum' )

  const content = req.body
  console.log(content)
  if( content.title == '' ) {
    return res.status(500).json( '제목 써라' )
  } else if ( content.content == '' ) {
    return res.status(500).json( '글 내용 써라' )
  } else {
    await db.collection( 'post' ).insertOne( content )
    return res.redirect(302, '/list')
  }
}