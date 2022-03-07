# 🧪 Art Engine Explorer (alpha)
A local web app intended to be used in conjunction with the Art-Engine. This is a quick (desktop) viewer that allows you to visualize and 

<img width="1362" alt="image" src="https://user-images.githubusercontent.com/91582112/157121649-14523004-4279-4c6b-9949-ebaa7d435eb4.png">
<img width="1365" alt="image" src="https://user-images.githubusercontent.com/91582112/157121771-a09db140-b63c-4cd6-a310-60f15375b018.png">

# Controls
Use `arrow keys` to scroll through items when the detail modal or fullscreen modes are open
Use `Escape` to close teh detail modal or Fullscreen mode

## Roadmap
[] Add rarity calculations
[] Add "jump to number" input 
[] Integrate into the main art-engine repo as a submodule
[] Properly configure the config.js file to allow for custom paths to the build dir

# Project setup
**⚠️ Important!!**
- As of this writing, this repo should be installed _next_ to the Art Engine folder so the _Viewer_ project can easily the `build` folders from the Art Engine generator. 
- As of this writing, the viewer relies on the `.edition` metadata property for indexing images.


Clone or Download this project _next to_ the generator folder.
This build expects the art-engine folder to be named `Art Engine` 
[To adjust the path of the build folder, see vue.config.js AND App.vue in_this_project]

If you are building JPEG images, change the config in `config.js` in the viewer config file.

```
yarn

// or using npm
npm install
```

### Once installed, run `yarn dev`
```
yarn dev

// if using npm
// npm run dev
```

## Building for production
This application uses standard Vue-cli building and bundling. For more information on deploying a live version (After revealing all your NFT art of course), see the Vue.js documentation https://vuejs.org/guide/introduction.html
### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
