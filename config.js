// ***** FOR LOCAL DEV: SET THE PATH TO YOUR BUILD FOLDER, RELATIVE TO THIS PROJECT ****//                          this path is
//                             |
//                             |
//                             v
const buildPath = "../Art Engine/build";

/** TO UPLOAD TO A LIVE SERVER, SET EMBED PATH TO TRUE */
const hosted = false;
const hostedPath = "/build";
// set the image type of your images from your build folder
const imageType = "png";

module.exports = {
  buildPath,
  imageType,
  hosted,
  hostedPath,
};
