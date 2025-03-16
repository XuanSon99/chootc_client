module.exports = {
    apps: [
      {
        name: 'NuxtAppName',
        exec_mode: 'cluster',
        instances: 'max',
        script: './node_modules/nuxt/bin/nuxt.mjs',
        args: 'start'
      }
    ]
  }


// module.exports = {
//   apps: [
//     {
//       name: 'NuxtAppName',
//       port: '3000',
//       exec_mode: 'cluster',
//       instances: 'max',
//       script: './.output/server/index.mjs'
//     }
//   ]
// }
