const GifImage = require("sf-core/ui/gifimage");
const GifImageView = require("sf-core/ui/gifimageview");
const ImageView = require("sf-core/ui/imageview");
const extend = require('js-base/core/extend');
const FlWaitMainDesign = require('library/FlWaitMain');

const FlWaitMain = extend(FlWaitMainDesign)(
	// Constructor
	function(_super, props = {}, pageName) {
		// Initalizes super class for this scope
		_super(this, props);
		this.pageName = pageName;

		var loaderGif = new GifImageView({
			gifImage: GifImage.createFromFile("assets://emocan.gif"),
			width: 60,
			height: 60,
			imageFillType: ImageView.FillType.ASPECTFIT
		});
		this.addChild(loaderGif);
	}
);

module.exports = FlWaitMain;