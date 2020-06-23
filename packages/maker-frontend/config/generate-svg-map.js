const fs = require('fs');
const path = require('path');

/**
 * absolute paths
 */
const PACKAGE = path.join(__dirname, '..');
const ICON = path.join(PACKAGE, 'src/ui/Components/Icons');
const GENERATED = path.join(ICON, 'Generated');

function pascalToKebabCase(pascalCaseString) {
  return pascalCaseString
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

const generatedFileNames = fs.readdirSync(GENERATED);
const componentIconNames = [];
generatedFileNames
  .filter((fileName) => fileName.includes('.tsx') && !fileName.includes('index'))
  .forEach((fileName) => {
    const iconName = fileName.slice(0, -4);
    const componentName = `Svg${iconName}`;
    componentIconNames.push({ iconName, componentName });
  });

const importSection = `import {
  ${componentIconNames.map((componentIconName) => componentIconName.componentName).join(',\n  ')} 
  } from './Generated';`;

let exportSection = `

export const svgMap = {
`;

exportSection += componentIconNames
  .map(({ iconName, componentName }) => `  '${pascalToKebabCase(iconName)}': ${componentName},`)
  .join('\n');

exportSection += `
};

export type IconName = keyof typeof svgMap;
`;

fs.writeFileSync(path.join(ICON, 'SvgMap.ts'), [importSection, exportSection].join(''));
