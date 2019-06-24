(function() {
	"use strict";

	var bEnableFiori3 = true;
	try {
		var sThemeParameter = new URL(window.location.href).searchParams.get("sap-ui-theme");
		if (sThemeParameter && sThemeParameter !== "sap_fiori_3") {
			bEnableFiori3 = false;
		}
	} catch (e) {
		// IE11
		var sQuery = window.location.search.substring(1);
		var aQueries = sQuery.split("&");
		var oQuery;
		aQueries.some(function(sQuery) {
			oQuery = sQuery.split("=");
			if (oQuery[0] === "sap-ui-theme") {
				bEnableFiori3 = oQuery[1] === "sap_fiori_3";
				return true;
			}
		});
	}

	window["sap-ushell-config"] = {
		ushell: {
			shell: {
				enableFiori3: bEnableFiori3
			}
		},
		defaultRenderer : "fiori2",
		bootstrapPlugins: {
			"DesignTime": {
				component: "sap.ui.demoapps.rta.freestyle.ushell.plugin.designtime"
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
			"masterDetail-display": {
				"additionalInformation": "SAPUI5.Component=sap.ui.demoapps.rta.freestyle",
				"applicationType": "URL",
				"url": "../",
				"description": "UI Adaptation at Runtime",
				"title": "Products Manage"
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
			' data-sap-ui-libs="sap.m,sap.ushell,sap.ui.rta"' +
			' data-sap-ui-compatVersion="edge"' +
			' data-sap-ui-frameOptions="allow"' +
			' data-sap-ui-preload="async"' +
			' data-sap-ui-onInit="onInit"' + '<' + '/script>');
	document.write('<script src="' + __sPathPrefix + '/test-resources/sap/ushell/bootstrap/standalone.js"><' + '/script>');

}());
