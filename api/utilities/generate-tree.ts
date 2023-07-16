﻿import {defaultsDeep, flattenDeep, last, RecursiveArray} from 'lodash';
import {FileStructure} from '../models/file-structure';
import {GenerateTreeOptions} from '../models/generate-tree-options';
import {LINE_STRINGS} from '../consts/line-strings';



/** The default options if no options are provided */
const defaultOptions: GenerateTreeOptions = {
	charset: 'utf-8',
	trailingDirSlash: false,
	fullPath: false,
	rootDot: true
};

/**
 * Generates an ASCII tree diagram, given a FileStructure
 * @param structure The FileStructure object to convert into ASCII
 * @param options The rendering options
 */
export const generateTree = (
	structure: FileStructure,
	options?: GenerateTreeOptions,
): string =>
	flattenDeep([
		getAsciiLine(structure, defaultsDeep({}, options, defaultOptions)),
		structure.children.map(c => generateTree(c, options)) as RecursiveArray<
			string
		>,
	])
		// Remove null entries. Should only occur for the very first node
		// when `options.rootDot === false`
		.filter(line => line != null)
		.join('\n');

/**
 * Returns a line of ASCII that represents
 * a single FileStructure object
 * @param structure The file to render
 * @param options The rendering options
 */
const getAsciiLine = (
	structure: FileStructure,
	options: GenerateTreeOptions,
): string | null => {
	const lines = LINE_STRINGS[options.charset as string];

	// Special case for the root element
	if (!structure.parent) {
		return options.rootDot ? structure.name : null;
	}

	const chunks = [
		isLastChild(structure) ? lines.LAST_CHILD : lines.CHILD,
		getName(structure, options),
	];

	let current = structure.parent;
	while (current && current.parent) {
		chunks.unshift(isLastChild(current) ? lines.EMPTY : lines.DIRECTORY);
		current = current.parent;
	}

	// Join all the chunks together to create the final line.
	// If we're not rendering the root `.`, chop off the first 4 characters.
	return chunks.join('').substring(options.rootDot ? 0 : lines.CHILD.length);
};

/**
 * Returns the name of a file or folder according to the
 * rules specified by the rendering rules
 * @param structure The file or folder to get the name of
 * @param options The rendering options
 */
const getName = (
	structure: FileStructure,
	options: GenerateTreeOptions,
): string => {
	const nameChunks = [structure.name];

	// Optionally append a trailing slash
	if (
		// if the trailing slash option is enabled
		options.trailingDirSlash &&
		// and if the item has at least one child
		structure.children.length > 0 &&
		// and if the item doesn't already have a trailing slash
		!/\/\s*$/.test(structure.name)
	) {
		nameChunks.push('/');
	}

	// Optionally prefix the name with its full path
	if (options.fullPath && structure.parent && structure.parent) {
		nameChunks.unshift(
			getName(
				structure.parent,
				defaultsDeep({}, { trailingDirSlash: true }, options),
			),
		);
	}

	return nameChunks.join('');
};

/**
 * A utility function do determine if a file or folder
 * is the last child of its parent
 * @param structure The file or folder to test
 */
const isLastChild = (structure: FileStructure): boolean =>
	Boolean(structure.parent && last(structure.parent.children) === structure);
