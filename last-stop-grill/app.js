const cart=[];
const dialog=document.querySelector('#order-dialog');
const items=document.querySelector('#cart-items');
const empty=document.querySelector('#empty-cart');
const total=document.querySelector('#cart-total');
const count=document.querySelector('#cart-count');
const toast=document.querySelector('#toast');

function say(message){toast.textContent=message;toast.classList.add('show');clearTimeout(say.timer);say.timer=setTimeout(()=>toast.classList.remove('show'),2200)}
function render(){items.innerHTML='';cart.forEach((item,index)=>{const li=document.createElement('li');li.innerHTML=`<span>${item.name}</span><b>${item.price}eb</b><button class="remove" type="button" aria-label="Remove ${item.name}">REMOVE</button>`;li.querySelector('button').addEventListener('click',()=>{cart.splice(index,1);render()});items.append(li)});empty.hidden=cart.length>0;count.textContent=cart.length;const delivery=document.querySelector('input[name="handoff"]:checked')?.value==='delivery'?5:0;total.textContent=`${cart.reduce((sum,item)=>sum+item.price,0)+delivery}eb`}
function add(name,price){cart.push({name,price:Number(price)});render();say(`${name.toUpperCase()} ADDED`)}
document.querySelectorAll('.dish').forEach(card=>card.querySelector('.add').addEventListener('click',()=>add(card.dataset.name,card.dataset.price)));
document.querySelectorAll('.quick-add').forEach(button=>button.addEventListener('click',()=>add(button.dataset.name,button.dataset.price)));
document.querySelectorAll('input[name="handoff"]').forEach(input=>input.addEventListener('change',render));
document.querySelector('#cart-open').addEventListener('click',()=>dialog.showModal());
document.querySelector('#order-open').addEventListener('click',()=>dialog.showModal());
document.querySelector('#open-hours').addEventListener('click',()=>say('OPEN 22:00–20:00 · CLOSED 20:00–22:00'));
document.querySelector('#nav-location').addEventListener('click',()=>say('OLD WATSON LINE · STAIRWELL C · FOLLOW THE WORKING LIGHTS'));
document.querySelector('#submit-order').addEventListener('click',()=>{const status=document.querySelector('#order-status');const name=document.querySelector('#pickup-name').value.trim();if(!cart.length){status.textContent='ORDER REJECTED: select at least one edible object.';return}if(!name){status.textContent='ORDER HELD: the counter needs a pickup name, handle, or description.';return}status.textContent=`ORDER ${String(Date.now()).slice(-4)} QUEUED FOR ${name.toUpperCase()}. Payment handshake failed. Show this terminal to Marcy and argue politely.`});
render();
