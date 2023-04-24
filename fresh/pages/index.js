export default function Home() {

  let name = 'panseung'
  let link = "http://google.com"

  return (
    <div>
      <h4 className="title">애플후레시</h4>
      <p className="title-sub">by dev { name }</p>
      <a href={link}>gogo</a>
    </div>
  )
}
