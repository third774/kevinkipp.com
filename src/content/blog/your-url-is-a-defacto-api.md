---
{
  "title": "Your URL is a defacto API",
  "description": "Why carefully considering your URL structure is important",
  "published": "2023-11-20T13:32:10-06:00",
}
---

## Why does it matter?

It's easy to think that nobody cares what's in your web app's URL. Heck, Safari and Arc (giving mobile browsers a pass here) have both decided that you don't need to see what's in there unless you're curious. They're just going to click around the site anyway, right?

There are a few important things to keep in mind, though!

1. Users share links!
2. Users bookmark things!
3. Your users _and_ your support team benefit from deep linking!
4. Power users will use your URL as an API.
5. Changing the URL structure (without redirects) will break all of the above!

Failing to carefully consider what should go in the URL leads to frustrating experiences. For example, you may come across an e-commerce page that either doesn't include search filters in the URL or doesn't allow direct linking to a specific image of a product that you want to share with someone.

## Raycast Quicklinks

I've been using [Raycast](https://www.raycast.com/) for a while now and love it. The [Quicklinks](https://manual.raycast.com/quicklinks) feature lets you insert placeholder tokens in a URL to make searching any site extremely quick, and the Quicklink can even be bound to a keyboard shortcut that will read your selected text and pass it along as the query! I have one set up for Google, and can just highlight some text and hit the shortcut to pop a Google search open for that term.

If your website's search doesn't include the query in the URL, however, this is impossible!

## Perplexity AI

I've _also_ been using [perplexity.ai](https://perplexity.ai) a ton for the last couple months, and it also accepts the search in the URL!

[https://perplexity.ai/?q=How%20to%20curry%20in%20JS](https://perplexity.ai/?q=How%20to%20curry%20in%20JS)

A couple other features that Perplexity also exposes via the URL are the focus and copilot mode. Focus lets you select where you want Perplexity to go for information to answer your question, and copilot mode will use more powerful models and can even ask you clarifying questions based on its initial findings from searching online.

While Raycast _does_ allow specifying up to three arguments in a quicklink, the space available for typing in the query feels quite claustrophobic, and I don't want to have to remember the focus modes or specify copilot mode.

To improve on this, I built a very simple [extension](https://www.raycast.com/third774/perplexity) for Raycast that is basically just the same form inputs as the main website, but available within Raycast. It's nothing fancy — all it does is construct the URL with the correct parameters to open a browser tab. But I can put it on a hotkey! Just press my shortcut and start typing my question!

Raycast provides some additional features that make this really nice though:

1. If I start typing a query and close Raycast, the query will be saved as a draft and I can easily return to it later.
2. A dropdown for focus modes — I verified all of the values for the URL, and now I can forget them.
3. The value used for Copilot mode is stored. I pay $20/mo for Perplexity and use copilot mode all the time, but anyone who doesn't can still use the extension and your choice will be remembered.
