const FlKonaklamaItem = require("components/FlKonaklamaItem");
const Image = require("sf-core/ui/image");
const HeaderBarItem = require("sf-core/ui/headerbaritem");
const propagateTouchEvents = require("lib/propagateTouchEvents");
const extend = require('js-base/core/extend');
const PgKonaklamaDesign = require('ui/ui_pgKonaklama');
const { getHotels } = require("../services/seyahatService");
const { wait } = require("lib/dialog");

const PgKonaklama = extend(PgKonaklamaDesign)(
	// Constructor
	function(_super) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.itemsData = {}

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
	const page = this;
}

/**
 * @event onLoad
 * This event is called once when page is created.
 * @param {function} superOnLoad super onLoad function
 */
function onLoad(superOnLoad) {
	superOnLoad();
	let itemIndex = 0;
	const page = this;
	const waitDialog = wait();
	this.lvPickerList.context = this.layout;
	const addAccomodationButton = new HeaderBarItem({
		image: Image.createFromFile("images://plus.png"),
		onPress: () => {
			let konaklamaItem = new FlKonaklamaItem();
			page.svMain.layout.removeChild(page.btnContinue);
			page.svMain.layout.addChild(konaklamaItem, `konaklamaItem${itemIndex++}`);
			page.svMain.layout.addChild(page.btnContinue);
			konaklamaItem.init();
			konaklamaItem.itemsData = page.itemsData;
			konaklamaItem.lvPickerList = page.lvPickerList;
			konaklamaItem.onDelete = () => {
				page.svMain.layout.removeChild(konaklamaItem);
				konaklamaItem.onChange();
			};
			konaklamaItem.onChange = () => {
				page.svMain.layout.applyLayout();
				page.layout.applyLayout();
			};
			konaklamaItem.onChange();
		}
	});
	page.headerBar.setItems([addAccomodationButton]);
	propagateTouchEvents(page.svMain);

	Promise.all([getHotels()]).then(res => {
		page.itemsData["mtHotel"] = res;
	}).finally(() => waitDialog.hide());
}

module.exports = PgKonaklama;