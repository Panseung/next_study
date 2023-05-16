'use client'

import Link from "next/link"
import DetailLink from "./detailLink"

export default function ListItem( { result } ) {
  return (
    <div>
      {
        result.map( ( element, i ) => {
          return(
            <div className="list-item" key={ i }>
              <DetailLink id={ element._id.toString() }>수정</DetailLink>
              <br/>
              <Link href={ '/edit/' + element._id }>
                <button>Edit</button>
              </Link>
              <br/>
              <span onClick={(e) => {
                fetch('/api/post/delete', {
                  method : 'POST',
                  body: element._id })
                  .then((res) => {
                    return res.json()
                  })
                  .then(() => {
                    e.target.parentElement.style.opacity = 0
                    setTimeout(() => {
                      e.target.parentElement.style.display = 'none'
                    }, 1000)
                  })}}>
                    글 삭제
                  </span>
                  <br/>
                  <span onClick={(e) => {
                    fetch('/api/post/querytest?id=' + element._id)
                  }}>쿼리로 삭제버튼</span>
              <h4>{ element.title }</h4>
              <p>{ element.content }</p>
            </div>
          )
        } )
      }
    </div>
  )
}