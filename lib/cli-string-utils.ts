'use strict';

const STRING_DASHERIZE_REGEXP = (/[ _]/g);
const STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);
const STRING_CAMELIZE_REGEXP = (/(\-|_|\.|\s)+(.)?/g);
const STRING_UNDERSCORE_REGEXP_1 = (/([a-z\d])([A-Z]+)/g);
const STRING_UNDERSCORE_REGEXP_2 = (/\-|\s+/g);

/**
 * Converts a camelized string into all lower case separated by underscores.
 * decamelize('innerHTML');         // 'inner_html'
 * decamelize('action_name');       // 'action_name'
 * decamelize('css-class-name');    // 'css-class-name'
 * decamelize('my favorite items'); // 'my favorite items'
 * @param str The string to decamelize.
 * @return {String} the decamelized string.
 */
export function decamelize(str: string): string {
	return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
}

/**
 * Replaces underscores, spaces, or camelCase with dashes.
 * dasherize('innerHTML');         // 'inner-html'
 * dasherize('action_name');       // 'action-name'
 * dasherize('css-class-name');    // 'css-class-name'
 * dasherize('my favorite items'); // 'my-favorite-items'
 * @param {String} str The string to dasherize.
 * @return {String} the dasherized string.
 */
export function dasherize(str: string): string {
	return decamelize(str).replace(STRING_DASHERIZE_REGEXP, '-');
}

/**
 * Returns the lowerCamelCase form of a string.
 * camelize('innerHTML');          // 'innerHTML'
 * camelize('action_name');        // 'actionName'
 * camelize('css-class-name');     // 'cssClassName'
 * camelize('my favorite items');  // 'myFavoriteItems'
 * camelize('My Favorite Items');  // 'myFavoriteItems'
 * @param {String} str The string to camelize.
 * @return {String} the camelized string.
 */
export function camelize(str: string): string {
	return str.replace(STRING_CAMELIZE_REGEXP, function(match, separator, chr) {
		return chr ? chr.toUpperCase() : '';
	}).replace(/^([A-Z])/, function(match) {
		return match.toLowerCase();
	});
}

/**
 * Returns the UpperCamelCase form of a string.
 * 'innerHTML'.classify();          // 'InnerHTML'
 * 'action_name'.classify();        // 'ActionName'
 * 'css-class-name'.classify();     // 'CssClassName'
 * 'my favorite items'.classify();  // 'MyFavoriteItems'
 * @param {String} str the string to classify
 * @return {String} the classified string
 */
export function classify(str: string): string {
	let parts = str.split('.'),
			out = [];

	for (let i = 0, l = parts.length; i < l; i++) {
		let camelized = camelize(parts[i]);
		out.push(camelized.charAt(0).toUpperCase() + camelized.substr(1));
	}

	return out.join('.');
}

/**
 * More general than decamelize. Returns the lower\_case\_and\_underscored form of a string.
 * 'innerHTML'.underscore();          // 'inner_html'
 * 'action_name'.underscore();        // 'action_name'
 * 'css-class-name'.underscore();     // 'css_class_name'
 * 'my favorite items'.underscore();  // 'my_favorite_items'
 * @param {String} str The string to underscore.
 * @return {String} the underscored string.
 */
export function underscore(str: string): string {
	return str.replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2').
		replace(STRING_UNDERSCORE_REGEXP_2, '_').toLowerCase();
}

/**
 * Returns the Capitalized form of a string
 * 'innerHTML'.capitalize()         // 'InnerHTML'
 * 'action_name'.capitalize()       // 'Action_name'
 * 'css-class-name'.capitalize()    // 'Css-class-name'
 * 'my favorite items'.capitalize() // 'My favorite items'
 * @param {String} str The string to capitalize.
 * @return {String} The capitalized string.
 */
export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.substr(1);
}
