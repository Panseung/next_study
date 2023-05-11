import Image from "next/image"
import tomatoes from "/public/tomatoes.png"
import pasta from "/public/pasta.png"
import coconut from "/public/coconut.png"
import { useState } from "react"

export default function List() {

  let 상품 = [ 'Tomatoes', 'Pasta', 'Coconut' ]
  let [수량, 수량변경] = useState([0, 0, 0])
  let 이미지 = [ tomatoes, pasta, coconut ]

  return (
    <div>
      <h4>상품목록</h4>
      {
        상품.map( ( name, i ) => {
          return (
            <div className="food" key={ name + i }>
              <Image src={ 이미지[i] } className="food-img" alt="image" />
              <h4>{ name }</h4>
              <span>{수량[i]}</span>
              <button onClick={ () => {
                let temp = [...수량]
                temp[i]++
                수량변경(temp)
              } }>+</button>
            </div>
          )
        } )
      }
    </div>
  )
}