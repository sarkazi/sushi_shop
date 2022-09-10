getProducts();
//счетчик в магазине



window.addEventListener('click', function (event) {


   if (event.target.closest('.col-md-6')) {
      let parent = event.target.closest('.col-md-6');
      let counterNumber = parent.querySelector('.items__current');

      if (event.target.dataset.action === 'plus') {
         counterNumber.innerText++;
      }
      if (event.target.dataset.action === 'minus') {
         if (parseInt(counterNumber.innerText) <= 1) {

         } else {
            counterNumber.innerText--;
         }
      }

   }
})




//действия при добавлении товара

const cart = document.querySelector('.cart-wrapper');
const cartTotalPrice = document.querySelector('.total-price');



window.addEventListener('click', function (event) {
   if (event.target.hasAttribute('data-cart')) {
      const cardShop = event.target.closest('.card');

      const obj = {
         id: cardShop.dataset.id,
         imgSrc: cardShop.querySelector('.product-img').getAttribute('src'),
         name: cardShop.querySelector('.item-title').innerText,
         price: cardShop.querySelector('.price__currency').innerText,
         itemsInBox: cardShop.querySelector('[data-items-in-box]').innerText,
         weight: cardShop.querySelector('.price__weight').innerText,
         number: cardShop.querySelector('[data-counter]').innerText,
      }





      const itemInCart = cart.querySelector(`[data-id="${obj.id}"]`);


      if (itemInCart) {
         let counterItemInCart = itemInCart.querySelector('[data-counter=""]')
         counterItemInCart.innerHTML = parseInt(counterItemInCart.innerText) + parseInt(obj.number);
         calcCartPrice();
      } else {
         cart.insertAdjacentHTML('beforeend', `

      
   
         <div class="cart-item" data-id=${obj.id}>
            <div class="cart-item__top">
               <div class="cart-item__img">
                  <img src=${obj.imgSrc} alt="">
               </div>
               <div class="cart-item__desc">
                  <div class="cart-item__title">${obj.name}</div>
                  <div class="cart-item__weight">${obj.itemsInBox} / ${obj.weight}</div>


                  <div class="cart-item__details">

                     <div class="items items--small counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter="">${obj.number}</div>
                        <div class="items__control" data-action="plus">+</div>
                     </div>

                     <div class="price">
                        <div class="price__currency">${obj.price}</div>
                     </div>

                  </div>
                 

               </div>
            </div>
         </div>
        

   
`)


         toogleCartStatus();
         calcCartPrice();


      }


      cardShop.querySelector('[data-counter]').innerHTML = 1;








   }
})


//счетчик в корзине








window.addEventListener('click', function (event) {


   if (event.target.closest('.cart-item')) {

      let cartItem = event.target.closest('.cart-item');
      if (event.target.dataset.action === 'plus') {
         cartItem.querySelector('[data-counter=""]').innerText++;
         calcCartPrice();
      }
      if (event.target.dataset.action === 'minus') {
         if (cartItem.querySelector('[data-counter=""]').innerText > 1) {
            cartItem.querySelector('[data-counter=""]').innerText--;
            calcCartPrice();

         } else {
            cartItem.remove();
            calcCartPrice();
            toogleCartStatus();




         }
      }
   }



})



//добавление "корзина пуста", "заказать", "цена доставки"





function toogleCartStatus() {


   let orderForm = document.querySelector('#order-form');
   let cartEmpty = cart.parentNode.querySelector('[data-cart-empty]');
   let cartTotal = cart.parentNode.querySelector('.cart-total');




   if (cart.children.length === 0) {
      orderForm.classList.add('none');
      cartEmpty.style.display = 'block';
      cartTotal.classList.add('none');
   } else {
      orderForm.classList.remove('none');
      cartEmpty.style.display = 'none';
      cartTotal.classList.remove('none');

   }
}


//подсчет итоговой суммы с учетом доставки


function calcCartPrice() {
   const cartItems = document.querySelectorAll('.cart-item');
   const finalSumm = document.querySelector('.total-price');

   let cartTotal = cart.parentNode.querySelector('.cart-total');
   const cartDelivery = cartTotal.querySelectorAll('p')[0].querySelector('.delivery-cost');

   let totalPrice = 0;

   cartItems.forEach(function (i) {
      const cartCounter = i.querySelector('[data-counter=""]').innerText;
      const cartPrice = i.querySelector('.price__currency').innerText;



      const currentPrice = parseInt(cartPrice) * parseInt(cartCounter);
      totalPrice = totalPrice + currentPrice;




      if (parseInt(totalPrice) >= 1000) {
         cartDelivery.innerHTML = 'Бесплатно';
         finalSumm.innerHTML = totalPrice + ' ₽';

      } else {
         cartDelivery.innerHTML = '250 ₽';
         finalSumm.innerHTML = totalPrice + 250 + ' ₽';

      }

   })
}










