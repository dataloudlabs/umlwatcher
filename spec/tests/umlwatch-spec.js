

const log = console.log.bind(console);
const umlWatch = require("../../umlwatch.js");
const fs = require("fs");
const os = require('os');

var sample_argv =[ '/Users/pedro/.nvm/versions/node/v9.4.0/bin/node',
  									'/Users/pedro/Dev/uml-watcher/umlwatch.js',
  									'-w', 'tmp_input',
  									'-r', 'tmp_result',
										'-m', '*.plantuml',
										'--svg' ];

var incomplete_argv =[ '/Users/pedro/.nvm/versions/node/v9.4.0/bin/node',
  									'/Users/pedro/Dev/uml-watcher/umlwatch.js'];


describe("parseArgs", function(){
	it("should return the options object", function(){
		var _e = {watchPath: "tmp_input"
							, resultPath: "tmp_result"
							, fileMask: "*.plantuml"
							, workPath: os.homedir() + "/.umlwatch"
							, png: true
							, svg: true};

		var _r = umlWatch.parseArgs(sample_argv);

		expect(_r).toBeDefined();
		expect(JSON.stringify(_r)).toEqual(JSON.stringify(_e));
	});

	// it("should enrich the options with the default values as needed", function(){
	// 	var _e = {watchPath: "input"
	// 						, resultPath: "result"
	// 						, fileMask: "*.uml"
	// 						, workPath: "~/.umlwatch"
	// 						, png: true
	// 						, svg: false};

	// 	var _r = umlWatch.parseArgs(incomplete_argv);

	// 	expect(_r).toBeDefined();
	// 	expect(JSON.stringify(_r)).toEqual(JSON.stringify(_e));
	// });
});


describe("sanitizeWatchPath", function(){
	it("should create the watchPath if it does not exist.", function(){
		var _r = umlWatch.sanitizeWatchPath("tmp_input");
		expect(_r).toEqual(true);
		expect(fs.existsSync("tmp_input")).toBe(true);

		// lets clean up after ourselves
		fs.rmdirSync("tmp_input")
		expect(fs.existsSync("tmp_input")).toBe(false);
	});

	it("should not create anything if the watchPath already exists", function(){
		fs.mkdirSync("tmp_input");
		var _r = umlWatch.sanitizeWatchPath("tmp_input");
		expect(_r).toEqual(true);
		expect(fs.existsSync("tmp_input")).toBe(true);

		// lets clean up after ourselves
		fs.rmdirSync("tmp_input")
		expect(fs.existsSync("tmp_input")).toBe(false);
	})
});


describe("sanitizeTargetPath", function(){
	it("should create the targetPath if it does not exist.", function(){
		var _r = umlWatch.sanitizeTargetPath("tmp_result");
		expect(_r).toEqual(true);
		expect(fs.existsSync("tmp_result")).toBe(true);

		// lets clean up after ourselves
		fs.rmdirSync("tmp_result")
		expect(fs.existsSync("tmp_result")).toBe(false);
	});

	it("should not create anything if the targetPath already exists", function(){
		fs.mkdirSync("tmp_result");
		var _r = umlWatch.sanitizeTargetPath("tmp_result");
		expect(_r).toEqual(true);
		expect(fs.existsSync("tmp_result")).toBe(true);

		// lets clean up after ourselves
		fs.rmdirSync("tmp_result")
		expect(fs.existsSync("tmp_result")).toBe(false);
	})
});


describe("sanitizeWorkPath", function(){
	it("should create the workPath if it does not exist.", function(){
		var _r = umlWatch.sanitizeWorkPath("tmpwork");
		expect(_r).toEqual(true);
		expect(fs.existsSync("tmpwork")).toBe(true);

		// lets clean up after ourselves
		fs.rmdirSync("tmpwork");
		expect(fs.existsSync("tmpwork")).toBe(false);
	});

	it("should not create anything if the workPath already exists", function(){
		var _r = umlWatch.sanitizeWorkPath("tmp_work");
		expect(_r).toEqual(true);
		expect(fs.existsSync("tmp_work")).toBe(true);

		// lets clean up after ourselves
		fs.rmdirSync("tmp_work")
		expect(fs.existsSync("tmp_work")).toBe(false);
	});
});


describe("handleChange", function(){

});


describe("encodeUml", function(){

});


describe("renderUml", function(){

});


describe("registerWatchers", function(){

});


describe("main", function(){

});

