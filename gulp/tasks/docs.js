'use strict';
let undefined;



const Config   = require('../../Config');
const gulp     = require('gulp');
const fs       = require('fs');
const path     = require('path');
const mkdirp     = require('mkdirp');
const nodemon  = require('gulp-nodemon');
const Notifier = require(path.join(Config.LIB_DIR, 'Notifier'));
const Log      = require(path.join(Config.LIB_DIR, 'Log'));
const Utility  = require(path.join(Config.LIB_DIR, 'Utility'));
const path2html      = require(path.join(Config.SERVER_ROOT, 'path2html'));

const through2 = require('through2');

const SCRIPT_PATH = path.join(Config.SERVER_ROOT, 'server.js');



// *** task : docs
gulp.task('docs', function(callback) {
  let list = getDirectoryTree(Config.ECT_ROOT, {flatten: true});
  list = list.filter(requestPath => { return requestPath.match(/\/(?!.*_).+?\.ect$/) !== null });
  list = list.map(requestPath => { return requestPath.replace(Config.ECT_ROOT, '') });
  // list = list.map(requestPath => { return requestPath.replace('index.ect', '') });
  list.forEach(requestPath => {
    let targetPath = requestPath.replace('index.ect', '');
    let doc = path2html(targetPath);
    // let dir = path.join(Config.ROOT, 'docs', requestPath.replace(/\/(?!\/.*_).+?\.ect/, ''));
    let dir = path.join(Config.ROOT, 'docs', requestPath.replace(/\/[a-zA-Z0-9]+?\.ect$/, ''));
    console.log(dir);
    mkdirp.sync(dir);
    // console.log(dir);
    fs.writeFileSync(path.join(Config.ROOT, 'docs', requestPath.replace('.ect', '.html')), doc);
    // console.log(doc);
  });
  // gulp.src([
  //   path.join(Config.ECT_ROOT, '**', '*.ect'),
  //   '!' + path.join(Config.ECT_ROOT, '**', '_*.ect'),
  // ])
  // .pipe(through2.obj(function (file, enc, cb) {
  //   this.push(file);
  //   cb();
  //   console.log(file.relative);
  // }))
  // .pipe(gulp.size());
  // // .pipe(plumber({
  // //   handleError: function(err) {
  // //     console.log(err);
  // //     new Notifier('danger', {
  // //       subtitle: 'ect',
  // //       message : 'コンパイルに失敗しました。',
  // //     });
  // //     Log.print('[ect] コンパイルに失敗しました。', 'danger');
  // //     this.emit('end');
  // //   }
  // // }))
  // // .pipe(plumber({
  // // }))
});




function getDirectoryTree(start_dirpath, {dir = true, file = true, max_depth = -1, flatten = false} = {}){
  const tree = {}
  dir = !!dir
  file = !!file
  max_depth = ~~max_depth
  flatten = !!flatten

  !function recur(dirpath, store, depth){
    if(depth > max_depth && max_depth >= 0) return

    for(const name of fs.readdirSync(dirpath)){
      const realpath = fs.realpathSync(dirpath + "/" + name);
      if(fs.statSync(realpath).isDirectory()){
        if(!dir) continue

        const subtree = {"": realpath}
        store[name] = subtree
        recur(realpath, subtree, depth + 1)
      }else{
        if(!file) continue

        store[name] = realpath
      }
    }
  }(start_dirpath, tree, 1)

  if(flatten){
    const paths = []

    !function seek(node){
      Object.values(node).forEach(e => {
        if(typeof e === "object"){
          seek(e)
        }else{
          paths.push(e)
        }
      })
    }(tree)

    return paths
  }

  return tree
}