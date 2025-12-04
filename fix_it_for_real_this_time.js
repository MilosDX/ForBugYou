const fs = require('fs');
const path = require('path');

const fnDirPath = path.join(__dirname, 'frontend-foryou', 'src', 'app', 'api', 'fn');
const functionsTsPath = path.join(__dirname, 'frontend-foryou', 'src', 'app', 'api', 'functions.ts');

// Get all .ts files recursively in the fn directory
const getAllFiles = (dirPath, arrayOfFiles) => {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
        } else {
            if (file.endsWith('.ts')) {
                arrayOfFiles.push(filePath);
            }
        }
    });

    return arrayOfFiles;
};

const allTsFiles = getAllFiles(fnDirPath);
let functionsTsContent = fs.readFileSync(functionsTsPath, 'utf-8');

for (const filePath of allTsFiles) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;

    // Fix $Params
    content = content.replace(/\$Params/g, 'Params');

    // Find identifiers that start with numbers
    const identifiers = [...content.matchAll(/export (?:function|interface) (\w+)/g)];
    for (const match of identifiers) {
        const oldIdentifier = match[1];
        if (/^[0-9]/.test(oldIdentifier)) {
            const newIdentifier = `id_${oldIdentifier}`;
            content = content.replace(new RegExp(oldIdentifier, 'g'), newIdentifier);
        }
    }
    
    const paths = [...content.matchAll(/(\w+)\.PATH =/g)];
    for (const match of paths) {
        const oldIdentifier = match[1];
        if (/^[0-9]/.test(oldIdentifier)) {
            const newIdentifier = `id_${oldIdentifier}`;
            content = content.replace(new RegExp(oldIdentifier, 'g'), newIdentifier);
        }
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
    }
}

// Now rename the files
const allFilesForRenaming = getAllFiles(fnDirPath);
for (const filePath of allFilesForRenaming) {
    const fileExt = path.extname(filePath);
    const fileName = path.basename(filePath, fileExt);
    
    if ((/^[0-9]/.test(fileName) || fileName.includes('-')) && !fileName.startsWith('id_')) {
        const newFileName = `id_${fileName.replace(/-/g, '')}`.toLowerCase();
        const newFilePath = path.join(path.dirname(filePath), newFileName + fileExt);
        fs.renameSync(filePath, newFilePath);
        
        const functionsTsRegex = new RegExp(fileName, 'g');
        functionsTsContent = functionsTsContent.replace(functionsTsRegex, newFileName);
    }
}

// Final fix for functions.ts
functionsTsContent = functionsTsContent.replace(/\$Params/g, 'Params');
const identifiersInFunctions = [...functionsTsContent.matchAll(/ ([a-fA-F0-9]{32}) /g)];
for(const match of identifiersInFunctions) {
    const oldId = match[1];
    if (!oldId.startsWith('id_')) {
        const newId = `id_${oldId}`.toLowerCase();
        functionsTsContent = functionsTsContent.replace(new RegExp(oldId, 'g'), newId);
    }
}
const identifiersInFunctions2 = [...functionsTsContent.matchAll(/ (id_[a-fA-F0-9]{32}) /g)];
for(const match of identifiersInFunctions2) {
    const oldId = match[1];
    const newId = oldId.toLowerCase();
    functionsTsContent = functionsTsContent.replace(new RegExp(oldId, 'g'), newId);
}

const identifiersInFunctions3 = [...functionsTsContent.matchAll(/ ([0-9a-fA-F\-]{36}) /g)];
for(const match of identifiersInFunctions3) {
    const oldId = match[1];
    const newId = `id_${oldId.replace(/-/g, '')}`.toLowerCase();
    functionsTsContent = functionsTsContent.replace(new RegExp(oldId, 'g'), newId);
}


fs.writeFileSync(functionsTsPath, functionsTsContent);

console.log('Finished fixing generated files.');
