// Import npm dependencies.
var chroma = require('chroma-js'); // Version 0.6.x
// Settings.
var scaleSourceHex = '#f5414f';
var scaleVarName = 'Index Color';
var useBezierInterpolation = false;
var useLightnessCorrection = false;
// Prepare color scale.
var colors = ['#fff', scaleSourceHex, '#000'];
if (useBezierInterpolation) {
  colors = chroma.interpolate.bezier(colors);
}
var scale = chroma.scale(colors).mode('lab').correctLightness(useLightnessCorrection);
// Output source color.
console.log(scaleVarName + ': ' + scaleSourceHex + ';');
console.log('{');
// Interpolate colors, skipping the generation of white and black.
for (var i = 1, steps = 10; i < steps; i++) {
  var point = i / steps;
  // Convert point to numbering system value.
  var name = Math.round(point * 1000);
  // Generate RGB color from luminance location along scale.
  var hex = scale(point).hex();
  // Output.
  var varName = name;
  console.log('  ' + varName + ": '" + hex + "',");
}
console.log('}');
