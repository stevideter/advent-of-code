const fs = require('fs');

const filetree = { name: '/', subdirectories: [], files: [], size: 0 };
const FILE_SYSTEM_SIZE = 70000000;
const FREE_SPACE_NEEDED = 30000000;

const cdDir = /\$ cd (.+)/;
const lsDir = /\$ ls/;
const dirName = /dir (.+)/;
const fileDetails = /(\d+) (.+)/;
const fileQueue = [];

const anotherQueue = [];
function addChildren(dir) {
    dir.subdirectories.forEach((sub) => {
        anotherQueue.push(sub);
        if (sub.subdirectories.length) {
            addChildren(sub);
        }
    });
}
function calcDirectorySize(directory) {
    const fileSize = directory.size;
    const subDirSize = directory.subdirectories.length
        ? directory.subdirectories.reduce(
              (accumulator, subDir) => accumulator + subDir.size,
              0
          )
        : 0;
    directory.size = fileSize + subDirSize;
}

function checkAllSizes(filetree) {
    anotherQueue.push(filetree);
    addChildren(filetree);
    while (anotherQueue.length > 0) {
        const dir = anotherQueue.pop();
        calcDirectorySize(dir);
    }
}
function chdir(dirCommand) {
    if (dirCommand === '/') {
        current = filetree;
        fileQueue.push(current);
    } else if (dirCommand === '..') {
        const aDir = fileQueue.pop();
        current = fileQueue[fileQueue.length - 1];
    } else {
        const found = current.subdirectories.find(
            (dir) => dir.name === dirCommand
        );
        if (!found) {
            console.error(
                JSON.stringify({
                    error: 'empty queue!',
                    dirCommand,
                    fileQueue,
                    current,
                })
            );
        }
        fileQueue.push(found);
        current = found;
    }
    return current;
}

function addDirectory(dir, current) {
    let newDir = { name: dir, subdirectories: [], files: [], size: 0 };
    current.subdirectories.push(newDir);
}
function addFile(command, current) {
    const fileMatch = command.match(fileDetails);
    const file = { size: parseInt(fileMatch[1]), name: fileMatch[2] };
    current.size += file.size;
    current.files.push(file);
}
let directoryToDelete = undefined;

function isBigEnough(dir, neededSpace) {
    if (dir.size >= neededSpace) {
        console.log(`dir ${dir.name} is big enough!`);
        if (directoryToDelete) {
            if (dir.size < directoryToDelete.size) {
                directoryToDelete = dir;
            }
        } else {
            directoryToDelete = dir;
        }
    }
    dir.subdirectories.forEach((subdir) => {
        isBigEnough(subdir, neededSpace);
    });
}
function pickDirectory() {
    // Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?
    const unusedSpace = FILE_SYSTEM_SIZE - filetree.size;
    const neededSpace = FREE_SPACE_NEEDED - unusedSpace;
    console.log(
        `file system is ${FILE_SYSTEM_SIZE.toLocaleString()} current used space is ${filetree.size.toLocaleString()}, unused space is now ${unusedSpace.toLocaleString()}, To get to ${FREE_SPACE_NEEDED.toLocaleString()} we need ${neededSpace.toLocaleString()}`
    );
    isBigEnough(filetree, neededSpace);
}
fs.readFile(`${__dirname}/listings.txt`, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    const input = data.split('\n');
    let current = filetree;
    input.forEach((command) => {
        const cdMatch = command.match(cdDir);
        const lsMatch = command.match(lsDir);
        const dirMatch = command.match(dirName);
        if (cdMatch) {
            current = chdir(cdMatch[1], current);
        } else if (lsMatch) {
            // console.log('ls');
        } else if (dirMatch) {
            addDirectory(dirMatch[1], current);
        } else {
            addFile(command, current);
        }
    });
    checkAllSizes(filetree);
    pickDirectory();
    console.log({ directoryToDelete });
});
