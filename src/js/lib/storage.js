/**
 * Check if localStorage is available
 *
 * @returns {Boolean}
 */
const isAvailable = () => {
    try {
        window.localStorage.setItem('isStorageAvailable', 1);
        window.localStorage.removeItem('isStorageAvailable');

        return true;
    } catch (e) {
        return false;
    }
};

/**
 * Get item from localStorage and try to format it's value
 *
 * @param {String} key
 * @returns {*|Null}
 */
const getItem = (key) => {
    if (isAvailable()) {
        const item = window.localStorage.getItem(key);

        try {
            JSON.parse(item);
        } catch (e) {
            return item;
        }

        return JSON.parse(item);
    }

    return null;
};

/**
 * Save item in localStorage
 *
 * @param {String} key
 * @param {String} value
 */
const setItem = (key, value) => {
    value = (typeof value === 'string') ? value : JSON.stringify(value);

    if (isAvailable()) {
        window.localStorage.setItem(key, value);
    }
};

/**
 * Remove item from localStorage
 *
 * @param {String} key
 */
const removeItem = (key) => {
    if (isAvailable()) {
        window.localStorage.removeItem(key);
    }
};

export default {
    getItem,
    setItem,
    removeItem,
};
