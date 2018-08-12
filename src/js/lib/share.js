import Likely from 'cmtt-likely';

import { makeElement } from './dom';
import * as Analytics from './analytics';

const CSS = {
    likely: 'likely',
    likelyCustom: 'likely--custom',
};

const init = () => {
    Likely.initate();
};

/**
 * Make likely buttons and append to specified element
 *
 * @param {Element} parentContainer - likely container will be placed here
 * @param {Object} set - object with optional params (title, url, twitter)
 */
const make = (parentContainer, set = {}) => {
    const likelyContainer = makeElement('div', [CSS.likely, CSS.likelyCustom]);
    const socials = ['facebook', 'vkontakte', 'twitter'];

    socials.forEach((social, i) => {
        const button = makeElement('div', social);

        if (i === 0) button.innerHTML = 'Поделиться';

        button.addEventListener('click', () => {
            Analytics.sendEvent(`Share ${social}`);
        });

        likelyContainer.appendChild(button);
    });

    parentContainer.appendChild(likelyContainer);

    if (set.url) likelyContainer.dataset.url = set.url;
    if (set.twitter) likelyContainer.dataset.twitter = set.twitter;
    if (set.title) likelyContainer.dataset.title = set.title;

    init();
};

export default {
    init,
    make,
};
