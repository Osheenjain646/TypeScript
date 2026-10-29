# TypeScript start

## [TypeScript website](https://www.typescriptlang.org/)

- TypeScript is a strongly type programming language that builds on javascript.
- it is a better tooling at any scale created by microsoft.

## 📁 Project Structure

```text
typescript-project/
├── src/
│   └── index.ts          # Main TypeScript source file
├── dist/
│   └── index.js          # Compiled JavaScript output
├── node_modules/          # Installed project dependencies
├── .gitignore             # Files ignored by Git
├── package.json           # Project metadata, dependencies, and scripts
├── package-lock.json      # Locks dependency versions
└── tsconfig.json          # TypeScript compiler configuration
```

## Command for compiling the typeScript to javaScript

- is **tsc main.ts** (the ts file name).
- for watching the current changes on the go and update it or compile it on the go as we change the file use **tsc file.ts -w** w is for watch to watch he changes on the go and change or compile as file change.

## File Structure:-

- keep your all ts or source file in src folder and all your compiled files and html file and css like other files in build folder.

## Initialize the typescript

- Initialize the typescript in root dir and make the rootDir in the tsconfig.ts as for src as all ts source file exist here and make outDir as for build/js or .dist folder for storing all the compiled js file in it for all ts files in src.

## To make the tsconfig.json file

- command:- **tsc --init** in root folder.

## command to compile and watch changes

- then make **tsc -w** for watching the file change globally in root.

## To ignore other files except in src to be compiled in dist/outDir

- in tsconfig.json file at last in object add include and exclude array to tell the project which type of file to include and which to exclude.
