//initilize
require('typescript-require')
debugger;
const path=require('path');
const fs=require('fs');
const util=require('util');

//versioyonu almak
const yilAngularVersion = require('../src/app/config/config.constants').appVersion

//promisify core API's
const readDir=util.promisify(fs.readDir);
const writeFile=util.promisify(fs.writeFile);
const readFile=util.promisify(fs.readFile);

console.log('\Build sonrası işlemler yapılıyor')

//our version.json will be in the dist folder
const versionFilePath = path.join(__dirname+'/../dist/yilangulartemplate/version.json');
const versionFilePath = path.join(__dirname+'/../dist/yilangulartemplate/index.html');

let minHash='';
let mainBundleFile='';

//regexp to fınd main.bundle.js, even if it doesnt include a hash
let mainBundleRegexep=/^main.?([a-z0-9]*)?(\.bundle)?.js$/;

//read the dist folder files and find the one we re looking for
readDir(path.join(__dirname,'../dist/yilangulartemplate/'))
    .then(files =>{
        mainBundleFile = files.find(f=>mainBundleRegexep.test(f));
        if(mainBundleFile){
            let matchHash = mainBundleFile.match(mainBundleRegexep);

            //if it has a hash in its name,mark it down
            if(matchHash.length>1 && !!matchHash[1]){
                mainHash = matchHash[1];
            }
        }


    console.log(`yeni sürüm ve hasjh ekleniyor ${versionFilePath}`);

    fs.readFile(versionIndexPath,'utf8',function(err,data){
        if(err){
            return console.log(err);
        }
        var result = data.replace(/cacheVersion/g,devCenterVersion);
        fs.writeFile(versionIndexPath,result,'utf8',function(err){
            if(err){
                return console.log(err);
            }
        });
    });

    //write current version and hash into the version.json file
    const src = `{"version": "${devCenterVersion}", "hash": "${mainHash}"}`
    return writeFile(versionFilePath,src);

}).then(()=>{
    //main bundle file not found, dev build?
    if(!mainBundleFile){
        return;
    }
    console.log( `Ana bundle dosyasındakı hash guncellenıyor:${mainBundleFile}`);
    const mainFilepath = path.join(__dirname,'../dist/yilangulartemplate/',mainBundleFile);
    return readFile(mainFilepath,'utf8')
        .then(mainFileData=>{
            const replacedFile =mainFileData.replace('{{POST_BUILD_ENTERS_HASH_HERE}}',mainHash);
            return writeFile(mainFilepath,replacedFile);
        });
    }).catch(err=>{
        console.log('Hata:',err);
    });

