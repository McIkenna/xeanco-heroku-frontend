import axios from "axios"
import { DELETE_PRODUCT, DELETE_PRODUCT_TASK, GET_ALL_PRODUCT_TASKS, GET_ERRORS, GET_PRODUCT, GET_PRODUCTLOG, GET_PRODUCTS, GET_PRODUCT_TASK, GET_PRODUCT_TASKS } from "./types";
import { proxy } from "../components/Constant/Proxy";
export const createProduct = (product, history) => async dispatch => {
    try{
        await axios.post(`${proxy}/admin/product`, product)
        history.push("/")
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getProducts = () => async dispatch => {
    const {data} = await axios.get(`${proxy}/api/product/all`)
    dispatch({
        type: GET_PRODUCTS,
        payload: data

    })
}

export const getProduct = (productId, history) => async dispatch => {
    try{
        const res = await axios.get(`${proxy}/api/product/${productId}`)
        dispatch({
            type: GET_PRODUCT,
            payload: res.data
        });
    }catch(error){
        history.push("/");
    }
}

export const deleteProduct = id => async dispatch => {
    if(window.confirm("Are you sure?"))
    {
        await axios.delete(`${proxy}/admin/product/${id}`)
        dispatch({
            type: DELETE_PRODUCT,
            payload: id
        })

    }
}

export const updateProduct = (product, history) => async dispatch => {
    try{
        await axios.put(`${proxy}/admin/product`, product)
        history.push("/")
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    }catch(error){
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

/* Product Task */
export const createProductTask = (
    product_task,
    productIdentifier_id,
    history
  ) => async dispatch => {
    try {
      await axios.post(`${proxy}/admin/productTask/${productIdentifier_id}`, product_task);
      history.push(`${proxy}/productBoard/${productIdentifier_id}`);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };
  
  export const getProductTasks = productIdentifier_id => async dispatch => {
    try {
      const res = await axios.get(`${proxy}/api/productTask/${productIdentifier_id}`);
      dispatch({
        type: GET_PRODUCT_TASKS,
        payload: res.data
      });
    } catch (err) {}
  };

  export const getProductTask = (productlog_id, pt_id) => async dispatch => {
    try {
      const res = await axios.get(`${proxy}/api/productTask/${productlog_id}/${pt_id}`);
      dispatch({
        type: GET_PRODUCT_TASK,
        payload: res.data
      });
    } catch (err) {}
  };

  export const updateProductTask = (
    product_task,
    productlog_id, 
    pt_id,
    history
  ) => async dispatch => {
    try {
      await axios.put(`${proxy}/admin/productTask/${productlog_id}/${pt_id}`, product_task);
      history.push(`/productBoard/${productlog_id}`);
      dispatch({
        type: GET_ERRORS,
        payload: {}
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    }
  };

  export const deleteProductTask = ( 
      productlog_id, 
    pt_id) => async dispatch => {
    if(window.confirm("Are you sure?"))
    {
        await axios.delete(`${proxy}/admin/productTask/${productlog_id}/${pt_id}`)
        dispatch({
            type: DELETE_PRODUCT_TASK,
            payload: pt_id
        })

    }
}

export const getAllProductTasks = ()=> async dispatch => {
  try {
    const res = await axios.get(`${proxy}/api/productTask/all`);
    dispatch({
      type: GET_ALL_PRODUCT_TASKS,
      payload: res.data
    });
  } catch (err) {}
};
/*

export const getFeatureTask = (featureTaskId, history) => async dispatch => {
    try{
        const res = await axios.get(`http://localhost:8080/api/task/${featureTaskId}`)
        dispatch({
            type: GET_FEATURE_TASK,
            payload: res.data
        });
    }catch(error){
        history.push("/");
    }
}
*/