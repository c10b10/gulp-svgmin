import {Transform} from 'stream';
import SVGOptim from 'svgo';
import {PluginError} from 'gulp-util';
import chalk from "chalk";
import fancyLog from "fancy-log";
import logSymbols from "log-symbols";
import prettyBytes from "pretty-bytes";

const PLUGIN_NAME = 'gulp-svgmin';

module.exports = function (opts) {
    const stream = new Transform({objectMode: true});
    let svgo;

    if (typeof opts !== 'function') {
        svgo = new SVGOptim(opts);
    }

    stream._transform = function (file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        }

        if (file.isBuffer()) {
            if (typeof opts === 'function') {
                svgo = new SVGOptim(opts(file));
            }

            svgo.optimize(String(file.contents), result => {
                if (result.error) {
                    return cb(new PluginError(PLUGIN_NAME, result.error));
                }

                const saved = file.contents.length - result.data.length;
                const percentage = Math.round(
                    saved / file.contents.length * 100
                );
                fancyLog(
                    `${logSymbols.success} ${file.relative} ` +
                    chalk.gray(
                    `(saved ${chalk.bold(prettyBytes(saved))} ${percentage}%)`
                    )
                );

                file.contents = new Buffer(result.data);
                cb(null, file);
            });
        }
    };

    return stream;
};
