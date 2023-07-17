import {App, Editor, MarkdownView, Plugin, PluginSettingTab, Setting, Vault,} from 'obsidian';
import {MarkdownTreeApi} from './api/markdown-tree-api';
import {MarkdownTreeSettings} from './api/models/markdown-tree-settings';
import {DEFAULT_SETTINGS} from './api/consts/default-settings';
import {NewTreeBlockCommand} from './api/commands/new-tree-block-command';

export default class MarkdownTree extends Plugin {
	settings: MarkdownTreeSettings;
	api = new MarkdownTreeApi();
	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor('markdown-tree', (source, el, ctx) => this.api.handle(this.settings, source, el, ctx));
		
		this.addCommand(new NewTreeBlockCommand());
		
		this.addSettingTab(new ObsidianTreeSettingsTabSettingTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ObsidianTreeSettingsTabSettingTab extends PluginSettingTab {
	plugin: MarkdownTree;

	constructor(app: App, plugin: MarkdownTree) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
		
		new Setting(containerEl)
			.setName('Fancy')
			.setDesc('Enables/disables the fancy characters of the tree')
			.addToggle(text => text
				.setValue(this.plugin.settings.fancy)
				.onChange(async (value) => {
					this.plugin.settings.fancy = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Full path')
			.setDesc('Enables/disables whether it shows the full path or not')
			.addToggle(text => text
				.setValue(this.plugin.settings.fullPath)
				.onChange(async (value) => {
					this.plugin.settings.fullPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Trailing /')
			.setDesc('Enables/disables whether it shows the trailing "/" or not')
			.addToggle(text => text
				.setValue(this.plugin.settings.trailing)
				.onChange(async (value) => {
					this.plugin.settings.trailing = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Root .')
			.setDesc('Enables/disables whether it shows the Root "." in the beginning of the tree or not')
			.addToggle(text => text
				.setValue(this.plugin.settings.root)
				.onChange(async (value) => {
					this.plugin.settings.root = value;
					await this.plugin.saveSettings();
				}));
	}
}


