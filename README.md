# umlwatcher
Simple script that watches one folder and places plantuml diagrams in another.

#### Getting ready
``` bash
## get the repo
git clone git@github.com:dataloudlabs/umlwatcher.git

## get into the repo folder
cd umlwatcher

## install dependencies
npm install
```


#### Usage

The script will watch one folder and place the diagrams in another. The folders will be created by the script if they don't exist.

``` bash
## will look for changes to *.uml files in ./input and render png images into ./result
$ node umlwatch.js -w ./input -r result --render-existing 
```

If you're in the repo folder, you can look into the uml_examples and play with them a bit.
``` bash
$ node umlwatch.js -w ./uml_examples -r result
```

Or just render all of them at once.
``` bash
$ node umlwatch.js -w ./uml_examples -r ./result --render-existing 
```


Other examples...

``` bash
## Will re-render all *.uml files currently in ./input.
## (And also) will look for changes to *.uml files in ./input and render png images into ./result
$ node umlwatch.js -w ./input -r result --render-existing 
```

``` bash
## will look for changes to *.uml files in ./input and render png and svg images into ./result
$ node umlwatch.js -w ./input -r result --render-existing --svg
```

``` bash
$ node umlwatch.js --help
> Usage: umlwatch [options]

  Options:

    -V, --version                    output the version number
    -w, --watch-path <input_path>    Path to watch for changes
    -r, --result-path <result_path>  Path to place the diagrams
    -m, --file-mask [mask]           File mask to watch in watch_path
    --png                            Render to png.
    --svg                            Render to svg.
    --render-existing                Render existing files in watch-path
    -h, --help                       output usage information
```


#### Dependencies

``` bash
npm install chokidar commander extend node-plantuml normalize-path plantuml-encoder 
```

You can also check [this gist](https://gist.github.com/pjsousa/e76183d4ecce7a356ce923bd7966667a)
Or [this repo](https://github.com/dataloudlabs/umlwatcher)


## Credit
