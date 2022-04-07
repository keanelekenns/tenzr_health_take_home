/**
 * @file Command Line Interface for parsing a text file according to requirements.txt
 * @author Keanelek Enns 
 */
import parseFile from './parseFile.js';


// Assume that the first argument passed by the user is a path to a .txt file to be parsed
const filePath = process.argv[2];

// Print the JSON object
const parsedObject = await parseFile(filePath);
console.log(parsedObject);

// Print the average key length according to requirements
const keys = Object.keys(parsedObject);
console.log("average:", (keys.join('').length / keys.length).toFixed(2));