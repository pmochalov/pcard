import { Pcard } from './Pcard.js';

let card = new Pcard('.card_1');

// Вывод информации по карте в json, для демонстрации
card.$button.addEventListener('click', () => {
    const $info = document.querySelector('#info');
    $info.innerText = JSON.stringify(card.getData, null, '\t');
});

