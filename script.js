//! Listar as pizzas

//! FUNÇÕES E VARIÁVEIS GLOBAIS
let modalQt = 1;
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

//! EVENTOS DO MODAL

function closeModal(){
  c('.pizzaWindowArea').style.opacity = 0;
  setTimeout(() => {
    c('.pizzaWindowArea').style.display = 'none';
  }, 500);
}
cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeModal);
})