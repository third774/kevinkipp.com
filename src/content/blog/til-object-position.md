---
{ "title": "TIL Object Position", "published": "2023-12-01T02:30:40-06:00" }
---

A while ago (I guess 6 years now?) I adapted a jQuery plugin called [FocusPoint](https://github.com/jonom/jquery-focuspoint) to be [dependency free](https://github.com/third774/image-focus).

Today I was messing around trying to maybe adapt this to be a web component, and learned that `object-position` already does _exaclty_ this, and has [really great browser support](https://caniuse.com/?search=object-position).

<p class="codepen" data-height="800" data-default-tab="result" data-slug-hash="OJdBQjW" data-user="third774" style="height: 800px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/third774/pen/OJdBQjW">
  Object Position</a> by Kevin Kipp (<a href="https://codepen.io/third774">@third774</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

So, I guess it's time to archive that repo!
