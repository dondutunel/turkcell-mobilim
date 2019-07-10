const Screen = require("sf-core/device/screen");
const touch = require("sf-extension-utils/lib/touch");

/* 
		You can modify its contents.
*/
const extend = require('js-base/core/extend');
const PgLoginDesign = require('ui/ui_pgLogin');

const LOGIN_ITEMS = {
	"email": {
		hint: "E-POSTA VEYA CEP TELEFONU NUMARANIZ"
	},
	"password": {
		hint: "ŞİFRE"
	}
};

const PgLogin = extend(PgLoginDesign)(
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
	this.lblTitle.text = "Mobil uygulamamıza hoş geldiniz,\nlütfen giriş yapınız.";
	this.svMain.layout.minHeight = Screen.height;
	this.mtEmail.options = LOGIN_ITEMS.email;
	this.mtEmail.materialTextBox.dispatch({
        type: "pushClassNames",
        classNames: ["#pgLogin-materialTextBox"]
    });
	this.mtPassword.options = LOGIN_ITEMS.password;
	this.mtPassword.materialTextBox.dispatch({
        type: "pushClassNames",
        classNames: ["#pgLogin-materialTextBox"]
    });
	touch.addPressEvent(this.btnLogin, () => {
		this.router.push("/btb/tab2/pgIslemlerim");
	});
}

module.exports = PgLogin;
