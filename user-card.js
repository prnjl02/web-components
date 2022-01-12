const template = document.createElement('template');
template.innerHTML=`
<style>
     h3{color:red}
     .user-card{
         border:2px solid black;
         width:20%
     }
 </style> 
 <div class="user-card">
 <img/>
 <div>
 <h3></h3>
<div class="info">
<p><slot name="email"></slot></p>
<p><slot name ="phone"></slot></p>
</div>
<button id="toggle-info">Hide Info</button>
 </div>
 
 </div>
`
class userCard extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('h3').innerHTML=this.getAttribute('name');
        this.shadowRoot.querySelector('img').src=this.getAttribute('avatar');
        this.showInfo=true;
    }
   connectedCallback(){
       this.shadowRoot.querySelector('#toggle-info').addEventListener('click',()=>this.toggleInfo())
   }
    disconnectedCallback(){
        this.shadowRoot.querySelector('#toggle-info').removeEventListener()
    }

    toggleInfo(){
        this.showInfo=!this.showInfo;
        const info = this.shadowRoot.querySelector('.info');
        const buttonText = this.shadowRoot.querySelector('#toggle-info');

        if(this.showInfo){
         info.style.display='block';
          buttonText.innerText='Hide Info'
        }
        else{
            info.style.display='none';
          buttonText.innerText='Show Info'
        }
    }
}
customElements.define('user-card',userCard);