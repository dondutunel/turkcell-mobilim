const { showDatePicker, showListview, showPicker } = require("../lib/showHelperUiItems");
const debounce = require("../utils/debounce");

module.exports = (cntx, options) => {
	Object.keys(options).forEach(k => {
		const option = options[k];
		if (option.picker) {
			cntx[k].onDropDownClick = () => showPicker.call(cntx, k, option.mapperFn);
		}
		else
		if (option.datePicker) {
			cntx[k].onDropDownClick = () => showDatePicker.call(cntx, k);
		}
		else if (option.searchPicker) {
			const oriOnTextChanged = cntx[k].materialTextBox.onTextChanged;
			const _showListView = debounce(showListview, 300);
			cntx[k].materialTextBox.onTextChanged = (e) => {
				oriOnTextChanged && oriOnTextChanged(e);
				const text = cntx[k].materialTextBox.text;
				if (e && text && text.length >= 3) {
					_showListView(
						cntx,
						cntx[k],
						option.listServiceFn,
						text,
						option.mapperFn,
						(data) => {
							cntx[k].materialTextBox.text = option.mapperFn(data);
						}
					);
				}
			};
		}

	});
}
