# Cascading Style Sheets

CSS adds presentational styles to HTML, and determines the colors, fonts, layout and animations that you see in your browser. It can drastically change the way your website looks. See [CSS Zen Garden](http://www.csszengarden.com/).

We will briefly cover the crucial parts, but here are some additional resources and tools you can use to learn more:

- [CSS fundamentals](https://runestone.academy/runestone/books/published/webfundamentals/CSS/toctree.html)
- [HTML & CSS is hard (but it doesn't have to be)](https://www.internetingishard.com/html-and-css/)
- [CSS property reference](https://cssreference.io/)

## Terminology

### Declaration block

A declaration block defines how to style matching elements. Declaration block consist of a selector(`p`) and multiple declarations(`color: red;`).

```css
p {
  color: red;
  text-align: center;
}
```

`p` is the selector, the `p` selector indicators that all paragraph elements will be affected by the style defined in the declarations.

`color: red` is a declaration which declares what style changes will be applied to the selected element

`color` is a property, specifies the property of the selected element. Different selectors have a fixed set of property that the stylesheet can specify. If the property does not exist, the declaration will be ignored.

`red` is a value. The value too, must be valid to the property.

## Comment

We can add comments in our stylesheet if there is anything we want to clarify to other developers.

We do not recommend using comments. Comments are necessary typically in 2 situation
very unique and doesn't make sense in a normal situation
we have written such lousy code that explanations are required for others to understand what we are trying to do.

```css
/* this is a comment */
p {
  color: red;
  text-align: center;
}
```

## Selectors

### Basic Selectors

You can also select by id or class name.
An id is specified with `#` in front of the id.
A class name is specified with a `.` in front of the class name.

```css
/* classname */
.header {
  text-transform: capitalize;
}

/* id */
#submit-button {
  background-color: blue;
}
```

For a more specific specifier, you can use more than one specifier and their connecting relationship.

```css
/* child */
ul li {
  color: red;
}

/* direct child */
ul > li {
  color: blue;
}

/* adjacent */
span + span {
  margin-left: 1em;
}

/* sibling */
span ~ span {
  margin-left: 1em;
}
```

### Multiple selectors

CSS allows multiple selectors to the same declaration by using a `,` as a separator

```css
.modal-text,
.button-text {
  color: pink;
}
```

## Lab: CSS selectors

https://flukeout.github.io/

## Specificity

Two or more competing rules might be applicable to a given element in one HTML page. And the rules may define different property values for the same element. In such cases, which should be applied?

CSS standard has defined three ways to resolve conflicts.

- Specificity rules
- Importance hint
- The order of rules when they are loaded by browser

### Specificity rules

All CSS selectors are assigned a weight, and the heaviest selector takes precedence when conflicting CSS rules exist.

- Inline styles are worth 1,000 points;
- IDs are worth 100 points;
- classes are worth 10 points;
- elements are worth 1 point each.

**Highest to lowest priority**

- important `color: red !important;`
- inline styling `<p style="color: red;">inline is bad</p>`
- id `#submit-button`
- class `.button`
- element `p`

For example:

```css
p {
  /* 1 point */
}

p.chicken {
  /* 11 points */
}

p#fish {
  /* 101 points */
}
```

The selector with the highest points will win and its styles will override those of other selectors.

Aim for specifications that indicate the item you are choosing, without being so strict that variations of the element cannot overwrite the style. In practice, **we should avoid using `!important` and inline styling.**

### The order of rules

If a rule is defined after one with same specificity, the second rule wins.

For example:

```css
p {
  color: black;
}

p {
  color: white;
}
```

The rule that wins is `color: white`.

In general, the browser loads rules one by one, and the rules loaded later takes precedence over the rules loaded earlier (when they have the same specificity).
