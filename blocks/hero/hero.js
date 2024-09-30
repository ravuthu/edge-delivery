import { createElement } from '../../scripts/scripts.js';
import { decorateBlock } from '../../scripts/aem.js';

export default function decorate(block) {
  const elementContainer = block.querySelector(':scope > div > div');
  const heroInnerRow1 = createElement('div', { class: 'hero-inner-row' });
  const heroInnerRow2 = createElement('div', { class: 'hero-inner-row' });
  const heroPicContent = createElement('div', {class: 'hero-heading' });
  const heroPic = createElement('div', {class: 'hero-pic' });
  const heroH2Content = createElement('div', {class: 'hero-subheading' });
  const heroH3Content = createElement('div', {class: 'hero-desc' });
  const pic = elementContainer.querySelector('picture');
  if (!pic) {
    return;    
  }

  let picFound = false;
  let h2Found = false;
  let h3Found = false;
  [...elementContainer.children].forEach((child) => {
    if(child.querySelector('picture')) {
      picFound = true;
      pic.classList.add('hero-bg');
      // Add alt element to img if it doesn't exist
      const img = pic.querySelector('img');
      if (img && !img.hasAttribute('alt')) {
        img.setAttribute('alt', '');
      }

      heroPic.append(pic);
    }

    if(child.querySelector('em')) {
      child.classList.add('disclaimer');
      child.innerHTML = child.querySelector('em').textContent;
    }

    if(child.tagName === 'H2') {
      h2Found = true;
    }

    if(child.tagName === 'H3') {
      h3Found = true;
    }

    if(!picFound) {
      heroPicContent.append(child);
    }

    if(h2Found && !h3Found) {
      heroH2Content.append(child);
    }

    if(h3Found) {
      heroH3Content.append(child);
    }

    //heroInner.append(child);
    if (child.tagName === 'DIV' && child.className !== '') {
      decorateBlock(child);
    }
  });

  heroInnerRow1.append(heroPicContent);
  heroInnerRow1.append(heroPic);
  heroInnerRow2.append(heroH2Content);
  heroInnerRow2.append(heroH3Content);

  elementContainer.parentElement.remove();
  block.append(heroInnerRow1);
  block.append(heroInnerRow2);
}