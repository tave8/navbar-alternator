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
