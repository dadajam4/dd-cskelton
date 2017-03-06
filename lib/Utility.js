'use strict';
let undefined;



const fs   = require('fs');
const path = require('path');



module.exports = class Utility {



  /**
   * ファイルの存在確認
   * @return boolean
   */
  static isExistFile(file) {
    try {
      fs.statSync(file);
      return true
    } catch(err) {
      console.log(err);
      if(err.code === 'ENOENT') return false
    }
  }



  /**
   * ディレクトリであるかのチェック
   * @return boolean
   */
  static isDir(filePath) {
    return fs.existsSync(filePath) && fs.statSync(filePath).isDirectory();
  }



  /**
   * 指定のパス直下のパス一覧を取得
   * type: 0 -> 全て, 1 -> ファイルのみ, 2 -> ディレクトリのみ
   * @return array
   */
  static pathList(dirPath, type) {
    type = type === undefined ? 0 : type;

    try {
      let list = fs.readdirSync(dirPath);
      list = list.filter((file) => {
        let filePath = path.join(dirPath, file);
        if (type === 1) {
          return !Utility.isDir(filePath);
        } else if (type === 2) {
          return Utility.isDir(filePath);
        }
        return true;
      });
      return list;
    } catch (e) {
      console.error(e);
      return null;
    }
  }



  /**
   * 指定のパス直下のファイル一覧を取得
   * @return array
   */
  static fileList(dirPath) {
    return Utility.pathList(dirPath, 1);
  }



  /**
   * 指定のパス直下のディレクトリ一覧を取得
   * @return array
   */
  static dirList(dirPath) {
    return Utility.pathList(dirPath, 2);
  }



  /**
   * キャメルケースへ変換 sampleString
   * @param string
   * @return string
   */
  static camelCase(str) {
    str = str.charAt(0).toLowerCase() + str.slice(1);
    return str.replace(/[-_](.)/g, function(match, group1) {
      return group1.toUpperCase();
    });
  }


  /**
   * スネークケースへ変換 sample_string
   * @param string
   * @return string
   */
  static snakeCase(str) {
    let camel = Utility.camelCase(str);
    return camel.replace(/[A-Z]/g, function(s){
      return "_" + s.charAt(0).toLowerCase();
    });
  }


  /**
   * ハイフンケースへ変換 sample-string
   * @param string
   * @return string
   */
  static hyphenCase(str) {
    let camel = Utility.camelCase(str);
    return camel.replace(/[A-Z]/g, function(s){
      return "-" + s.charAt(0).toLowerCase();
    });
  }


  /**
   * パスカルケースへ変換 SampleString
   * @param string
   * @return string
   */
  static pascalCase(str) {
    let camel = Utility.camelCase(str);
    return camel.charAt(0).toUpperCase() + camel.slice(1);
  }



  /**
   * 1文字目を大文字に変換 Upper
   * @param string
   * @return string
   */
  static firstUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }



  /**
   * 先頭、末尾のハイフン or アンダーバーをトリムする
   * @param string
   * @return string
   */
  static trimBar(str) {
    return str.replace(/^[\-_]/, '').replace(/[\-_]$/, '');
  }



  /**
   * ハッシュをsass用の文字列に変換する
   * @param string, object
   * @return string
   */
  static hash2sassmap(name, hash) {
    let tmp = [];
    tmp.push(`$${name}: (`);
    for (let key in hash) {
      let val = hash[key];

      if (typeof val === 'string') {
        val = `"${val}"`;
      }

      tmp.push(`  ${key}: ${val},`);
    }
    tmp.push(`);`);
    return tmp.join('\n');
  }
}