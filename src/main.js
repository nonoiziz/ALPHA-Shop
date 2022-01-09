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
let isDarkMode = localStorage.getItem('theme') === 'dark' ? true : false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
  
    if (isDarkMode) {
      displayTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      displayTheme('light');
      localStorage.setItem('theme', 'light');
    }
}
function displayTheme(theme) {
    document.body.setAttribute('data-theme', theme);
}
function changePhase(target, phase) {
    target.setAttribute('data-phase', phase);
}
function bindClickEvent(selectorString, target, phase) {
    document.querySelector(selectorString).addEventListener('click', changePhase.bind(null, target, phase));
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);

    if (isDarkMode) {
        displayTheme('dark');
    } else {
        displayTheme('light');
    }

    const phaseMap = {
        'address': {
            'next': 2
        },
        'shipping': {
            'prev': 1,
            'next': 3
        },
        'credit-card': {
            'prev': 2,
            'next': 3
        }
    };

    const phaseAnchor = document.querySelector('section.register-container');
    for (let phase in phaseMap) {
        const phaseObject = phaseMap[phase];
        for (let action in phaseObject) {
            bindClickEvent(`section.button-group[data-phase="${phase}"] > .${action}`, phaseAnchor, phaseObject[action]);
        }
    }
});