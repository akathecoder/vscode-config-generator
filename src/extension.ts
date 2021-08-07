import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as configFilesData from './configFilesData.json';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('config-generator.configGenerate', async () => {
    const configFile = await vscode.window.showQuickPick(configFilesData, {
      matchOnDetail: true,
    });

    if (configFile) {
      fs.readFile(
        path.join(__dirname, '../src/data', configFile.dataFileName),
        {
          encoding: 'utf8',
        },
        (error, data) => {
          error && console.log(error);

          // TODO: Ask for correct workspaceFolder if multiple in the same workspace
          if (vscode.workspace.workspaceFolders) {
            fs.writeFileSync(path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, configFile.fileName), data);
          }
        },
      );
    }
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
