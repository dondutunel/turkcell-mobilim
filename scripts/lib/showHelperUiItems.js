const AlertView = require("sf-core/ui/alertview");
const DatePicker = require("sf-core/ui/datepicker");
const Picker = require("sf-core/ui/picker");

function showPicker(mt, itemMapFn, nextMt) {
	const cntx = this;
	const picker = new Picker({
		items: cntx.itemsData[mt].map(itemMapFn)
	});
	picker.show(({ index }) => {
		cntx[mt].materialTextBox.text = itemMapFn(cntx.itemsData[mt][index]);
		cntx[mt].materialTextBox.onEditEnds && cntx[mt].materialTextBox.onEditEnds();

	}, () => {});
}

function showDatePicker(mt, minDate, maxDate) {
	const cntx = this;
	const myDatePicker = new DatePicker();
	minDate && myDatePicker.setMinDate(minDate);
	maxDate && myDatePicker.setMaxDate(maxDate);

	myDatePicker.onDateSelected = (date) => {
		console.info("date: ", date);
		cntx[mt].materialTextBox.text = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
		cntx[mt].materialTextBox.rawValue = date;
		cntx[mt].materialTextBox.onEditEnds && cntx[mt].materialTextBox.onEditEnds();
	};
	myDatePicker.show();
}

function showListview(cntx, view, listServiceFn, text, dataMapperFn, cb) {
	const location = view.getScreenLocation();
	listServiceFn(text).then(res => {
		console.warn("show listview: ", text);
		res.length && cntx.lvPickerList.setOptions(location,
			res.map(dataMapperFn),
			(index) => cb(res[index]));
		cntx.lvPickerList.context.applyLayout();
	});
}

function showConfirmAlert(msg, cbOk, cbNot) {
    alert({
        message: msg || "Silme işlemini onaylıyor musunuz?",
        buttons: [{
                text: "Evet",
                type: AlertView.Android.ButtonType.POSITIVE,
                onClick: cbOk
            },
            {
                text: "Hayır",
                type: AlertView.Android.ButtonType.NEGATIVE,
                onClick: cbNot
            }
        ]
    });
}

module.exports = {
	showPicker,
	showDatePicker,
	showListview,
	showConfirmAlert
};
