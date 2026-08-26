const errorPanel=document.querySelector('#domain-error');
const cache=document.querySelector('#cached');
document.querySelector('#open-cache').addEventListener('click',()=>{errorPanel.hidden=true;cache.hidden=false;window.scrollTo(0,0)});
document.querySelector('#rate-build').addEventListener('click',()=>{document.querySelector('#rating').textContent='10/10 RECORDED LOCALLY. DAERIC WILL NEVER SEE IT.'});
document.querySelectorAll('[data-broken]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#broken-message').textContent=`404: ${button.dataset.broken} was not included in the surviving cache.`}));
document.querySelector('#guest-form').addEventListener('submit',event=>{event.preventDefault();document.querySelector('#guest-result').textContent='CONNECTION FAILED: guestbook service expired with the domain.'});
