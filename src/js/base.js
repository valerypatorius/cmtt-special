import Config from './config';
import * as Analytics from './lib/analytics';

/**
 * Base special constructor with common methods
 */
class BaseSpecial {
    constructor() {
        this.keyCodes = {
            enter: 13,
        };
        this.params = {
            container: document.body,
        };

        Object.assign(this.params, Config);

        if (Config.sendPageView) {
            Analytics.sendPageView();
        }
    }

    /**
     * Assign additional params
     *
     * @param {Object} initParams - Params object
     */
    saveParams(initParams) {
        Object.assign(this.params, initParams);
        this.container = initParams.container || this.params.container;
    }

    /**
     * Load CSS file
     *
     * @param {String} path - CSS file path
     * @returns {Promise}
     */
    loadStyles(path) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');

            link.rel = 'stylesheet';
            link.href = path;

            link.onload = () => resolve();
            link.onerror = () => reject();

            document.body.appendChild(link);
        });
    }

    /**
     * Add events listeners to container
     */
    addEventsListeners() {
        this.params.listenedEvents.forEach((eventName) => {
            this.container.addEventListener(eventName, event => this.defaultEventHandler(event, eventName));
        });
    }

    /**
     * Default event listener
     *
     * @param {Object} event - Event object
     * @param {String} eventName - Event name to listen
     */
    defaultEventHandler(event, eventName) {
        let { target } = event;
        let action = null;

        while (target.parentNode && target !== event.currentTarget) {
            action = target.dataset[eventName];

            /** Send all links clicks to analytics */
            if (eventName === 'click' && target.tagName.toLowerCase() === 'a') {
                Analytics.sendEvent(target.href);
            }

            if (action) break;
            target = target.parentNode;
        }

        action = target.dataset[eventName];

        if (action && this[action]) {
            this[action](event.target, event);
        }
    }
}

export default BaseSpecial;
