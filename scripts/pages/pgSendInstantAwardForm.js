/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgSendInstantAwardFormDesign = require('ui/ui_pgSendInstantAwardForm');
const { getCombinedStyle } = require("sf-extension-utils/lib/getCombinedStyle");
const { sendAward } = require("../services/awardService");
const { wait } = require("lib/dialog");

const MAX_DESC_LENGTH = 150;
const materialColor = getCombinedStyle(".materialTextBox");

const PgSendInstantAwardForm = extend(PgSendInstantAwardFormDesign)(
	// Constructor
	function(_super, props, match, routeData) {
		// Initalizes super class for this page scope
		_super(this);
		// Overrides super.onShow method
		this.onShow = onShow.bind(this, this.onShow.bind(this));
		// Overrides super.onLoad method
		this.onLoad = onLoad.bind(this, this.onLoad.bind(this));
		this.routeData = routeData;
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
	this.tbName.hint = "Hediye Gönderilecek Kişi";
	this.taMessage.text = "";
	this.taMessage.onTextChanged = (e) => {
		const text = this.taMessage.text || "";
		const subText = text.substr(0, MAX_DESC_LENGTH);
		if (subText !== text) {
			this.taMessage.text = subText;
		}
		this.lblRemainLength.text = "" + (MAX_DESC_LENGTH - subText.length);
		this.lblRemainLength.textColor = materialColor.lineColor[text ? "selected" : "normal"];
	};
	setData.call(this, this.routeData);
	this.btnContinue.onPress = () => {
		const waitDialog = wait();
		sendAward(this.tbName.text, this.routeData.Kod)
			.then(res => {
				alert("Ödülünüz başarıyla gönderilmiştir.");
				this.router.goBacktoHome();
			}).finally(() => waitDialog.hide());
	};
}


function setData(data) {
	if (data.icon) {
		data.icon.indexOf("http") !== -1 ?
			this.imgIcon.loadFromUrl(data.icon) :
			this.imgIcon.dispatch({
				type: "updateUserStyle",
				userStyle: { image: data.icon, visible: true }
			});
	}
	data.Aciklama && (this.lblTitle.text = data.Aciklama);
}

module.exports = PgSendInstantAwardForm;
