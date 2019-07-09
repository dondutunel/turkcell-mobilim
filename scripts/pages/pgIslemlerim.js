const extend = require("js-base/core/extend");
const Page2Design = require('ui/ui_pgIslemlerim');

const profileGravatar = "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?r=pg"
const Page2 = extend(Page2Design)(
	// Constructor
	function(_super, routeData, router) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
	});

/**
 * @event onShow
 * This event is called when a page appears on the screen (everytime).
 * @param {function} superOnShow super onShow function
 * @param {Object} parameters passed from Router.go function
 */
function onShow(superOnShow) {
	superOnShow();
	console.log("pgIslemlerim");
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
	superOnLoad();
	this.headerBar.leftItemEnabled = false;
	this.flUserHeaderBar.imgUser.loadFromUrl({
		url: profileGravatar,
		onSuccess: () => {
			this.flUserHeaderBar.imgUser.image.android.round(12);
		}
	});
}

module.exports = Page2;
