import { useState } from 'react'
import './index.css'

function App() {
  const products = [
    {
      id: 1,
      name: 'Grapes',
      image:"https://picsum.photos/id/75/125",
      price: 3.98
    },
    {
      id: 2,
      name: 'Raspberries',
      image:"https://picsum.photos/id/429/125",
      price: 1.99
    },
    {
      id: 3,
      name: 'Strawberries',
      image:"https://picsum.photos/id/1080/125",
      price: 1.88
    },
    {
      id: 4,
      name: 'Pineapple',
      image:"https://picsum.photos/id/824/125",
      price: 2.99
    },
  ]

  return (
    <div className="container">
    <h1>Fresh Fruit Market</h1>
      <ProductList products={products}/>
    </div>
  )
}

export default App;

const useCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAdd = (item) => {
    // check if the product is already in the cart
    const alreadyInCart = cartItems.find(
      (itemInCart) => itemInCart.id === item.id
    );
    if (alreadyInCart) {
      setCartItems(
        cartItems.map((itemInCart) =>
          itemInCart.id === item.id
            ? { ...alreadyInCart, quantity: alreadyInCart.quantity + 1 }
            : itemInCart
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemove = (item) => {
    const alreadyInCart = cartItems.find(
      (itemInCart) => itemInCart.id === item.id
    );
    if (alreadyInCart) {
      if (alreadyInCart.quantity > 1) {
        setCartItems(
          cartItems.map((itemInCart) =>
            itemInCart.id === item.id
              ? { ...alreadyInCart, quantity: alreadyInCart.quantity - 1 }
              : itemInCart
          )
        );
      } else {
        setCartItems(
          cartItems.filter((itemInCart) => itemInCart.id !== item.id)
        );
      }
    }
  };
  return [cartItems, handleAdd, handleRemove];
}

// eslint-disable-next-line react/prop-types
const ProductList = ({ products }) => {
  const [cartItems, handleAdd, handleRemove] = useCart()
  const getTotalPrice = () =>{
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity,0)
    return totalPrice.toFixed(2);
  }

  return (
    <div>
    <ul className="product-list">
    <h2>Products</h2>
        {/*eslint-disable-next-line react/prop-types*/}
        {products !== 0 && products.map((product) => (
          <div className="product-item" key={product.id}>
            <h2>{product.name}</h2>
            <img src={product.image} alt={product.name} />
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAdd(product)}>Add to Cart</button>
          </div>
        ))}
      </ul>

      <ul className="cart-list">
        <h2>CartItems</h2>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button onClick={() => handleRemove(item)}>Remove</button>
            </div>
          ))
        ) : (
          <h3>Your cart is empty</h3>
        )}
      </ul>
      <div className="total-price">
        {/* eslint-disable-next-line react/no-unescaped-entities*/}
        <h2>Today's Total: ${getTotalPrice()}</h2>
      </div>
      <div className="checkout">
        <a href="/">Checkout</a>
      </div>
    </div>
    );
  }