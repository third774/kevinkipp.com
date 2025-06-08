---
{
  "title": "TIL there's more than one viewport",
  "published": "2023-12-09T22:09:53-06:00",
}
---

I came across [this article](https://rdavis.io/articles/dealing-with-the-visual-viewport) by Ryan Davis that explained how to position elements in a mobile browser when it is either zoomed in or has the virtual keyboard open.

Turns out there's another viewport inside the main viewport — `window.visualViewport` is the API to use! From the article:

```js
// events
window.visualViewport.addEventListener("resize", listener);
window.visualViewport.addEventListener("scroll", listener);

// properties
window.visualViewport.width;
window.visualViewport.height;
window.visualViewport.scale;
window.visualViewport.offsetLeft;
window.visualViewport.offsetTop;
window.visualViewport.pageLeft;
window.visualViewport.pageTop;
```

The article also included a rough draft of how to position something:

```js
const handleResize = () => {
	document.getElementById("header").style.top =
		window.visualViewport.offsetTop.toString() + "px";
};

if (window && window.visualViewport)
	visualViewport.addEventListener("resize", handleResize);
```

I've never run into the need to build something with this myself, but good to know there's something available to use. Maybe this is something we can eventually solve with CSS, but in the meantime this seems like the best option.
