const { cropPNG } = require('./crop_founders');

console.log('Testing crop...');
cropPNG('../public/media__1785257748128.png', '../public/founder-engineer.png', 210, 270, 160, 160);
cropPNG('../public/media__1785257748128.png', '../public/founder-fullstack.png', 655, 270, 160, 160);
