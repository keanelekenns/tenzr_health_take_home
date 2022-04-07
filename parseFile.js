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
export default async function parseFile (filePath) {
    try {
        const fileContents = await readFile(filePath, 'utf8');
        const lines = fileContents.split(/\r?\n/);
        const linesNoSpaces = lines.map((line) => line.replace(/\s+/g, ''));
        console.log(linesNoSpaces);
    } catch (err) {
        console.error(err);
    }
}