// vite.config.ts
import { defineConfig } from "file:///C:/Users/darna/Documents/code/mono-app/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/darna/Documents/code/mono-app/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/darna/Documents/code/mono-app/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*"]
      },
      includeAssets: ["**/*"],
      manifest: {
        name: "CommuneCar",
        short_name: "CommuneCar",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "windows11/SmallTile.scale-100.png",
            sizes: "71x71"
          },
          {
            src: "windows11/SmallTile.scale-125.png",
            sizes: "89x89"
          },
          {
            src: "windows11/SmallTile.scale-150.png",
            sizes: "107x107"
          },
          {
            src: "windows11/SmallTile.scale-200.png",
            sizes: "142x142"
          },
          {
            src: "windows11/SmallTile.scale-400.png",
            sizes: "284x284"
          },
          {
            src: "windows11/Square150x150Logo.scale-100.png",
            sizes: "150x150"
          },
          {
            src: "windows11/Square150x150Logo.scale-125.png",
            sizes: "188x188"
          },
          {
            src: "windows11/Square150x150Logo.scale-150.png",
            sizes: "225x225"
          },
          {
            src: "windows11/Square150x150Logo.scale-200.png",
            sizes: "300x300"
          },
          {
            src: "windows11/Square150x150Logo.scale-400.png",
            sizes: "600x600"
          },
          {
            src: "windows11/Wide310x150Logo.scale-100.png",
            sizes: "310x150"
          },
          {
            src: "windows11/Wide310x150Logo.scale-125.png",
            sizes: "388x188"
          },
          {
            src: "windows11/Wide310x150Logo.scale-150.png",
            sizes: "465x225"
          },
          {
            src: "windows11/Wide310x150Logo.scale-200.png",
            sizes: "620x300"
          },
          {
            src: "windows11/Wide310x150Logo.scale-400.png",
            sizes: "1240x600"
          },
          {
            src: "windows11/LargeTile.scale-100.png",
            sizes: "310x310"
          },
          {
            src: "windows11/LargeTile.scale-125.png",
            sizes: "388x388"
          },
          {
            src: "windows11/LargeTile.scale-150.png",
            sizes: "465x465"
          },
          {
            src: "windows11/LargeTile.scale-200.png",
            sizes: "620x620"
          },
          {
            src: "windows11/LargeTile.scale-400.png",
            sizes: "1240x1240"
          },
          {
            src: "windows11/Square44x44Logo.scale-100.png",
            sizes: "44x44"
          },
          {
            src: "windows11/Square44x44Logo.scale-125.png",
            sizes: "55x55"
          },
          {
            src: "windows11/Square44x44Logo.scale-150.png",
            sizes: "66x66"
          },
          {
            src: "windows11/Square44x44Logo.scale-200.png",
            sizes: "88x88"
          },
          {
            src: "windows11/Square44x44Logo.scale-400.png",
            sizes: "176x176"
          },
          {
            src: "windows11/StoreLogo.scale-100.png",
            sizes: "50x50"
          },
          {
            src: "windows11/StoreLogo.scale-125.png",
            sizes: "63x63"
          },
          {
            src: "windows11/StoreLogo.scale-150.png",
            sizes: "75x75"
          },
          {
            src: "windows11/StoreLogo.scale-200.png",
            sizes: "100x100"
          },
          {
            src: "windows11/StoreLogo.scale-400.png",
            sizes: "200x200"
          },
          {
            src: "windows11/SplashScreen.scale-100.png",
            sizes: "620x300"
          },
          {
            src: "windows11/SplashScreen.scale-125.png",
            sizes: "775x375"
          },
          {
            src: "windows11/SplashScreen.scale-150.png",
            sizes: "930x450"
          },
          {
            src: "windows11/SplashScreen.scale-200.png",
            sizes: "1240x600"
          },
          {
            src: "windows11/SplashScreen.scale-400.png",
            sizes: "2480x1200"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-16.png",
            sizes: "16x16"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-20.png",
            sizes: "20x20"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-24.png",
            sizes: "24x24"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-30.png",
            sizes: "30x30"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-32.png",
            sizes: "32x32"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-36.png",
            sizes: "36x36"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-40.png",
            sizes: "40x40"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-44.png",
            sizes: "44x44"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-48.png",
            sizes: "48x48"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-60.png",
            sizes: "60x60"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-64.png",
            sizes: "64x64"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-72.png",
            sizes: "72x72"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-80.png",
            sizes: "80x80"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-96.png",
            sizes: "96x96"
          },
          {
            src: "windows11/Square44x44Logo.targetsize-256.png",
            sizes: "256x256"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
            sizes: "16x16"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
            sizes: "20x20"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
            sizes: "24x24"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
            sizes: "30x30"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
            sizes: "32x32"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
            sizes: "36x36"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
            sizes: "40x40"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
            sizes: "44x44"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
            sizes: "48x48"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
            sizes: "60x60"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
            sizes: "64x64"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
            sizes: "72x72"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
            sizes: "80x80"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
            sizes: "96x96"
          },
          {
            src: "windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
            sizes: "256x256"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
            sizes: "16x16"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
            sizes: "20x20"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
            sizes: "24x24"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
            sizes: "30x30"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
            sizes: "32x32"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
            sizes: "36x36"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
            sizes: "40x40"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
            sizes: "44x44"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
            sizes: "48x48"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
            sizes: "60x60"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
            sizes: "64x64"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
            sizes: "72x72"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
            sizes: "80x80"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
            sizes: "96x96"
          },
          {
            src: "windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
            sizes: "256x256"
          },
          {
            src: "android/android-launchericon-512-512.png",
            sizes: "512x512"
          },
          {
            src: "android/android-launchericon-192-192.png",
            sizes: "192x192"
          },
          {
            src: "android/android-launchericon-144-144.png",
            sizes: "144x144"
          },
          {
            src: "android/android-launchericon-96-96.png",
            sizes: "96x96"
          },
          {
            src: "android/android-launchericon-72-72.png",
            sizes: "72x72"
          },
          {
            src: "android/android-launchericon-48-48.png",
            sizes: "48x48"
          },
          {
            src: "ios/16.png",
            sizes: "16x16"
          },
          {
            src: "ios/20.png",
            sizes: "20x20"
          },
          {
            src: "ios/29.png",
            sizes: "29x29"
          },
          {
            src: "ios/32.png",
            sizes: "32x32"
          },
          {
            src: "ios/40.png",
            sizes: "40x40"
          },
          {
            src: "ios/50.png",
            sizes: "50x50"
          },
          {
            src: "ios/57.png",
            sizes: "57x57"
          },
          {
            src: "ios/58.png",
            sizes: "58x58"
          },
          {
            src: "ios/60.png",
            sizes: "60x60"
          },
          {
            src: "ios/64.png",
            sizes: "64x64"
          },
          {
            src: "ios/72.png",
            sizes: "72x72"
          },
          {
            src: "ios/76.png",
            sizes: "76x76"
          },
          {
            src: "ios/80.png",
            sizes: "80x80"
          },
          {
            src: "ios/87.png",
            sizes: "87x87"
          },
          {
            src: "ios/100.png",
            sizes: "100x100"
          },
          {
            src: "ios/114.png",
            sizes: "114x114"
          },
          {
            src: "ios/120.png",
            sizes: "120x120"
          },
          {
            src: "ios/128.png",
            sizes: "128x128"
          },
          {
            src: "ios/144.png",
            sizes: "144x144"
          },
          {
            src: "ios/152.png",
            sizes: "152x152"
          },
          {
            src: "ios/167.png",
            sizes: "167x167"
          },
          {
            src: "ios/180.png",
            sizes: "180x180"
          },
          {
            src: "ios/192.png",
            sizes: "192x192"
          },
          {
            src: "ios/256.png",
            sizes: "256x256"
          },
          {
            src: "ios/512.png",
            sizes: "512x512"
          },
          {
            src: "ios/1024.png",
            sizes: "1024x1024"
          }
        ]
      }
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkYXJuYVxcXFxEb2N1bWVudHNcXFxcY29kZVxcXFxtb25vLWFwcFxcXFxhcHBzXFxcXHVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxkYXJuYVxcXFxEb2N1bWVudHNcXFxcY29kZVxcXFxtb25vLWFwcFxcXFxhcHBzXFxcXHVpXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9kYXJuYS9Eb2N1bWVudHMvY29kZS9tb25vLWFwcC9hcHBzL3VpL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIHdvcmtib3g6IHtcclxuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKiddLFxyXG4gICAgICB9LFxyXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJyoqLyonXSxcclxuICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBuYW1lOiAnQ29tbXVuZUNhcicsXHJcbiAgICAgICAgc2hvcnRfbmFtZTogJ0NvbW11bmVDYXInLFxyXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcclxuICAgICAgICBvcmllbnRhdGlvbjogJ3BvcnRyYWl0JyxcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU21hbGxUaWxlLnNjYWxlLTEwMC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzcxeDcxJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TbWFsbFRpbGUuc2NhbGUtMTI1LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnODl4ODknLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NtYWxsVGlsZS5zY2FsZS0xNTAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcxMDd4MTA3JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TbWFsbFRpbGUuc2NhbGUtMjAwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTQyeDE0MicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU21hbGxUaWxlLnNjYWxlLTQwMC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzI4NHgyODQnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTE1MHgxNTBMb2dvLnNjYWxlLTEwMC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzE1MHgxNTAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTE1MHgxNTBMb2dvLnNjYWxlLTEyNS5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzE4OHgxODgnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTE1MHgxNTBMb2dvLnNjYWxlLTE1MC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzIyNXgyMjUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTE1MHgxNTBMb2dvLnNjYWxlLTIwMC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzMwMHgzMDAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTE1MHgxNTBMb2dvLnNjYWxlLTQwMC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzYwMHg2MDAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1dpZGUzMTB4MTUwTG9nby5zY2FsZS0xMDAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICczMTB4MTUwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9XaWRlMzEweDE1MExvZ28uc2NhbGUtMTI1LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMzg4eDE4OCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvV2lkZTMxMHgxNTBMb2dvLnNjYWxlLTE1MC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzQ2NXgyMjUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1dpZGUzMTB4MTUwTG9nby5zY2FsZS0yMDAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc2MjB4MzAwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9XaWRlMzEweDE1MExvZ28uc2NhbGUtNDAwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTI0MHg2MDAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL0xhcmdlVGlsZS5zY2FsZS0xMDAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICczMTB4MzEwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9MYXJnZVRpbGUuc2NhbGUtMTI1LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMzg4eDM4OCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvTGFyZ2VUaWxlLnNjYWxlLTE1MC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzQ2NXg0NjUnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL0xhcmdlVGlsZS5zY2FsZS0yMDAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc2MjB4NjIwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9MYXJnZVRpbGUuc2NhbGUtNDAwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTI0MHgxMjQwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uc2NhbGUtMTAwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNDR4NDQnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5zY2FsZS0xMjUucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc1NXg1NScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnNjYWxlLTE1MC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzY2eDY2JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uc2NhbGUtMjAwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnODh4ODgnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5zY2FsZS00MDAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcxNzZ4MTc2JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TdG9yZUxvZ28uc2NhbGUtMTAwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNTB4NTAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1N0b3JlTG9nby5zY2FsZS0xMjUucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc2M3g2MycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3RvcmVMb2dvLnNjYWxlLTE1MC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzc1eDc1JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TdG9yZUxvZ28uc2NhbGUtMjAwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTAweDEwMCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3RvcmVMb2dvLnNjYWxlLTQwMC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzIwMHgyMDAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NwbGFzaFNjcmVlbi5zY2FsZS0xMDAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc2MjB4MzAwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcGxhc2hTY3JlZW4uc2NhbGUtMTI1LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNzc1eDM3NScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3BsYXNoU2NyZWVuLnNjYWxlLTE1MC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzkzMHg0NTAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NwbGFzaFNjcmVlbi5zY2FsZS0yMDAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcxMjQweDYwMCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3BsYXNoU2NyZWVuLnNjYWxlLTQwMC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzI0ODB4MTIwMCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtMTYucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcxNngxNicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtMjAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcyMHgyMCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtMjQucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcyNHgyNCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtMzAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICczMHgzMCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtMzIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICczMngzMicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtMzYucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICczNngzNicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtNDAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc0MHg0MCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtNDQucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc0NHg0NCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtNDgucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc0OHg0OCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtNjAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc2MHg2MCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtNjQucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc2NHg2NCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtNzIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc3Mng3MicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtODAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc4MHg4MCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtOTYucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc5Nng5NicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLnRhcmdldHNpemUtMjU2LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMjU2eDI1NicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLmFsdGZvcm0tdW5wbGF0ZWRfdGFyZ2V0c2l6ZS0xNi5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzE2eDE2JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uYWx0Zm9ybS11bnBsYXRlZF90YXJnZXRzaXplLTIwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMjB4MjAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5hbHRmb3JtLXVucGxhdGVkX3RhcmdldHNpemUtMjQucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcyNHgyNCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLmFsdGZvcm0tdW5wbGF0ZWRfdGFyZ2V0c2l6ZS0zMC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzMweDMwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uYWx0Zm9ybS11bnBsYXRlZF90YXJnZXRzaXplLTMyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMzJ4MzInLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5hbHRmb3JtLXVucGxhdGVkX3RhcmdldHNpemUtMzYucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICczNngzNicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLmFsdGZvcm0tdW5wbGF0ZWRfdGFyZ2V0c2l6ZS00MC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzQweDQwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uYWx0Zm9ybS11bnBsYXRlZF90YXJnZXRzaXplLTQ0LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNDR4NDQnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5hbHRmb3JtLXVucGxhdGVkX3RhcmdldHNpemUtNDgucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc0OHg0OCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLmFsdGZvcm0tdW5wbGF0ZWRfdGFyZ2V0c2l6ZS02MC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzYweDYwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uYWx0Zm9ybS11bnBsYXRlZF90YXJnZXRzaXplLTY0LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNjR4NjQnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5hbHRmb3JtLXVucGxhdGVkX3RhcmdldHNpemUtNzIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc3Mng3MicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLmFsdGZvcm0tdW5wbGF0ZWRfdGFyZ2V0c2l6ZS04MC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzgweDgwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uYWx0Zm9ybS11bnBsYXRlZF90YXJnZXRzaXplLTk2LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnOTZ4OTYnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5hbHRmb3JtLXVucGxhdGVkX3RhcmdldHNpemUtMjU2LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMjU2eDI1NicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLmFsdGZvcm0tbGlnaHR1bnBsYXRlZF90YXJnZXRzaXplLTE2LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTZ4MTYnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5hbHRmb3JtLWxpZ2h0dW5wbGF0ZWRfdGFyZ2V0c2l6ZS0yMC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzIweDIwJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uYWx0Zm9ybS1saWdodHVucGxhdGVkX3RhcmdldHNpemUtMjQucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcyNHgyNCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLmFsdGZvcm0tbGlnaHR1bnBsYXRlZF90YXJnZXRzaXplLTMwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMzB4MzAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5hbHRmb3JtLWxpZ2h0dW5wbGF0ZWRfdGFyZ2V0c2l6ZS0zMi5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzMyeDMyJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uYWx0Zm9ybS1saWdodHVucGxhdGVkX3RhcmdldHNpemUtMzYucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICczNngzNicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLmFsdGZvcm0tbGlnaHR1bnBsYXRlZF90YXJnZXRzaXplLTQwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNDB4NDAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5hbHRmb3JtLWxpZ2h0dW5wbGF0ZWRfdGFyZ2V0c2l6ZS00NC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzQ0eDQ0JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uYWx0Zm9ybS1saWdodHVucGxhdGVkX3RhcmdldHNpemUtNDgucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc0OHg0OCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLmFsdGZvcm0tbGlnaHR1bnBsYXRlZF90YXJnZXRzaXplLTYwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNjB4NjAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5hbHRmb3JtLWxpZ2h0dW5wbGF0ZWRfdGFyZ2V0c2l6ZS02NC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzY0eDY0JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uYWx0Zm9ybS1saWdodHVucGxhdGVkX3RhcmdldHNpemUtNzIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc3Mng3MicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICd3aW5kb3dzMTEvU3F1YXJlNDR4NDRMb2dvLmFsdGZvcm0tbGlnaHR1bnBsYXRlZF90YXJnZXRzaXplLTgwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnODB4ODAnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnd2luZG93czExL1NxdWFyZTQ0eDQ0TG9nby5hbHRmb3JtLWxpZ2h0dW5wbGF0ZWRfdGFyZ2V0c2l6ZS05Ni5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzk2eDk2JyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3dpbmRvd3MxMS9TcXVhcmU0NHg0NExvZ28uYWx0Zm9ybS1saWdodHVucGxhdGVkX3RhcmdldHNpemUtMjU2LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMjU2eDI1NicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdhbmRyb2lkL2FuZHJvaWQtbGF1bmNoZXJpY29uLTUxMi01MTIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc1MTJ4NTEyJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ2FuZHJvaWQvYW5kcm9pZC1sYXVuY2hlcmljb24tMTkyLTE5Mi5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzE5MngxOTInLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnYW5kcm9pZC9hbmRyb2lkLWxhdW5jaGVyaWNvbi0xNDQtMTQ0LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTQ0eDE0NCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdhbmRyb2lkL2FuZHJvaWQtbGF1bmNoZXJpY29uLTk2LTk2LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnOTZ4OTYnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnYW5kcm9pZC9hbmRyb2lkLWxhdW5jaGVyaWNvbi03Mi03Mi5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzcyeDcyJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ2FuZHJvaWQvYW5kcm9pZC1sYXVuY2hlcmljb24tNDgtNDgucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc0OHg0OCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTYucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcxNngxNicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMjAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcyMHgyMCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMjkucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcyOXgyOScsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMzIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICczMngzMicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvNDAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc0MHg0MCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvNTAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc1MHg1MCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvNTcucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc1N3g1NycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvNTgucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc1OHg1OCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvNjAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc2MHg2MCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvNjQucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc2NHg2NCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvNzIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc3Mng3MicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvNzYucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc3Nng3NicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvODAucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc4MHg4MCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvODcucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICc4N3g4NycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTAwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTAweDEwMCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTE0LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTE0eDExNCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTIwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTIweDEyMCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTI4LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTI4eDEyOCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTQ0LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTQ0eDE0NCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTUyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTUyeDE1MicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTY3LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTY3eDE2NycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTgwLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTgweDE4MCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTkyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMjU2LnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMjU2eDI1NicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvNTEyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdpb3MvMTAyNC5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzEwMjR4MTAyNCcsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE0VSxTQUFTLG9CQUFvQjtBQUN6VyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBR3hCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxNQUNOLFNBQVM7QUFBQSxRQUNQLGNBQWMsQ0FBQyxNQUFNO0FBQUEsTUFDdkI7QUFBQSxNQUNBLGVBQWUsQ0FBQyxNQUFNO0FBQUEsTUFDdEIsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFVBQ1Q7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsVUFDVDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
