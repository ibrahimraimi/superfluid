import { gsap } from 'gsap';
import { ImgReveal } from './imgReveal';
import { Menu } from './menu';
import { TextLinesReveal } from './textLinesReveal';
import { TextReveal } from './textReveal';
import { preloadImages } from './utils';


let DOM = {
    frame: document.querySelector('.frame')
};

DOM.menuCtrl = document.querySelector('.menu-link');

DOM.menuWrap = document.querySelector('.menu');

DOM.textContent = {
    heading: document.querySelector('.heading'),
    primary: document.querySelector('.content-primary'),
    secondary: document.querySelector('.content-secondary')
};

DOM.img = document.querySelector('.deco');

let state = 0;

const textLinesReveal = new TextLinesReveal([DOM.textContent.primary, DOM.textContent.secondary]);

const imgReveal = new ImgReveal(DOM.img);

const textReveal = new TextReveal([DOM.textContent.heading, DOM.menuCtrl]);

const menu = new Menu(DOM.menuWrap);

const showContent = () => {
    textReveal.in();
    textLinesReveal.in();
    imgReveal.in();
    toggleFrame();
};

const hideContent = () => {
    textReveal.out();
    textLinesReveal.out();
    imgReveal.out();
    toggleFrame();
};

const toggleFrame = () => {
    gsap.to(DOM.frame, {
        duration: 1,
        ease: 'expo',
        opacity: Number(!state)
    });
};

DOM.menuCtrl.addEventListener('click', () => {
    if (state !== 0) return;
    state = 1;
    hideContent();
    menu.open();
});

menu.DOM.closeCtrl.addEventListener('click', () => {
    if (state !== 1) return;
    state = 0;
    showContent();
    menu.close();
});

preloadImages('.deco__img, .panel__img').then(() => {
    document.body.classList.remove('loading');
    showContent();
});