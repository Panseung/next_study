import { connectDB } from "@/util/database"
import Link from "next/link"
import DetailLink from "./detailLink"

export default async function List() {

  const client = await connectDB
  const db = client.db( 'forum' )
  let result = await db.collection( 'post' ).find().toArray()

  return (
    <div className="list-bg">
      {
        result.map( ( element, i ) => {
          return(
            <div className="list-item" key={ i }>
              <DetailLink id={ element._id }></DetailLink>
              <h4>{ element.title }</h4>
              <p>{ element.content }</p>
            </div>
          )
        } )
      }
    </div>
  )
} 