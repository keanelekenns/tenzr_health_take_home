/**
 * @file Module for parsing a text file according to requirements.txt
 * @author Keanelek Enns 
 */
import { readFile } from 'fs/promises';

/**
 * 
 * @param {string} filePath The relative path to the file to parse.
 * @returns {Object} The object representation of the file according to requirements.txt.
 */
export default async function parseFile(filePath) {
    // This is the returned object
    const parsedObject = {};

    let fileContents;
    try {
        fileContents = await readFile(filePath, 'utf8');
    } catch (err) {
        console.error(err);
    }

    const lines = fileContents.split(/\r?\n/);
    const linesNoSpaces = lines.map((line) => line.replace(/\s+/g, ''));
    
    linesNoSpaces.forEach((line, index) => {
        // requirements.txt describes 1-indexing
        const requirementsIndex = index + 1;
        if (requirementsIndex % 2 == 0) {
            Object.assign(parsedObject, processEvenLine(line));
        } else {
            Object.assign(parsedObject, processOddLine(line));
        }
    });

    // Print the average key length
    const keys = Object.keys(parsedObject);
    console.log("average:", (keys.join('').length / keys.length).toFixed(2));
    return parsedObject;
}

function processOddLine(line) {
    const returnValue = {};

    const chunks = line.match(/.{1,5}/g);
    chunks.forEach((chunk) => {
        returnValue[chunk[0]] = chunk.slice(1);
    });

    return returnValue;
}

function processEvenLine(line) {
    const returnValue = {};

    const chunks = line.match(/.{1,3}/g);
    chunks
        .filter((chunk) => chunk.length === 3)
        .forEach((chunk) => {
            returnValue[chunk.slice(0, 2)] = chunk[2];
        });
        
    return returnValue;
}