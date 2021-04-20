let fs = require('fs');
let input = process.argv.slice(2);
console.log("input:", input);
let options = [];
let filePaths = [];
for(let i = 0; i < input.length; i++){
    if(input[i] == '-s' || input[i] == '-n' || input[i] == '-b' ){
        options.push(input[i]);
    }else{
        filePaths.push(input[i]);
    }
}

// console.log('options', options);
// console.log('filePaths', filePaths);
// check that all file paths exists.

for(let i = 0; i < filePaths.length; i++){
    let isFilePresent = fs.existsSync(filePaths[i]);
    if(isFilePresent == false){
        console.log('filepath', filePaths[i], "does not exists");
        return;
    }
}
// concatenate the f1 and f2 and printing it together;

//to read content from file paths
let totalContent = "";
for(let i = 0; i < filePaths.length; i++){
    let contentOfCurrentFile = fs.readFileSync(filePaths[i],"utf-8");
    // after every file's content -> next file content should come in next line
    totalContent += contentOfCurrentFile + "\r\n";
}
// console.log(totalContent);
let isSOption = options.includes("-s");
// to implement -s option ->remove empty line breaks
if(isSOption == true){
    //identify empty line breaks;
    let contentArr = totalContent.split('\r\n'); //=> Spliting on the basis of line break (/n and /r both are giving line breaks)
    // console.log(contentArr);
    //remove empty line breaks;
    let tempArr = [];
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] !== ''){
            tempArr.push(contentArr[i]);
        }
    }
    totalContent = tempArr.join('\r\n');
}
// console.log(totalContent);

//to implement -n option -> put a number to every line 
let isNOption = options.includes("-n");
let isBOption = options.includes('-b');
let finalOption;
if(isNOption == true){
    if(isBOption == true){
        finalOption = options.indexOf("-b") < options.indexOf("-n") ? "-b" : "-n";
    } else {
        finalOption = "-n";
    } 
} else if (isBOption == true){
    finalOption="-b";
}
// console.log(finalOption);
if(finalOption == "-n"){
    let count = 1;
    let contentArr = totalContent.split("\r\n");
    for(let i = 0; i < contentArr.length; i++){
        contentArr[i] = count + "." + contentArr[i];
        count++;
    }
    totalContent = contentArr.join('\r\n');

}
// // //console.log(totalContent);

// // //-b option -> put numbering to non empty lines

if(finalOption == "-b"){

    let count = 1;
    let contentArr = totalContent.split("\r\n");

    // console.log("line 82" , contentArr);


    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] != ""){
            contentArr[i] = count + "." + contentArr[i];
            count++;
        }
        
    }
    totalContent = contentArr.join('\r\n');    
}
console.log(totalContent);

