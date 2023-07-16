import {MarkdownPostProcessorContext} from 'obsidian';
import {generateTree} from './utilities/generate-tree';
import {MarkdownTreeSettings} from './models/markdown-tree-settings';
import {GenerateTreeOptions} from './models/generate-tree-options';
import {parseInput} from './utilities/parse-input';

export class MarkdownTreeApi {
	constructor() {
	}
	
	handle(settings: MarkdownTreeSettings, source: string, element: HTMLElement, context: MarkdownPostProcessorContext) {
		const options = {
			fullPath: settings.fullPath,
			rootDot: settings.root,
			trailingDirSlash: settings.trailing,
			charset: settings.fancy ? 'utf-8' : 'ascii'
		} as  GenerateTreeOptions;
		const tree = generateTree(parseInput(source), options);
		const pre = element.createEl('pre')
		pre.setText(tree);
	}
}
