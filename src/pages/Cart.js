import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartThunk, deleteItemCartThunk, removeCartEmpetyThunk, addOneQuantityThunk} from '../redux/actions'
import { Link } from 'react-router-dom'
import '../styles/styles-cart.css'

const Cart = () => {

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
 
  // console.log(cart)

  useEffect(() => {
    dispatch(getCartThunk())   
  }, [ dispatch ])

  const deleteProduct = id =>{
    dispatch(deleteItemCartThunk(id))       
  } 

  const removeCart = () => {
    dispatch(removeCartEmpetyThunk())    
  }

  const modifyQuantity = (x, y) => {
    if(y === 0 ){      
      dispatch(deleteItemCartThunk(x))
      alert("Su carrito esta vacio")
    }else if( y>0 ) {
      dispatch(addOneQuantityThunk(x, y))
    }        
  }

  const pay = () => {
    alert("Su compra se realizo....")
  }
  

  const prices = (cart.map( cart => Math.floor(cart.product.price * cart.quantity)))
  const totalPrice = prices.reduce( (anterior, actual)=> anterior + actual, 0 )

  // console.log(prices)
  
  return (
      <div className='container-cart'>
        <h1>Cart</h1>

        <div className='row'>  
            
            <div className='list'>
              <div className='titulo'> <span>Imagen</span><span>Producto</span><span>Precio</span> <span>Cantidad</span><span>Subtotal</span></div>
              {
                cart.map(cart => (
                  <div key={cart.id} className='list-card'>
                    <div className='list-info'>  
                      <img src={cart.product.images[0].url} alt=""  style={{width: "100px"}}/>   
                      <Link className='text'  to={`/shop/${cart.product.name}`}> {cart.product?.name} </Link>                
                      <p className='text'>$ {cart.product.price}</p>
                      <p className='text'>{cart.quantity}</p>
                      <p className='text'>$ {cart.product.price * cart.quantity}</p>
                      <div className='btn-container'>
                        {/* <button className='text' onClick={() => deleteProduct(cart.id)}>Borrar</button> */}
                        <i onClick={() => modifyQuantity(cart.id, (cart.quantity - 1))} className="fas fa-minus"></i>
                        <i onClick={() => modifyQuantity(cart.id, (cart.quantity + 1))} className="fas fa-plus"></i>
                        <i onClick={() => deleteProduct(cart.id)} className="fas fa-trash trash"></i>
                        {/* <button onClick={() => dispatch(addOneQuantityThunk(cart.id, (cart.quantity - 1)))}>-</button> */}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
        </div> 
        {
          cart.quantity && <button className='btn-trash' onClick={removeCart}>Vaciar carrito</button> 
        }          
        <h2 className='pay'> Total a pagar: $ {totalPrice} <span><button onClick={() => pay()}>Comprar</button></span> </h2>
        
      </div>
  )}

export default Cart
