var dojoConfig = {
  parseOnLoad: true,
  isDebug: true,
  // This code registers the correct location of the "demo"
  // package so we can load Dojo from the CDN whilst still
  // being able to load local modules
  packages: [
    { name: 'jslib', location: '/jslib' },
    { name: 'btdojo', location: '/btdojo' },
    { name: 'dstore', location: '/assets/dojo-dstore' },
  ]
};
