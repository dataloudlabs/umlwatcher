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

function sanitizePath(path){
  var result;

  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
  }

  result = fs.existsSync(path);

  return result;
}

function sanitizeWatchPath(watchPath){
  var result;
  result = sanitizePath(watchPath)
  return result;
};

function sanitizeTargetPath(target_path){
  var result;
  result = sanitizePath(target_path);
  return result;
};

function sanitizeWorkPath(work_dir){
  /*
    TODO:
        // create work file to log paths and encoded strings.
   */
  var result;
  result = sanitizePath(work_dir);
  return result;
};

function handleChange(options, changed_file){
  /*
    TODO:
      Refactor into read->encode->render methods.
      Make it elegantly async.
   */
  var input_filename = basename(changed_file, ".uml");
  var output_path_png = normalize(options["resultPath"] + "/" + input_filename + ".png");
  var output_path_svg = normalize(options["resultPath"] + "/" + input_filename + ".svg");

  var encoded = encodeUml(changed_file);
  var genPng = plantuml.generate(changed_file);

  if (options["png"]){
    log(changed_file + " -> " + output_path_png + "\n\n Encoded:\n"+encoded+"\n");
    genPng.out.pipe(fs.createWriteStream(output_path_png));
  }

  if (options["svg"]){
    log(changed_file + " -> " + output_path_svg + "\n\n Encoded:\n"+encoded+"\n");
    var genSvg = plantuml.generate(changed_file, {format: "svg"});
    genSvg.out.pipe(fs.createWriteStream(output_path_svg));
  }

  genPng.out.pipe(fs.createWriteStream("last_render.png"));
  
  return encoded;
};

function encodeUml(umlPath, format){
  var result;
  result = fs.readFileSync(umlPath);
  result = plantumlEncoder.encode(result.toString());
  return result;
};

function renderUml(umlText){
  // not being used. here for future reference
  var result;
  
  var decode = plantuml.decode(umlText);
  var gen = plantuml.generate({format: format});
  
  decode.out.pipe(gen.in);
  result = gen.out.toString();

  return result;
};

function registerWatchers(watchPath, fileMask, options){
  const mask = normalize(watchPath + "/" + fileMask);
  
  const watch_options = {
    ignored: /(^|[\/\\])\../,
    persitent:true,
    ignoreInitial: !options["renderExisting"]
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