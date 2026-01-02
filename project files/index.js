import {menuArray} from "./data.js"
import {v4 as uuidv4} from 'https://jspm.dev/uuid'

const container = document.getElementById("menu-container")
const newContainer = document.getElementById("order-container")
const submitBtn = document.getElementById("submit-btn")
const form = document.getElementById("form")
const goodbyeMsg = document.getElementById("goodbye-msg")
const goodbye = document.getElementById("thank-you")
const closeBtn = document.getElementById("close")
const orderTaken = document.getElementById("order-item")
const priceElement = document.getElementById("total-price")
const main = document.getElementById("main")
const forms = document.getElementById("order-form")
    




let arr = []



  document.addEventListener("click", function(e){
  if (e.target.dataset.menuId) {
    menuItem(e.target.dataset.menuId);
  }
  })

  document.addEventListener("click" ,function(e){
    if (e.target.dataset.btnId) {
      orderClear(e.target.dataset.btnId);
     }
  })
  
  document.addEventListener("click", function(e){
    if(e.target.id === "complete-order-btn"){
      form.style.visibility = "visible"
      main.classList.add("blur")  
    }
  })
  
  closeBtn.addEventListener("click", function(){
    form.style.visibility = "hidden"
  })


  
  form.addEventListener("submit", function(e){
    e.preventDefault()

    
    const formData = new FormData(forms)
    const name = formData.get("name")
    const card = formData.get("card")
    const cvv = formData.get("CVV")

    form.style.visibility = "hidden" 
    goodbyeMsg.style.visibility = "visible" 
    goodbye.innerHTML = `<h2 class = "thank-you-msg">Thanks, 
    ${name}! Your order is on its way!<h2></h2>`
    orderTaken.remove()
    priceElement.remove()
  })



  function menuItem(btnId){
   const selected = menuArray.find(item => item.id === Number(btnId))
   if (!selected)return
   const selectedInstance = {
    ...selected,
    instanceId: uuidv4()
   }
   arr.push(selectedInstance)
   
      yourOrderTitle()
      const devElement = document.createElement("div")
      devElement.classList.add('order-container') 
      devElement.id= `order-container`
      arr.forEach(items =>{
        devElement.innerHTML = `
        <div class = "all-orders" id="order-item">
            <p class = "order-name">
              ${items.name}
            </p>
              <button class = "btn-remove" 
              id = "btn- ${items.id}"  
              data-btn-id="${items.instanceId}" >Remove</button>
            <p class = "order-price">
              $${items.price}
            </p>
        </div>
      
      `
      console.log(devElement)  
      newContainer.append(devElement)
      completeOrder()
  })
     }

  
  function completeOrder(){
      const totalPrice = renderOrder()
      const priceElement = document.createElement("div")
      priceElement.classList.add("total-container")
      priceElement.id = "total-price"
      priceElement.innerHTML =`
      <div class="total-container">
        <p class="total-text">Total price: <span class=total> $${totalPrice}</span></p>
        <button class="btn-complete" id="complete-order-btn">Complete order</button>
      </div>
      `
      newContainer.append(priceElement)
      const priceElementExxisting = document.getElementById("total-price")
      if (priceElementExxisting) {
        priceElementExxisting.remove()
        newContainer.append(priceElement)
      }
      if(arr.length === 0){
        priceElement.remove()
      }
  }

  function yourOrderTitle(){{
    let yourOrderTitle = document.querySelector(".order-title")
    if (!yourOrderTitle) {
      yourOrderTitle = document.createElement("h2")
      yourOrderTitle.classList.add("order-title")
      yourOrderTitle.textContent = "Your order" 
      newContainer.append(yourOrderTitle)
    }
  }
  }

  function renderOrder(){
    const total = arr.reduce((acc, item) => {
      return acc + item.price
    }, 0) 
    return total
  }



  function orderClear(btnId){
    arr = arr.filter(item => item.instanceId !== btnId);
    const devElement = document.createElement("div");
    devElement.classList.add("order-container");
    devElement.id = ("order-container")
    newContainer.innerHTML = ""
    yourOrderTitle()
    arr.forEach(item => { 
     
      devElement.innerHTML += `
        <div class="all-orders" id="order-item-${item.instanceId}">
           <p class="order-name">${item.name}</p>
             <button class="btn-remove"  
                data-btn-id="${item.instanceId}">Remove</button>
          <p class="order-price">$${item.price}</p>
        </div>
      `
      

    })
    
    newContainer.append(devElement);
    
    completeOrder()
    
   
    
  }
    

  function renderMenu(){
  const newContainer = menuArray.map(menu =>{
    return `
      <div class="item1" id="item1">
        <p class = "emoji">${menu.emoji}</P>
        <div class= menu>
          <h2 class = "food-name">
            ${menu.name}
          <h2>
          <p class = "food-item">
            ${menu.ingredients.join(", ")} 
          </p>
          <p class = "food-price" id="price-${menu.id}">
            $${menu.price}
          </p>
          </div>
            <div class="btn-div">
              <button class="btn" id="btn-${menu.id}" 
              data-menu-id="${menu.id}">+</button>
            </div>
          
      </div>
      
    ` 
  }).join("")
  return newContainer
  }


  function render(){
  container.innerHTML = renderMenu()
  }

  render()

   