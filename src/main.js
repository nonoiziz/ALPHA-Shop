import './style/main.scss';

// reference: https://community.wia.io/d/6-generating-an-svg-sprite-sheet-with-webpack
function importAllIcons(r) {
    r.keys().forEach(r);
}
importAllIcons(require.context('../public/icons/', true, /\.svg$/));

fetch('./dist/icons.svg').then(res => {
  return res.text();
}).then(data => {
  document.getElementById('svg-icons-container').innerHTML = data;
});