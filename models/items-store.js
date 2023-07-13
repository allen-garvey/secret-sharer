const { v4: uuidv4} = require('uuid');

const THREE_HOURS = 1000 * 60 * 60 * 3;

const store = new Map();

const setItem = (item) => {
    let id;
    do {
        id = uuidv4();
    } while(store.has(id));

    store.set(id, item);

    setTimeout(() => {
        store.delete(id);
    }, THREE_HOURS);

    return id;
};

const getItem = (id) => store.get(id);

module.exports = {set: setItem, get: getItem};