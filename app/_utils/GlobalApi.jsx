const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || 'https://methodical-fellowship-e148050026.strapiapp.com/api',
  headers: {
    Authorization: `Bearer 8f54ab8b71ca3f7bee9c144155d2758cd0e34c357f437470238025c9cd72ce8b07897c80d7406073e0dc165d897112e088ce4e69796202e5ae87af72a114e2c45634606432b71f30e52eaaa4f2b34439bfe89172c86cb645cf18732b32c575c0fcc433e2a35c48dc38c6fa56ecc6ef07fb5f6f0c57a3b584a91db009a9d1d666`,
  },
});

const getCategory = () => axiosClient.get('/categories?populate=*');
const getSliders = () => axiosClient.get('/sliders?populate=*').then(resp => resp.data.data);
const getCategoryList = () => axiosClient.get('/categories?populate=*').then(resp => resp.data.data);
const getAllProducts = () => axiosClient.get('/products?populate=*').then(resp => resp.data.data);
const getProductsByCategory = (category) => axiosClient.get(`/products?filters[categories][name][$in]=${category}&populate=*`).then(resp => resp.data.data);
const registerUser = (username, email, password) => axiosClient.post('/auth/local/register', { username, email, password });
const SignIn = (email, password) => axiosClient.post('/auth/local', { identifier: email, password });
const addToCart = (data, jwt) => axiosClient.post('/user-carts', data, { headers: { Authorization: `Bearer ${jwt}` } });
const getCartItems = (userId, jwt) => axiosClient.get(`/user-carts?filters[userId][$eq]=${userId}&[populate][products][populate][images][populate][0]=url`, { headers: { Authorization: `Bearer ${jwt}` } }).then(resp => {
  const data = resp.data.data;
  const cartItemsList = data.map((item) => ({
    name: item.attributes.products?.data[0].attributes.name,
    quantity: item.attributes.quantity,
    amount: item.attributes.amount,
    image: item.attributes.products?.data[0].attributes.images.data[0].attributes.url,
    actualPrice: item.attributes.products?.data[0].attributes.mrp,
    id: item.id,
    product: item.attributes.products?.data[0].id,
  }));
  return cartItemsList;
});
const deleteCartItem = (id, jwt) => axiosClient.delete(`/user-carts/${id}`, { headers: { Authorization: `Bearer ${jwt}` } });
const createOrder = (data, jwt) => axiosClient.post('/orders', data, { headers: { Authorization: `Bearer ${jwt}` } });
const getMyOrder = (userId, jwt) => axiosClient.get(`/orders?filters[userId][$eq]=${userId}&populate[orderItemList][populate][product][populate][images]=url`).then(resp => {
  const response = resp.data.data;
  const orderList = response.map(item => ({
    id: item.id,
    totalOrderAmount: item.attributes.totalOrderAmount,
    paymentId: item.attributes.paymentId,
    orderItemList: item.attributes.orderItemList,
    createdAt: item.attributes.createdAt,
    status: item.attributes.Status,
  }));
  return orderList;
});

export default {
  getCategory,
  getSliders,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  SignIn,
  addToCart,
  getCartItems,
  deleteCartItem,
  createOrder,
  getMyOrder,
};