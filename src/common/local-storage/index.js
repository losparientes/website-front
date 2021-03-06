function getStorage() {
    const storage = global.localStorage;

    if (storage === undefined) {
        throw new Error('Local storage do not supported');
    }
    return storage;
}

function serialize(value) {
    return JSON.stringify(value);
}

function deserialize(value) {
    if (typeof value !== 'string') {
        return undefined;
    }
    try {
        return JSON.parse(value);
    } catch (e) {
        return value || undefined;
    }
}

export function remove(key) {
    getStorage().removeItem(key);
}

export function set(key, value) {
    if (value === undefined) {
        return remove(key);
    }
    getStorage().setItem(key, serialize(value));
    return value;
}

export function get(key, defaultVal) {
    const val = deserialize(getStorage().getItem(key));
    return (val === undefined ? defaultVal : val);
}

export function has(key) {
    return get(key) !== undefined;
}

export function clear() {
    getStorage().clear();
}
