webpackJsonp([2],{

/***/ "S0c7":
/***/ (function(module, exports, __webpack_require__) {


async function getComponent() {
    var element = document.createElement('div');
    const _ = await new Promise(function(resolve) { resolve(); }).then(__webpack_require__.bind(null, "M4fF"));

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

getComponent().then(component => {
    document.body.appendChild(component);
});

/***/ })

},["S0c7"]);