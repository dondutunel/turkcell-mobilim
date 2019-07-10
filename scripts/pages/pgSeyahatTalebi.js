const Screen = require("sf-core/device/screen");
const Color = require("sf-core/ui/color");
const HeaderBarItem = require("sf-core/ui/headerbaritem");
const Image = require("sf-core/ui/image");
const System = require("sf-core/device/system");
/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgSeyahatTalebiDesign = require('ui/ui_pgSeyahatTalebi');

const PgSeyahatTalebi = extend(PgSeyahatTalebiDesign)(
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
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
	superOnLoad();
	let headerBar;
	if (System.OS === "Android") {
		headerBar = this.headerBar;
		headerBar.setLeftItem(new HeaderBarItem({
			onPress: () => {
				this.router.goBack();
			},
			image: Image.createFromFile("images://arrow_back.png")
		}));
	}
	else {
		headerBar = this.parentController.headerBar;
	}
	headerBar.itemColor = Color.WHITE;
	this.svMain.layout.minHeight = Screen.height;
	this.mtRegion.options = {
		hint: "Yurt ici - Yurt Disi"
	};
	this.mtRegion.enableDropDown = true;
	this.mtPurpose.options = {
		hint: "Temsil"
	};
	this.mtPurpose.enableDropDown = true;
}

module.exports = PgSeyahatTalebi;
