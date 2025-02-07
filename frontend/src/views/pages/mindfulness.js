import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'

 // Image adapted from Canva – Accessed on December 18, 2024
class mindfulnessView {
  init(){
    document.title = 'Mindfulness'    
    this.render()    
    Utils.pageIntroAnim()
  }

  render(){
    const template = html`
      ${Auth.isLoggedIn() ? 
            html`<va-app-header user=${JSON.stringify(Auth.currentUser)}></va-app-header>` : 
            html`<va-public-header></va-public-header>`
          }       
      <div class="page-content">        
        <section class="banner mindfulness"> 
        <div class="banner-content"> 
          <h1>Mindfulness</h1> 
          <picture>
            <img src="images/mindfulness/mindfulness-hero-image-768.webp" class="responsive-img" >   
          </picture>
          <h2 class="quote">Be Present</br> Be Peaceful</br> Be You</h2>
          </div>
        </section>
        <section class="nav-page">
        <h3>Ways to Practice...</h3>
          <div class="button-group">
          <sl-button class="meditation" @click=${() => gotoRoute('/meditation')}>Meditation</sl-button>
          <sl-button class="breathing" @click=${() => gotoRoute('/breathing')}>Breathing</sl-button>
          <sl-button class="motivation" @click=${() => gotoRoute('/motivation')}>Motivation</sl-button>
          </div>
       </section>
      </div>            
           
    `
    render(template, App.rootEl)
  }
}


export default new mindfulnessView()