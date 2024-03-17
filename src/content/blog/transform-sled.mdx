---
{
  "title": "The Transform Sled 🛷",
  "description": "Sometimes you just want to translate an element by a percentage of its parent's width.",
  "published": "2022-01-04T12:00:00-06:00",
}
---

The best way to animate moving something with CSS is using the `transform` property along with
any `translate` CSS function since [this provides the best performance](https://developer.mozilla.org/en-US/docs/Web/Performance/CSS_JavaScript_animation_performance#off_main_thread_animation), but a tricky challenge
presents itself if you want to move the element by a percentage of its parent's box size.

You might think to try something like this:

<iframe height="300" style="width: 100%;" scrolling="no" title="Incorrect translate by parent percentage" src="https://codepen.io/third774/embed/QWqravj?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/third774/pen/JjrvMZZ">
  Incorrect translate by parent percentage</a> by Kevin Kipp (<a href="https://codepen.io/third774">@third774</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

In most cases, percent values _do_ refer to the parent's bounding box. Unfortunately that's not the
case with `translate` functions where _percent values used within any `translate` function refer to
the translated element's own bounding box._

So how can we achieve the desired effect of moving the `.child` by 100% of the `.parent` while still
using the performant `translate` function approach?

Enter the "transform sled". The idea is: the `.sled` can have the same dimensions as the `.parent`
and the `.child` can be positioned wherever you want on the `.sled`. Then you can move the `.sled`
and the `.child` will move with it!

To achieve this, we'll need to set `position:relative;` on the `.parent` and `position: absolute; inset: 0;`
on the `.sled` to give it the same dimensions as the parent. Lastly, we will move the `animation`
from the `.child` to the `.sled`!

<iframe height="600" style="width: 100%;" scrolling="no" title="Translate by parent percentage with sled" src="https://codepen.io/third774/embed/JjrvMZZ?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/third774/pen/JjrvMZZ">
  Translate by parent percentage with sled</a> by Kevin Kipp (<a href="https://codepen.io/third774">@third774</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

And with that, we've achieved our goal of performantly moving the `.child` 100% of the way down the `.parent`! 🎉
