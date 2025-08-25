// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/:any*",
        destination: "/",
      },
    ]
  },
}

// module.exports = {
//   async headers() {
//     return[
//       {
//       source: '/((?!embed).*)',
//       headers: [
//         {
//           key: 'X-Frame-Options',
//           value: 'SAMEOPRIGIN',
//         }
//       ]
//     }
//   ];
//   }
// }