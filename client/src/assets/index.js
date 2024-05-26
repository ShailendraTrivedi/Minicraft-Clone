import { NearestFilter, RepeatWrapping, TextureLoader } from "three";
import { dirtImg, glassImg, grassImg, logImg, woodImg } from "./images";

const dirtTexture = new TextureLoader().load(dirtImg);
const grassTexture = new TextureLoader().load(grassImg);
const glassTexture = new TextureLoader().load(glassImg);
const woodTexture = new TextureLoader().load(woodImg);
const logTexture = new TextureLoader().load(logImg);
const groundTexture = new TextureLoader().load(grassImg);

dirtTexture.magFilter = NearestFilter;
dirtTexture.wrapS = RepeatWrapping;
dirtTexture.wrapT = RepeatWrapping;

grassTexture.magFilter = NearestFilter;
grassTexture.wrapS = RepeatWrapping;
grassTexture.wrapT = RepeatWrapping;

glassTexture.magFilter = NearestFilter;
glassTexture.wrapS = RepeatWrapping;
glassTexture.wrapT = RepeatWrapping;

woodTexture.magFilter = NearestFilter;
woodTexture.wrapS = RepeatWrapping;
woodTexture.wrapT = RepeatWrapping;

logTexture.magFilter = NearestFilter;
logTexture.wrapS = RepeatWrapping;
logTexture.wrapT = RepeatWrapping;

groundTexture.magFilter = NearestFilter;
groundTexture.wrapS = RepeatWrapping;
groundTexture.wrapT = RepeatWrapping;

function getTexture(texture) {
  switch (texture) {
    case "dirt":
      return dirtTexture;
    case "grass":
      return grassTexture;
    case "glass":
      return glassTexture;
    case "wood":
      return woodTexture;
    case "log":
      return logTexture;
    case "ground":
      return groundTexture;
    default:
      return woodTexture;
  }
}

export { getTexture };
