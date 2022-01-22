// ==UserScript==
// @name	TamperMonkey Instagram Dark Theme
// @namespace	https://github.com/mrnasil/TamperMonkey-Instagram-Dark-Theme
// @description	TamperMonkey Instagram Dark Theme is an userscript which aims to change the theme of the Instagram.com website, and make it a dark theme when the system is in dark mode.
// @version	1.0
// @encoding utf-8
// @license	https://creativecommons.org/licenses/by-sa/4.0/
// @updateURL	https://raw.githubusercontent.com/mrnasil/TamperMonkey-Instagram-Dark-Theme/main/TamperMonkey-Instagram-Dark-Theme.js
// @downloadURL	https://raw.githubusercontent.com/mrnasil/TamperMonkey-Instagram-Dark-Theme/main/TamperMonkey-Instagram-Dark-Theme.js
// @supportURL	https://github.com/mrnasil/TamperMonkey-Instagram-Dark-Theme
// @author	mrnasil
// @copyright	2022, mrnasil (https://openuserjs.org/users/mrnasil)
// @match	https://www.instagram.com/*
// @match	*chrome-extension://eohmfcckophobpbeoncnmkeiellfclka/*
// @icon	https://raw.githubusercontent.com/mrnasil/TamperMonkey-Instagram-Dark-Theme/main/instagram-icon.png
// @grant	none
// @run-at	document-start
// @include http://*/*
// @include https://*/*
// ==/UserScript==
/*
=======================================================
Script
======================================================*/

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