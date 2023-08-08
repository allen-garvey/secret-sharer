const { v4: uuidv4} = require('uuid');

const THREE_HOURS = 1000 * 60 * 60 * 3;

const store = new Map();

/**
 * @typedef {Object} Item
 * @property {string} title
 * @property {string} content
 */

const getIdGenerator = (isProd) => isProd ? uuidv4 : () => Math.ceil(Math.random() * 1000).toString();

/**
 * @return {string}
 * @param {Item} item
 */
const setItem = (item) => {
    const idGenerator = getIdGenerator(process.env.NODE_ENV === 'production');
    let id;
    do {
        id = idGenerator();
    } while(store.has(id));

    store.set(id, item);

    setTimeout(() => {
        store.delete(id);
    }, THREE_HOURS);

    return id;
};

/**
 * @return {Item|undefined}
 * @param {string} id
 */
const getItem = (id) => store.get(id);

module.exports = {set: setItem, get: getItem};