'use strict'

;var fs = require('fs'),
    path = require('path'),
    jsonfile = require('jsonfile');

var repoPath = path.join(__dirname, '../words'),
    contentPath = path.join(__dirname, 'content.json'),
    errorPath = path.join(__dirname, 'error.json');

var jsonFiles = [],
    errorFiles = [],
    fileContent = [];

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

        if (fs.statSync(fullPath).isDirectory()) {

            files.splice(i, 1);

        } else if (!files[i].endsWith('.json') &&
            fs.statSync(fullPath).isFile()) {

            files.splice(i, 1);
        } else {

            // 提前就把文件的路径拼接好
            files[i] = fullPath;
        }
    }

    jsonFiles = files;

    for (var i = 0; i < jsonFiles.length; i++) {

        try {

            // 如果用异步读取，读取失败的文件名无法传入回调函数
            var content = jsonfile.readFileSync(jsonFiles[i]);

            fileContent.push(content);

        } catch (ex) {

            // console.log(ex.message);
            errorFiles.push(path.basename(jsonFiles[i]));
        }
    }

    // for (var i = 0; i < fileContent.length; i++) {
    //     fileContent[i] = JSON.stringify(fileContent[i], null, 4);
    // }

    jsonfile.writeFileSync(contentPath, fileContent);
    jsonfile.writeFileSync(errorPath, errorFiles);
});