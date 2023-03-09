//! - Listar as pizzas

//! -  FUNÇÕES E VARIÁVEIS GLOBAIS

let cart = [];
let modalQt = 1;
let modalKey = 0;


const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
  //TODO - Clonar a Estrutura da pizza
  
  let pizzaItem = c('.models .pizza-item').cloneNode(true);
  pizzaItem.setAttribute('data-key', index);
  //TODO - Preencher as informações de Pizza Item

  pizzaItem.querySelector('.pizza-item--img img').src = item.img;

  //! - CONFIGURANDO O MODAL

  pizzaItem.querySelector('a').addEventListener('click', (e) => {
    //TODO - Para não atualizar a tela.
    e.preventDefault(); 

    //TODO - Para pegar o index da pizza clicada e preencher modal

    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    modalQt = 1;
    modalKey = key;

    c('.pizzaBig img').src = pizzaJson[key].img
    c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    c('.pizzaInfo--actualPrice').innerHTML = pizzaJson[key].price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    c('.pizzaInfo--size.selected').classList.remove('selected');
    cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
      if(sizeIndex == 2){
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
    c('.pizzaInfo--qt').innerHTML = modalQt;

    //TODO - Animação do modal
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
      c('.pizzaWindowArea').style.opacity = 1
    }, 200);

    //TODO - Modal aparecer
    c('.pizzaWindowArea').style.display = 'flex';
  })

  //TODO - Configuração do preço de forma correta
  const pizzaPrice = item.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  pizzaItem.querySelector(".pizza-item--price").innerHTML = `${pizzaPrice}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  //TODO - Adicionar na tela
  c('.pizza-area').append(pizzaItem);

})

//! - EVENTOS DO MODAL

function closeModal(){
  c('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    c('.pizzaWindowArea').style.display = 'none';
  }, 500);
};

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeModal);
});


c('.pizzaInfo--qtmenos').addEventListener('click', () => {
  if(modalQt > 1){
    modalQt--;
  
    c('.pizzaInfo--actualPrice').innerHTML = (pizzaJson[modalKey].price * modalQt).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    c('.pizzaInfo--qt').innerHTML = modalQt;
  }
});

c('.pizzaInfo--qtmais').addEventListener('click', () => {
  modalQt++;

  c('.pizzaInfo--actualPrice').innerHTML = (pizzaJson[modalKey].price * modalQt).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  c('.pizzaInfo--qt').innerHTML = modalQt;
});

cs('.pizzaInfo--size').forEach((size) => {
  size.addEventListener('click', () => {
    c('.pizzaInfo--size.selected').classList.remove('selected');
    size.classList.add('selected');
  })
});

//! - CARRINHO

c('.pizzaInfo--addButton').addEventListener('click', () => {
 
  let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));
  let identifier = pizzaJson[modalKey].id + '@' + size;
  let verification = cart.findIndex((item) => item.identifier == identifier);
  if(verification > -1){
    cart[verification].qt += modalQt;
  } else{
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      qt: modalQt
    });
  }
  updateCart();
  closeModal();
})

//! EDITANDO O CARRINHO COM AS PIZZAS ADICIONADAS

//TODO - Abrir o carrinho MOBILE.

c('.menu-openner').addEventListener('click', () => {
  if(cart.length > 0){
    c('aside').style.left = '0';
  }
})
c('.menu-closer').addEventListener('click', () => {
  c('aside').style.left = '100vw';
})

function updateCart(){
  c('.menu-openner span').innerHTML = cart.length;
  
  if(cart.length > 0){

    c('aside').classList.add('show');
    c('.cart').innerHTML = "";
    let subtotal = 0;
    let desconto = 0;
    let total = 0;

    for(let i in cart){
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
      subtotal += pizzaItem.price * cart[i].qt;

      let cartItem = c('.models .cart--item').cloneNode(true);
      
      let pizzaSizeName;
      switch(cart[i].size){
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
        case 2:
          pizzaSizeName = 'G';
          break;
      }
      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
      
      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
        if(cart[i].qt > 1){
          cart[i].qt--;
        } else {
          cart.splice(i,1);
        }
        updateCart();
      })
       cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
        cart[i].qt++
        updateCart();
      })
      
      c('.cart').append(cartItem);

    }

    //! CALCULO DOS VALORES DO CARRINHO
   
    desconto = subtotal * 0.1;
    total = subtotal - desconto;

    c('.subtotal span:last-child').innerHTML = subtotal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    c('.desconto span:last-child').innerHTML = desconto.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    c('.total span:last-child').innerHTML = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
    
    

  } else {
    c('aside').classList.remove('show');
    c('aside').style.left = '100vw';
  }


}