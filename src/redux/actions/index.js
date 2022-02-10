// 1.- Declarar la propiedad en el objeto actions
// 2.- Hacer el case en el switch
// 3.- Crear la función en el action generator
// 4.- Despechar la función en el componente donde la vayamos a usar

import axios from "axios"
import { getConfig } from "../../utils"

export const actions ={
    setProductList: "SET_PRODUCT_LIST",
    setIsLoading: "SET_IS_LOADING",
    setProductDetail: "SET_PRODUCT_DETAIL",
    setCategories: "SET_CATEGORIES",
    setCart: "SET_CART"      
}

export const setProductList = products => ({
    type: actions.setProductList,
    payload: products
})

export const setProductDetail = productDetail => ({
    type: actions.setProductDetail,
    payload: productDetail
})

export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload: isLoading
})

export const setCategories = categories => ({
    type: actions.setCategories,
    payload: categories
})

export const setCart = cart => ({
    type: actions.setCart,
    payload: cart
})


export const getProductListThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get('https://ecommerce-exercise-backend.herokuapp.com/products/', getConfig())
            .then(res =>dispatch(setProductList(res.data)))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)))
        }
}

export const getProductDetailThunk = id =>{
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/${id}/`, getConfig())
            .then(res =>dispatch(setProductDetail(res.data)))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)))
        }
}

export const getCategoriesThunk = () =>{
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/categories/`, getConfig())
            .then(res =>dispatch(setCategories(res.data)))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)))
        }
}

export const filterCategoriesThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/?category=${id}`, getConfig())
        .then(res => dispatch(setProductList(res.data)))
        .catch(error =>console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)))
        }
}

export const filterHeadlineThunk = name => {
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/products/?name__icontains=${name}`, getConfig())
        .then(res => dispatch(setProductList(res.data)))
        .catch(error =>console.log(error.response))
        .finally(() => dispatch(setIsLoading(false)))
        }
}

export const getCartThunk = () =>{
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.get(`https://ecommerce-exercise-backend.herokuapp.com/cart/`, getConfig())
            .then(res =>dispatch(setCart(res.data)))
            .catch(error => console.log(error.response))
            .finally(() => dispatch(setIsLoading(false)))
        }
}

export const addCartThunk = countCart => {
    console.log(countCart)
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.post('https://ecommerce-exercise-backend.herokuapp.com/products/add_to_cart/', countCart, getConfig())
        .then(() => {
                dispatch(getCartThunk())
                alert("Se agrego productos al carrito")
            })
            .catch(error => {
                console.log(error)
                alert("Hubo un error")
            })
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const deleteItemCartThunk = id => {
    console.log(id)
    return dispatch => {
        dispatch(setIsLoading(true))
        axios.delete(`https://ecommerce-exercise-backend.herokuapp.com/cart/${id}/remove_item/`, getConfig())
            .then(() => {
                dispatch(getCartThunk())
                alert("Se elimino producto al carrito")
            })
            .catch(error => {
                console.log(error)
                alert("Hubo un error")
            })
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const removeCartEmpetyThunk = () => {
    return dispatch =>{
        dispatch(setIsLoading(true))
        axios.delete('https://ecommerce-exercise-backend.herokuapp.com/cart/empty_cart/', getConfig())
            .then(() => {
            dispatch(getCartThunk())
            alert("Se vacio productos del carrito")
            })
            .catch(error => {
                console.log(error)
                alert("Hubo un error")
            })
            .finally(() => dispatch(setIsLoading(false)))
    }
}

export const addOneQuantityThunk = (item, quantity) => {
    // console.log(item, quantity)
    return dispatch =>{
        dispatch(setIsLoading(true))
        axios.put(`https://ecommerce-exercise-backend.herokuapp.com/cart/${item}/change_quantity/`, {quantity}, getConfig())
            .then(() => {
            dispatch(getCartThunk())
            alert("Se actualizo la cantidad del producto")
            })
            .catch(error => {
                console.log(error)
                alert("Hubo un error")
            })
            .finally(() => dispatch(setIsLoading(false)))
    }
}


