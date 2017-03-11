'use strict';

const hbsCart = require('../templates/myCart.handlebars');
const cart = require('../cart');
const orderTemplate = require('../templates/order-history.handlebars');

const isCartEmpty = (data) => {
  if (data.order.items.length === 0) {
    return true;
  }
  return false;
};

const showOrderSuccess = (data, total) => {
  let cartTemplate = hbsCart({ items: cart, total: total });
  $('.cart-modal').html(cartTemplate);
};

const failure = () => {
  $('.danger-alert-message').text("An unknown error occured.");
  $('.alert-danger').slideDown();

  $('.alert-danger').delay(2000).slideUp();
};


const removeItemSuccess = (data) => {
  if (isCartEmpty(data)) {
    delete cart.order;
  }
  return cart;
};

const getOrdersSuccess = (data) => {
  let orderHBS = orderTemplate({ orders: data.orders });
  $('.order-history').html(orderHBS);
};

const clearCart = function () {
  for (let i = 0; i < cart.length; i++) {
    cart.pop();
  }
  showOrderSuccess([], 0);
};

module.exports = {
  showOrderSuccess,
  failure,
  removeItemSuccess,
  getOrdersSuccess,
  clearCart,
};
