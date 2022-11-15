import { select, templates } from '../settings.js';

class Home {
  constructor(element){
    const thisHome = this;
    thisHome.render(element);
  }

  getElements(){
    const thisHome = this;
    
    thisHome.dom.wrapper = document.querySelector(select.containerOf.home);
  }

  render(element){
    const thisHome = this;
    const generatedHTML = templates.home();
    thisHome.dom = {};
    thisHome.dom.wrapper = element;
    thisHome.dom.wrapper.innerHTML = generatedHTML;
  }
}
export default Home; 