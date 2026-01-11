## Navbar Alternator

Alternate between two states when the navbar reaches a target html element.

These 2 states include N elements, and these N elements have exactly 2 states.

DEMO

[See demo](https://navbar-alternator.vercel.app/)


CDN 

```
https://navbar-alternator.giutav.workers.dev/script.js
```

HTML

```html
<script src="https://navbar-alternator.giutav.workers.dev/script.js"></script>
```



## Configuration

```js

const navbarAlternator = new NavbarAlternator({
  navbarSelector: "header",
  targetSelector: "main > .hero",
  elements: [
    // elementSelector, [state 1 class, state 2 class]
    ["header", ["navbar-animate-to-yellow", "navbar-animate-to-white"]],
    ["header li.book-call button", ["button-navbar-animate-to-black", "button-navbar-animate-to-green"]],
  ],
});

```