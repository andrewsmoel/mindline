import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from '../Router'
import App from '../App'

customElements.define('va-public-header', class PublicHeader extends LitElement {
  static get properties(){
    return {
      title: { type: String }
    }
  }

  firstUpdated(){
    super.firstUpdated()
    this.navActiveLinks()
    //console.log('Header initialized with title:', this.title);    
  }

  navActiveLinks(){	
    const currentPath = window.location.pathname;
    const navLinks = this.shadowRoot.querySelectorAll('.app-top-nav a, .app-side-menu-items a');
    navLinks.forEach(navLink => {
      if(navLink.href.slice(-1) == '#') return;
      if(navLink.pathname === currentPath){			
        navLink.classList.add('active');
      }
    });
  }

  hamburgerClick(){  
    const appMenu = this.shadowRoot.querySelector('.app-side-menu')
    appMenu.show()
  }
  
  menuClick(e) {
    e.preventDefault();
    const pathname = e.target.closest('a').pathname;
    const appSideMenu = this.shadowRoot.querySelector('.app-side-menu');
  
    if (appSideMenu) {
      appSideMenu.hide();
      appSideMenu.addEventListener('sl-after-hide', () => {
        gotoRoute(pathname);
      });
    }
  }
  handleTitleClick(path, e) {
    e.preventDefault();
    gotoRoute(path);
  }

  handleChevronClick(e) {
    e.stopPropagation();
    const details = e.target.closest('sl-details');
    if (details) {
      details.open = !details.open;
    }
  }

  render(){    
    return html`
    <style>
    * {
        box-sizing: border-box;
    }
    

    .public-header {
       
        background: var( --app-header-bg-color);
        box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.2);
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        height: var(--public-header-height);
        display: flex;
        z-index: 9;
        align-items: center;
    }
    
    .public-header-main {
        flex-grow: 1;
        display: flex-start;
        align-items: center;
    }
    
    .public-header-main::slotted(h1) {
        color: #fff;
    }
    
    .app-logo a {
        color: #fff;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.2em;
        padding: .6em;
        display: inline-block;
    }
    
    .app-logo img {
        width: 90px;
    }
    
    .hamburger-btn::part(base) {
        color: #fff;
    }
    
    .app-top-nav {
        display: flex;
        height: 100%;
        align-items: center;
    }
    
    .app-top-nav a {
        display: inline-block;
        padding: .8em;
        text-decoration: none;
        color: #fff;
    }
    
    .app-side-menu-items a {
        display: block;
        padding: 0.5em;
        text-decoration: none;
        font-size: 1.3em;
        color: var(--app-header-txt-color);
        padding-bottom: 0.5em;
    }
    
    .app-side-menu-logo {
        width: 150px !important;
        height: auto !important;
        /* Remove fixed height to maintain aspect ratio */
        top: 1em;
        display: block;
    }
    
    .page-title {
        color: var(--public-header-txt-color);
        margin-right: 0.5em;
        font-size: var(--public-header-title-font-size);
    }
    /* active nav links */
    
    .app-top-nav a.active,
    .menu-item::part(label):hover {
        color: #fff;
    }
    /* right side menu */
    
    .right-side-menu {
        --base-txt-color: #2F1E1F;
    }
 
    /* RESPONSIVE - MOBILE --------------------- */
      @media all and (max-width: 768px){       
       .user-menu {
        margin-right: 10px;
    }
        }
    
    
    .user-menu {
        margin-right: 10px;
    }
    
    sl-details::part(base) {
        display: block;
        border: none;
        padding: 0.65em;
    }
    
    sl-details::part(content) {
        border: none;
        padding: 0;
    }
    
    sl-details::part(header) {
        border: none;
        padding: 0;
    }
    
    sl-details::part(summary) {
        color: var(--sl-color-neutral-600);
        font-size: 1.3em;
        color: var(--app-header-txt-color);
    }
    
    sl-details::part(base) {
        border: none;
    }
    
    .menu-expand {
        font-size: 1.3em;
        margin-left: 1em;
        margin-top: 0.5em;
    }
    
    .menu-expand {
        transition: color 0.3s ease;
        text-decoration: none;
    }
    
    .menu-expand:hover {
        color: var(--sl-color-primary-600);
        padding-left: 1.5em;
        transition: all 0.5s ease;
    }
    
    .header-logo {
        cursor: pointer;
        width: 120px !important;
        height: auto !important;
        /* Remove fixed height to maintain aspect ratio */
        position: absolute;
        top: 15px;
        left: 5em;
        z-index: 2;
    }
</style>

<header class="public-header">
    <sl-icon-button class="hamburger-btn" name="list" @click="${this.hamburgerClick}" style="font-size: 2em;"></sl-icon-button>
    <a href="/" @click="${anchorRoute}"><img class="header-logo" src="/images/logo/mindline-white-logo.png" alt="Mindline logo"></a>

    <div class="public-header-main">
        ${this.title ? html`
        <h1 class="page-title">${this.title}</h1> `:``}
        <slot></slot>
    </div>

    <nav class="app-top-nav">

        <sl-dropdown class="user-menu">
            <a slot="trigger" href="#" @click="${(e) => e.preventDefault()}">
                <sl-avatar style="--size: 40px;">Login</sl-avatar>
            </a>
            <sl-menu class="right-side-menu">
                <sl-menu-item @click="${() => gotoRoute('/signin')}">Login</sl-menu-item>

            </sl-menu>
        </sl-dropdown>


    </nav>
</header>

<sl-drawer class="app-side-menu" placement="left">
    <div slot="label">
        <a href="/" @click="${this.menuClick}"><img class="app-side-menu-logo" src="/images/logo/logo-mindline-svg-converted-to.webp" alt="Mindline logo"></a>
    </div>
    <br>
    <nav class="app-side-menu-items">
        <a href="/" @click="${this.menuClick}">Home</a>
        <sl-details>
            <div slot="summary" class="summary-content">
                <span class="summary-title">Mental Health</span>
            </div>
            <a class="menu-expand" href="#" @click=${() => gotoRoute('/mentalHealthExpanded?tab=stress')}>Stress</a>
            <a class="menu-expand" href="#" @click=${() => gotoRoute('/mentalHealthExpanded?tab=anxiety')}>Anxiety</a>
            <a class="menu-expand" href="#" @click=${() => gotoRoute('/mentalHealthExpanded?tab=depression')}>Depression</a>
        </sl-details>
        <sl-details>
            <div slot="summary" class="summary-content">
                <span class="summary-title">Mindfulness</span>
            </div>
            <a class="menu-expand" href="#" @click=${() => gotoRoute('/mindfulnessExpanded?tab=meditation')}>Meditation</a>
            <a class="menu-expand" href="#" @click=${() => gotoRoute('/mindfulnessExpanded?tab=breathing')}>Breathing</a>
            <a class="menu-expand" href="#" @click=${() => gotoRoute('/mindfulnessExpanded?tab=motivation')}>Motivation</a>
        </sl-details>
        <sl-details>
            <div slot="summary" class="summary-content">
                <span class="summary-title">Resources</span>
            </div>
            <a class="menu-expand" href="#" @click=${() => gotoRoute('/resourcesExpanded?tab=support')}>Support</a>
            <a class="menu-expand" href="#" @click=${() => gotoRoute('/resourcesExpanded?tab=services')}>Services</a>
            <a class="menu-expand" href="#" @click=${() => gotoRoute('/resourcesExpanded?tab=guides')}>Guides</a>
        </sl-details>

        <a href="/about" @click="${this.menuClick}">About</a>

        <a href="/signin" @click="${this.menuClick}">Profile</a>
        <a href="/signin" @click="${this.menuClick}">Bookmarks</a>
        <hr style="color: #fff width:10%">

        <sl-details summary="Privacy">
            <p>
                We care about your privacy. Mindline AU will not knowingly give away, sell or provide your personal information 
                to a third party unless you conscent to that or it is required by law. The information that is collected about 
                you allow you the user to bookmark information you would like to come back to at anytime. You can update or change 
                your details at any time. If you wish to be removed from our database, please contact Mindline AU in writing. 
            </p>
                
            <p>
                <strong>Security of Personal Information</strong>
                Your Personal Information is stored in a manner that reasonably protects it from misuse and loss and from 
                unauthorized access, modification or disclosure
            </p>
                
        </sl-details>

        
        <sl-details summary="T&Cs">
            <p>
                Ok we know this is the boring stuff, but we need to let you know that the content and media on the Mindline AU 
                web application are created and published online for informational purposes only. It is not intended to be 
                a substitute for professional medical advice and should not be relied on as health or personal advice.
            </p>
                
            <p>
                Always seek the guidance of your doctor or other qualified health professional with any questions you may 
                have regarding your health or a medical condition. Never disregard the advice of a medical professional, or 
                delay in seeking it because of something you have read on this web application.
            </p>

            <p>
                If you think you may have a medical emergency, call your doctor, go to the nearest hospital emergency department, 
                or call the emergency services immediately. If you choose to rely on any information provided by Mindline AU, you 
                do so solely at your own risk.
            </p>

            <p>
                External (outbound) links to other web applications or educational material (e.g. audio, video, apps…) that 
                are not explicitly created by Mindline AU are followed at your own risk. Under no circumstances is Mindline AU 
                responsible for the claims of third-party web applications or educational providers.
            </p>

            <p>If you wish to seek clarification on the above matters, please get in touch with Mindline AU.</p>
                            
            <p> 
                <strong>Use License</strong>
                Permission is granted to download materials (information or software) on <i>Mindline</i> AU&apos;s web application 
                for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license 
                you may not:
            </p>
                <ul>
                    <li>modify or copy the materials;</li>
                    <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
                    <li>attempt to decompile or reverse engineer any software contained on <i>Mindline</i> AU&apos;s web application;</li>
                    <li>remove any copyright or other proprietary notations from the materials; or transfer the materials 
                        to another person
                    </li> 
                    <li>or “mirror” the materials on any other server.</li>
                </ul>    
                    
            <p>
                <strong>Materials Disclaimer</strong>
                The materials on Mindline AU web application are provided on an as is basis. Clear Head makes no warranties, expressed 
                or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or 
                conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
                                
            <p>
                Further, Mindline AU does not warrant or make any representations concerning the accuracy, likely results, or reliability 
                of the use of the materials on its web application or otherwise relating to such materials or on any sites linked to this 
                site.
            </p>

            <p>
                <strong>Limitations</strong>
                In no event shall Mindline AU or its suppliers be liable for any damages (including, without limitation, damages 
                for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials 
                on Mindline AU&apos;s web application, even if Mindline AU or a Mindline AU authorised representative has been notified 
                orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied 
                warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>

            <p>    
                <strong>Accuracy of materials</strong>
                The materials appearing on Mindline AU web application could include technical, typographical, or photographic 
                errors. Mindline AU does not warrant that any of the materials on its web application are accurate, complete or 
                current. Mindline AU may make changes to the materials contained on its web application at any time without notice. 
                However, Mindline AU is not able to make any commitment when materials are updated.
            </p>

            <p> 
                <strong>Links</strong>        
                Mindline AU has not reviewed all of the sites linked to its web application and is not responsible for 
                the contents of any such linked site. The inclusion of any link does not imply endorsement by Mindline AU 
                of the site. Use of any such linked web application is at the user&apos;s own risk.
            </p>

            </p>
                <strong>Modifications</strong>
                Mindline AU may revise these terms and conditions for its web application at any time without notice. 
                By using this web application, you are agreeing to be bound by the then current version of these terms 
                and conditions.
            </p>
            
        </sl-details>

        <sl-details summary="Socials">

            <p>We've done something different and skipped the socials to let you focus on YOU!</p>
        
        </sl-details>


        <hr style="color: #fff width:10%">

        <a href="mailto:hello@mindline.telstra.com.au">hello@mindline.telstra.com.au</a>
        <a href="tel:1800 034 034">1800 034 034</a>
        <br>
        <a href="#" @click="${() => gotoRoute('/signin')}">Login</a>
        



    </nav>
</sl-drawer>
        `;
    }
})
