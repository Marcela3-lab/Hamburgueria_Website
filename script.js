const menu = document.getElementById('menu');
const btnCart= document.getElementById('meucarro');
const cartModal = document.getElementById('cartmodal');
const cartItens = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const btnClose = document.getElementById('close_btn');
const finalizar = document.getElementById('finalizar_btn');
const conter = document.getElementById('cart-count');
const perigo = document.getElementById('adress-warning');
const adressinput = document.getElementById('adress');

let cart =[];
//Abrir o modal do carrinho
btnCart.addEventListener('click', () => {
    cartModal.style.display="flex";
    updateCart();
});

//fechar o modal do carrinho
cartModal.addEventListener('click', function(event){
    if (event.target === cartModal ){
        cartModal.style.display="none";
    }
});

//botao fechar
btnClose.addEventListener('click', function()  {
    cartModal.style.display="none";
});

//pegar o envento dentro do menu(quando o botao do item de adcionr for cliccado)
// .nomeclass
//#nomeids
menu.addEventListener('click', function(event){
//console.log(event.target);
let parentButton = event.target.closest(".add-to-cart-btn");
console.log(parentButton);
if (parentButton){
    const name=parentButton.getAttribute("data-name");
    const price=parseFloat(parentButton.getAttribute("data-price"));
    console.log(name, price);
addtoCart(name,price);
    //Adicionar no carrinho
}
})

//Funcao para adicionar no carrinho
function addtoCart(name,price){
const existingItem = cart.find(item => item.name === name)
if (existingItem){
    existingItem.quantity +=1;
    
} else{
cart.push({name,
    price,
    quantity:1})
}
 updateCart();
}

//atualizar o carrinho
function updateCart(){
cartItens.innerHTML="";
let total =0;

cart.forEach(item =>{
    const cartItemElement = document.createElement('div');
cartItemElement.classList.add("flex","justify-between","mb-4","flex-col");

cartItemElement.innerHTML=`
<div class="flex itemss center justify-between">
    <div> 
<p class="font-bold">${item.name}</p>
<p>Quantidade: ${item.quantity}</p>
<p class="font medium mt-2">€ ${item.price.toFixed(2)}</p>

    </div>


    <button class="remove-from-cart-btn" data-name="${item.name}">
    Remover
    </button>
    
</div>

`;
    total += item.price * item.quantity;

cartItens.appendChild(cartItemElement);

});
cartTotal.textContent = total.toLocaleString('pt-PT', {style: 'currency', currency: 'EUR'});

const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
conter.innerHTML = totalItems;
}
 
// função para remover o item do carrinho
cartItens.addEventListener("click", function(event){
    if (event.target.classList.contains("remove-from-cart-btn")){

        const name = event.target.getAttribute("data-name");
        console.log(name);
removeItemcart(name);
        
    }
})

function removeItemcart(name){
   const index = cart.findIndex(item => item.name === name);

if (index !=-1){
    const item = cart[index];
 
    if(item.quantity > 1){
        item.quantity -=1;
        updateCart();
        return;
    }
    cart.splice(index, 1);
    updateCart();
}
}

//Endereço
adressinput.addEventListener("input", function(event){
    let inputValue = event.target.value;

if (inputValue !== ""){
    perigo.classList.add("hidden");
}
})


function checkrestauranteopen (){
const data = new Date();
const hora = data.getHours();
return hora > 16 && hora < 22; //true
}


const spanItem = document.getElementById("botaoheader")
const isOpen = checkrestauranteopen();
if(isOpen){
    spanItem.classList.remove("bg-red-500");
    spanItem.classList.add("bg-green-600");
}else{
        spanItem.classList.remove("bg-green-600");
spanItem.classList.add("bg-red-500");

}

//Logica de finalizar o carrinho
finalizar.addEventListener("click", function(event){


   

    if (cart.length === 0) 
        return;


    if (adressinput.value === ""){
        perigo.classList.remove("hidden");
        return;
    }
 const isOpen = checkrestauranteopen();

    if (!isOpen){
        Toastify({
  text: "O Restaurante está fechado no momento",
  duration: 3000,
  destination: "",
  newWindow: true,
  close: true,
  gravity: "top", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    background: "linear-gradient(to right, #00b09b, #96c93d)",}
}).showToast();
        return; 
    }
//enviar api whatsapp
const cartItens = cart.map((item) => {
    return (
        `${item.name}, Quantidade: ${item.quantity}, Preço: ${item.price} - `
    )
}).join("");

const message = encodeURIComponent(cartItens);
const phone = "937733604"
window.open(`https://wa.me/${phone}?text=${message} Endereço: ${adressinput.value}`, "_blank") 
console.log(cartItens);
cart = [];
updateCart();
//verificar hora e manipular cart





});

