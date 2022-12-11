const fs = require('fs');

const filetree = { name: '/', subdirectories: [], files: [], size: 0 };

const cdDir = /\$ cd (.+)/;
const lsDir = /\$ ls/;
const dirName = /dir (.+)/;
const fileDetails = /(\d+) (.+)/;
const fileQueue = [];
const TARGET_SIZE = 100000;
const targetDirs = [];
let totalValue = 0;
function getSize(directory) {
    const subDirSize = directory.subdirectories.length
        ? directory.subdirectories.reduce(
              (accumulator, subDir) => accumulator + subDir.size,
              0
          )
        : 0;
    directory.size += subDirSize;
    if (directory.size <= TARGET_SIZE) {
        targetDirs.push({ name: directory.name, size: directory.size });
        totalValue += directory.size;
    }
}
function chdir(dirCommand) {
    if (dirCommand === '/') {
        current = filetree;
        fileQueue.push(current);
    } else if (dirCommand === '..') {
        const aDir = fileQueue.pop();
        getSize(aDir);
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
            console.log('ls');
        } else if (dirMatch) {
            addDirectory(dirMatch[1], current);
        } else {
            addFile(command, current);
        }
    });
    fileQueue.forEach((dir) => {
        getSize(dir);
    });
    console.log(JSON.stringify({ targetDirs, totalValue }));
});
