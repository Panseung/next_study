import Image from "next/image"
import tomatoes from "/public/tomatoes.png"
import pasta from "/public/pasta.png"
import coconut from "/public/coconut.png"

export default function List() {

  let 상품 = [ 'Tomatoes', 'Pasta', 'Coconut' ]
  let 이미지 = [ tomatoes, pasta, coconut ]

  return (
    <div>
      <h4>상품목록</h4>
      {
        상품.map( ( name, i ) => {
          return (
            <div className="food" key={ name + i }>
              <Image src={ 이미지[i] } className="food-img" />
              <h4>{ name }</h4>
            </div>
          )
        } )
      }
    </div>
  )
}