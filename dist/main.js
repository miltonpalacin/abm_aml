/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/electron-is-dev/index.js":
/*!***********************************************!*\
  !*** ./node_modules/electron-is-dev/index.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst electron = __webpack_require__(/*! electron */ \"electron\");\n\nif (typeof electron === 'string') {\n\tthrow new TypeError('Not running in an Electron environment!');\n}\n\nconst isEnvSet = 'ELECTRON_IS_DEV' in process.env;\nconst getFromEnv = Number.parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;\n\nmodule.exports = isEnvSet ? getFromEnv : !electron.app.isPackaged;\n\n\n//# sourceURL=webpack://abm_aml/./node_modules/electron-is-dev/index.js?");

/***/ }),

/***/ "./src/app/main/main.ts":
/*!******************************!*\
  !*** ./src/app/main/main.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar electron_1 = __webpack_require__(/*! electron */ \"electron\");\nvar electron_is_dev_1 = __importDefault(__webpack_require__(/*! electron-is-dev */ \"./node_modules/electron-is-dev/index.js\"));\n//console.log(__dirname);\nvar createWindow = function () {\n    var win = new electron_1.BrowserWindow({\n        width: 800,\n        height: 600,\n        webPreferences: {\n            nodeIntegration: true,\n            contextIsolation: false,\n            enableRemoteModule: true\n        }\n    });\n    win.loadURL(electron_is_dev_1.default\n        ? 'http://localhost:9000'\n        : \"file://\" + electron_1.app.getAppPath() + \"/index.html\");\n};\n//console.log(\"ANTES.... \" +Log.getFileName());\n// Log.silly(\"milton\");\n// Log.info(\"tree\");\n// const obj = { a: \"1\", b: \"2\", c: true, d: -1, date: new Date() };\n// obj.date = new Date();\n// Log.info(\"treeddd\", obj);\n// //console.log(Log.getFileName());\n// try {\n//     const I = 0;\n//     const II = 100 / I;\n//     const x = new Error(\"nnnnnn\");\n//     throw x;\n// } catch (error) {\n//     Log.fatal(error);\n// }\n// let logs = Log.getNewLogsCache();\n// logs.forEach(e => {\n//     console.log(\"OONE_\" + e.order + \"._.\" + e.message);\n// });\n// logs = Log.getNewLogsCache();\n// logs.forEach(e => {\n//     console.log(\"TTWO_\" + e.order + \"._.\" + e.message);\n// });\nelectron_1.app.on('ready', createWindow);\n\n\n//# sourceURL=webpack://abm_aml/./src/app/main/main.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app/main/main.ts");
/******/ 	
/******/ })()
;