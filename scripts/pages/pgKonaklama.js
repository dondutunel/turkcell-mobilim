const Image = require("sf-core/ui/image");
const HeaderBarItem = require("sf-core/ui/headerbaritem");
/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgKonaklamaDesign = require('ui/ui_pgKonaklama');

const PgKonaklama = extend(PgKonaklamaDesign)(
	// Constructor
	function(_super) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
	}
);

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
	superOnShow();
	this.flKonaklamaItem1.init();
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
	superOnLoad();
	const page = this;
	const addAccomodationButton = new HeaderBarItem({
		image: Image.createFromFile("images://plus.png"),
		onPress: () => {
			alert("Add");
		}
	});
	page.headerBar.setItems([addAccomodationButton]);
}

module.exports = PgKonaklama;
