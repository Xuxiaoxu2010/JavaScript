'use strict'

var fs = require('fs')
var path = require('path');

var repoPath = path.join(__dirname, '../words');

var jsonFiles = [];
var errorFiles = [];

if (!fs.existsSync(repoPath)) {

    console.log('心里话项目的路径不正确，请检查路径');
    return -1;

}

// https://stackoverflow.com/a/4482701/2667665
var files = fs.readdir(repoPath, function (err, files) {

    if (err) {
        console.log('读取文件夹失败，请检查原因');
        return -1;
    }

    for (var i = files.length - 1; i >= 0; i--) {

        var fullPath = path.join(repoPath, files[i]);

        if (!files[i].endsWith('.json') ||
            fs.statSync(fullPath).isDirectory()) {
            errorFiles.push(files[i]);
            files.splice(i, 1);
        }

    }

    jsonFiles = files;

    console.log(files.length);
});