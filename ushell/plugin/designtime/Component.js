// ${copyright}
/*global jQuery, sap, window, Promise */

sap.ui.define([
	"sap/ushell/plugins/BaseRTAPlugin",
	"sap/m/MessageBox",
	"sap/ui/fl/Utils",
	"sap/ui/fl/EventHistory",
	"sap/ui/core/Component"
], function (
	BaseRTAPlugin,
	MessageBox,
	FlexUtils,
	EventHistory,
	Component
) {
	"use strict";

	var RTAPlugin = Component.extend("custom.ushell.plugin.designtime.Component", {
		sType: "rta-personalize",

		metadata: {
			manifest: "json"
		},

		init: function () {
			this.mConfig = {
				sComponentName: "custom.ushell.plugin.designtime",
				layer: "USER",
				developerMode: false,
				id: "DesignTime-Button",
				text: "Shoot them up!",
				icon: "sap-icon://BusinessSuiteInAppSymbols/icon-face-devastated",
				// sap-icon://crossed-line-chart
				visible: false
			};

			var oContainer = this._getContainer();
			var oAppLifeCycleService = oContainer.getService("AppLifeCycle");

			oAppLifeCycleService.attachAppLoaded(this._onAppLoaded, this);

			this._getRenderer(oContainer).fail(function (sErrorMessage) {
				Log.error(sErrorMessage, undefined, this.mConfig.sComponentName);
			}.bind(this))
			.done(function (oRenderer) {
				//Button will only be added once even when more instances of this component are created
				oRenderer.addActionButton("sap.ushell.ui.launchpad.ActionItem", {
					id: this.mConfig.id,
					text: this.mConfig.text,
					icon: this.mConfig.icon,
					press: this._onStart.bind(this),
					visible: this._checkUI5App()
				}, true, false, [oRenderer.LaunchpadState.App]);
			}.bind(this));
		},

		/**
		 * Check if we are in a SAPUI5 application
		 * @param {object} oCurrentApplication object with information about the current application
		 * @private
		 * @returns {Boolean} if we are in a SAPUI5 application
		 */
		_checkUI5App: function () {
			var oCurrentApplication = this._getCurrentRunningApplication();
			var bUI5App = oCurrentApplication && oCurrentApplication.applicationType === "UI5";
			return bUI5App;
		},

		/**
		 * Gets the current root application
		 * @private
		 * @returns {object} Returns the currently running application
		 */
		_getCurrentRunningApplication: function () {
			var oAppLifeCycleService = this._getContainer().getService("AppLifeCycle");
			var oApp = oAppLifeCycleService.getCurrentApplication();

			return oApp;
		},

		_adaptButtonVisibility: function (vControl, bVisible) {
			if (typeof vControl === "string") {
				vControl = sap.ui.getCore().byId(vControl);
			}

			if (!vControl) {
				return;
			}
			vControl.setVisible(bVisible);
		},

		_onAppLoaded: function () {
			if (this._checkUI5App()) {
				this._adaptButtonVisibility(this.mConfig.id, true);
			} else {
				this._adaptButtonVisibility(this.mConfig.id, false);
			}
		},

		/**
		 * Returns the shell renderer instance in a reliable way,
		 * i.e. independent from the initialization time of the plug-in.
		 * This means that the current renderer is returned immediately, if it
		 * is already created (plug-in is loaded after renderer creation) or it
		 * listens to the &quot;rendererCreated&quot; event (plug-in is loaded
		 * before the renderer is created).
		 *
		 *  @returns {object}
		 *      a jQuery promise, resolved with the renderer instance, or
		 *      rejected with an error message.
		 */
		_getRenderer: function (oContainer) {
			var oDeferred = new jQuery.Deferred();
			var oRenderer;

			oRenderer = oContainer.getRenderer();
			if (oRenderer) {
				oDeferred.resolve(oRenderer);
			} else {
				// renderer not initialized yet, listen to rendererCreated event
				this._onRendererCreated = function (oEvent) {
					oRenderer = oEvent.getParameter("renderer");
					if (oRenderer) {
						oDeferred.resolve(oRenderer);
					} else {
						oDeferred.reject("Illegal state: shell renderer not available after recieving 'rendererCreated' event.");
					}
				};
				oContainer.attachRendererCreatedEvent(this._onRendererCreated, this);
			}
			return oDeferred.promise();
		},

		_getContainer: function () {
			var oContainer = jQuery.sap.getObject("sap.ushell.Container");
			if (!oContainer) {
				throw new Error("Illegal state: shell container not available; this component must be executed in a unified shell runtime context.");
			}
			return oContainer;
		},

		exit: function () {
			var oContainer = this._getContainer();
			oContainer.getService("AppLifeCycle").detachAppLoaded(this._onAppLoaded, this);
			if (this._onRendererCreated) {
				oContainer.detachRendererCreatedEvent(this._onRendererCreated, this);
			}
		},

		/**
		 * Event handler for the "Adapt" button of the RTA FLP Plugin
		 * Checks the supported browsers and starts the RTA
		 * @private
		 */
		_onStart: function () {
			var oCurrentRunningApp = this._getCurrentRunningApplication();
			var oRootControl = oCurrentRunningApp.componentInstance;

			// sap.ui.getCore().getEventBus().subscribe("sap.ushell.renderers.fiori2.Renderer", "appClosed", this._onAppClosed, this);

			sap.ui.getCore().loadLibraries(["sap.ui.dt"], { async: true }).then(function () {
				sap.ui.require([
					"sap/ui/dt/DesignTime",
					"sap/ui/dt/plugin/MouseSelection",
					"sap/ui/dt/plugin/ControlDragDrop",
					"custom/designtime/plugin/Shooter"
				], function (
					DesignTime,
					MouseSelection,
					ControlDragDrop,
					Shooter
				) {
					this._oDesignTime = new DesignTime({
						rootElements: oRootControl,
						plugins: [
							new MouseSelection(),
							new ControlDragDrop(),
							new Shooter()
						]
					});
				}.bind(this));
			}.bind(this));
		},

	});

	return RTAPlugin;

}, true /* bExport */);