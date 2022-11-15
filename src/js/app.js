import {settings, select, classNames, templates} from './settings.js';
import Product from './components/Product.js';
import Cart from './components/Cart.js';
import Booking from './components/Booking.js';
import Home from './components/Home.js';

const app = {
  initPages: function(){
    const thisApp = this;
    thisApp.pages = [];
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.all.links);
    //thisApp.homeLinks = document.querySelectorAll(select.all.homeLinks);
    const idFromHash = window.location.hash.replace('#/', '');
    console.log(thisApp.pages);
    let pageMatchingHash = thisApp.pages[0].id;
    for (let page of thisApp.pages){
      if (page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);

    for (let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
        window.location.hash = '#/' + id;
      });
    }

    //console.log(thisApp.homeLinks);
    //for (let link of thisApp.homeLinks){
    //  link.addEventListener('click', function(event){
    //    const clickedElement = this;
    //    event.preventDefault();
    //    const id = clickedElement.getAttribute('href').replace('#', '');
    //    thisApp.activatePage(id);
    //    window.location.hash = '#/' + id;
    //  });
    //}
  },

  activatePage: function(pageId){
    const thisApp = this;
    for(let page of thisApp.pages){
      page.classList.toggle(classNames.pages.active, page.id == pageId);
    }
    for(let link of thisApp.navLinks){
      link.classList.toggle(
        classNames.nav.active, 
        link.getAttribute('href') == '#' + pageId);
    }
  },

  initMenu: function(){
    const thisApp = this;
    console.log('thisApp.data', thisApp.data);
    for(let productData in thisApp.data.products){
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);
    }
  },

  initHome: function(){
    const thisApp = this;
    const homeElem = document.querySelector(select.containerOf.home);
    thisApp.booking = new Home(homeElem);
  },

  initData: function(){
    const thisApp=this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.products;
    fetch(url)
      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.products = parsedResponse;
        thisApp.initMenu();
      });
  },

  initCart: function(){
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);
    thisApp.productList = document.querySelector(select.containerOf.menu);
    //console.log(thisApp.productList);
    thisApp.productList.addEventListener('addToCart', function(event){
      app.cart.add(event.detail.product);
    });
  },

  initBooking: function(){
    const thisApp = this;
    const bookingElem = document.querySelector(select.containerOf.booking);
    thisApp.booking = new Booking(bookingElem);
  },


  init: function(){
    const thisApp = this;
    console.log('*** App starting ***');
    console.log('thisApp:', thisApp);
    console.log('classNames:', classNames);
    console.log('settings:', settings);
    console.log('templates:', templates);
    thisApp.initHome();
    thisApp.initPages();
    thisApp.initData();
    thisApp.initCart();
    thisApp.initBooking();
    

  },
};

app.init();

