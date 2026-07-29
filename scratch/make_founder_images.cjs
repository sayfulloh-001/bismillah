const fs = require('fs');

const img1 = fs.readFileSync('./public/founder-engineer.png').toString('base64');
const img2 = fs.readFileSync('./public/founder-fullstack.png').toString('base64');

const content = `export const FOUNDER_ENGINEER_IMG = "data:image/png;base64,${img1}";
export const FOUNDER_FULLSTACK_IMG = "data:image/png;base64,${img2}";
`;

fs.writeFileSync('./src/components/founderImages.js', content);
console.log('Created src/components/founderImages.js successfully');
