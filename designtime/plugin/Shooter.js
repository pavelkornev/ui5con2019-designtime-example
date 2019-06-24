/*!
 * ${copyright}
 */

sap.ui.define([
	"sap/ui/dt/Plugin"
],
function(Plugin) {
	"use strict";


	var Shooter = Plugin.extend("custom.designtime.plugin.Shooter", {});

	Shooter.prototype.registerElementOverlay = function (oOverlay) {
		oOverlay.attachBrowserEvent('dblclick', this._onClick, oOverlay);
	};

	Shooter.prototype.deregisterElementOverlay = function (oOverlay) {
		oOverlay.detachBrowserEvent('dblclick', this._onClick, oOverlay);
	};

	Shooter.prototype._onClick = function (oEvent) {
		this.setSelected(false);
		this.addStyleClass("sapUiDtOverlayPoof");
		setTimeout(function () {
			this.getElement().setVisible(false);
		}.bind(this), 250);

		oEvent.stopPropagation();
	};

	return Shooter;
}, /* bExport= */ true);