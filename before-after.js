var beforeafter = function() {
	//get stylesheets
	var ss = [],
		ssObj = {};

	for (var x = 0, y = document.styleSheets.length; x < y; x++) {
		ss[x] = document.styleSheets[x];
	}

	//get all rules from all stylesheets
	for (var i = 0, j = ss.length; i < j; i++) {
		if (ss[i].rules) {
			var allRules = [];
			for (var a = 0, b = ss[i].rules.length; a < b; a++) {
				allRules[a] = ss[i].rules[a];
			}

			ssObj["ss" + i] = allRules;
		}
	}

	//process stylesheets for :before and :after
	for (var prop in ssObj) {

		for (var c = 0, d = ssObj[prop].length; c < d; c++) {
			if (ssObj[prop][c].selectorText && ssObj[prop][c].selectorText.match(/:before/) != null) {
				var selector = ssObj[prop][c].selectorText.split(":")[0],
					span = $("<span />").addClass("before");

				if (!$(selector).find(".before").length) {
					$(selector).prepend(span);
				}
			}

			if (ssObj[prop][c].selectorText && ssObj[prop][c].selectorText.match(/:after/) != null) {
				var selector = ssObj[prop][c].selectorText.split(":")[0],
					span = $("<span />").addClass("after");

				if (!$(selector).find(".after").length) {
					$(selector).append(span);
				}
			}
		}
	}
}