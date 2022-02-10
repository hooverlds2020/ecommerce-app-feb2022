import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { filterCategoriesThunk, getProductDetailThunk, addCartThunk } from '../redux/actions';
import '../styles/styles-shopid.css'


const ShopId = () => {

  const { id } = useParams()  

  const dispatch = useDispatch()
  const [cart, setCart]=useState(0)

  const product = useSelector(state => state.productDetail)
  const productList = useSelector(state => state.productList)
  const {images} = useSelector(state => state.productDetail)
  console.log(images)

  useEffect(() => {
    dispatch(getProductDetailThunk(id))
  }, [ dispatch, id ]);

  useEffect(() => {
      if(product.category){
        dispatch(filterCategoriesThunk(product.category?.id))
      }      
  }, [dispatch, product]);

  const addCart = () => {

    const countCart = {
      quantity: cart,
      product: id
    }
    console.log(countCart)
    dispatch(addCartThunk((countCart)))

  }  

  return (
    <div className='container-shopid'>
      <aside className='container-principal'>
        <div className='images'>
          { 
            images && <img src={images[0].url} className='img-info' alt=''/>
          }
        </div>
        <div className='info'>
          <h2 key={product.id}>{product.name}</h2>
          <h4> Description: </h4>
          <p>{product?.description}</p>
          <h5>Category: {product.category?.name} </h5>

          <h4>Cart</h4>
          <div className='container-btn'>
              <button onClick={() => setCart(cart - 1)}> - </button>
                <div className='quantity'> {cart} </div>
              <button onClick={() => setCart(cart + 1)}> + </button>
          </div>
          <button className='btn' onClick={() => addCart(product.id)}>Agregar al carrito</button>          
        </div>        
      </aside>
      
      <aside className='aside-rigth'>        
       <div className='products-relation'>
       <h3>Productos relacionados</h3>
          <ul> 
            {
              productList.map(products =>
                <div className='card-products'>
                  <img src={products.images[0]?.url} className='img-info' alt='' />
                  <li key={products.id} className='selected_product'>
                    <Link to={`/shop/${products.id}`}>
                      {products?.name}
                    </Link>                              
                  </li>              
                  <p>{products.price}</p>
                </div> 
                )
            }
          </ul>
        </div>         
      </aside>
    </div>
)};

export default ShopId;
