---
{ "title": "What does Redux model?", "published": "2019-09-29T01:27:11-06:00" }
---

In the previous post, we talked about the type signature
for `reduce` and how it essentially iterates over a list
and _combines_ all of the elements together using a
`reducer` function.

You may have heard `reducer` before within the context
of Redux, but how do the two concepts relate? Let's
start with a very basic `reducer`

```ts
type State = number;
const DEFAULT_STATE: State = 0;

type IncrementAction = {
	type: "INCREMENT";
};

type DecrementAction = {
	type: "DECREMENT";
};

type SetAction = {
	type: "SET";
	value: number;
};

type Action = IncrementAction | DecrementAction | SetAction;

function reducer(state: State, action: Action) {
	switch (action.type) {
		case "INCREMENT":
			return state + 1;
		case "DECREMENT":
			return state - 1;
		case "SET":
			return action.value;
		default:
			return state;
	}
}
```

This should look familiar to any who has dabbled with
Redux. `State` is just a number here, and we've got a
few actions that can update it. You might bind some
buttons to dispact some of these actions to update your
state according to which action got dispatched.

What would happen if we used the `reducer` function with
an array of actions though?

```ts
const actions: Action[] = [
	{
		type: "DECREMENT",
	},
	{
		type: "DECREMENT",
	},
	{
		type: "SET",
		value: 0,
	},
	{
		type: "DECREMENT",
	},
	{
		type: "SET",
		value: 12,
	},
	{
		type: "INCREMENT",
	},
	{
		type: "INCREMENT",
	},
	{
		type: "INCREMENT",
	},
];

// result === 15
const result = actions.reduce(reducer, DEFAULT_STATE);
```

We get `15` because even though we decremented a few
times, we ended up just setting the value to `12` and
then incrementing three times after that.

The only difference between this and what actually
happens with Redux is that the actions are not in an
array being reduced synchronously. Instead they happen
over time.

> Redux is modeling `actions` being reduced over _time_ with
> `State` being the accumulator!
