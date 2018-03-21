'use strict;'

const chokidar = require('chokidar');
const log = console.log.bind(console);
const plantuml = require('node-plantuml');
const plantumlEncoder = require('plantuml-encoder');
const fs = require('fs');
const basename = require('path').basename;
const normalize = require('normalize-path');
const os = require('os');

const extend = require("extend");


var options;
var defaults = {
  watchPath: "input"
  , resultPath: "result"
  , fileMask: "*.uml"
  , workPath: os.homedir() + "/.umlwatch"
  , png: true
  , svg: false
  , renderExisting: false
};

function parseArgs(raw_argv){
  const progargs = require("commander");

  var result;

  var options = {};

  progargs
    .version("0.1.0")
    .option("-w, --watch-path <input_path>", "Path to watch for changes")
    .option("-r, --result-path <result_path>", "Path to place the diagrams")
    .option("-m, --file-mask [mask]", "File mask to watch in watch_path")
    .option("--png", "Render to png.")
    .option("--svg", "Render to svg.")
    .option("--render-existing", "Render existing files in watch-path")
    .parse(raw_argv);

  options["watchPath"] = progargs["watchPath"];
  options["resultPath"] = progargs["resultPath"];
  options["fileMask"] = progargs["fileMask"];
  options["png"] = progargs["png"];
  options["svg"] = progargs["svg"];
  options["renderExisting"] = progargs["renderExisting"];

  options["png"] == options["png"] || options["svg"] ? options["png"] : defaults["png"];

  result = extend({}, defaults, options);

  return result;
}

function sanitizeWatchPath(watchPath){
  var result;

  if (!fs.existsSync(watchPath)){
    fs.mkdirSync(watchPath);
  }

  result = fs.existsSync(watchPath);

  return result;
};

function sanitizeTargetPath(target_path){
  var result;
  if (!fs.existsSync(target_path)){
      fs.mkdirSync(target_path);
  }

  result = fs.existsSync(target_path);

  return result
};

function sanitizeWorkPath(work_dir){
  var result;
  if (!fs.existsSync(work_dir)){
      fs.mkdirSync(work_dir);
  }
  result = fs.existsSync(work_dir);
  return result;
};

function handleChange(options, changed_file){
  var input_filename = basename(changed_file, ".uml");
  var output_path_png = normalize(options["resultPath"] + "/" + input_filename + ".png");
  var output_path_svg = normalize(options["resultPath"] + "/" + input_filename + ".svg");

  var genPng = plantuml.generate(changed_file);

  if (options["png"]){
    log(changed_file + " -> " + output_path_png);
    genPng.out.pipe(fs.createWriteStream(output_path_png));
  }

  if (options["svg"]){
    log(changed_file + " -> " + output_path_svg);
    var genSvg = plantuml.generate(changed_file, {format: "svg"});
    genSvg.out.pipe(fs.createWriteStream(output_path_svg));
  }

  genPng.out.pipe(fs.createWriteStream("last_render.png"));

};

function encodeUml(){
  var result;

  return result;
};

function renderUml(){
  var result;
  return result;
};

function registerWatchers(watchPath, fileMask, options){
  const mask = normalize(watchPath + "/" + fileMask);
  
  const watch_options = {
    ignored: /(^|[\/\\])\../,
    persitent:true,
    ignoreInitial: options["renderExisting"]
  };

  chokidar.watch(mask, watch_options)
    .on('add', handleChange.bind(null, options))
    .on('change', handleChange.bind(null, options));

  log("Watching: " + mask);
};

function main(options){
  sanitizeWorkPath(options["workPath"]);
  sanitizeWatchPath(options["watchPath"])
  sanitizeTargetPath(options["resultPath"]);
  registerWatchers(options["watchPath"], options["fileMask"], options);
};

if (require.main === module) {
  options = parseArgs(process.argv);
  main(options);
} else {
    //log('required as a module');
}

exports.parseArgs = parseArgs;
exports.sanitizeWatchPath = sanitizeWatchPath;
exports.sanitizeTargetPath = sanitizeTargetPath;
exports.sanitizeWorkPath = sanitizeWorkPath;
exports.handleChange = handleChange;
exports.encodeUml = encodeUml;
exports.renderUml = renderUml;
exports.registerWatchers = registerWatchers;