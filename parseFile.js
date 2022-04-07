/**
 * @file Module for parsing a text file according to requirements.txt
 * @author Keanelek Enns 
 */
import { readFile } from 'fs/promises';

/**
 * 
 * @param {string} filePath The relative path to the file to parse.
 * @returns {Object} The object representation of the file according to requirements.txt.
 * 
 * Assumptions:
 * 
 * Requirements: "If a key has already been used, you may skip over parsing that key,value pair"
 * 
 * Assume this is optional based on the use of the word "may".
 * That is, it is also okay to overwrite previously written values for duplicate keys.
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
            // Note that Object.assign will overwrite previously written keys in the target (left)
            // if the same keys appear in the source (right)
            Object.assign(parsedObject, processEvenLine(line));
        } else {
            Object.assign(parsedObject, processOddLine(line));
        }
    });

    // Print the average key length according to requirements
    const keys = Object.keys(parsedObject);
    console.log("average:", (keys.join('').length / keys.length).toFixed(2));
    return parsedObject;
}

/**
 * 
 * @param {string} line A string with no whitespace characters.
 * @returns {Object} Containing the keys/values according to the odd line requirements
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
 * 3 positions away from the previously chosen character.
 */
function processOddLine(line) {
    const returnValue = {};

    // Break line into chunks of 5 characters (or less for the last chunk)
    const chunks = line.match(/.{1,5}/g);
    chunks.forEach((chunk) => {
        returnValue[chunk[0]] = chunk.slice(1);
    });

    return returnValue;
}

/**
 * 
 * @param {string} line A string with no whitespace characters.
 * @returns {Object} Containing the keys/values according to the even line requirements
 * 
 */
function processEvenLine(line) {
    const returnValue = {};

    // Break line into chunks of 3 characters (or less for the last chunk)
    const chunks = line.match(/.{1,3}/g);
    chunks.forEach((chunk) => {
        // Assume it is okay to have keys of length less than 2
        // and values of length 0 or 1
        returnValue[chunk.slice(0, 2)] = chunk.slice(2, 3);
    });
    
    return returnValue;
}