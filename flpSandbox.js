(function() {
	"use strict";

	window["sap-ushell-config"] = {
		defaultRenderer : "fiori2",
		bootstrapPlugins: {
			"DesignTime": {
				component: "custom.ushell.plugin.designtime"
			}
		},
		renderers: {
			fiori2: {
				componentData: {
					config: {
						enableMergeAppAndShellHeaders: true,
						search: "hidden"
					}
				}
			}
		},
		applications: {
			"app-1": {
				"additionalInformation": "SAPUI5.Component=sap.ui.demoapps.rta.freestyle",
				"applicationType": "URL",
				"url": "app1/",
				"description": "Freestyle app",
				"title": "App1"
			},
			"app-2": {
				"additionalInformation": "SAPUI5.Component=sap.ui.demoapps.rta.fiorielements",
				"applicationType": "URL",
				"url": "app2/",
				"description": "Fiori Elements app",
				"title": "App2"
			}
		},
		services: {
			NavTargetResolution: {
				config: {
					"runStandaloneAppFolderWhitelist": {
						"*" : true
					},
					"allowTestUrlComponentConfig" : true,
					"enableClientSideTargetResolution": true
				}
			},
			EndUserFeedback: {
				adapter: {
					config: {
						enabled: true
					}
				}
			}
		}
	};

	window.onInit = function() {
		sap.ushell.Container.createRenderer().placeAt("content");
	};

	// var __aPrefixMatches = document.location.pathname.match(/(.*)\/test-resources\//);
	var __sPathPrefix = "https://sapui5.hana.ondemand.com";

	document.write('<script src="' + __sPathPrefix + '/test-resources/sap/ushell/bootstrap/sandbox.js" id="sap-ushell-bootstrap"><' + '/script>');
	document.write('<script src="' + __sPathPrefix + '/resources/sap-ui-core.js"' +
			' id="sap-ui-bootstrap"' +
			' data-sap-ui-theme="sap_belize"' +
			' data-sap-ui-language="en"' +
			' data-sap-ui-libs="sap.m,sap.ushell"' +
			' data-sap-ui-compatVersion="edge"' +
			' data-sap-ui-frameOptions="allow"' +
			' data-sap-ui-preload="async"' +
			' data-sap-ui-resourceroots=\'{ "custom": "./" }\' ' +
			' data-sap-ui-onInit="onInit"' + '<' + '/script>');
	document.write('<script src="' + __sPathPrefix + '/test-resources/sap/ushell/bootstrap/standalone.js"><' + '/script>');

}());
