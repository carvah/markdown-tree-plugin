import {Command, Editor, MarkdownFileInfo, MarkdownView} from 'obsidian';

export class NewTreeBlockCommand implements Command {
	id: string = 'new-tree-block-command';
	name: string = 'New tree block';

	editorCallback(editor: Editor, ctx: MarkdownView | MarkdownFileInfo): any {
		editor.replaceSelection('``` markdown-tree \n root \n```');
	}
}
