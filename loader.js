"use strict";
/**
 * @public
 * @typedef Attributes
 * @type {{[name: string]: string | boolean}}
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @typedef BodylessMethod
 * @type {(url: string) => Promise<HTMLElement>}
 */
/**
 * @typedef BodylessParentMethod
 * @type {(url: string, parent?: HTMLElement) => Promise<HTMLElement>}
 */
/**
 * @typedef Cache
 * @type {{[attrsStr: string]: HTMLElement }}
 */
/** */
exports.default = (function () {
    /** @private @type {Cache} */
    var cache = {};
    /** @public @type {BodylessMethod} */
    loadx.js = function (url) { return loadx('script', document.body, { src: url }); };
    /** @public @type {BodylessMethod} */
    loadx.css = function (url) { return loadx('link', document.head, { type: 'text/css', rel: 'stylesheet', href: url }); };
    /** @public @type {BodylessParentMethod} */
    loadx.img = function (url, parent) { return loadx('img', getParent(parent), { src: url }); };
    /**
     * Load different file types
     * @public
     * @param {string} tag
     * @param {HTMLElement | null} parent
     * @param {Attributes} attrs
     * @returns {Promise<HTMLElement>}
     */
    function loadx(tag, parent, attrs) {
        return new Promise(function (resolve, reject) {
            if (parent === null || !(parent instanceof HTMLElement)) {
                return reject(new Error('Parent not found.'));
            }
            var cachedResult = getCachedResult(attrs);
            if (cachedResult !== null) {
                return resolve(cachedResult);
            }
            var element = document.createElement(tag);
            element.onload = function () {
                resolve(element);
                setCacheResult(attrs, element);
            };
            element.onerror = function (oError) {
                // @ts-ignore
                reject(new URIError('The asset ' + oError.target.src + " didn't load correctly."));
            };
            Object.keys(attrs).forEach(function (key) {
                element[key] = attrs[key];
            });
            parent.appendChild(element);
        });
    }
    /**
     * Get cached result
     * @private
     * @param {Attributes} attrs
     * @returns {HTMLElement | null}
     */
    function getCachedResult(attrs) {
        var attrsStr = JSON.stringify(attrs);
        var cacheValue = cache[attrsStr];
        if (typeof cacheValue !== 'undefined') {
            return cacheValue;
        }
        return null;
    }
    /**
     * Set cache result
     * @private
     * @param {Attributes} attrs
     * @param {HTMLElement} element
     * @returns {void}
     */
    function setCacheResult(attrs, element) {
        var attrsStr = JSON.stringify(attrs);
        cache[attrsStr] = element;
    }
    /**
     * Get parent container
     * @private
     * @param {HTMLElement | undefined} parent
     * @returns {HTMLElement | null}
     */
    function getParent(parent) {
        if (parent === undefined) {
            return document.body;
        }
        return parent;
    }
    return loadx;
})();
