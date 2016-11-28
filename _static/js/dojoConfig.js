/**
 * Created by beeant on 2016/11/21.
 */
var dojoConfig = {
  async: true,
  parseOnLoad: 1,
  // This code registers the correct location of the "demo"
  // package so we can load Dojo from the CDN whilst still
  // being able to load local modules
  packages: [
    {
      name: "dojo-ext",
      location: '/js/dojo-ext'
    },
    {
      name: "dgrid",
      location: '/assets/dgrid'
    },
    {
      name: "dstore",
      location: '/assets/dstore'
    }
  ]
};