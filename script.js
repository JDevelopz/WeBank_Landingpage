'use strict';
////////////////////////////////////////////////////////////////////////////
// BANKIST WEBSITE JAVASCRIPT
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////
//HEADER 
//1. const variables
//2. Functions 
//3. Event handlers

// BODY
//1. const variables
//2. function variables
//3. Event handlers
////////////////////////////////////////////////////////////////////////////
// Pop ups 
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// Sections All 
const allSections = document.querySelectorAll('.section');
// console.log(allSections);
const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// header 
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');

// Intro header
const btnScrollTo = document.querySelector('.btn--scroll-to');

// Section 1
const section1 = document.querySelector('#section--1');

// footer
const logo2 = document.querySelector('.logo2');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


////////////////////////////////////////////////////////////////
//Creating a cookie message. 
//Creating a new element called a div. (section/h1/p/img/video/span ect)
const message = document.createElement('div');
// Give the new element a class.
message.classList.add('cookie-message');
//changing only textContent
message.textContent = 'We use cookies for improved analytics';
// Change innerHTML. You can include html code here like the button. 
message.innerHTML = 'We use cookies for improved analytics. <button class="btn btn--close--cookie" data-toggle="tooltip" data-placement="top">Got it!</button>';

header.prepend(message);
const btnCookie = document.querySelector('.btn--close--cookie')
btnCookie.addEventListener('click', () => message.remove());

////////////////////////////////////////////////////////////////
// Smooth Scrolling function 

btnScrollTo.addEventListener('click', function(e) {
  e.preventDefault();

section1.scrollIntoView({behavior: 'smooth'});
});


logo2.addEventListener('click', () => headerSection.scrollIntoView({behavior: 'smooth'}));

// navigation effect 
const hoverHandler = function(e) {

  if (e.target.classList.contains('nav__link')) {
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link')
  const btn = document.querySelector('.nav__link--btn')

  siblings.forEach( el => {
    if (el !== link && el !== btn) {
      el.style.opacity = this;
    }
  });
  };
};

const navLinks = document.querySelector('.nav__links');

// navLinks.addEventListener('mouseover', function(e) {
//   e.preventDefault();
//   hoverHandler(e, 0.5);
// });

navLinks.addEventListener('mouseover', hoverHandler.bind(0.5));
navLinks.addEventListener('mouseout', hoverHandler.bind(1));

// Section 2 
// when clicked each button different content will be displayed
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');


tabsContainer.addEventListener('click', function(e) {
  e.preventDefault();

  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // Guard clause 
  if (!clicked) return;
  // remove active tabs. 
  tabs.forEach( t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');
  // remove content area. 
  tabContent.forEach( c => c.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  // active content area. 
  console.log(clicked.dataset);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});


// Sticky navigation 

// const cordsec1 = section1.getBoundingClientRect();

// window.addEventListener('scroll', function(e) {
//   e.preventDefault();

//   if (window.scrollY > cordsec1.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }

// });

// // Sticky navigation: Intersection Observer API.
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root: null, 
//   threshold: [0, 0.2],

// }

// const observer = new IntersectionObserver(obsCallback, obsOptions)
// observer.observe(section1);


const stickyNav = function(entries) {
  const [entry] = entries; 
  const start = entry.isIntersecting;
  // console.log(start);

  if (start === false) {
    nav.classList.add('sticky');
  }else {
    nav.classList.remove('sticky');
  }
};
const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, 
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);


// Revealing Elements on scroll 

// section--hidden

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return 

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
  
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.3,
})

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');

// });

// Lazy loading images. 
//target 
const imgTarget = document.querySelectorAll('img[data-src]');

const lazyLoadImg = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  const goodImg = entry.target.getAttribute('data-src');
  const badImg = entry.target.getAttribute('src');

  if (!entry.isIntersecting) {
    entry.target.src = badImg;
  }

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });
}

const imageObserver = new IntersectionObserver(lazyLoadImg, {
  root: null, 
  threshold: 1,
});

imgTarget.forEach( img => imageObserver.observe(img) );


// Building a slider component part 1. 
// slider 
// buttons 
//left & right

const sliderFunction = function() {

const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

// set transform X property (horizontal)
const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.2)';
// slider.style.overflow = 'visible';


let curSlide = 0;

const slide = document.querySelectorAll('.slide');
slide.forEach((s, i) => {
  // console.log(s, i); // first slide current index = 0
  // console.log(slide.length);
  s.style.transform = `translateX(${100 * i}%)`;
});
// 0%, 100%, 200%, 300%,
const goToSlide = function(slides) {
  slide.forEach((s, i) => {
    // 
    //1. (index=0 - curSlide=1) 100 * -1 = -100;
    //2. (index=1 - curSlide=2) 1-2=-1 100 * -1 = -100;
    //3. (index=2 - curSlide=3) 3-2=-1 100 * -1 = -100;
    //4  (index=3 - curSlide=4) 3-4=-1 100 * -1 = -100;
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
};

const nextSlide =  function() {
  if (curSlide === slide.length - 1) {
    curSlide = 0;
  }else {
curSlide++; // is equal to 0 in start. +1 with this click event.
  };
  goToSlide(curSlide);
  activeDot(curSlide);
};

const prevSlide = function() {
  if(curSlide === 0) {
    curSlide = slide.length -1;
  } else {
  curSlide--;
  // 1. (index=3, curSlide=4) 100 * 1 = 100
  // 2. (index=2, curSlide=3) 100 * 1 = 100
  };
  goToSlide(curSlide);
  activeDot(curSlide);
  };

  sliderBtnLeft.addEventListener("click", prevSlide);
  sliderBtnRight.addEventListener("click", nextSlide);

  document.addEventListener('keydown', function(e) {
    // console.log(e.key);
    if(e.key === 'ArrowLeft') {
      prevSlide();
    }else {
      nextSlide();
    }
  });


// Creating dots for the slide 
const createDots = function() {
  slide.forEach(function(_, i) {
    // console.log(_, i); // first is Object, second is index.
    dotContainer.insertAdjacentHTML('beforeend', 
    `<button class="dots__dot" data-slide="${i}"></button>`);
  })
};
createDots();

const activeDot = function(slide) {
  const dots = document.querySelectorAll('.dots__dot');
  dots.forEach( dot => {
    if(dot.classList.contains('dots__dot--active')) {
      dot.classList.remove('dots__dot--active');
    }
  });


  // dots.forEach( dot => console.log(dot.classList.remove('.dots_dot--active')));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

dotContainer.addEventListener('click', function(e) {
  const dots = document.querySelectorAll('.dots__dot');
  console.log(dots);
  
  if(e.target.classList.contains('dots__dot')) {
    // console.log(e.target, e.target.dataset);
    curSlide = +e.target.dataset.slide;
    goToSlide(curSlide);
    activeDot(curSlide);
  }
});

};
sliderFunction();

// Network 4g / 3g 
// Let know when the DOMContent is loaded.
document.addEventListener('DOMContentLoaded', function(e) {
  console.log('loaded', e);
});

window.addEventListener('load', function(e) {
  console.log('page fully loaded', e);
});

// If the user is filling in a form you can ask if they really want to leave the page. 
window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = '';
});











/*


// Meter 


////////////////////////////////////////////////////////////////
// Snippets 
// creating and inserting Elements.
// .insertAdjacentHTML();


//select the header element
const header = document.querySelector('header');

// Set the new element called message pre the header element. on first line(child)
header.prepend(message);

// clone the message to use it a second time.
// header.append(message.cloneNode(true));

// Delete elements 
document.querySelector('.btn--close--cookie').addEventListener('click', () => message.remove());

// Styles referencing
message.style.backgroundColor = 'black';
message.style.width = '100%';

document.documentElement.style.setProperty('--color-primary', 'orangered');

// get the applied styles
console.log(message.style.color); // can only access styles applied in JS. 
console.log(getComputedStyle(message).color); // To find styles in the CSS/HTML.

// Attributes 
const logo = document.querySelector('.nav__logo');
console.log(logo.src);
console.log(logo.className);
console.log(logo.alt);

logo.alt = 'Beautifull minimilist logo'
console.log(logo.alt);

// For non standard attributes
console.log(logo.getAttribute('nameher'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // http://127.0.0.1:5500/starter/img/logo.png
console.log(logo.getAttribute('src')); // img/logo.png

const link = document.querySelector('.nav__link--btn');

console.log(link.href); // http://127.0.0.1:5500/starter/index.html#
console.log(link.getAttribute('href')); // #

// Data attributes
console.log(logo.dataset.versionNumber);


//classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes. 

// Override all the classes DONT USE!!!
// logo.className = 'Jeffrey';
btnScrollTo.addEventListener('click', function(e) {
  e.preventDefault();
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('current scroll (x/y)', window.pageXOffset, window.pageYOffset);

  // console.log('height & width of viewport', window.innerHeight, window.innerWidth);

// Scrolling 
// window.scrollTo(
//   s1coords.left + window.pageYOffset, 
//   s1coords.top + window.pageYOffset)

//   window.scrollTo({
//   left: s1coords.left + window.pageYOffset, 
//   top: s1coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

section1.scrollIntoView({behavior: 'smooth'});

});



// Types of Events and event handlers. 
// Time out event handlers 
// const h1 = document.querySelector('h1');

// const scrolls = function(e) {
//   e.preventDefault();

//   section1.scrollIntoView({behavior: 'smooth'});
// };

// h1.addEventListener('click', scrolls);
// setTimeout(() => h1.removeEventListener('click', scrolls), 4000);

// // random color
// const thisLink = document.querySelectorAll('.nav__link');
// const randomInt = (min, max) => 
// Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => 
// `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// thisLink.forEach(function(link) {
//   link.addEventListener('click', function(e) {
//     e.preventDefault();
//     console.log(e.currentTarget);
//     if (this === e.currentTarget) {
//       this.style.color = 'red';
//     }else {
//       thisLink.style.color = 'black';
//     }
//   })
// });

// Bubbeling and capturing in practice

// document.querySelector('.nav__link').addEventListener('click', function(e) { 
//   e.preventDefault();
//   console.log(e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
//   console.log(e.currentTarget === this);
// });

// document.querySelector('.nav__links').addEventListener('click', function(e) { 
//   e.preventDefault();
//   console.log(e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
//   console.log(e.currentTarget === this);
// });

// document.querySelector('.nav').addEventListener('click', function(e) { 
//   e.preventDefault();
//   console.log(e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
//   console.log(e.currentTarget === this);

// });

// Page navigation 

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();

//     const id = this.getAttribute('href'); // this is the element
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   });
// })

// //Matching strategy. 
// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   e.preventDefault();

//   if( e.target.classList.contains('nav__link') ) {
//     const id = e.target.getAttribute('href'); // this is the element
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   }

// });


// // Going downwards: child. 

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // going upwards: parents 

// console.log(h1.parentNode);
// console.log(h1.parentElement);

// // h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function(el) {
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });

*/