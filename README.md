## What is it?

This is a demo repository to visualize a problem of using `ESlint` together with `react-hooks/exhaustive-deps` when it is necessary to pass a variable of type `Array` to hook‘s dependency array

<img src="https://user-images.githubusercontent.com/4083977/56232999-4a60a580-60ac-11e9-9853-2718118bcd5f.png" width="400" />

## Context

React hooks have a way to pass `dependencies` as an array:
```
useEffect(() => {
  ...
}, [dependency1,dependency2]);
```
However, those dependencies are compared `shallowly` and that means if a `dependency` is of type `Array` React will not be able to detect changes within that array and it is necessary to calculate a derivative value of this array (_e.g._ `array.join(',')`).
Similar suggestions were given by different authors: [inventingwithmonster.io](https://inventingwithmonster.io/20190207-how-to-fix-final-argument-passed-to-useeffect-changed-size-between-renders/) or [facebook/react#14324 (comment)](https://github.com/facebook/react/issues/14324#issuecomment-441489421)

## The problem

`react-hooks/exhaustive-deps` is not able to detect that `derived value` is calculated for the `dependency`, an example of this can be seen here: [src/Toasts.js#L27](https://github.com/lukaskl/exhaustive-deps-and-array-variables/blob/master/src/Toasts.js#L27)

![image](https://user-images.githubusercontent.com/4083977/56234771-328b2080-60b0-11e9-8d6c-402a1f120ef9.png)

also the suggested `auto fix` for this `eslint problem` actually breaks the code, as it changes 
```
  useEffect(() => {
    setHeights(heights => calculateHeights(childKeys, refs, heights));
  }, [childKeys.join(',')]);
```
to
```
  useEffect(() => {
    setHeights(heights => calculateHeights(childKeys, refs, heights));
  }, [childKeys]);
```

which leads to an `infinity loop`

## The question

I know that there is a workaround - simply disable the rule for a single line
```
// eslint-disable-next-line react-hooks/exhaustive-deps
```
However, it is barely desired outcome.


So I have a question of either:

a) maybe this situation is antipattern in the first place and there is an objective suggestion how to transform components that all dependencies would consist only of `primitive` types?

b) maybe it is worth to extend `exhaustive-deps` rule by adding an option, that the `derived value` of a `dependency` would be recognised as the `dependency` itself? 


