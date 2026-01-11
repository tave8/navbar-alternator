class NavbarAlternator {
  constructor({ navbarSelector, targetSelector, elements, onTargetReached = null }) {
    this.navbarSelector = navbarSelector;
    this.targetSelector = targetSelector;
    this.elements = elements;
    this.onTargetReached = onTargetReached;

    this.lastScrollTimeout = null;
    this.scrollDelayMs = 100;

    // null, 1, 2
    // it's only temporary null, it will be immediately overriden
    this.state = null;

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
    this.addProperNavbarAnimation();
    this.addEventNavbarScroll();
  }

  // ******************

  handleScrollOnFinishDelay = () => {
    const hero = document.querySelector(this.targetSelector);
    const targetCoordinates = hero.getBoundingClientRect();

    const targetReached = targetCoordinates.bottom >= this.getHeaderHeight();

    // TARGET REACHED
    if (targetReached) {
      if (this.isState2()) {
        this.removeState2();
        this.addState1();
      }
    }
    // TARGET NOT REACHED
    else {
      if (this.isState1()) {
        this.removeState1();
        this.addState2();
      }
    }
  };

  // THE ENTIRE NAVBAR ANIMATION: STATE 1: ADD
  addState1 = () => {
    // navbar
    this.addToYellowNavbarAnimation();
    // button
    //   addToBlackButtonNavbarAnimation();
  };

  // THE ENTIRE NAVBAR ANIMATION: STATE 1: REMOVE
  removeState1 = () => {
    // navbar
    this.removeToYellowNavbarAnimation();
    // button
    //   removeToBlackButtonNavbarAnimation();
  };

  // THE ENTIRE NAVBAR ANIMATION: STATE 2: ADD
  addState2 = () => {
    // navbar
    this.addToWhiteNavbarAnimation();
    // button
    //   addToGreenButtonNavbarAnimation();
  };

  // THE ENTIRE NAVBAR ANIMATION: STATE 2: REMOVE
  removeState2 = () => {
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
    const target = document.querySelector(this.targetSelector);

    const targetCoordinates = target.getBoundingClientRect();

    const isAfterTarget = targetCoordinates.bottom < this.getHeaderHeight();

    if (isAfterTarget) {
      this.setState(2);
      this.addState2();
    } else {
      this.setState(1);
    }
  };

  getHeaderHeight = () => {
    return 200;
  };

  // ADD ANIMATION

  addToWhiteNavbarAnimation = () => {
    const navbar = document.querySelector(this.navbarSelector);
    navbar.classList.add("navbar-animate-to-white");
  };

  addToYellowNavbarAnimation = () => {
    const navbar = document.querySelector(this.navbarSelector);
    navbar.classList.add("navbar-animate-to-yellow");
  };


  // REMOVE ANIMATION

  removeToWhiteNavbarAnimation = () => {
    const navbar = document.querySelector(this.navbarSelector);
    navbar.classList.remove("navbar-animate-to-white");
  };

  removeToYellowNavbarAnimation = () => {
    const navbar = document.querySelector(this.navbarSelector);
    navbar.classList.remove("navbar-animate-to-yellow");
  };




// 

  setState(state) {
    this.state = state;
  }

  setNextState() {
    if (this.state == 1) {
      this.state = 2;
    } else if (this.state == 2) {
      this.state = 1;
    } else {
      throw Error("current state not recognized");
    }
  }

  getState() {
    return this.state;
  }

  isState1() {
    return this.getState() == 1;
  }

  isState2() {
    return this.getState() == 2;
  }
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
