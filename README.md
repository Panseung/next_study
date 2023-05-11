# next_study

코딩애플 next 강의



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

