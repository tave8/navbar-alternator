class NavbarAlternator {
  constructor({ navbarSelector, targetSelector, elements, onTargetReached = null }) {
    this.navbarSelector = navbarSelector;
    this.targetSelector = targetSelector;
    this.elements = elements;
    this.onTargetReached = onTargetReached;
      
    this.lastScrollTimeout = null;
    this.scrollDelayMs = 100;

    this.currentState = null

    // if the document was loaded
    if (document.readyState == "complete") {
      this.init();
    }
    // before the document is loaded
    else {
      window.addEventListener("load", this.init.bind(this));
    }

  }

  init() {
    this.addEventNavbarScroll();
    this.addProperNavbarAnimation();
  }

  // ******************


  handleScrollOnFinishDelay = () => {
    // get the hero
    const hero = document.querySelector(this.targetSelector);
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
  
    if (heroCoordinates.bottom >= this.getHeaderHeight()) {
      // if no navbar animation exists, add the "to white" animation
      if (this.existsToWhiteNavbarAnimation()) {
        this.removeNavbarAnimationState2();
        this.addNavbarAnimationState1();
      }
    } else {
      // if no animation exists, add the "to white" animation
      if (!this.existsAnyNavbarAnimation()) {
        this.addNavbarAnimationState2();
      }
      // if the "to yellow" animation exists,
      // remove it and add the "to white" animation
      else if (this.existsToYellowNavbarAnimation()) {
        this.removeNavbarAnimationState1();
        this.addNavbarAnimationState2();
      }
    }
  };
  
  // THE ENTIRE NAVBAR ANIMATION: STATE 1: ADD
  addNavbarAnimationState1 = () => {
    // navbar
    this.addToYellowNavbarAnimation();
    // button
  //   addToBlackButtonNavbarAnimation();
  };
  
  // THE ENTIRE NAVBAR ANIMATION: STATE 1: REMOVE
  removeNavbarAnimationState1 = () => {
    // navbar
    this.removeToYellowNavbarAnimation();
    // button
  //   removeToBlackButtonNavbarAnimation();
  };
  
  // THE ENTIRE NAVBAR ANIMATION: STATE 2: ADD
  addNavbarAnimationState2 = () => {
    // navbar
    this.addToWhiteNavbarAnimation();
    // button
  //   addToGreenButtonNavbarAnimation();
  };
  
  // THE ENTIRE NAVBAR ANIMATION: STATE 2: REMOVE
  removeNavbarAnimationState2 = () => {
    // navbar
    this.removeToWhiteNavbarAnimation();
    // button
  //   removeToGreenButtonNavbarAnimation();
  };
  
  // avoids triggering the scroll handler for every scroll
  // waits a small delay
  handleScroll = () => {
    clearTimeout(this.lastScrollTimeout);
    this.lastScrollTimeout = setTimeout(this.handleScrollOnFinishDelay.bind(this), this.scrollDelayMs);
  };
  
  
  
  addEventNavbarScroll = () => {
    // get the hero y coordinate of bottom border
  
    // if there's a scroll, and the y coordinate of the hero's
    // bottom border is less than the actual position of where the
    // viewport is at right now, activate the animation
  
    window.addEventListener("scroll", this.handleScroll.bind(this));
  };
  
  
  // executed only on page load, to immediately 
  // apply the appropriate animation based 
  // on navbar position/scroll
  addProperNavbarAnimation = () => {
    const hero = document.querySelector(this.targetSelector);
  
    const heroCoordinates = hero.getBoundingClientRect();
  
    if (heroCoordinates.bottom < this.getHeaderHeight()) {
      this.addNavbarAnimationState2()
    }
  };
  
  
  getHeaderHeight = () => {
    return 200
  }
  
  // ADD ANIMATION
  
  addToWhiteNavbarAnimation = () => {
    const navbar = document.querySelector(this.navbarSelector);
    navbar.classList.add("navbar-animate-to-white");
  };
  
  addToYellowNavbarAnimation = () => {
    const navbar = document.querySelector(this.navbarSelector);
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
  
  removeToWhiteNavbarAnimation = () => {
    const navbar = document.querySelector(this.navbarSelector);
    navbar.classList.remove("navbar-animate-to-white");
  };
  
  removeToYellowNavbarAnimation = () => {
    const navbar = document.querySelector(this.navbarSelector);
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
  
  existsToWhiteNavbarAnimation = () => {
    const navbar = document.querySelector(this.navbarSelector);
    return navbar.classList.contains("navbar-animate-to-white");
  };
  
  existsToYellowNavbarAnimation = () => {
    const navbar = document.querySelector(this.navbarSelector);
    return navbar.classList.contains("navbar-animate-to-yellow");
  };
  
  existsAnyNavbarAnimation = () => {
    return this.existsToWhiteNavbarAnimation() || this.existsToYellowNavbarAnimation();
  };


}





// ****************



new NavbarAlternator({
  navbarSelector: "header",
  targetSelector: "main > .hero",
  elements: [
    // elementSelector, [state 1 class, state 2 class]
    ["header", ["animate-to-white", "animate-to-yellow"]],
  ],
  onTargetReached: () => {},
});
