

import { BasicWorld } from './src/Basic/World.js';

async function main() {
  // Get a reference to the container element
  const container = document.querySelector('#scene-container');

  // create a new world
  const basicWorld = new BasicWorld(container);

  // complete async tasks
  await basicWorld.init();

  // start the animation loop
  basicWorld.start();
}

main()
  .catch((err) => {
    console.error("index load error :: ", err);
  });
;
