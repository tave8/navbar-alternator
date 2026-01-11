// when scroll reaches end of hero minus x, toggle the navbar animation
const main = () => {
  addEventNavbarScroll();
  addProperNavbarAnimation();
};

window.addEventListener("load", main);

let lastScrollTimeout = null;
const scrollDelayMs = 100;

const handleScrollOnFinishDelay = () => {
  // get the hero
  const hero = document.querySelector("main > .hero");
  const heroCoordinates = hero.getBoundingClientRect();

  // console.log(heroCoordinates.bottom);

  // if scroll is before hero bottom

  /** this is HERO
   * the number 100 represents the hero's bottom.
   * 110 is an example to show a number > 100
   *
   * -------------------------------- DISTANCE: HERO BOTTOM TO VIEWPORT TOP: 100
   *
   * |                              |
   * |                              |
   * |                              |
   * --------------------------------
   *
   */

  if (heroCoordinates.bottom >= getHeaderHeight()) {
    // if no navbar animation exists, add the "to white" animation
    if (existsToWhiteNavbarAnimation()) {
      removeNavbarAnimationState2();
      addNavbarAnimationState1();
    }
  } else {
    // if no animation exists, add the "to white" animation
    if (!existsAnyNavbarAnimation()) {
      addNavbarAnimationState2();
    }
    // if the "to yellow" animation exists,
    // remove it and add the "to white" animation
    else if (existsToYellowNavbarAnimation()) {
      removeNavbarAnimationState1();
      addNavbarAnimationState2();
    }
  }
};

// THE ENTIRE NAVBAR ANIMATION: STATE 1: ADD
const addNavbarAnimationState1 = () => {
  // navbar
  addToYellowNavbarAnimation();
  // button
//   addToBlackButtonNavbarAnimation();
};

// THE ENTIRE NAVBAR ANIMATION: STATE 1: REMOVE
const removeNavbarAnimationState1 = () => {
  // navbar
  removeToYellowNavbarAnimation();
  // button
//   removeToBlackButtonNavbarAnimation();
};

// THE ENTIRE NAVBAR ANIMATION: STATE 2: ADD
const addNavbarAnimationState2 = () => {
  // navbar
  addToWhiteNavbarAnimation();
  // button
//   addToGreenButtonNavbarAnimation();
};

// THE ENTIRE NAVBAR ANIMATION: STATE 2: REMOVE
const removeNavbarAnimationState2 = () => {
  // navbar
  removeToWhiteNavbarAnimation();
  // button
//   removeToGreenButtonNavbarAnimation();
};

// avoids triggering the scroll handler for every scroll
// waits a small delay
const handleScroll = () => {
  clearTimeout(lastScrollTimeout);
  lastScrollTimeout = setTimeout(handleScrollOnFinishDelay, scrollDelayMs);
};



const addEventNavbarScroll = () => {
  // get the hero y coordinate of bottom border

  // if there's a scroll, and the y coordinate of the hero's
  // bottom border is less than the actual position of where the
  // viewport is at right now, activate the animation

  window.addEventListener("scroll", handleScroll);
};


// executed only on page load, to immediately 
// apply the appropriate animation based 
// on navbar position/scroll
const addProperNavbarAnimation = () => {
  const hero = document.querySelector("main > .hero");

  const heroCoordinates = hero.getBoundingClientRect();

  if (heroCoordinates.bottom < getHeaderHeight()) {
    addNavbarAnimationState2()
  }
};


const getHeaderHeight = () => {
  return 200
}

// ADD ANIMATION

const addToWhiteNavbarAnimation = () => {
  const navbar = document.querySelector("header");
  navbar.classList.add("navbar-animate-to-white");
};

const addToYellowNavbarAnimation = () => {
  const navbar = document.querySelector("header");
  navbar.classList.add("navbar-animate-to-yellow");
};

// const addToGreenButtonNavbarAnimation = () => {
//   const button = document.querySelector("header > .navbar button");
//   button.classList.add("button-navbar-animate-to-green");
// };

// const addToBlackButtonNavbarAnimation = () => {
//   const button = document.querySelector("header > .navbar button");
//   button.classList.add("button-navbar-animate-to-black");
// };

// REMOVE ANIMATION

const removeToWhiteNavbarAnimation = () => {
  const navbar = document.querySelector("header");
  navbar.classList.remove("navbar-animate-to-white");
};

const removeToYellowNavbarAnimation = () => {
  const navbar = document.querySelector("header");
  navbar.classList.remove("navbar-animate-to-yellow");
};

// const removeToGreenButtonNavbarAnimation = () => {
//   const navbar = document.querySelector("header > .navbar button");
//   navbar.classList.remove("button-navbar-animate-to-green");
// };

// const removeToBlackButtonNavbarAnimation = () => {
//   const navbar = document.querySelector("header > .navbar button");
//   navbar.classList.remove("button-navbar-animate-to-black");
// };

// EXISTS ANIMATION

const existsToWhiteNavbarAnimation = () => {
  const navbar = document.querySelector("header");
  return navbar.classList.contains("navbar-animate-to-white");
};

const existsToYellowNavbarAnimation = () => {
  const navbar = document.querySelector("header");
  return navbar.classList.contains("navbar-animate-to-yellow");
};

const existsAnyNavbarAnimation = () => {
  return existsToWhiteNavbarAnimation() || existsToYellowNavbarAnimation();
};