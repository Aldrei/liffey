const tsconfig = {
  // compilerOptions:
  // Description: This section contains various compiler options that configure how TypeScript compiles your code.
  "compilerOptions": {
    // rootDirs:
    // Value: ["src"]
    // Explanation: Specifies the root directories of input files. In this case, it indicates that the source files are located in the "src" directory.
    // (https://www.typescriptlang.org/tsconfig#rootDirs)
    "rootDirs": ["src"],
    // outDir:
    // Value: "dist"
    // Explanation: Specifies the output directory for compiled JavaScript files. In this case, the compiled files will be placed in the "dist" directory.
    // (https://www.typescriptlang.org/tsconfig#outDir)
    "outDir": "dist",
    // lib:
    // Value: ["ES2022"]
    // Explanation: Specifies a set of built-in declarations TypeScript should include. Here, it includes the declarations for ECMAScript 2022.
    // (https://www.typescriptlang.org/tsconfig#lib)
    "lib": ["ES2022"],
    // target:
    // Value: "ES2022"
    // Explanation: Sets the ECMAScript target version for the compiled JavaScript. Here, it targets ECMAScript 2022.
    // (https://www.typescriptlang.org/tsconfig#target)
    "target": "ES2022",
    // module:
    // Value: "NodeNext"
    // Explanation: Specifies the module system to use. Here, it indicates the use of ECMAScript modules in Node.js.
    // (https://www.typescriptlang.org/tsconfig#module)
    "module": "NodeNext",
    // moduleResolution:
    // Value: "NodeNext"
    // Explanation: Specifies the module resolution strategy. Here, it uses Node.js-style module resolution.
    // (https://www.typescriptlang.org/tsconfig#module-resolution)
    "moduleResolution": "NodeNext",
    // esModuleInterop:
    // Value: true
    // Explanation: Enables interoperability between CommonJS and ECMAScript modules. This is useful when using libraries that may not be written with ESM in mind.
    // (https://www.typescriptlang.org/tsconfig#esModuleInterop)
    "esModuleInterop": true,
    // sourceMap:
    // Value: true
    // Explanation: Generates source map files (.map) to allow debugging of TypeScript code in the original source files.
    // (https://www.typescriptlang.org/tsconfig#sourceMap)
    "sourceMap": true,
    // types:
    // Value: ["node"]
    // Explanation: Specifies a list of type declaration files to include. Here, it includes type declarations for Node.js.
    // (https://www.typescriptlang.org/tsconfig#types)
    "types": ["node"],
  },
  // include:
  // Description: An array of file or directory patterns that determine which files to include in the compilation.
  // Value: ["src/**/*.ts"]
  // Explanation: Includes all TypeScript files under the "src" directory and its subdirectories for compilation.
  "include": ["src/**/*.ts"],
  // exclude:
  // Description: An array of file or directory patterns that determine which files to exclude from the compilation.
  // Value: ["node_modules"]
  // Explanation: Excludes the "node_modules" directory from the compilation process, as it typically contains third-party library code that doesn't need to be compiled.
  "exclude": ["node_modules"]
}
