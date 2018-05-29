'use strict';
import * as vscode from 'vscode';

import * as funcDefs from '../defs/defs';
import * as typeDefs from '../defs/types';

export class functionProvider {
    functions: { [key: string]: vscode.CompletionItem[] };
    globalTypes: vscode.CompletionItem[];
    
    constructor(extensionPath: string) {
        this.functions = {};
        this.globalTypes = new Array<vscode.CompletionItem>();
        //this.functions = new Array<vscode.CompletionItem>();

        // ! Rewrite the following to use the "new" kind of doing it :)
        for (let i in funcDefs.defs) {
            let idef = funcDefs.defs[i];

            let def = new vscode.CompletionItem(idef.label, idef.module != "" ? vscode.CompletionItemKind.Method : vscode.CompletionItemKind.Function);
            def.documentation = idef.toMarkdown();

            if(idef.module != "")
                def.detail = "Module: " + idef.module;
            else
                this.globalTypes.push(def);

            if(this.functions[idef.module] == undefined)
                this.functions[idef.module] = new Array<vscode.CompletionItem>();

            this.functions[idef.module].push(def);
        }

        for(let i in typeDefs.luaTypes)
        {
            let itype = typeDefs.luaTypes[i];

            let def = new vscode.CompletionItem(itype.label, vscode.CompletionItemKind.Class);
            def.documentation = new vscode.MarkdownString();
            def.documentation.appendMarkdown(itype.description);

            this.globalTypes.push(def);
        }

        // Built-in lua functions (print etc.)
        for(let i in typeDefs.luaFunctions)
        {
            let itype = typeDefs.luaFunctions[i];

            let def = new vscode.CompletionItem(itype.name, vscode.CompletionItemKind.Function);
            def.documentation = itype.toMarkdown();

            this.globalTypes.push(def);
        }

        // Built-in lua "modules" (table.concat)
        for(let i in typeDefs.luaClasses)
        {
            let itype = typeDefs.luaClasses[i];

            let def = new vscode.CompletionItem(itype.name, vscode.CompletionItemKind.Class);
            def.documentation = new vscode.MarkdownString();
            def.documentation.appendMarkdown(itype.desc);
            this.globalTypes.push(def);

            this.functions[itype.name] = new Array<vscode.CompletionItem>();
            for(let j in itype.methods)
            {
                let jmethod = itype.methods[j];

                let def = new vscode.CompletionItem(jmethod.name, vscode.CompletionItemKind.Method);
                def.documentation = jmethod.toMarkdown();

                this.functions[itype.name].push(def);
            }
        }
    }

    provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken,
            context: vscode.CompletionContext): Thenable<vscode.CompletionItem[]> | vscode.CompletionItem[] {
        return new Promise<vscode.CompletionItem[]>((resolve, reject) => {
            if (context.triggerKind != vscode.CompletionTriggerKind.TriggerCharacter)
            {
                resolve(this.globalTypes);
                return;
            }
            
            var wordRange = document.getWordRangeAtPosition(new vscode.Position(position.line, position.character-1));
            if(wordRange != undefined)
            {
                var word = document.getText(wordRange);
                resolve(this.functions[word]);
                return;
            }

            resolve([]);
        });
    }
}