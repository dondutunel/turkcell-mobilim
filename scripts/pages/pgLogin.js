const Screen = require("sf-core/device/screen");
const ActionKeyType = require('sf-core/ui/actionkeytype');
const touch = require("sf-extension-utils/lib/touch");
const extend = require('js-base/core/extend');
const PgLoginDesign = require('ui/ui_pgLogin');
const propagateTouchEvents = require("lib/propagateTouchEvents");
const { login } = require("../services/userService");
const { wait } = require("lib/dialog");
const genericErrorHandler = require("lib/genericErrorHandler");

const LOGIN_ITEMS = {
	"email": {
		hint: "E-POSTA"
	},
	"password": {
		hint: "ŞİFRE",
		isPassword: true
	}
};

const MATERIAL_TEXTBOXS = [{
		name: "mtEmail",
		errorMessage: "Kullanıcı adı boş olamaz",
		actionKeyType: ActionKeyType.NEXT
	},
	{
		name: "mtPassword",
		errorMessage: "Şifre boş olamaz",
		actionKeyType: ActionKeyType.GO
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
	this.imgLogo.onTouchEnded = () => {
		this.mtEmail.materialTextBox.text = "TCUERDEM";
		this.mtPassword.materialTextBox.text = "asd12345";
		validateFormState(this);
	};
	this.lblTitle.text = "Mobil uygulamamıza hoş geldiniz,\nlütfen giriş yapınız.";
	this.svMain.layout.minHeight = Screen.height - 30;
	this.svMain.layout.applyLayout();
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

		const userName = this.mtEmail.materialTextBox.text;
		const password = this.mtPassword.materialTextBox.text;
		const waitDialog = wait();
		login(userName, password)
			.then(res => {
				this.router.push("/btb/tab2/pgIslemlerim");
			})
			.catch(e => {
				if (["TCUERDEM", "alnyli07", "ozcanovunc"].indexOf(userName) !== -1)
					genericErrorHandler(e);
				else {
					alert("Kullanıcı bulunamadı");
				}
			})
			.finally(() => {
				waitDialog.hide();
			});
	};
	this.mtPassword.materialTextBox.onActionButtonPress = this.btnLogin.onPress;
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
