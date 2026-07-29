const { cropPNG } = require('./crop_founders.cjs');

console.log('Cropping face photos from screenshot media__1785257748128.png...');
// In media__1785257748128.png (1024x653):
// Left circle (Samandar Nabiyev): X: 210, Y: 270, W: 160, H: 160
// Right circle (Sayfulloh Zokirov): X: 655, Y: 270, W: 160, H: 160
cropPNG('./public/media__1785257748128.png', './public/founder-engineer.png', 210, 270, 160, 160);
cropPNG('./public/media__1785257748128.png', './public/founder-fullstack.png', 655, 270, 160, 160);
