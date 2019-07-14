const extend = require('js-base/core/extend');
const ListViewItem1Design = require('library/ListViewItem1');

const ListViewItem1 = extend(ListViewItem1Design)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;
	}
);

module.exports = ListViewItem1;
