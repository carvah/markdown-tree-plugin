import {LineStringSet} from '../models/line-string-set';


/** Contains all strings for tree rendering */
export const LINE_STRINGS: { [charset: string]: LineStringSet } = {
	ascii: {
		CHILD: '|-- ',
		LAST_CHILD: '`-- ',
		DIRECTORY: '|   ',
		EMPTY: '    ',
	},
	'utf-8': {
		CHILD: '├── ',
		LAST_CHILD: '└── ',
		DIRECTORY: '│   ',
		EMPTY: '    ',
	},
};
