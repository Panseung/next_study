'use client'

import { isNull } from 'lodash'
import { signIn, signOut } from 'next-auth/react'

export default function LoginBtn( {user} ) {
  return (
    <div>
      { user
      ? 
      <button onClick={ () => { signOut() } }>로그아웃</button>
      : 
      <button onClick={ () => { signIn() } }>로그인</button>
     }
    </div>
    
  )
}