import { connectDB } from "@/util/database";
import _ from "lodash";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler( req, res ) {
  let session = await getServerSession( req, res, authOptions )

  const client = await connectDB
  const db = client.db( 'forum' )

  let body = JSON.parse( req.body )

  let comment = body.comment
  let parentId = new ObjectId( body.parentId )
  let userEmail = session.user.email

  let result = { comment, parentId, userEmail }

  if( comment == '' ) {
    return res.status(500).json('댓글을 작성해주세요')
  } else {
    await db.collection( 'comment' ).insertOne( result )
    return res.redirect( 302, '/detail/' + parentId )
  }

}