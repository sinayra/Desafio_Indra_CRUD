(function(exports){

	exports.isEmpty = function (obj) {

	    // null and undefined are "empty"
	    if (obj == null) return true;

	    // Assume if it has a length property with a non-zero value
	    // that that property is correct.
	    if (obj.length > 0)    return false;
	    if (obj.length === 0)  return true;

	    // If it isn't an object at this point
	    // it is empty, but it can't be anything *but* empty
	    // Is it empty?  Depends on your application.
	    if (typeof obj !== "object") return true;

	    // Otherwise, does it have any properties of its own?
	    // Note that this doesn't handle
	    // toString and valueOf enumeration bugs in IE < 9
	    for (var key in obj) {
	        if (hasOwnProperty.call(obj, key)) return false;
	    }

	    return true;
	}

	exports.replaceAll = function (target, search, replacement) {
		console.log(target.replace(new RegExp(search, 'g'), replacement));
	}
}(typeof exports === 'undefined' ? this.share = {} : exports));

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

String.prototype.parseDate = function () {
  var parts = this.split('/');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}