export default function Write() {
  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form action="/api/testApi" method="GET">
        <button type="submit">get요청 버튼</button>
      </form>
      <form action="/api/testApi" method="POST">
        <button type="submit">post요청 버튼</button>
      </form>
      <form action="/api/time" method="GET">
        <button type="submit">현재시간 요청 버튼</button>
      </form>
      <form action="/api/post/write" method="POST">
        <input name="title" placeholder="글제목"/>
        <input name="content" placeholder="글내용"/>
        <button type="submit">전송</button>
      </form>
    </div>
  )
}