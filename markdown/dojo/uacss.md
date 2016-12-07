# uacss

## summary:
 Applies pre-set CSS classes to the top-level HTML node, based on:

 - browser (ex: dj_ie)
 - browser version (ex: dj_ie6)
 - box model (ex: dj_contentBox)
 - text direction (ex: dijitRtl)

 In addition, browser, browser version, and box model are combined with an RTL flag when browser text is RTL. ex: `dj_ie-rtl`.

 Returns the `has()` method.