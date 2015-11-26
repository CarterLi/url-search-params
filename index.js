// https://github.com/WebReflection/url-search-params/tree/master/src

(function(global) {
  'use strict';

	if (!('URLSearchParams' in global)) {
		const replace = {
	    '!': '%21',
	    '\'': '%27',
	    '(': '%28',
	    ')': '%29',
	    '~': '%7E',
	    '%20': '+',
	    '%00': '\x00'
	  };
	  const replacer = function replacer(match) {
	    return replace[match];
	  };

	  const encode = function encode(str) {
	    return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, replacer);
	  };

	  const decode = function decode(str) {
	    return decodeURIComponent(str.replace(/\+/g, ' '));
	  };

		global.URLSearchParams = class URLSearchParams {
	    constructor(queryString) {
	      this.params = {};

	      if (queryString) {
	        const pairs = queryString.split('&');

	        for (let i = 0; i < pairs.length; i++) {
	          const value = pairs[i];
	          const index = value.indexOf('=');

	          if (index > -1) {
	            this.append(
	              decode(value.slice(0, index)),
	              decode(value.slice(index + 1))
	            );
	          }
	        }
	      }
	    }

	    append(name, value) {
	      value = String(value);
	      if (this.has(name)) {
	        this.params[name].push(value);
	      } else {
	        this.set(name, value);
	      }
	    }

	    delete(name) {
	      delete this.params[name];
	    }

	    get(name) {
	      return this.has(name) ? this.params[name][0] : null;
	    }

	    getAll(name) {
	      return this.has(name) ? [...this.params[name]] : [];
	    }

	    has(name) {
	      return this.params.hasOwnProperty(name);
	    }

	    set(name, value) {
	      value = String(value);
	      this.params[name] = [value];
	    }

	    toString() { // stringifier
	      const query = [];

	      for (const key in this.params) {
	        if (this.has(key)) {
	          const name = encode(key);
	          const value = this.params[key];

	          for (let i = 0; i < value.length; i++) {
	            query.push(name + '=' + encode(value[i]));
	          }
	        }
	      }

	      return query.join('&');
	    }
	  };
	}

})(typeof window != 'undefined' ? window : global);
