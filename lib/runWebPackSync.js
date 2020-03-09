"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _path = require("path");

var _fs = require("fs");

var _rimraf = _interopRequireDefault(require("rimraf"));

var _safe = _interopRequireDefault(require("colors/safe"));

var _os = require("os");

var _child_process = require("child_process");

var _default = function _default(_ref) {
  var path = _ref.path,
      configPath = _ref.configPath,
      config = _ref.config,
      verbose = _ref.verbose;
  var DEFAULT_OUTPUT_PATH = (0, _os.tmpdir)();

  var webPackPath = require.resolve('webpack/bin/webpack');

  var rnd = "".concat(new Date().getTime(), "_").concat(Math.round(1000000 * Math.random()));
  var outPath = (0, _path.join)(config.output && config.output.path || DEFAULT_OUTPUT_PATH, ".webpack.res.".concat(rnd, ".js")); // I need to run webpack via execSync because I have not found the way how to run
  // babel visitors asynchronously or run webpack compile synchronously

  var webPackStdOut = (0, _child_process.execSync)(['node', // for windows support
  webPackPath, path, outPath, '--config', configPath, '--bail'].join(' '));

  if (verbose) {
    console.error( // eslint-disable-line
    _safe["default"].blue("Webpack stdout for ".concat(path, "\n")) + // eslint-disable-line prefer-template
    _safe["default"].blue('---------\n') + "".concat(webPackStdOut, "\n") + _safe["default"].blue('---------'));
  }

  var webPackResult = (0, _fs.readFileSync)(outPath, {
    encoding: 'utf8'
  });

  _rimraf["default"].sync(outPath);

  return webPackResult;
};

exports["default"] = _default;