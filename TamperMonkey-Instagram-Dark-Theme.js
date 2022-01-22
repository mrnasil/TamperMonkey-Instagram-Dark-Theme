// ==UserScript==
// @name		TamperMonkey Instagram Dark Theme
// @description		TamperMonkey Instagram Dark Theme is an userscript which aims to change the theme of the Instagram.com website, and make it a dark theme when the system is in dark mode.
// @version		1.0
// @license     MIT
// @namespace		https://gist.github.com/mrnasil/b13edf3c43a96963525a33934634c1e7
// @updateURL		https://gist.githubusercontent.com/mrnasil/b13edf3c43a96963525a33934634c1e7/raw/TamperMonkey-Instagram-Dark-Theme.js
// @downloadURL		https://gist.githubusercontent.com/mrnasil/b13edf3c43a96963525a33934634c1e7/raw/TamperMonkey-Instagram-Dark-Theme.js
// @supportURL		https://gist.github.com/mrnasil
// @author		mrnasil
// @match		https://www.instagram.com/*
// @match           	*chrome-extension://eohmfcckophobpbeoncnmkeiellfclka/*
// @icon		data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant		none
// @run-at		document-start
// ==/UserScript==

(function () {
	"use strict";
	const current = window.matchMedia("(prefers-color-scheme: dark)").matches;
	function setColorScheme(st) {
		const qs = new URLSearchParams(document.location.search);
		if (
			(st && qs.get("theme") != "dark") ||
			(!st && qs.get("theme") == "dark") ||
			current != st
		) {
			console.log("change theme");
			if (st && qs.get("theme") != "dark") qs.set("theme", "dark");
			else qs.delete("theme");
			const dl = document.location;
			document.location = `${dl.origin}${dl.pathname}${
				qs.toString().length > 0 ? "?" : ""
			}${qs.toString()}`;
		}
	}
	setColorScheme(current);
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (e) => {
			setColorScheme(e.matches);
		});
})();