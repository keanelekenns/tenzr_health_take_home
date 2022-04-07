/**
 * @file Module for parsing a text file according to requirements.txt
 * @author Keanelek Enns 
 */
import {readFile} from 'fs/promises';

/**
 * 
 * @param {string} filePath The path to the file to parse.
 * @returns {Object} The object representation of the file according to requirements.txt.
 */
export default async function parseFile(filePath) {
    try {
        const file = await readFile(filePath, 'utf8');
        console.log(file);
    } catch (err) {
        console.error(err);
    }
}


// Assume that the first argument passed by the user is a path to a .txt file to be parsed
const filePath = process.argv[2];
console.log(filePath);
parseFile(filePath);
console.log("this might beat the file");