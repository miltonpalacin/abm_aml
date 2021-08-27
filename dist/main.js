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

/***/ "./src/app/abm/odd/UtilityRandom.ts":
/*!******************************************!*\
  !*** ./src/app/abm/odd/UtilityRandom.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.UtilityRandom = void 0;\nvar crypto_1 = __importDefault(__webpack_require__(/*! crypto */ \"crypto\"));\nvar UtilityRandom = /** @class */ (function () {\n    function UtilityRandom() {\n    }\n    UtilityRandom.randomOfKeyValue = function (array) {\n        var idx = this.randomRange(0, array.getLength() - 1);\n        return array.getByIndex(idx);\n    };\n    UtilityRandom.randomRange = function (min, max, numDec) {\n        if (numDec) {\n            var factor = Math.pow(10, numDec);\n            if (min === max)\n                return Math.round(min * factor) / factor;\n            return crypto_1.default.randomInt(Math.ceil(min * factor), Math.floor(max * factor)) / factor;\n        }\n        else {\n            if (min === max)\n                return min;\n            return crypto_1.default.randomInt(Math.ceil(min), Math.floor(max));\n        }\n    };\n    UtilityRandom.randomRangeMM = function (minmax, numDec) {\n        if (minmax.start === minmax.end)\n            return minmax.start;\n        if (numDec) {\n            var factor = Math.pow(10, numDec);\n            return crypto_1.default.randomInt(Math.ceil(minmax.start * factor), Math.floor(minmax.end * factor)) / factor;\n        }\n        else\n            return crypto_1.default.randomInt(Math.ceil(minmax.start), Math.floor(minmax.end));\n    };\n    UtilityRandom.randomExp = function (mean, value, factor) {\n        if (factor === void 0) { factor = 100; }\n        var x = crypto_1.default.randomInt(0 * factor, 1 * factor) / factor;\n        return value * (1 - Math.exp(-1 * x * (1 / mean)));\n    };\n    UtilityRandom.roulettePerOne = function (percentage) {\n        var point = this.randomRange(1, 100);\n        return point >= 0 && point < percentage;\n    };\n    UtilityRandom.roundDec = function (num, numDec) {\n        var factor = Math.pow(10, numDec);\n        return Math.round((num + Number.EPSILON) * factor) / factor;\n    };\n    return UtilityRandom;\n}());\nexports.UtilityRandom = UtilityRandom;\n\n\n//# sourceURL=webpack://abm_aml/./src/app/abm/odd/UtilityRandom.ts?");

/***/ }),

/***/ "./src/app/main/main.ts":
/*!******************************!*\
  !*** ./src/app/main/main.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar electron_1 = __webpack_require__(/*! electron */ \"electron\");\nvar electron_is_dev_1 = __importDefault(__webpack_require__(/*! electron-is-dev */ \"./node_modules/electron-is-dev/index.js\"));\nvar UtilityRandom_1 = __webpack_require__(/*! ../abm/odd/UtilityRandom */ \"./src/app/abm/odd/UtilityRandom.ts\");\nvar createWindow = function () {\n    var win = new electron_1.BrowserWindow({\n        width: 800,\n        height: 600,\n        webPreferences: {\n            nodeIntegration: true,\n            contextIsolation: false,\n            enableRemoteModule: true\n        }\n    });\n    win.loadURL(electron_is_dev_1.default\n        ? 'http://localhost:9000'\n        : \"file://\" + electron_1.app.getAppPath() + \"/index.html\");\n};\nconsole.log(\"A) \" + 0.78665.toFixed(3));\nconsole.log(\"B) \" + UtilityRandom_1.UtilityRandom.roundDec(0.786625, 3));\nconsole.log(\"C) \" + UtilityRandom_1.UtilityRandom.randomRange(0.78225, 1, 3));\nconsole.log(\"C) \" + UtilityRandom_1.UtilityRandom.randomRange(0.78225, 1, 3));\nconsole.log(\"C) \" + UtilityRandom_1.UtilityRandom.randomRange(0.78225, 1, 3));\nconsole.log(\"C) \" + UtilityRandom_1.UtilityRandom.randomRange(0.78225, 1, 3));\nconsole.log(\"C) \" + UtilityRandom_1.UtilityRandom.randomRange(0.78225, 1, 3));\nconsole.log(\"C) \" + UtilityRandom_1.UtilityRandom.randomRange(0.78225, 1, 3));\nconsole.log(\"C) \" + UtilityRandom_1.UtilityRandom.randomRange(0.78225, 1, 3));\n// Setup.global();\n// console.log(Settings.values)\n// const agent = new IndividualAgent();\n// if (agent.getPredispositionFraud() === undefined)\n//     console.log(\"OOOOO: \" + agent.getPredispositionFraud());\n// const nodes: ArrayList<Host> = ArrayList.create();\n// nodes.push(new Host(new IndividualAgent()));\n// nodes.push(new Host(new IndividualAgent()));\n// nodes.push(new Host(new NoProfitBusinessAgent()));\n// nodes.push(new Host(new NoProfitBusinessAgent()));\n// nodes.push(new Host(new IntermediaryAgent()));\n// nodes.push(new Host(new IntermediaryAgent()));\n// nodes.filter(e => !e.agent.isAgent(IntermediaryAgent) &&\n//     (<BaseOperationAgent>e.agent).predispositionFraud === undefined)\n//     .forEach(e => {\n//         //console.log(\"Agente: \" + e.agent.code + \"----\" + e.agent.constructor.name + \"----\" + IntermediaryAgent.name);\n//         console.log(\"Agente: \" + e.agent.code + \"----\" + e.agent.getClass() + \"----\" + IntermediaryAgent.getClass());\n//     });\n// console.log(\"A:\" + nodes.filter(e => e.agent.code === \"XX\"));\n// console.log(\"B:\" + nodes.filter(e => e.agent.code === \"XX\").length);\n// console.log(\"C:\" + Math.ceil(0.0732625555549367));\nelectron_1.app.on('ready', createWindow);\n\n\n//# sourceURL=webpack://abm_aml/./src/app/main/main.ts?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

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