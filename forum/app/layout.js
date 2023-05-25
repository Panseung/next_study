import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import LoginBtn from './LoginBtn'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import _ from 'lodash'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({ children }) {
  let session = await getServerSession( authOptions )
  let user = _.get( session, 'user' ) || false
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='navbar'>
          <Link href="/" className="logo">
            PanseungForum
          </Link>
          <Link href="/list" className='logo'>List</Link>
          <Link href="/write" className='logo'>Write</Link>
          <Link href="/register" className='logo'>Register</Link>
          {}
          <LoginBtn user={ user } ></LoginBtn>
        </div>
        {children}
      </body>
    </html>
  )
}
