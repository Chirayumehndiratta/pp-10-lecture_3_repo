//  input -> ??
// 
let fs = require("fs");
// input
let input = process.argv.slice(2);
console.log("input", input);
let options = [];
let filePaths = [];
//  to extract options and file paths from the input
for (let i = 0; i < input.length; i++) {
    // first character js string 
    if (input[i] == "-s" || input[i] == "-b" || input[i] == "-n") {
        options.push(input[i]);
    } else {
        filePaths.push(input[i]);
    }
}
// console.log("options", options);
// console.log("filePath", filePaths);
//  check that all file paths exist 
for (let i = 0; i < filePaths.length; i++) {
    let isFilePresent = fs.existsSync(filePaths[i]);
    if (isFilePresent == false) {
        console.log("filepath", filePaths[i], "does not exist . Kindly check path");
        return;
    }
}
//  to read content from file paths
let totalContent = "";
for (let i = 0; i < filePaths.length; i++) {
    let contentOFCurrent =
        fs.readFileSync(filePaths[i]);
    //  after every file's content -> next file content should come in next line
    totalContent += contentOFCurrent + "\r\n";
}
// console.log(totalContent);
//  implements
let isSoption = options.includes("-s");
//  to implement -s option->remove empty line breaks
if (isSoption == true) {
    // split on basis of line breaks
    let contentArr = totalContent.split("\r\n");
    //  idenitfy and remove empty line break
    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {

        if (contentArr[i] !== "") {
            tempArr.push(contentArr[i]);
        }
    }
    totalContent = tempArr.join("\r\n");
}


//  put a number to every line 
let isN = options.includes("-n");
let isB = options.includes("-b");
let finalOption;
if (isN == true) {
    if (isB == true) {
        //  the option that comes first-> that would be the final
        let idxB = options.indexOf("-b");
        let idxN = options.indexOf("-n");
        finalOption = idxB < idxN ? "-b" : "-n";

    } else {
        finalOption = "-n";
    }
} else if (isB == true) {
    finalOption = "-b";
}
if (finalOption == "-n") {
    let count = 1;
    let contentArr = totalContent.split("\r\n");
    // console.log(contentArr);
    for (let i = 0; i < contentArr.length; i++) {
        contentArr[i] = count + ". " + contentArr[i];
        count++;
    }
    totalContent = contentArr.join("\r\n");
    console.log(contentArr);
}
// console.log(totalContent);
if (finalOption == "-b") {
    let count = 1;
    let contentArr = totalContent.split("\r\n");
    // console.log(contentArr);
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] != "") {
            contentArr[i] = count + ". " + contentArr[i];
            count++;
        }
    }
    totalContent = contentArr.join("\r\n");
    // console.log(contentArr);
}

console.log(totalContent);

//  -b -> non empty line numbering add 

//  -s option implement
//
//  node wcat.js -s -b -n "f1.txt" 
//  node wcat.js -s -b -n "f1.txt" "f2.txt" "f4.txt" 