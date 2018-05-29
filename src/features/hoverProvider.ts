'use strict';

import * as vscode from 'vscode';

import * as funcDefs from '../defs/defs';
import * as typeDefs from '../defs/types';

export class hoverProvider implements vscode.HoverProvider {
    functions: { [key: string]: vscode.MarkdownString };

    constructor(extensionPath: string) {
        this.functions = {};

        for(let i in typeDefs.luaTypes)
        {
            let idef = typeDefs.luaTypes[i];
            if(this.functions[idef.label] == undefined)
                this.functions[idef.label] = new vscode.MarkdownString(idef.description);
        }

        for(let i in funcDefs.defs)
        {
            let idef = funcDefs.defs[i];

            if(this.functions[idef.module] == undefined)
                this.functions[idef.module] = new vscode.MarkdownString(idef.module);

            if(idef.module != "")
                this.functions[idef.module + "." + idef.label] = idef.toMarkdown();
            else
                this.functions[idef.label] = idef.toMarkdown();
        }

        // Built-in lua functions (print etc.)
        for(let i in typeDefs.luaFunctions)
        {
            let itype = typeDefs.luaFunctions[i];
            this.functions[itype.name] = itype.toMarkdown();
        }

        // Built-in lua "modules" (table.concat)
        for(let i in typeDefs.luaClasses)
        {
            let itype = typeDefs.luaClasses[i];
            
            this.functions[itype.name] = itype.toMarkdown();
            for(let j in itype.methods)
            {
                let jmethod = itype.methods[j];
                this.functions[itype.name + "." + jmethod.name] =  jmethod.toMarkdown();
            }
        }
    }
    
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
        return new Promise<vscode.Hover>((resolve, reject) => {
            let hoveredTypePosition = document.getWordRangeAtPosition(position);
            let hoveredWordPosition = document.getWordRangeAtPosition(position, /[\w\.]+/);
            if(hoveredWordPosition == undefined)
                hoveredWordPosition = document.getWordRangeAtPosition(position);
            
            let hoveredFunction = this.functions[document.getText(hoveredTypePosition)];
            if(hoveredFunction != undefined)
            {
                var hover = new vscode.Hover(hoveredFunction);
                resolve(hover);
                return;
            }

            let hoveredWord = document.getText(hoveredWordPosition);
            console.log(hoveredWord);
            hoveredFunction = this.functions[hoveredWord];
            if(hoveredFunction == undefined)
            {
                reject();
                return;
            }
            
            var hover = new vscode.Hover(hoveredFunction);
            resolve(hover);
        });
    }
};