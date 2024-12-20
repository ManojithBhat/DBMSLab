import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
// export default defineConfig({
//   server:{
//    proxy:{
//      '/auth':{
//        target:'http://localhost:8000',
//        changeOrigin:true,
//    },
//    '/event':{
//      target:'http://localhost:8000',
//      changeOrigin:true,
//    }
//   },
//  },
//    plugins: [react()],
//  })

export default defineConfig({
  server:{
       proxy:{
         '/auth':{
           target:'http://localhost:3000',
           changeOrigin:true,
           logLevel: 'debug',
       },
       '/view':{
         target:'http://localhost:3000',
         changeOrigin:true,
       },
       '/event':{
         target:'http://localhost:3000',
         changeOrigin:true,
       }
      },
     },
     historyApiFallback: {
      index: '/index.html'
    },
  plugins: [react()],
})