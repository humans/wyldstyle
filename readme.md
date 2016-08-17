# Wyldstyle

**Wyldstyle** is a javascript CLI script that reads your markup and writes utility classes for you.

It's inspired by [Tachyons](http://tachyons.io) and [Atomic CSS](http://acss.io) where, your markup has reusable classes to prevent developers from writing too many styles.

Wyldstyle has both a compiler and a watcher. Running a watcher, you can just continuously code on the markup while the utility file is generated every time your file has been saved.

## Preview

Wyldstyle extracts out the utilities you've set, runs them through [Emmet](http://emmet.io) and writes them to a file. In this preview, we'll show the support for **breakpoints**, **hover states**, and **variables**.

### Markup

```html
<section class="article-list [ u-d:fx u-jc:sb u-m:0a ]">
  <article class="article [ u-p:1r u-mb:1.5r u-mb:2r@l ]">
    <h1 class="article__title [ u-tt:u u-td:n u-c:$link-color u-c:$link-color-hover@h ]"><a href="#">Article Title</a></h1>

     <p class="article__excerpt [ u-lh:1.5 ]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed tortor mattis, blandit nisi tincidunt, ultrices turpis.</p>
  </article>
</section>
```

### Generated CSS

```css
.u-c\:\$link-color { color: $link-color; }
.u-c\:\$link-color-hover\@h:hover { color: $link-color-hover; }
.u-d\:fx { display: flex; }
.u-jc\:sb { justify-content: space-between; }
.u-lh\:1\.5 { line-height: 1.5; }
.u-m\:0a { margin: 0 auto; }
.u-mb\:1\.5r { margin-bottom: 1.5rem; }
.u-p\:1r { padding: 1rem; }
.u-td\:n { text-decoration: none; }
.u-tt\:u { text-transform: uppercase; }

@media (min-width: 768px) {

}

@media (min-width: 1024px) {
  .u-mb\:2r\@l { margin-bottom: 2rem; }
}

@media (min-width: 1200px) {

}
```

The utility classes are prefixed with `u-` (which can be changed in the config file [See [Configuring Emmet](#configuring-emmet)]). All the other utilities follow Emmet's conventions.

**[Here's a link to the Emmet Cheatsheet!](http://docs.emmet.io/cheat-sheet/)**

## Getting Started

This package requires the use of ES6. `node >= 6.*`

**We need to install the wyldstyle command line tool from npm.**

```bash
npm install wyldstyle --save-dev
```

**NOTE:** You can also install it globally but we prefer using npm scripts so everything we need is explicitly stated in our package.json files.

**Next up is to tell wyldstyle to watch our markup file for changes and write them to a stylesheet**

```bash
wyldstyle index.html article.html --output css/theme.css --watch
```

## Usage and Configuration

### Command Line

```bash
wyldstyle [target directory or file] [--flags] [--output] [--watch]
```

Wyldstyle has multiple ways in passing arguments but it's flexibility and advanced configuration comes in a `wyldstyle.json` file.

Before we run through that, let's first look at the command line arguments since command line flags are enough for most.

By default, wyldstyle just runs through all the files once and writes them to a file.

| Flags      | Alias   | Multiple? | Description                                                |
|------------|---------|-----------|------------------------------------------------------------|
| `--output` | `-o`    | No        | The file where wyldstyle will write the utilities on.      |
| `--ignore` | `-i`    | Yes       | File or directory to ignore when watching the directories. |
| `--watch`  | `-w`    | No        | Start watching the directories provided                    |

### Config File

Using a config file on the otherhand makes it much manageable when woring on a project rather than just a prototype. When using the config file, we write up a `wyldstyle.json` file in the project root.

In the cofiguration file, we can set **custom breakpoints** and **configure emmet** as well!

Now, our config file should look something like this:

```json
{
  "breakpoints": {
    "m":  "768px",
    "l":  "1024px",
    "xl": "1200px"
  },
  "directory": ["assets/js", "templates"],
  "output": "assets/scss/_utilities.scss",
  "emmet": {
    "syntax": "scss",
    "preferences": {
      "caniuse.enabled": false,
      "css.autoInsertVendorPrefixes": false
    },
    "snippets": {
      "m:0a": "margin: 0 auto;"
    }
  }
}
```

Take note that _any command line argument will override the config file._

**Breakpoints**

Breakpoints are configurable. The key, (`m`, `l`, `xl`) can actually be interchanged to what you prefer. The config we provide as an example stands for `medium`, `large`, `extra large`.

An example is, you can change it up `m`, `t`, `d`, `r`, to stand for `mobile`, `tablet`, `desktop`, and `retina`. It should immediately take place when parsing the markup `u-p:3p@r`.

**Configuring Emmet**

The emmet config actually just uses the **direct emmet npm api**. There's documentation for both the preferences and the snippets which you can look up here:
- [Preferences](http://docs.emmet.io/customization/preferences/)
- [Snippets](http://docs.emmet.io/customization/snippets/)

As a quick start guide, here are the most common preferences we use:

| Preference                     | Default | Description                                               |
|--------------------------------|---------|-----------------------------------------------------------|
| `caniuse.enabled`              | `true`  | This prefixes the attributes like `display: -webkit-flex` |
| `css.autoInsertVendorPrefixes` | `true`  | Emmet runs an autoprefixer for css classes                |

## On How We Use It

### Configuration

On our end, we disable `caniuse.enabled` and `css.autoInsertVendorPrefixes` by default since we use pre-processors in project development and rely on post-css to generate the prefixes rather than inserting them directly on our stylesheets. Though this is purely for cleanliness' sake.

### Development

When it comes to development, we usually create a dedicated file called `_utilities.scss` file where wyldstyle writes up our utilities and we import it to the master theme file.

### Responsive

For the breakpoints, we prefer creating a map that holds our variables and reference the function to call the breakpoint instead. Just for maintainability and fluency.

**_breakpoints.scss**

```sass
$breakpoints: (
    tablet:  1rem,
    desktop: 2rem,
    retina:  3rem
);

@function breakpoint ($breakpoint) {
    @return map-get($breakpoints, $breakpoint);
}
```

**wyldstyle.json**

```json
{
    "breakpoints": {
        "m": "breakpoint(tablet)",
        "l": "breakpoint(desktop)",
        "xl": "breakpoint(retina)"
    }
}
```

## Roadmap and Enhancements

### 1.0

**Major Codebase Refactor**

When wyldstyle was first developed, midway of development, it ended up having a lot of hacky solutions for the breakpoints and the compilation. And even though this version has a high probability of being the same, the aim is to have a much more maintainable code base that I wouldn't really want to rewrite after looking at it for a second time. _Hopefully_.

### 1.1

**Hover States**

Implement the `@h` postfix for hover states. `u-c:$font-color-hover@h` and be parsed to `.u-c\:\$font-color-hover\@h:hover { color: $font-color-hover; }`

**Custom Dynamic Snippets**

The current support for snippets are hardcoded values. We want to start supporting custom snippets with a bit more variability to it.

```json
{
    "m:0a": "margin: 0 auto;"
}
```

Currently, I'm not really sure how to implement a snippet where the stylesheet attribute value is customizable.

```json
{
    "grid:3": "flex:basis: calc((100%/{value}) - 2);"
}
```

### 1.2

**Style Guide**

Add support for a forced style guide or format in the config file.

```json
{
    "format": {
        "padding":   ["0.5r", "1r", "1.5r"],
        "margin":    ["0.5r", "1r", "1.5r"],
        "font-size": ["1r"],
        "color":     ["$black", "$red"]
    }
}
```

This is just better enforcement for large scale team projects to avoid cutting corners.

I'm thinking a notification should be triggered, or a callback should be triggered when compiling when a non-allowed value has been paired with the attribute. Just in case the developer ends up forgetting about the style guide.

**Extension Support**

It's planned to support a more extensible architecture to provide different approaches on usage for Wyldstyle. Of course, this is tailored on how we develop on the frontend but by allowing an extension/plugin architecture, it may be possible to hook into `pre-expansion`, `post-expansion` and `post-compile` events to do added processing.

In the long run, we want to export the **style-guide**, **hover states**, **breakpoints**, and even the **snippets** into the extension to just have a proof of concept on hand.

By implementing this we may even add another flag for the command line tool for transformations.

```bash
wyldstyle index.html --watch --output css/utilities.css --transform autoprefixer
```

### No Particular Version

**Javascript API Configurability**

Now this is something I particularly want to implement correctly but I don't have any shred of idea how to.

This comes in tied in with most of the features for the definite versions since most of the configuration needs to be done language first.

```javascript
wyldstyle(directories, {
    events: {
        preCompile: function (abbreviation) {
            return abbreviation;
        },
        postCompile: function (style) {
            return style;
        },
    }
});
```
