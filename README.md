# Art Engine Explorer
A local web app intended to be used in conjunction with the Art-Engine. This is a quick (desktop) viewer that allows you to visualize and 

<img width="1695" alt="image" src="https://user-images.githubusercontent.com/91582112/156967994-270b5c19-8468-4abf-9ec4-2fc11e2c03d9.png">
<img width="1681" alt="image" src="https://user-images.githubusercontent.com/91582112/156968122-fa7d1d6a-eefa-41ab-8037-49df6491ac07.png">

## Roadmap
[] In
## Project setup
**⚠️ Important!!**
- As of this writing, this repo should be installed _next_ to the Art Engine folder so the _Viewer_ project can easily the `build` folders from the Art Engine generator. 
- As of this writing, the viewer relies on the `.edition` metadata property for indexing images.


Clone or Download this project _next to_ the generator folder.
[To adjust the path of the build folder, see config.js in _this_project]

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
