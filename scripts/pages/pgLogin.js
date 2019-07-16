const Screen = require("sf-core/device/screen");
const touch = require("sf-extension-utils/lib/touch");
const extend = require('js-base/core/extend');
const PgLoginDesign = require('ui/ui_pgLogin');
const propagateTouchEvents = require("lib/propagateTouchEvents");
const { login } = require("../services/userService");
const { wait } = require("lib/dialog");

const LOGIN_ITEMS = {
	"email": {
		hint: "E-POSTA VEYA CEP TELEFONU NUMARANIZ"
	},
	"password": {
		hint: "ŞİFRE",
		isPassword: true
	}
};

const MATERIAL_TEXTBOXS = [{
		name: "mtEmail",
		errorMessage: "Kullanıcı adı boş olamaz"
	},
	{
		name: "mtPassword",
		errorMessage: "Şifre boş olamaz"
	}
];

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
	this.btnLogin.enabled = false;
	this.lblTitle.text = "Mobil uygulamamıza hoş geldiniz,\nlütfen giriş yapınız.";
	this.svMain.layout.minHeight = Screen.height - 30;
	this.mtEmail.options = LOGIN_ITEMS.email;
	this.mtEmail.materialTextBox.onTextChanged = () => validateFormState(this, "mtEmail");
	this.mtEmail.materialTextBox.dispatch({
		type: "pushClassNames",
		classNames: ["#pgLogin-materialTextBox"],
	});
	this.mtPassword.options = LOGIN_ITEMS.password;
	this.mtPassword.materialTextBox.onTextChanged = () => validateFormState(this, "mtPassword");
	this.mtPassword.materialTextBox.dispatch({
		type: "pushClassNames",
		classNames: ["#pgLogin-materialTextBox"]
	});
	this.btnLogin.onPress = () => {
		if (!validateFormState(this))
			return;
		const waitDialog = wait();
		const userName = this.mtEmail.materialTextBox.text;
		const password = this.mtPassword.materialTextBox.text;
		login(userName, password)
			.then(res => {
				this.router.push("/btb/tab2/pgIslemlerim");
			})
			.catch(e => alert(e))
			.finally(() => waitDialog.hide());
	};
	propagateTouchEvents(this.svMain);
}


function validateFormState(page, mtName) {
	let isValid = true;
	MATERIAL_TEXTBOXS.forEach(item => {
		const mt = page[item.name];
		if (((mtName && mtName === item.name) || !mtName) && !mt.materialTextBox.text.trim()) {
			isValid = false;
			mt.materialTextBox.errorMessage = item.errorMessage;
		}
	});
	page.btnLogin.enabled = isValid;
	return isValid;
}

module.exports = PgLogin;
