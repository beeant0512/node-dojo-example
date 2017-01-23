{
  statik: [
    { prefix: '/assets', path: 'node_modules' },
    { prefix: '/data', path: 'data' },
    { prefix: '/js', path: 'public/javascripts' },
    { prefix: '/css', path: 'public/stylesheets' },
    { prefix: '/img', path: 'public/images' },
    { prefix: '/jslib', path: 'public/jslib' },
    { prefix: '/btdojo', path: 'public/btdojo' }
  ],
  routes: [
    { prefix: '/', path: './routes/index' },
    { prefix: '/user', path: './routes/users' },
    { prefix: '/grid', path: './routes/grid' }
  ]
}
