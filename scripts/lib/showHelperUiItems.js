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

function showDatePicker(mt) {
	const cntx = this;
	const myDatePicker = new DatePicker();
	myDatePicker.onDateSelected = (date) => {
		console.info("date: ", date);
		cntx[mt].materialTextBox.text = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
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
module.exports = {
	showPicker,
	showDatePicker,
	showListview
};