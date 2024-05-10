---
{
	"title": "A QR Code for the current page",,
	"description": "Extending Shoelace's QR Code component to show a QR Code for the current URL.",
	"published": "2024-05-10T05:38:35.456Z",
}
---

I've used the [Shoelace QR Code](https://shoelace.style/components/qr-code/) component a few times and
really like it. A common use-case I've had was basically
just to show a QR Code for the current page to make it easy
for people to quickly get to the URL, but I kinda thought
that hard coding the `value` attribute to point to my prod
URL was a little annoying since I had to know what that
would be in advance, or risk forgetting to update it if I
took a guess and then decided to change it.

That's when I had the idea to set it from the current
`location.href`, which was nice but it still kinda bugged
me that I'd need to write a little JS to target the element
and update it.

Tonight I realized it'd be pretty easy to just extend the
Shoelace QR Code component to add this behavior in a way
that already had access to the element.

```html
<script type="module">
	import QrCode from "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/components/qr-code/qr-code.component.js";
	const elementName = "href-qr-code";
	if (
		!window.customElements.get(
			elementName,
		)
	) {
		window.customElements.define(
			elementName,
			class HrefQrCode extends QrCode {
				connectedCallback() {
					super.connectedCallback();
					this.value =
						window.location.href;
				}
			},
		);
	}
</script>
```

That's it! Now this just works:

```html
<href-qr-code></href-qr-code>
```

<href-qr-code></href-qr-code>

Web components are dope.

<script type="module">
import QrCode from "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/components/qr-code/qr-code.component.js";
const elementName = "href-qr-code";
if (
	!window.customElements.get(
		elementName,
	)
) {
	window.customElements.define(
		elementName,
		class HrefQrCode extends QrCode {
			connectedCallback() {
				super.connectedCallback();
				this.value =
					window.location.href;
			}
		},
	);
}
</script>
