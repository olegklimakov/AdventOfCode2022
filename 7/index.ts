import { demoInput, input } from '../7/input';
import { Day } from '../common.models';

const data = input.split(/\r?\n/);

interface FileTreeItem {
    type: 'dir' | 'file',
    size?: number,
    child?: FileTree;
    files?: FileTree;
}

interface FileTree {
    [key: string]: FileTreeItem
}

const fileTree: FileTree = {
    '/': {
        type: 'dir',
        child: {} as FileTree,
        files: {} as FileTree,
    }
}


let foldersArray: number[] = [];

let currentFolder: any;

const convertDataToTree = (data: string[]): FileTree => {
    const path: string[] = [];
    data.forEach(line => {
        if(line.startsWith('$')) {
            return handleCommand(line, path);
        } else {
            return handleItem(line);
        }
    });
    return fileTree;
}

const handleItem = (line: string) => {
    if(line.startsWith('dir')) {
        const arr = line.split(' ');
        const name = arr[1];
        const item: FileTreeItem = {
            type: 'dir',
            child: {} as FileTree,
            files: {} as FileTree,
        };
        currentFolder.child[name] = item;
    } else {
        const arr = line.split(' ');
        const name = arr[1];
        const item: FileTreeItem = {
            type: 'file',
            size: Number(arr[0]),
        };
        currentFolder.files[name] = item;
    }
}

const handleCommand = (command: string, path: string[]) => {
    if(command.includes('cd')) {
        const arr = command.split('cd ');
        const destination = arr[1];

        if(destination === '..') {
            path.pop();
            currentFolder = navigateToFolderByPath(path);
        } else {
            path.push(destination);
            currentFolder = navigateToFolderByPath(path);
        }
    }
}

const navigateToFolderByPath = (path: string[]) => {
    return path.reduce((acc: any, pathItem, index) => {
        if(index === path.length - 1) {
            return acc[pathItem]
        } else {
            return acc[pathItem].child as FileTree;
        }
    }, fileTree);
}

const calculateFinalSize = (value: FileTreeItem) => {

    const filesSize = value.files ? Object.values(value?.files).reduce((acc, item: FileTreeItem) => {
        acc+=item?.size || 0;
        return acc;
    }, 0): 0;

    const childFoldersSize = value.child ?  Object.values(value?.child).reduce((acc, item: FileTreeItem) => {
        acc+=item?.size || 0;
        return acc;
    }, 0) : 0;
    value.size = filesSize + childFoldersSize;
    if(value.size && value.size < 100000 ) {
        foldersArray.push(value.size);
    }
}

const calculateCurrentTreeSize = (currentFolder: FileTree) => {
    Object.values(currentFolder).forEach((value: FileTreeItem) => {
        if(value.child) {
            calculateCurrentTreeSize(value.child)
        }
        calculateFinalSize(value);
    })
};

interface ItemWithSize {
    folder: string;
    size: number;
}
const flatListWithSize: ItemWithSize[] = [];

const createFlatListWithFolderAndSize = (currentFolder: FileTree) => {
    Object.keys(currentFolder).forEach((key: string) => {
        const child = currentFolder[key].child;
        if(currentFolder[key] && child) {
            createFlatListWithFolderAndSize(child)
        }
        flatListWithSize.push({
            folder: key,
            size: currentFolder[key].size || 0,
        })
    })
}

convertDataToTree(data);
calculateCurrentTreeSize(fileTree);

const solvePart2 = (fileTree: FileTree) => {
    createFlatListWithFolderAndSize(fileTree);
    flatListWithSize.sort((a, b) => a.size - b.size);
    const totalSpace = 70000000;
    const totalTakenSpace = fileTree['/'].size || 0;
    const expectedFreeSpace = 30000000;
    const freeSpace = totalSpace - totalTakenSpace;
    return flatListWithSize.filter((item) => item.size >= expectedFreeSpace - freeSpace)[0];
}

const answ1 = foldersArray.reduce((acc, item) => acc+=item, 0);
const answ2 = solvePart2(fileTree).size;

export const day7: Day = { answ1, answ2 };
