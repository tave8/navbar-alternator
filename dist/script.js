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
  handleScroll() {
    clearTimeout(this.lastScrollTimeout);
    this.lastScrollTimeout = setTimeout(this.handleScrollOnFinishDelay.bind(this), this.scrollDelayMs);
  };

  handleScrollOnFinishDelay() {
    // navbar is before target
    if (this.isNavbarBeforeTarget()) {
      if (this.isState(2)) {
        this.removeState(2);
        this.setState(1);
        this.addState(1);
      }
    } 
    // navbar is after target
    else {
      if (this.isState(1)) {
        this.removeState(1);
        this.setState(2);
        this.addState(2);
      }
    }
  };

  isNavbarBeforeTarget() {
    const target = document.querySelector(this.targetSelector);
    const targetCoordinates = target.getBoundingClientRect();
    return targetCoordinates.bottom >= this.getNavbarHeight();
  }

  // THE ENTIRE NAVBAR ANIMATION: STATE 1: ADD
  addState(state) {
    // example: 
    //   state = 1 -> classIdx = 0
    //   state = 2 -> classIdx = 1
    const classIdx = state-1
    this.elements.forEach((element) => {
      const [elementSelector, elementStates] = element;
      document.querySelector(elementSelector).classList.add(elementStates[classIdx]);
    });
  };

  // THE ENTIRE NAVBAR ANIMATION: STATE 1: REMOVE
  removeState(state) {
    // example: 
    //   state = 1 -> classIdx = 0
    //   state = 2 -> classIdx = 1
    const classIdx = state-1
    this.elements.forEach((element) => {
      const [elementSelector, elementStates] = element;
      document.querySelector(elementSelector).classList.remove(elementStates[classIdx]);
    });
  };


  // executed only on page load, to immediately
  // apply the appropriate animation based
  // on navbar position/scroll
  setAndAddCorrectState() {
    if (this.isNavbarBeforeTarget()) {
      this.setState(1);
    } else {
      this.removeState(1);
      this.setState(2);
      this.addState(2);
    }
  };

  getNavbarHeight() {
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

  isState(state) {
    return this.getState() == state;
  }
}

