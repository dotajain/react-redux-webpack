

# Advanced frontend optimization  
(with webpack)



## Prerequirements

*   HTTP
*   caching
*   frontend
*   HTML
*   CSS
*   browser
*   webpack


# Make it faster


## Motivation

*   Users get **annoyed** by slow apps...
*   Users may **quit early** while loading
*   Smaller
    *   Less bandwidth usage
    *   Less storage usage


### Case

*   WebApp
*   Multiple Pages: i. e. Dashboard, Profile, Settings, ...
*   Navigation between pages **without reload**
*   User can **start** on any page


## Faster, but how?

*   Make is **smaller**
*   Reduce **number of requests**
*   Execute requests in **parallel**



Nobody does this anymore:
``` javascript
<script src="jquery.js"></script>
<script src="react.js"></script>
<script src="helper-methods.js"></script>
<!-- ... -->
<script src="application.js"></script>
```
_"Best pratices"_ say: Minimizing + Concatenating


So this awesome little gulp build...
``` javascript
    gulp.task('js', function () {
        return gulp.src('js/**/*.js')
            .pipe(concat('bundle.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
    });
```
... can't be too wrong?


## What's wrong with concat?

→ how long does it take until the user see the page

Two important metrics:

*   number of **bytes transferred**
*   number of **requests issued**

Keep in mind: mobile connections, countries with less cable infrastructure


## What's wrong with concat?

*   **One gigant bundle** is _bad_
    *   because many unneccessary bytes are transferred
*   **Loading every module separate** is also _bad_
    *   because too many request are made
*   It takes _too long_ until the user see the page!

>**Some numbers from Instagram:**
>*   9.5mb minimized javascript
>*   2.5mb after gzip


## What's the better way?

*   Serve only **needed stuff**
    *   What's needed depends on the interaction of the user
    *   This means we need to serve additional stuff when it's needed
*   **Concat** needed stuff into as few requests as possible
*   **Minimize** and **gzip** each request
    *   Be careful: This is expensive → prepare it
*   Try to **guess** what stuff the user **will need** and download it
    *   The guessing algorithm is very application specific
    *   But propably easier than you think


## Some example user interactions

#### Open the webapp on the Settings page

This is an _initial download_.

We should have some **script file prepared** that we can serve

#### Click on the link to the Profile page

We don't have the code for the Profile page yet

We should have some **script file prepared** that we can load

This is an _on-demand download_


## Some example user interactions

#### Enter some text into the search bar

We don't need the search code yet (the user hasn't clicked the search button)

But the user will propably click it soon

We should have some **script file prepared** that we can load

This is a _prefetching download_ (identical to the actual download)


## And...

*   Don't prepare **too small** on-demand files
    *   Merge multiple small ones
    *   Less delay for on-demand loading
    *   Don't merge into initial downloaded files
        *   The initial download is holy
*   Always load files in **parallel** when splitted
    *   But aware that the order is undefined than
*   Display **loading indicators** when loading stuff on demand
    *   It can take a while on slow connections
*   Handle the case when **on-demand loading fails**
    *   The user could have lost the connection


## Reduce number of requests

**Join multiple assets into a single one.**

> *   JS + JS: _Concat_
> *   IMG + IMG: _Sprites_
> *   CSS + CSS: _Concat_
> *   CSS + IMG/FONT: _DataURL_
> *   HTML + IMG: _DataURL_
> *   JS + CSS: _`doc.createElement("style")`_
> *   JS + HTML: _`inlineHTML`_
> *   HTML + JS: _`<script>`_
> *   HTML + CSS: _`<style>`_


## Don't always inline!

*   Not progressive
    *   Sometimes it's **better** to see the **text without image**,
    *   than to **wait longer for both**.
*   Inlining can **increase the size**
    *   PNG DataURL base64 + 30%!
    *   Don't inline rarly used stuff (i. e. `.ttf`)
*   Moving CSS from `<head>` to `<body>` can cause **FOUC**
    *   **Flash Of Unstyled Content**
*   **Not parallizable**, **not individual cachable**
    *   Parallel and cachable requests can be better

→ Inlining should be transparent to the developer.

_Delegate the decision of when to inline to the tooling._


## Summary

**Prepare**

because it's expensive  
_concat_, _minimize_, _gzip_

**chunks**

split chunks into  
_entry chunks_, _shared stuff for entries_ and _on-demand chunks_

**for user interaction.**

depending on _application-logic_  
also try to _guess_ future user interactions

**Inline some stuff.**

_Small_ stuff that is _needed_ for the _initial load_.  
Try to make _two parallel requests_ (HTTP 1.1).


# Make it faster 
(with webpack)


## Minimize
```javascript
plugins: [
	new UglifyJsPlugin()
]
```
or just `-p` on CLI


## gzip

Either rely on **server software**, or:
```javascript
plugins: [
	new CompressionPlugin()
]
```
Emits additional `*.gz` for each asset **when compression ratio is met**.


## entry points
(configuration)

*   webpack has the notation of **entry points**
    *   For locations in the app where the user **enters** the app
    *   It's not relevant when the user navigates inside the app
*   They usually map one to one to a HTML page
    *   Because the user enters the app on a HTML page
*   For interactions that cause an _initial download_.



### Single Page Application
```javascript
module.exports = {
	entry: "./single-page-app"
}
```

### Multi Page Application
```javascript
module.exports = {
  entry: {
    dashboard: "./dashboard/entry",
    profile: "./profile/entry",
    settings: "./settings/entry",
    // ...
  }
}
```

## On demand loading

*   webpack features **Code Splitting**
*   Developers add _split points_ to the app
*   webpack splits the app into **chunks**
    *   entry points form _entry chunks_
    *   split points form _additional chunks_
*   _Syntax_ for split points:
    *   `require.ensure([...], function(require))`
    *   AMD `require([...], function(...))`
    *   _ES6 `System.import("...") -> Promise`_


## On demand loading

*   Select points in the application where parts can be loaded on demand
```javascript
    function onSearch(text) {
        System.import("./search-dialog").then(function(SearchDialog) {
            new SearchDialog(text).show();
        });
    }
```

#### (loading indicators)
```javascript
    function onSearch(text) {
        var indicator = LoadingIndicator.show("search");
        System.import("./search-dialog").then(function(SearchDialog) {
            indicator.hide();
            new SearchDialog(text).show();
        });
    }
```

#### (error handing)
```javascript
    function onSearch(text) {
        var indicator = LoadingIndicator.show("search");
        System.import("./search-dialog").catch(function(err) {
            indicator.hide();
            displayError("Network disconnected");
        }).then(function(SearchDialog) {
            indicator.hide();
            new SearchDialog(text).show();
        });
    }
```

#### (configuration)

No special configuration needed,  
but ensure you have the basic configuration correct:
```javascript
    module.exports = {
        // ...
        output: {
            // ...
            publicPath: "//cdn.example.com/assets/"
        }
    }
```


## Avoiding too small chunks
```javascript
    new MinChunkSizePlugin({
        minChunkSize: 50000
    })
```
## Optimize request-size ratio

    new AggressiveMergingPlugin()



## Inlining

*   _`css-loader`_ embeds CSS in JS
*   _`html-loader`_ embeds HTML in JS
*   `css-loader` and `html-loader` automatically **`import` resources**
    *   `background: url(./file.png)` → `import "./file.png"`
    *   `<img src=./file.png>` → `import "./file.png"`
*   `file-loader` emits file into output directory
*   _`url-loader`_ emits DataURL into the JS/CSS file
*   _`url-loader?limit=10000`_ emits file for > 10kb, else DataURl

→ Usage **transparent** to the developer

→ Inlining decision in **configuration**


# Make it better over time


## Motivation

*   Users (hopefully) **come back** to your app after the initial visit
*   They should **not** be forced to **redownload** assets they already downloaded
    *   Even if a **partial update** has been published inbetween
*   Users **on slow connections** may get **frustrated**
    *   Waiting longer may be expected with slow connections
    *   But not when the user opens the app the second time...
*   Server **bandwidth is limited/expensive**
*   User **bandwidth is limited/expensive** (i. e. mobile connections)


## Caching

*   Enable caching for **every asset**
    *   HTTP Headers
*   _Don't_ use a per compilation hash
    *   i. e. `cdn.example.com/1e4fa89/bundle.js`
    *   It's easier, but less efficient
    *   i. e. images are often unchanged, but get new url
*   Use content hash in filename **per file**
    *   i. e. `cdn.example.com/bundle.7e8f2ab.js`
*   **Prevent** files from **changing**
    *   **Tradeoff**: performance for new users or existing users



## Caching in Multi Page Apps

We **prepared a script file** for each starting page.

User **reenters** the webapp on a **different starting page**.

**Redownloads** a lot of code that is also in to already cached script file.

* * *

*   **Split** prepared script file into **common and individual** stuff
    *   Common stuff can be **cached** and reused for different starting pages
    *   **But**: additional request (**tradeoff**!)

The same is true for **on-demand** loaded script files.



## with webpack Caching

### Multi Page Application: split shared and individual
```javascript
    module.exports = {
        plugins: [
            new webpack.CommonsChunkPlugin({
                name: "shared",
                minChunks: 2
            })
        ]
    }
```
automatic: best shared modules for this compilation

→ shared chunk could change (too) easily in the next compilation



### Multi Page Application: split shared and individual
```javascript
    entry: {
        shared: ["vendor-1", "vendor-2"] // select modules
        // ...
    }, plugins: [
        new webpack.CommonsChunkPlugin({
            name: "shared",
            minChunks: Infinity // disable automatic module selection
        })
    ]
```
→ **better caching**, but propably greater size


#### Advanced techniques

*   Use **multiple layers** of commons chunks
    *   one for rarly changing stuff
    *   the other for often changing stuff
    *   both can be loading in _parallel_
    *   `names: ["commons", "vendors"]`
*   Use **different** commons chunks for different parts of the app
    *   more _efficient_
    *   `chunks: ["a", "b", "c"]`
*   Commons chunk for **on-demand** chunks
    *   Loaded in _parallel_ to the additional chunk
    *   `async: true`



## Content hash in filenames

*   **`file-loader`** outputs files with content hash
    *   Default: `[hash].[ext]`
*   **`[chunkhash]`** in `output.filename` and `output.chunkFilename` gets replaced with content hash
*   **`[contenthash]`** in extract-text-webpack-plugin (see _Make it beforehand_ chapter)

    output: {
        filename: "[chunkhash].js",
        chunkFilename: "[chunkhash].js"
    }



## On `[chunkhash]`

*   the **mappings from chunk id to placeholder content** (i. e. chunk id to chunk hash) need to be available to the runtime
    *   they are **stored in** the webpack runtime (which is in the **first chunk**)
    *   this **invalidates** the first chunk **on any change :(**
*   Solution: _inline the mappings into the HTML page_ to keep the first chunk cachable
    *   easiest way: create another empty commons chunk and inline it into the HTML page



## inline empty commons chunk
```javascript
    output: {
        filename: "[chunkhash].js",
        chunkFilename: "[chunkhash].js"
    },
    plugins: [
        new CommonsChunkPlugin({
            name: "inline",
            filename: "inline.js",
            minChunks: Infinity
        })
    ]
```

## on changing ids

webpack gives **modules and chunks id** depending on order

(order depends on how often an id is in the bundle to create a minimal sized bundle)

When modules or chunks are changed, **all ids could be affected**.

* * *

Choosen ids can be **stored** to and **restored** from a so called **`records`** file, to prevent the chunks from **changing**.

Or ids can be **choosen** in a **deterministic way**, i. e. the filename can be used. (Careful: This leaks path infos)



## Records

    recordsPath: path.join(__dirname, "records.json")

*   file need to be **kept between compilations**
*   removing file may **invalidates cache**, but can reduce filesize
    *   Better choosen module/chunk ids



## deterministic module ids

    plugins: [
        new NamedModulesPlugin()
    ]

*   _Leaks file path_
    *   Could be used for reverse engineering
*   Doesn't affect chunk ids
*   Longer ids → bigger file
    *   Very small difference after gzip



## deterministic module ids

    plugins: [
        new HashedModuleIdsPlugin()
    ]

*   Doesn't leak path
*   Doesn't affect chunk ids
*   Longer ids → **bigger file**
    *   Bigger than `NamedModulesPlugin` after gzip


# Make it just for you


## Motivation

*   **User sessions differ** from each other:
    *   Other language
    *   Other browsers
    *   Other location → Other CDN
*   Using the **same script files** for **all users** can be inefficient



## Targeted builds

*   Move variables **from runtime into compile time**
    *   Language
    *   browser support
    *   CDN url
    *   ...
*   **Prepare** script files for **every combination**
    *   (`en`, `de`) x (`es5`, `es3`) x (`cdn.example.com`, `cdn2.example.com`)
*   **Decide beforehand** (server or inline script) which combination should be loaded

→ scripts contain **less unneeded** stuff

→ **smaller**


# Make it just for you

## with webpack


## Compile-time variables

    new DefinePlugin({
        LANGUAGE: JSON.stringify("de"),
        ES3_SUPPORT: true
    })

    if(ES3_SUPPORT) require("polyfill");


## Compile-time translations

    new I18nPlugin({
        "Hello World": "Hallo Welt"
    })

    __("Hello World") // Source

    "Hallo Welt" // Generated

Plugin needs more features. Looking for new maintainer.


## Configuration

### Simple case

Export an array of configurations, i. e.:

    var languages = ["de", "en"];
    module.exports = languages.map(function(lang) {
        return {
            // ...
            plugins: [
                new I18nPlugin(loadTranslations(lang))
            ]
    ...


## Configuration

### Advanced case

*   More combinations take more time
*   Build them in _parallel_
    *   [trivago/parallel-webpack](https://github.com/trivago/parallel-webpack)


# Make it beforehand


## Motivation

*   **Rendering on client** can be an **additional delay**
    *   weak devices
    *   scripts need to be loaded
*   Javascript can be disabled

_Perceived performance_


## Server-side rendering

*   Render the HTML on **server-side**
*   **Serialize state** from server
*   _once scripts loaded_
    *   **Restore serialized state**
    *   **Enhance** DOM with functionality that requires scripts
    *   Should be **transparent** to the user

_Popular frameworks/library_ often include _server renderer_.


## Flash Of Unstyled Content

With server-side rendering, styling must be loaded before HTML.

1.  **Styling**
2.  <nobr>**Prerendered HTML**</nobr>
3.  **Scripts**

Elsewise user would see HTML without Styling for a short time (Flash).


# Make it beforehand

## with webpack


## Challanges with SSR

*   Rendered HTML must be **equal** on client and server
    *   Best use the same code on server and client
*   **node.js** doesn't like **"fontend modules"**
    *   imports from css, images, etc.
*   Initial rendering must not require **on-demand** loaded code


## webpack for node

webpack can **compile bundles for node.js**. (`target: "node"`)

*   Use **different loaders** for _server-side_
    *   `style-loader!css-loader` → `null-loader`
    *   `style-loader!css-loader?modules` → `css-loader/locals`
*   **Move styling** into `<head>` for _client-side_
    *   `ExtractTextPlugin.extract("style-loader", "css-loader")`
        *   Emits separate `*.css` file for each entry


## On-demand & initial rendering

**No on-demand loading** in initial rendering.

### Prefetch required on-demand chunks

    <script src="commons.js"></script>
    <script src="1.chunk.js"></script>
    <script src="bundle.js"></script>



## On-demand & initial rendering

**No on-demand loading** in initial rendering.

### Multi Page App: separate entry points

    module.exports = {
        entry: {
            dashboard: "./dashboard/entry",
            profile: "./profile/entry",
            settings: "./settings/entry",
            // ...
        }
    }


# Summary


## Summary: Faster

*   **Smaller**
    *   Minimize
    *   Gzip
*   **Requests**
    *   Concat
    *   inlining
    *   On-demand loading
*   **Parallel** loading
*   **Perfetching**
*   **Percieved performance**
    *   Loading indicators


## Summary: better over time

*   **caching**
    *   individual
    *   avoid changing


## Summary: just for you

*   **targeted builds**
    *   compile-time variables
    *   build in parallel


## Summary: beforehand

*   **Server-side rendering**
    *   FOUC: Styling order


## Contribution to webpack

*   Looking for maintainers for **loaders** and **plugins**
*   Looking for people answering questions on **stackoverflow** etc.
*   Looking for **documentation** enhancements
*   Answering **issues**
*   **Pull Requests**


# The end!