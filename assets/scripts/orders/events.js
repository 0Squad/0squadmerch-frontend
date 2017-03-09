'use strict';

// const getFormFields = require(`../../../lib/get-form-fields`);

const api = require('./api');
const ui = require('./ui');
// const store = require('../store');
const cart = require('../cart');

const onGetOrders = function (event) {
  event.preventDefault();
  api.getOrders()
    .then(ui.getOrdersSuccess)
    .catch(ui.getOrdersFailure);
};

const onShowOrder = function (event) {
  event.preventDefault();
  // delete cart.order;
  let total = 0;
  for(let i = 0; i < cart.length; i++) {
    total += (cart[i].price * cart[i].quantity);
  }
  ui.showOrderSuccess(cart, total);
};

const onCreateOrder = function (event) {
  event.preventDefault();
  let data = {
    order: {
      items: cart,
      complete: true
    }
  };
  console.log(data);
  api.createOrder(data)
    .then((data) => {
      console.log(data);
    })
    .catch(console.error);
};


// this is a patch function that removes a selected item from the current cart
const onRemoveItem = function (event) {
  // event.preventDefault();
  // let itemId = event.target.dataset.id;
  // let id = cart.order._id;
  // // let items = cart.order.items;
  // if (cart.order.items.length === 1) {
  //   cart.pop();
  //   console.log("order is", cart);
  // }
  // else {

  // console.log(cart);
  // api.updateOrder(id, cart)
  //   .then((data) => {
  //     if (cart !== {}){
  //       onShowOrder(event);
  //     }
  //     else {
  //       ui.removeItemSuccess(data);
  //       console.log("order is", cart);
  //     }
  //   })
  //   .catch(ui.showOrderFailure);
};

const addHandlers = () => {
  $('#get-orders').on('click', onGetOrders);
  $('.cart-btn').on('click', onShowOrder);
  $('#myCartModal').on('click', '.item-delete', onRemoveItem);
  $('#checkout-btn').on('click', onCreateOrder);
};

module.exports = {
  addHandlers,
  onShowOrder,
};
