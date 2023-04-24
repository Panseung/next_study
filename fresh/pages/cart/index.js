export default function Cart() {
  return (
    <div>
      <h4 className="title">Cart</h4>
      <CartItem productName="상품1" cost="1" count="2"/>
      <CartItem productName="상품2" cost="2" count="3"/>
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