'use strict';

import * as vscode from 'vscode';

import * as funcDefs from '../defs/defs';
import * as typeDefs from '../defs/types';

export class hoverProvider implements vscode.HoverProvider {
    functions: { [key: string]: vscode.MarkdownString };

    constructor(extensionPath: string) {
        this.functions = {};

        for(var i in funcDefs.defs)
        {
            var idef = funcDefs.defs[i];

            this.functions[idef.module + "." + idef.label] = idef.toMarkdown();
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
                // ! This will block "math" from showing when hovering over "math.sin"
                this.functions[itype.name + "." + jmethod.name] =  jmethod.toMarkdown();
            }
        }
    }
    
    provideHover(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
        return new Promise<vscode.Hover>((resolve, reject) => {
            let hoveredWordPosition = document.getWordRangeAtPosition(position, /[\w\.]+/);
            if(hoveredWordPosition == undefined)
                hoveredWordPosition = document.getWordRangeAtPosition(position);

            let hoveredWord = document.getText(hoveredWordPosition);
            let hoveredFunction = this.functions[hoveredWord];
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