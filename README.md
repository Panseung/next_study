# next_study

코딩애플 next 강의



1. [adsfadssf](#gdgd)





### 1. Next.js 많이 쓰는 이유를 알아보자

react나 vue를 사용하여 CSR을 통해 서버가 아니라 유저 브라우저에서 실시간 렌더링을 하기 때문에
페이지 전환이 부드럽고 app과 같은 예쁜 사이트를 만들 수 있음.

하지만 크리티컬한 단점 두가지가 존재

1. 구글 검색 노출이 어려움 (되긴 하지만 오래걸림)
2. 첫 페이지 로딩 속도가 느림.

단점은 두 가지 뿐이나, 중요한건 이 두가지가 사이트 수익성에 매우 큰 악영향을 미침

이 두 가지 단점을 보완할 수 있는 것이 SSR을 사용한 next임.
게다가 원하는 곳에서는 선택적으로 CSR이 가능함

##### next는 풀스택 프레임워크

프론트는 react를 사용함



### 2. Next.js 설치와 개발환경 셋팅

```bash
npx create-next-app@latest
```

next는 큰 layout.js 안에 page.js를 담는 형식으로 구성되어 있음.
(강의에서는 layout.js와 page.js로 나와있으나 듣는 시점에서는
  _document.js와 index.js로 대체된 것으로 유추)
참고 자료: https://merrily-code.tistory.com/154



### 3. 페이지 레이아웃 만들기

#gdgd

next에서 프론트는 react를 사용하기 때문에 jsx문법을 사용함
유의사항 4가지

1. return() 안에 HTML 넣을 때 최상위 태그는 하나만 존재 가능

2. class를 넣고 싶으면 className을 사용 (js에서 class라는 문법이 이미 존재하기 때문에)

3. jsx 데이터바인딩은 {}를 사용

4. style 속성을 넣으려면 중괄호 두 개를 사용
   ```react
   <div style={{ color:'red' }}
   ```

   대시 기호가 있는 속성 명은 대시 대신에 다음 글자를 대문자로 사용
   (font-size -> fontSize:'30px')



### 4. 여러 페이지 만들기 (라우팅)

next는 파일, 폴더 생성으로 라우팅

pages라는 폴더 안에
폴더를 생성한 후 index.js파일을 생성하면
페이지에서 /폴더명 으로 접속하면 해당 폴더 안에 있는 index.js가 렌더링 됨



### 6. Next.js에서 이미지 넣는 법 2개

이미지 파일은 public폴더에 두고
경로는 /부터 바로 시작하면 됨

```react
<img src="/food0.png"/>
```



##### Image 태그

lazy loading
사이즈 최적화
layout shift 방지



단, 외부 이미지를 사용 할 때는 조건이 존재

1. 사용할 때 src는 반드시 import를 해와서 사용
   ```react
   <Image src={ 이미지[i] } className="food-img" />
   ```

2. width와 height를 직접 지정해 주어야 하며, next.config.js에 셋팅도 필요함

따라서 외부 이미지를 그대로 사용 할 경우 최적화 작업의 경우는
가장 마지막에 하는 것을 추천

 

### 7. client/server component, import 문법

Next.js 컴포넌트는 종류가 2개

1. server component
2. client component

server component에서는 html에 자바스크립트 기능이 동작x(useState, useEffect 등)

파일 최 상단에 'use client' 를 작성하면
해당 파일 안에 있는 모든 컴포넌트는 client component가 됨

그럼 모든 컴포넌트를 client component로 사용하면 되지 않을까?
-> server component는 로딩 속도가 빠르고 검색엔진 노출이 유리하다.
-> client component는 로딩속도가 느림(자바스크립트 많이 필요, hydration 필요)
															hydration: html을 유저에게 보낸 후 
																				자바스크립트로 html을 다시 읽고 분석하는 일
따라서 필요에 따라 적절히 활용 할 것



### 8. Component에 데이터 전해주려면 props

```react
export default function Cart() {
  return (
    <div>
      <CartItem productName="상품1" cost="1" count="2"/>
    </div>
  )
} 

function CartItem( props ) {
  return (
    <div className="cart-item">
      <p>{ props.productName }</p>
      <p>${ props.cost }</p>
      <p>{ props.count }개</p>
    </div>
  )
}
```



### 9. array를 값으로 가진 state값 변경

```react
export default function test() {
    let [name, changeName] = useState([0, 0, 0])
    return (
    	<div>
        	<button onClick={ () => {
                    let temp = [...name]
                    temp[1]++
                    changeName(temp)
                } }>
            </button>
        </div>
    )
}
```

spreadOperator로 배열을 복사한 뒤 특정 인덱스의 값을 변경 후 state변경해주기



### 10. next에 mongoDB연결

1. npm i mongodb

2. util 폴더 만들고 파일을 만들어서 아래 코드를 작성
   ```react
   import { MongoClient } from 'mongodb'
   const url = ~~어쩌꼬저쩌고
   const options = { useNewUrlParser: true }
   let connectDB
   
   if (process.env.NODE_ENV === 'development') {
     if (!global._mongo) {
       global._mongo = new MongoClient(url, options).connect()
     }
     connectDB = global._mongo
   } else {
     connectDB = new MongoClient(url, options).connect()
   }
   export { connectDB }
   ```

3. page.js에서 불러와서 아래와 같이 작성하여 연결 됐는지 확인
   ```react
   import { connectDB } from "@/util/database"
   
   export default async function Home() {
     
     const client = await connectDB
     const db = client.db('forum')
     let result = await db.collection('post').find().toArray()
     console.log( result )
     return (
       <div>
       </div>
     )
   }
   ```

​	page.js에서 바로 작성하지 않고 다른 파일에 작성한 후 불러오는 이유는
​	db connection 코드는 서버 띄울 때 한 번만 실행하면 좋기 때문에
​	(정확한 동작 원리는 추후 알아볼 필요가 있을 것 같음)

!!!! db 입출력 코드는 server component에서만 쓸 것!
(client component에 있는 모든 코든는 user의 browser에 전달되기 때문에!)





### 11. dynamic route

폴더 구조를
detail \ [어쩌구저쩌구] \ page.js
이렇게 생성하면 유저가 ~~~/detail/아무거나
로 접속하면 저 '아무거나'에 어떠한 것을 입력해도 page.js를 보여줌

url이 달라도 같은 page.js를 보여주지만 유저가 [어쩌구저쩌구]에 무엇을 입력했는지
알고 싶으면 props를 확인하기!!



!! mongoDB에서 특정 조건의 데이터 가져오기
```js
const client = await connectDB
const db = client.db( 'forum' )
let result = await db.collection( 'post' ).findOne({ title : '안녕' })
// 아래는 id로 가져오는 방법
let result = await db.collection( 'post' ).findOne({ _id: new ObjectId( '1232123212321' ) })
```

위와 같이 작성하면 title이 '안녕'에 해당하는 첫 번째 데이터 하나만 가져옴



### 12. useRouter()

client component에서만 사용 가능!!!

import 해올때는 from "next/router"가 아니라!!
"next/navigation"에서 해오기

```react
export default function test() {
    let router = useRouter()
    return(
        <div onClick={ () => {
                router.push('./')
            } }></div>
    )
}
```

push 말고도 back(), forward(), refresh(), prefetch() 등등 많음

(prefetch는 미리 해당 url에 필요한 데이터를 로드시킴)



참고로 Link태그는 prefetch기능이 내장되어있음
(정확히는 스크롤 하다가 link태그가 들어간 html요소를 만나면 자동으로 내부적으로 해당 페이지에
필요한 데이터들을 미리로드해줌, Link 태그에서 prefetch기능을 쓰기 싫으면 prefetch={false} 옵션을 통해 선택 가능 )



### 13. 3-tier architecture

client에서 작성한 데이터가 database에 바로 저장되는 방식이 아니라
중간에 계층 하나를 더 두는 방식

Client(Presentation) Tier - Application Tier(server) - Data Tier



### 14. 서버 폴더 구조

서버 기능은 /api 폴더를 생성 후 요청 별로 폴더 또 나누기

api/post/~~
api/get/~~



### 15. redirect

api 실행 후 특정 url로 라우팅 하고 싶으면
```react
return res.redirect(302, '/경로')
```

(301과 302의 차이: https://nsinc.tistory.com/168)



### 16. Only plain objects can be passed to Client Components from Server Components 경고

props로 _id를 보낼 때는 뒤에 .toString()을 붙여서 보내야함
(warning이기 때문에 동작이 안되는건 아니지만 toString을 통해 해결 가능) 



### 17. mongo db 작성, 수정 

작성

```react
await db.collection( 'post' ).insertOne( content )
```



수정

```react
await db.collection( 'post' ).updateOne( { _id: new ObjectId( content.id ) }, 
    { $set: { title: content.title, content: content.content } } )
```

post 콜렉션에 있는 것 중 id가 content.id인 게시물을 가져와서
해당 게시물의 title을 content.title로, content를 content.content로 변경

(id로 데이터를 가져 올 때는 new ObjectId를 import해서 사용해주기)



### 18. client 컴포넌트와 server 컴포넌트

큰 페이지에서 js기능이 필요한 경우
해당 컴포넌트를 통으로 client로 바꾸는 것은 비효율 적인 방식

필요한 부분만 client로 따서 가져오기

!!!!!!!!!!!!SEO 최적화 관련
( 이 때 자식 컴포넌트(client 컴포넌트)에서 필요한 데이터를 직접 DB에서 가져와도 되지만
 이 때 db에서 가져온 데이터를 useEffect에 담아야 하는데 코드 실행 순서가 
HTML이 모두 렌더링 된 후 JS 코드가 실행되기 때문에 검색엔진봇이 해당 페이지를
방문할 경우 useEffect가 실행되기 전 HTML에는 텅 빈 상태로 방문할 수 있기 때문에
부모 컴포넌트에서 DB를 가져온 후 props로 내려주는 방식을 추천)

### 19. Destructring

```react
export defatul function test( props ) {
    let result = props.result
    console.log(result)
}
위와 아래 코드는 같음
export default function test( { result } ) {
    console.log(result)
}
```



### 20. form태그와 ajax

form태그로 요청시 항상 새로고침이 일어나는 반면
ajax로 요청시 새로고침이 되지 않는다.



### 21. JSON.stringify()

서버와 데이터를 송수신 할 땐 원래 문자나 숫자밖에 주고받을 수 없음
따라서 array와 object 형태의 데이터는 json.stringify()를 사용하면
큰 따옴표를 통해 array와 object형태를 표현함



### 22. fetch (+query string)

```react
<button onClick(() =>{
        fetch('/api/post/test', { method: 'POST', body: 'hihi' })
        .then((res) => return res.json())
    })button>
```



body를 전송하는 방법은 직접 body에 담지 않고 query string으로 보낼 수도 있음

```react
<button onClick(() =>{
        fetch('/api/post/test?name=kim&age=20')
    })button>
```

test.js에서는 name을 req.query로 받음

```react
export default function test(req, res) {
    console.log(req.query)
}
```

!!!!get요청은 body를 보낼 수 없기 때문에 query string으로 보낼 수 있음!!
!!!!url에 직접 데이터가 노출되기 때문에 민감한 정보는 담으면 안됨!!



### 23. 배포 (static rendering, dynamic rendering, cache)

npm run build
작성한 코드들을 순수 html,js,css 파일로 바꿔줌 



이 때 O표시와 λ기호가 있는데
O는 static rendering 페이지, λ는 dynamic rendering page이다.



static은 미리 만들어놓고 쏴주는 반면,
dynamic은 사용자가 요청할 때 마다 html을 새로 만들어서 보내줌

!!!! dynamic으로 동작해야 하는데 static으로 인식할 경우
해당 페이지 파일에 아래와 같은 코드 작성

```react
export const dynamic = 'force-dynamic'
export const dynamic = 'force-static' (이 코드는 반대상황 원할 경우)
```



dynamic rendering의 단점: 서버/DB사용량 부담이 늘어난다
												 이를 보완하기 위해 **캐싱** 사용!!

**캐싱**: 데이터(결과)를 저장해두고 재사용 하는 방식

```react
await fetch('/URL', {cache : 'force-cache'})
```

위와 같은 코드를 작성하면 작성한 url경로로 보낸 요청은 이미 요청한 결과가 있으면
다시 요청하지 않고 미리 받아놨던 결과를 재사용

사실 위 cache코드는 default로 동작하기 때문에 적지 않아도 자동으로 캐싱기능 사용됨

반대로 실시간 데이터가 중요해서 캐싱을 사용하면 안되는 경우는
```react
await fetch('/URL', {cache: 'no-store'})
```

60초 동안만 캐싱된 데이터 갱신이 필요한 경우

```react
await fetch ('/URL', {next: {revalidate : 60}})
```



### 24. session, JWT(token방식), OAuth

1. 세션방식: 유저가 로그인을 하면 서버는 [아이디, 로그인날짜, 유효기간 , session ID 등등]을
   DB에 넣어놓고 유저는 서버로부터 DB한테 받은 session ID만 전달받게 된다.

   이후 유저가 요청할 때 마다 session ID를 가지고 검사한 후 결과를 받게 되는 방식

   단점은 요청마다 DB를 조회해야해서 DB 부담이 큼
   (유저가 많은 서비스는 입출력이 빠른 redis를 session ID보관용 DB로 사용함)

   

2. 토큰방식: 유저가 로그인을 하면 [아이디, 로그인날짜, 유효기간, 등등]을 암호화하여
   유저에게 보내면 이를 sessionID대체로 사용

   가장 큰 장점은 세션방식의 단점과 반대로 DB를 조회할 필요가 없음

   단점은 토큰 자체가 다른 컴퓨터에 노출되거나 빼앗기면 강제로 소멸시키거나 할 수 있는
   방식이 없음
   (해결책은 노출된 토큰을 DB에 저장해놓고 이를 비교하여 차단하면  되는데 이러한 방식을
   사용하게 되면 session방식과 다른점이 없어서 토큰을 사용하는 이유가 사라짐)



3. OAuth: A사이트의 회원정보를 B사이트에서 빌려서 사용 가능 (소셜 로그인)
   

​	!!!!!! Next.js에서 회원기능 구현은 NextAuth.js 라이브러리를 사용하면 매우 쉽게 구현 가능
​	설치 후 코드만 복붙하면 [소셜로그인, 아이디/비번 로그인, JWT, SESSION, DB adapter] 
​	모두 사용 가능
​	단, 아이디/비번 로그인시 JWT(토큰)방식을 강제로 사용해야함 (session금지)
​	(개발자가 아이디/비번을 직접 취급하면 보안이슈가 생길 수 있어 금지해놓았다고 함)



### 25. next-auth (github oauth 사용 예시)

1. npm i next-auth

2. pages\api\auth\[...nextauth].js 생성

3. ```react
   import NextAuth from "next-auth";
   import GithubProvider from "next-auth/providers/github";
   
   export const authOptions = {
     providers: [
       GithubProvider({
         clientId: 'Github에서 발급받은ID',
         clientSecret: 'Github에서 발급받은Secret',
       }),
     ],
     secret : 'jwt생성시쓰는암호'
   };
   export default NextAuth(authOptions); 
   ```

   작성

4. 로그인 버튼을 만들 페이지에서 코드 작성
   ```react
   'use client'
   
   import { signIn } from 'next-auth/react'
   
   export default function LoginBtn() {
     return (
       <button onClick={ () => { signIn() } }>로그인</button>
     )
   }
   ```

5. 실제로 로그인이 되었는지에 대한 여부를 확인하고 싶으면 'getServerSession()' 사용
   ```react
   import { getServerSession } from 'next-auth'
   
   ...~~~
       
       let session = await getServerSession( authOptions )
     	console.log( session )
   ```

   

### 26. JSX 안에서는 if문은 못쓰지만 삼항연산자는 사용 가능

```react
{ 조건식 ? 참일 때 실행 코드 : 거짓일 때 실행 코드 }
```



### 27. DB adapter (mongo-db로 사용)

1. npm i @next-auth/mongodb-adapter(4버전이 잘 작동한다고 함)

2.  25-3에서 작성한 코드에서 secret밑에
   ```react
   import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
   
   secret: ~~~~,
   adapter: MongoDBAdapter( connectDB ) (다른 db쓸 경우 해당 어댑터 사용)
   ```

   

   3. mongoDB를 확인해보면
      accounts, session, users를 가진 collection이 생성됨

      1. session: 현재 로그인된 유저 세션정보 저장용
      2. users: 가입된 유저 정보
      3. accounts: 가입된 유저의 계정 정보

      하나의 유저는 여러개의 계정을 가질 수 있기 때문에 위와 같이 나눔
      (하나의 유저가 github, google계정 두개로 가입한 경우, users에는 하나의 문서가,
      accounts에는 두개의 문서가 생성됨)

      특정 database의 collection에 위 정보들을 저장하고 싶으면
      초기 db설정에서 url을 작성하는 곳에 

      ```react
      'mongodb+srv://아이디:비번@nextstudy.ymnasaj.mongodb.net/?retryWrites=true&w=majority'
      ```

      위와 같은 코드에 ?자리에 
      mongodb.net/collection이름?~~~
      과 같이 작성하면 가능



### 28. 소셜로그인 말고 직접 아이디,비번 구현하기

1. npm i bcrypt

2. api 코드 작성
   ```react
   import { connectDB } from "@/util/database";
   import bcrypt from 'bcrypt'
   
   export default async function handler( req, res ) {
     if ( req.method == 'POST' ) {
       const client = await connectDB
       const db = client.db( 'forum' )
   
       let hash = await bcrypt.hash( req.body.password, 10 )
       req.body.password = hash
   
       await db.collection('user_cred').insertOne( req.body )
   
       res.status(200).json('가입완료')
     }
   }
   ```

   hash는 유저가 작성한 패스워드를 bcrypt 라이브러리를 사용하여 암호화 한 변수로
   db에도 패스워드 자체를 입력하는 것이 아니라 암호화 하여 저장

   

3. 25-3에 있는 코드 중 두 곳에 추가 코드 작성 (코드 두개 추가작성!! 두개!!!)

   ```react
   import CredentialsProvider from "next-auth/providers/credentials";
   import bcrypt from 'bcrypt';
   // 위 두개 import 해주고!
   
   providers: [
       GithubProvider({
         clientId: 'Github에서 발급받은ID',
         clientSecret: 'Github에서 발급받은Secret',
       }),
       요기!!!
   ],
   조기!!!
   adapter: MongoDBAdapter(connectDB),
   secret: 'qwer1234' 
   ```


   요기!!! 이 부분에 아래 코드 작성
   ```react
   CredentialsProvider({
         //1. 로그인페이지 폼 자동생성해주는 코드 
         name: "credentials",
         credentials: {
           email: { label: "email", type: "text" },
           password: { label: "password", type: "password" },
           // 로그인 페이지에 들어갈 input들 설정하는 옵션 코드
         },
   
         //2. 로그인요청시 실행되는코드
         //직접 DB에서 아이디,비번 비교하고 
         //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
         async authorize(credentials) {
           let db = (await connectDB).db('forum');
           let user = await db.collection('user_cred').findOne({email : credentials.email})
           if (!user) {
             console.log('해당 이메일은 없음');
             return null
           }
           const pwcheck = await bcrypt.compare(credentials.password, user.password);
           if (!pwcheck) {
             console.log('비번틀림');
             return null
           }
           return user
         }
       })
   ```

   조기!!! 부분에 아래 코드 작성
   ```react
   //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
     session: {
       strategy: 'jwt',
       maxAge: 30 * 24 * 60 * 60 //30일
     },
   
   
     callbacks: {
       //4. jwt 만들 때 실행되는 코드 
       //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
       jwt: async ({ token, user }) => {
         if (user) {
           token.user = {};
           token.user.name = user.name
           token.user.email = user.email
         }
         return token;
       },
       //5. 유저 세션이 조회될 때 마다 실행되는 코드
       session: async ({ session, token }) => {
         session.user = token.user;  
         return session;
       },
     },
   ```

   
