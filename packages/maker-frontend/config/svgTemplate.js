/* eslint-disable */

// 클래스 컴포넌트를 쓰는 이유 : svgr에 이슈가 있어 아이콘 생성시 React.FC<Props> 타입이 사라짐
function template({ template }, opts, { imports, componentName, props, jsx, exports }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });
  return typeScriptTpl.ast`
    ${imports}
    import { SvgIconProps } from '../Interface';\n
    export const ${componentName} = (props: SvgIconProps) => ${jsx};
  `;
}

module.exports = template;
