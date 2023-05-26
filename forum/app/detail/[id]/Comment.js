'use client'

import { useEffect, useState } from "react"

export default function Comment( { parentId } ) {

  let [comment, setComment] = useState( '' )
  let [comments, setComments] = useState([])

  useEffect(() => {
    fetch(`/api/comment/list?parentId=${ parentId }`)
    .then((res) => res.json())
    .then((res) => setComments(res))
  }, [])

  return (
    <div>
      <div>댓글 목록</div>
      {
        comments.map((comment, idx) => {
          return (
            <h4 key={idx}>{comment.comment}</h4>
          )
        })
      }
      <input onChange={( e ) => { setComment( e.target.value ) }}/>
      <button onClick={() => {
        fetch( '/api/comment/write', {
          method: 'POST',
          body: JSON.stringify({
          comment, 
          parentId
        })
       }
      )
      }} >댓글 전송</button>
    </div>
  )
}