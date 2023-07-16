/**
 * Represents all rendering options available
 * when calling `generateTree`
 */
export interface GenerateTreeOptions {
	/**
	 * Which set of characters to use when
	 * rendering directory lines
	 */
	charset?: 'ascii' | 'utf-8';

	/**
	 * Whether or not to append trailing slashes
	 * to directories. Items that already include a
	 * trailing slash will not have another appended.
	 */
	trailingDirSlash?: boolean;

	/**
	 * Whether or not to print the full
	 * path of the item
	 */
	fullPath?: boolean;

	/**
	 * Whether or not to render a dot as the root of the tree
	 */
	rootDot?: boolean;
}
