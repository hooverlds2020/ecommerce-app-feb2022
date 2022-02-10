import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import { filterCategoriesThunk, filterHeadlineThunk, getCategoriesThunk, getProductListThunk} from '../redux/actions';
import '../styles/styles-pages.css'


const Shop = () => {  
  
  const productList = useSelector(state => state.productList)
  const categories = useSelector(state => state.categories)

  const [search, setSearch] = useState("") 
 
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(getProductListThunk())
    dispatch(getCategoriesThunk())
  }, [dispatch]);

  const filterCategories = id => dispatch(filterCategoriesThunk(id))

  const filterHeadline = e => {
    e.preventDefault()
    dispatch(filterHeadlineThunk(search))
  }

  
  return (
    <div className='container-product'> 
        <h1>Shop</h1>        
        <div className='filter-product'>
          <div className='form-container'>
            <form onSubmit={filterHeadline}>
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
              <button>Search</button>
            </form>
          </div>
          <div className='category'>
            <ul  className='category-list'>
              {
                categories.map(category =>(
                  
                    <li key={category.id}>
                      <button onClick={() => filterCategories(category.id)}>
                        {category.name}
                      </button>
                    </li>                  
                ))
              }
            </ul>
          </div>
        </div>
      
        <div className='list-product'>            
              {
                productList.map(product=>(
                  <div key={product.id}  className='card'>
                    <Link to={ `/shop/${product.id}` }>
                      <img src={product.images[0].url} alt=""/> 
                        <div className='info-price'>          
                          <p className='product-name' >
                                        
                                {product.name}           
                            
                          </p>
                          <p>$ {product?.price}</p>
                        
                      </div> 
                    </Link>
                  </div>
                ))
              }
        </div>
      
    </div>
  
)};

export default Shop;
