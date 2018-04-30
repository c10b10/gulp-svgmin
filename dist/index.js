'use strict';

var _stream = require('stream');

var _svgo = require('svgo');

var _svgo2 = _interopRequireDefault(_svgo);

var _gulpUtil = require('gulp-util');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _fancyLog = require('fancy-log');

var _fancyLog2 = _interopRequireDefault(_fancyLog);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _prettyBytes = require('pretty-bytes');

var _prettyBytes2 = _interopRequireDefault(_prettyBytes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLUGIN_NAME = 'gulp-svgmin';

module.exports = function (opts) {
    var stream = new _stream.Transform({ objectMode: true });
    var svgo = void 0;

    if (typeof opts !== 'function') {
        svgo = new _svgo2.default(opts);
    }

    stream._transform = function (file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new _gulpUtil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        if (file.isBuffer()) {
            if (typeof opts === 'function') {
                svgo = new _svgo2.default(opts(file));
            }

            svgo.optimize(String(file.contents), function (result) {
                if (result.error) {
                    return cb(new _gulpUtil.PluginError(PLUGIN_NAME, result.error));
                }

                var saved = file.contents.length - result.data.length;
                var percentage = Math.round(saved / file.contents.length * 100);
                (0, _fancyLog2.default)('\n                    ' + _logSymbols2.default.success + ' ' + file.relative + ' ' + _chalk2.default.gray('(saved ' + _chalk2.default.bold((0, _prettyBytes2.default)(saved)) + ' ' + percentage + '%'));

                file.contents = new Buffer(result.data);
                cb(null, file);
            });
        }
    };

    return stream;
};