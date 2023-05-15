'use client'

import { useRouter } from "next/navigation"

export default function DetailLink( props ) {
  let router = useRouter()
  return (
    <button onClick={ () => {
      router.push( `/detail/${ props.id }` )
    } }>링크</button>
  )
}