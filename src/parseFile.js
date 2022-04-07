/**
 * @file Module for parsing a text file according to requirements.txt
 * @author Keanelek Enns 
 */
import { readFile } from 'fs/promises';

/**
 * Parse a file according to requirements.txt.
 * @param {string} filePath The relative path to the file to parse.
 * @returns {Object} The object representation of the file according to requirements.txt.
 * 
 * Assumptions:
 * 
 * Requirements: "For every odd numbered line: ..."
 * Assume this is using 1 indexing rather than 0 indexing because other instructions also use 1 indexing.
 * 
 */
export default async function parseFile(filePath) {
    // This is the returned object
    const parsedObject = {};

    // Attempt to read the file.
    let fileContents;
    try {
        fileContents = await readFile(filePath, 'utf8');
    } catch (err) {
        console.error(err);
    }

    // Split file by newlines (optionally carriage returns too) and remove spaces
    const lines = fileContents.split(/\r?\n/);
    const linesNoSpaces = lines.map((line) => line.replace(/\s+/g, ''));
    
    // Process each line
    linesNoSpaces.forEach((line, index) => {
        // requirements describe 1-indexing
        const requirementsIndex = index + 1;
        if (requirementsIndex % 2 == 0) {
            processEvenLine(line, parsedObject);
        } else {
            processOddLine(line, parsedObject);
        }
    });

    return parsedObject;
}

/**
 * Processes an odd line of the input file and adds key/value pairs to the parsedObject.
 * @param {string} line A string with no whitespace characters.
 * @param {Object} parsedObject The object being parsed according to the requirements.
 * 
 * Assumptions:
 * 
 * Requirements:
 * "starting with the first, every fifth character represents a key and everything in between represents the value"
 * Example:
 * {
 		 "T": "hec",
  		 "a": "tin",
  		 "t": "heh",
           ...
    }
 * Assume that the given example is wrong as it is inconsistent with the example given for "every 3rd character"
 * (see requirements for even lines), which has the more commonly accepted meaning of being the character
 * 3 positions away from the previously chosen character. The tricky part for this requirement is that it starts
 * with the first character rather than the 5th (i.e. the 6th character is the 5th character from the 1st character).
 * NOTE: This can easily be adjusted to the example output by changing 5 to 4 below.
 */
function processOddLine(line, parsedObject) {
    // Break line into chunks of 5 characters (or less for the last chunk)
    const chunks = line.match(/.{1,5}/g);
    chunks && chunks.forEach((chunk) => {
        const key = chunk[0];
        const value = chunk.slice(1);
        if (value && key) { // only assign the value to the key if they are both truthy
            // If there is already a value at this key, keep it, otherwise assign the new value.
            parsedObject[key] = parsedObject[key] || value;
        }
    });
}

/**
 * Processes an even line of the input file and adds key/value pairs to the parsedObject.
 * @param {string} line A string with no whitespace characters.
 * @param {Object} parsedObject The object being parsed according to the requirements.
 * 
 */
function processEvenLine(line, parsedObject) {
    // Break line into chunks of 3 characters (or less for the last chunk)
    const chunks = line.match(/.{1,3}/g);
    chunks && chunks.forEach((chunk) => {
        const key = chunk.slice(0,2);
        const value = chunk.slice(2,3);
        if (value && key) { // only assign the value to the key if they are both truthy
            // If there is already a value at this key, keep it, otherwise assign the new value.
            parsedObject[key] = parsedObject[key] || value;
        }
    });
}