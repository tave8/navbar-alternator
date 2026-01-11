class NavbarAlternator {
  constructor({ navbarSelector, targetSelector, elements }) {
    this.navbarSelector = navbarSelector;
    this.targetSelector = targetSelector;
    this.elements = elements;

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
    // set the initial state
    this.setAndAddCorrectState();
    // add event listener
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  // ******************

  // avoids triggering the scroll handler for every scroll
  // waits a small delay
  handleScroll = () => {
    clearTimeout(this.lastScrollTimeout);
    this.lastScrollTimeout = setTimeout(this.handleScrollOnFinishDelay.bind(this), this.scrollDelayMs);
  };

  handleScrollOnFinishDelay = () => {
    // navbar is before target
    if (this.isNavbarBeforeTarget()) {
      if (this.isState2()) {
        this.removeState2();
        this.setState(1);
        this.addState1();
      }
    } 
    // navbar is after target
    else {
      if (this.isState1()) {
        this.removeState1();
        this.setState(2);
        this.addState2();
      }
    }
  };

  isNavbarBeforeTarget() {
    const target = document.querySelector(this.targetSelector);
    const targetCoordinates = target.getBoundingClientRect();
    return targetCoordinates.bottom >= this.getNavbarHeight();
  }

  // THE ENTIRE NAVBAR ANIMATION: STATE 1: ADD
  addState1 = () => {
    this.elements.forEach((element) => {
      const [elementSelector, elementStates] = element;
      document.querySelector(elementSelector).classList.add(elementStates[0]);
    });
  };

  // THE ENTIRE NAVBAR ANIMATION: STATE 1: REMOVE
  removeState1 = () => {
    this.elements.forEach((element) => {
      const [elementSelector, elementStates] = element;
      document.querySelector(elementSelector).classList.remove(elementStates[0]);
    });
  };

  // THE ENTIRE NAVBAR ANIMATION: STATE 2: ADD
  addState2 = () => {
    this.elements.forEach((element) => {
      const [elementSelector, elementStates] = element;
      document.querySelector(elementSelector).classList.add(elementStates[1]);
    });
  };

  // THE ENTIRE NAVBAR ANIMATION: STATE 2: REMOVE
  removeState2 = () => {
    this.elements.forEach((element) => {
      const [elementSelector, elementStates] = element;
      document.querySelector(elementSelector).classList.remove(elementStates[1]);
    });
  };

  // executed only on page load, to immediately
  // apply the appropriate animation based
  // on navbar position/scroll
  setAndAddCorrectState = () => {
    if (this.isNavbarBeforeTarget()) {
      this.setState(1);
    } else {
      this.removeState1();
      this.setState(2);
      this.addState2();
    }
  };

  getNavbarHeight = () => {
    // returns the height of the navbar
    return document.querySelector(this.navbarSelector).offsetHeight
  };

  // SETTERS & GETTERS

  setState(state) {
    this.state = state;
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

const navbarAlternator = new NavbarAlternator({
  navbarSelector: "header",
  targetSelector: "main > .hero",
  elements: [
    // elementSelector, [state 1 class, state 2 class]
    ["header", ["navbar-animate-to-yellow", "navbar-animate-to-white"]],
    ["header li.book-call button", ["button-navbar-animate-to-black", "button-navbar-animate-to-green"]],
  ],
});
