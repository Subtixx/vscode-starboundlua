import * as vscode from 'vscode';

export class LuaFunction {

    /**
     * Module name
     */
    module: string;

    /**
     * The function name
     */
    label: string;
    
    /**
     * Description of the function
     */
	description: string;
    
    /**
     * An array containing and types names for arguments
     */
    args: string[];
    
    /**
     * Return type of the function
     */
    returnType: string;

    /**
     * Descriptions for arguments
     */
    argDescs: { [key: string]: string };
    
	constructor() {
		this.label = "";
		this.description = "";
        this.returnType = "";
        this.module = "";
		this.args = [];
		this.argDescs = {};
    }
    
    toMarkdown() : vscode.MarkdownString
    {
        let result = new vscode.MarkdownString();
        result.appendCodeblock(this.label + " ( " + this.args.join(", ") + " )", "starboundlua");
        result.appendMarkdown(this.description + "\n\n");
        result.appendMarkdown("- Returns: " + this.returnType + "\n");
        for (const key in this.argDescs) {
            if (this.argDescs.hasOwnProperty(key)) {
                const element = this.argDescs[key];
                result.appendMarkdown("- **" + key + "**: " + element + "\n");
            }
        }
        return result;
    }
}

export var defs = new Array<LuaFunction>();

/*var tmpDef = new Def_Function;
tmpDef.name = "ADSButtonPressed";
tmpDef.decl = "ADSButtonPressed()";
tmpDef.desc = "Check if the player is pressing the 'ads' button.";
tmpDef.callon = "The player";
tmpDef.example = "while( self ADSButtonPressed() )...";
defs.push(tmpDef);*/

var tmpDef = new LuaFunction;
tmpDef.label = "size";
tmpDef.description = "Returns the size of the canvas.";
tmpDef.returnType = "Vec2I";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "clear";
tmpDef.description = "Clears the canvas.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "mousePosition";
tmpDef.description = "Returns the mouse position relative to the canvas.";
tmpDef.returnType = "Vec2I";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "drawImage";
tmpDef.description = "Draws an image to the canvas.";
tmpDef.returnType = "void";
tmpDef.args = ["String image", "Vec2F position", "[float scale]", "[Color color]", "[bool centered]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "drawImageDrawable";
tmpDef.description = "Draws an image to the canvas, centered on position, with slightly different options.";
tmpDef.returnType = "void";
tmpDef.args = ["String image", "Vec2F position", "[Variant<Vec2F, float> scale]", "[Color color]", "[float rotation]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "drawImageRect";
tmpDef.description = "Draws a rect section of a texture to a rect section of the canvas.";
tmpDef.returnType = "void";
tmpDef.args = ["String texName", "RectF texCoords", "RectF screenCoords", "[Color color]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "drawTiledImage";
tmpDef.description = "Draws an image tiled (and wrapping) within the specified screen area.";
tmpDef.returnType = "void";
tmpDef.args = ["String image", "Vec2F offset", "RectF screenCoords", "[float scale]", "[Color color]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "drawLine";
tmpDef.description = "Draws a line on the canvas.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F start", "Vec2F end", "[Color color]", "[float lineWidth]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "drawRect";
tmpDef.description = "Draws a filled rectangle on the canvas.";
tmpDef.returnType = "void";
tmpDef.args = ["RectF rect", "Color color"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "drawPoly";
tmpDef.description = "Draws a polygon on the canvas.";
tmpDef.returnType = "void";
tmpDef.args = ["PolyF poly", "Color color", "[float lineWidth]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "drawTriangles";
tmpDef.description = "Draws a list of filled triangles to the canvas.";
tmpDef.returnType = "void";
tmpDef.args = ["List<PolyF> triangles", "[Color color]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "drawText";
tmpDef.description = "Draws text on the canvas.";
tmpDef.returnType = "void";
tmpDef.args = ["String text", "Json textPositioning", "unsigned fontSize", "[Color color]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// WORLD
tmpDef = new LuaFunction;
tmpDef.label = "explore";
tmpDef.description = "Explores the path up to the specified node count limit. Returns true if the pathfinding is complete and false if it is still incomplete. If nodeLimit is unspecified, this will search up to the configured maximum number of nodes, making it equivalent to world.platformerPathStart.";
tmpDef.returnType = "bool";
tmpDef.args = ["[int nodeLimit]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "result";
tmpDef.description = "Returns the completed path.";
tmpDef.returnType = "PlatformerAStar::Path";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

// Global
tmpDef = new LuaFunction;
tmpDef.label = "init";
tmpDef.description = "Reinitializes the random source, optionally using the specified seed.";
tmpDef.returnType = "void";
tmpDef.args = ["[unsigned seed]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "addEntropy";
tmpDef.description = "Adds entropy to the random source, optionally using the specified seed.";
tmpDef.returnType = "void";
tmpDef.args = ["[unsigned seed]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "randu32";
tmpDef.description = "Returns a random 32-bit unsigned integer value.";
tmpDef.returnType = "unsigned";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "randu64";
tmpDef.description = "Returns a random 64-bit unsigned integer value.";
tmpDef.returnType = "unsigned";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "randi32";
tmpDef.description = "Returns a random 32-bit signed integer value.";
tmpDef.returnType = "int";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "randi64";
tmpDef.description = "Returns a random 64-bit signed integer value.";
tmpDef.returnType = "int";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "randf";
tmpDef.description = "Returns a random float value within the specified range, or between 0 and 1 if no range is specified.";
tmpDef.returnType = "float";
tmpDef.args = ["[float min]", "[float max]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "randf";
tmpDef.description = "Returns a random double value within the specified range, or between 0 and 1 if no range is specified.";
tmpDef.returnType = "double";
tmpDef.args = ["[double min]", "[double max]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "randf";
tmpDef.description = "Returns a random unsigned integer value between minOrMax and max, or between 0 and minOrMax if no max is specified.";
tmpDef.returnType = "unsigned";
tmpDef.args = ["unsigned minOrMax", "[unsigned max]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "randf";
tmpDef.description = "Returns a random signed integer value between minOrMax and max, or between 0 and minOrMax if no max is specified.";
tmpDef.returnType = "int";
tmpDef.args = ["[int min]", "[int max]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "randb";
tmpDef.description = "Returns a random bool value.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.label = "perlinsource.get";
tmpDef.description = "Returns a float value from the Perlin source using 1, 2, or 3 dimensions of input.";
tmpDef.returnType = "float";
tmpDef.args = ["float x", "[float y]", "[float z]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// activeItem
tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "ownerEntityId";
tmpDef.description = "Returns the entity id of the owner entity.";
tmpDef.returnType = "EntityId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "ownerTeam";
tmpDef.description = "Returns the damage team of the owner entity.";
tmpDef.returnType = "DamageTeam";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "ownerAimPosition";
tmpDef.description = "Returns the world aim position of the owner entity.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "ownerPowerMultiplier";
tmpDef.description = "Returns the power multiplier of the owner entity.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "fireMode";
tmpDef.description = "Returns the current fire mode of the item, which can be \"none\", \"primary\" or \"alt\". Single-handed items held in the off hand will receive right click as \"primary\" rather than \"alt\".";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "hand";
tmpDef.description = "Returns the name of the hand that the item is currently held in, which can be \"primary\" or \"alt\".";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "handPosition";
tmpDef.description = "Takes an input position (defaults to [0, 0]) relative to the item and returns a position relative to the owner entity.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["Vec2F offset"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "aimAngleAndDirection";
tmpDef.description = "Returns a table containing the float aim angle and int facing direction that would be used for the item to aim at the specified target position with the specified vertical offset. This takes into account the position of the shoulder, distance of the hand from the body, and a lot of other complex factors and should be used to control aimable weapons or tools based on the owner's aim position.";
tmpDef.returnType = "LuaTable";
tmpDef.args = ["float aimVerticalOffset", "Vec2F targetPosition"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "aimAngle";
tmpDef.description = "Similar to activeItem.aimAngleAndDirection but only returns the aim angle that would be calculated with the entity's current facing direction. Necessary if, for example, an item needs to aim behind the owner.";
tmpDef.returnType = "float";
tmpDef.args = ["float aimVerticalOffset", "Vec2F targetPosition"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setHoldingItem";
tmpDef.description = "Sets whether the owner is visually holding the item.";
tmpDef.returnType = "void";
tmpDef.args = ["bool holdingItem"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setBackArmFrame";
tmpDef.description = "Sets the arm image frame that the item should use when held behind the player, or clears it to the default rotation arm frame if no frame is specified.";
tmpDef.returnType = "void";
tmpDef.args = ["String armFrame"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setFrontArmFrame";
tmpDef.description = "Sets the arm image frame that the item should use when held in front of the player, or clears it to the default rotation arm frame if no frame is specified.";
tmpDef.returnType = "void";
tmpDef.args = ["String armFrame"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setTwoHandedGrip";
tmpDef.description = "Sets whether the item should be visually held with both hands. Does not alter the functional handedness requirement of the item.";
tmpDef.returnType = "void";
tmpDef.args = ["bool twoHandedGrip"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setRecoil";
tmpDef.description = "Sets whether the item is in a recoil state, which will translate both the item and the arm holding it slightly toward the back of the character.";
tmpDef.returnType = "void";
tmpDef.args = ["bool recoil"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setOutsideOfHand";
tmpDef.description = "Sets whether the item should be visually rendered outside the owner's hand. Items outside of the hand will be rendered in front of the arm when held in front and behind the arm when held behind.";
tmpDef.returnType = "void";
tmpDef.args = ["bool outsideOfHand"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setArmAngle";
tmpDef.description = "Sets the angle to which the owner's arm holding the item should be rotated.";
tmpDef.returnType = "void";
tmpDef.args = ["float angle"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setFacingDirection";
tmpDef.description = "Sets the item's requested facing direction, which controls the owner's facing. Positive direction values will face right while negative values will face left. If the owner holds two items which request opposing facing directions, the direction requested by the item in the primary hand will take precedence.";
tmpDef.returnType = "void";
tmpDef.args = ["float direction"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setDamageSources";
tmpDef.description = "Sets a list of active damage sources with coordinates relative to the owner's position or clears them if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["List<DamageSource> damageSources"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setItemDamageSources";
tmpDef.description = "Sets a list of active damage sources with coordinates relative to the item's hand position or clears them if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["List<DamageSource> damageSources"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setShieldPolys";
tmpDef.description = "Sets a list of active shield polygons with coordinates relative to the owner's position or clears them if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["List<PolyF> shieldPolys"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setItemShieldPolys";
tmpDef.description = "Sets a list of active shield polygons with coordinates relative to the item's hand position or clears them if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["List<PolyF> shieldPolys"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setForceRegions";
tmpDef.description = "Sets a list of active physics force regions with coordinates relative to the owner's position or clears them if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["List<PhysicsForceRegion> forceRegions"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setItemForceRegions";
tmpDef.description = "Sets a list of active physics force regions with coordinates relative to the item's hand position or clears them if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["List<PhysicsForceRegion> forceRegions"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setCursor";
tmpDef.description = "Sets the item's overriding cursor image or clears it if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["String cursor"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setScriptedAnimationParameter";
tmpDef.description = "Sets a parameter to be used by the item's scripted animator.";
tmpDef.returnType = "void";
tmpDef.args = ["String parameter", "Json value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setInventoryIcon";
tmpDef.description = "Sets the inventory icon of the item.";
tmpDef.returnType = "void";
tmpDef.args = ["String image"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setInstanceValue";
tmpDef.description = "Sets an instance value (parameter) of the item.";
tmpDef.returnType = "void";
tmpDef.args = ["String parameter", "Json value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "callOtherHandScript";
tmpDef.description = "Attempts to call the specified function name with the specified argument values in the context of an ActiveItem held in the opposing hand and synchronously returns the result if successful.";
tmpDef.returnType = "LuaValue";
tmpDef.args = ["String functionName", "[LuaValue args ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "interact";
tmpDef.description = "Triggers an interact action on the owner as if they had initiated an interaction and the result had returned the specified interaction type and configuration. Can be used to e.g. open GUI windows normally triggered by player interaction with entities.";
tmpDef.returnType = "void";
tmpDef.args = ["String interactionType", "Json config", "[EntityId sourceEntityId]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "emote";
tmpDef.description = "Triggers the owner to perform the specified emote.";
tmpDef.returnType = "void";
tmpDef.args = ["String emote"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItem";
tmpDef.label = "setCameraFocusEntity";
tmpDef.description = "If the owner is a player, sets that player's camera to be centered on the position of the specified entity, or recenters the camera on the player's position if no entity id is specified.";
tmpDef.returnType = "void";
tmpDef.args = ["[EntityId entity]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// ActiveItemAnimation
tmpDef = new LuaFunction;
tmpDef.module = "activeItemAnimation";
tmpDef.label = "ownerPosition";
tmpDef.description = "Returns the current entity position of the item's owner.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItemAnimation";
tmpDef.label = "ownerAimPosition";
tmpDef.description = "Returns the current world aim position of the item's owner.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItemAnimation";
tmpDef.label = "ownerArmAngle";
tmpDef.description = "Returns the current angle of the arm holding the item.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItemAnimation";
tmpDef.label = "ownerFacingDirection";
tmpDef.description = "Returns the current facing direction of the item's owner. Will return 1 for right or -1 for left.";
tmpDef.returnType = "int";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItemAnimation";
tmpDef.label = "handPosition";
tmpDef.description = "Takes an input position (defaults to [0, 0]) relative to the item and returns a position relative to the owner entity.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["[Vec2F offset]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItemAnimation";
tmpDef.label = "partPoint";
tmpDef.description = "Returns a transformation of the specified Vec2F parameter configured on the specified animation part, relative to the owner's position.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["String partName", "String propertyName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "activeItemAnimation";
tmpDef.label = "partPoly";
tmpDef.description = "Returns a transformation of the specified PolyF parameter configured on the specified animation part, relative to the owner's position.";
tmpDef.returnType = "PolyF";
tmpDef.args = ["String partName", "String propertyName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// mcontroller
tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "boundBox";
tmpDef.description = "Returns a rect containing the entire collision of the movement controller, in local coordinates.";
tmpDef.returnType = "RectF";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "collisionPoly";
tmpDef.description = "Returns the collision poly of the movement controller, in local coordinates.";
tmpDef.returnType = "PolyF";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "collisionBody";
tmpDef.description = "Returns the collision poly of the movement controller, in world coordinates.";
tmpDef.returnType = "PolyF";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "mass";
tmpDef.description = "Returns the configured mass of the movement controller.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "position";
tmpDef.description = "Returns the current position of the movement controller.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "xPosition";
tmpDef.description = "Returns the current horizontal position of the movement controller.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "yPosition";
tmpDef.description = "Returns the current vertical position of the movement controller.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "velocity";
tmpDef.description = "Returns the current velocity of the movement controller.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "xVelocity";
tmpDef.description = "Returns the current horizontal speed of the movement controller.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "yVelocity";
tmpDef.description = "Returns the current vertical speed of the movement controller.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "rotation";
tmpDef.description = "Returns the current rotation of the movement controller in radians.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "isColliding";
tmpDef.description = "Returns whether the movement controller is currently colliding with world geometry or a PhysicsMovingCollision.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "isNullColliding";
tmpDef.description = "Returns whether the movement controller is currently colliding with null world geometry. Null collision occurs in unloaded sectors.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "isCollisionStuck";
tmpDef.description = "Returns whether the movement controller is currently stuck colliding. Movement controllers can stick if the stickyCollision movement parameter is set.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "stickingDirection";
tmpDef.description = "Returns the angle that the movement controller is currently stuck at, in radians.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "liquidPercentage";
tmpDef.description = "Returns the percentage of the collision poly currently submerged in liquid;";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "liquidId";
tmpDef.description = "Returns the liquid ID of the liquid that the movement controller is currently submerged in. If this is several liquids this returns the most plentiful one.";
tmpDef.returnType = "LiquidId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "onGround";
tmpDef.description = "Returns whether the movement controller is currently on ground.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "zeroG";
tmpDef.description = "Returns true if the movement controller is at a world position without gravity or if gravity has been disabled.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "atWorldLimit";
tmpDef.description = "Returns true if the movement controller is touching the bottom or the top (unless bottomOnly is specified) of the world.";
tmpDef.returnType = "bool";
tmpDef.args = ["[bool bottomOnly]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setAnchorState";
tmpDef.description = "Anchors the movement controller to an anchorable entity at the given anchor index.";
tmpDef.returnType = "void";
tmpDef.args = ["EntityId anchorableEntity", "size_t anchorPosition"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "resetAnchorState";
tmpDef.description = "Reset the anchor state.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "anchorState";
tmpDef.description = "Returns ID of anchored entity and index of the anchor position.";
tmpDef.returnType = "EntityId,int";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setPosition";
tmpDef.description = "Sets the position of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setXPosition";
tmpDef.description = "Sets the horizontal position of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["float x"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setYPosition";
tmpDef.description = "Sets the vertical position of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["float y"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "translate";
tmpDef.description = "Moves the movement controller by the vector provided.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F direction"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setVelocity";
tmpDef.description = "Sets the velocity of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F velocity"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setXVelocity";
tmpDef.description = "Sets the horizontal velocity of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F xVelocity"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setYVelocity";
tmpDef.description = "Sets the vertical velocity of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F yVelocity"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "addMomentum";
tmpDef.description = "Adds (momentum / mass) velocity to the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F momentum"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setRotation";
tmpDef.description = "Sets the rotation of the movement controller. Angle is in radians.";
tmpDef.returnType = "void";
tmpDef.args = ["float angle"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "baseParameters";
tmpDef.description = "Returns the base movement parameters.";
tmpDef.returnType = "ActorMovementParameters";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "walking";
tmpDef.description = "Returns whether the actor movement controller is currently walking.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "running";
tmpDef.description = "Returns whether the actor movement controller is currently running.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "movingDirection";
tmpDef.description = "Returns the direction that the actor movement controller is currently moving in. -1 for left, 1 for right.";
tmpDef.returnType = "int";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "facingDirection";
tmpDef.description = "Returns the facing direction. -1 for left, 1 for right.";
tmpDef.returnType = "int";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "crouching";
tmpDef.description = "Returns whether the controller is currently crouching.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "flying";
tmpDef.description = "Returns whether the controller is currently flying.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "falling";
tmpDef.description = "Returns whether the controller is currently falling.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "canJump";
tmpDef.description = "Returns whether the controller can currently jump.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "jumping";
tmpDef.description = "Returns whether the controller is currently jumping.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "groundMovement";
tmpDef.description = "Returns whether the controller is currently in a ground movement state. Movement controllers can be in ground movement even when onGround returns false.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "liquidMovement";
tmpDef.description = "Returns whether the controller is currently in liquid movement mode.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlRotation";
tmpDef.description = "Rotates the controller. Each control adds to the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["float rotation"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlAcceleration";
tmpDef.description = "Controls acceleration. Each control adds to the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F acceleration"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlForce";
tmpDef.description = "Controls force. Each control adds to the previous one.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlApproachVelocity";
tmpDef.description = "Approaches the targetVelocity using the force provided. If the current velocity is higher than the provided targetVelocity, the targetVelocity will still be approached, effectively slowing down the entity. Each control overrides the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F targetVelocity", "float maxControlForce"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlApproachVelocityAlongAngle";
tmpDef.description = "Approaches the targetVelocity but only along the provided angle, not affecting velocity in the perpendicular axis. If positiveOnly, then it will not slow down the movementController if it is already moving faster than targetVelocity. Each control overrides the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["float angle", "float targetVelocity", "float maxControlForce", "bool positiveOnly = false"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlApproachXVelocity";
tmpDef.description = "Approaches an X velocity. Same as using approachVelocityAlongAngle with angle 0. Each control overrides the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["float targetVelocity", "float maxControlForce"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlApproachYVelocity";
tmpDef.description = "Approaches a Y velocity. Same as using approachVelocityAlongAngle with angle (Pi / 2). Each control overrides the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["float targetVelocity", "float maxControlForce"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlParameters";
tmpDef.description = "Changes movement parameters. Parameters are merged into the base parameters. Each control is merged into the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["ActorMovementParameters parameters"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlModifiers";
tmpDef.description = "Changes movement modifiers. Modifiers are merged into the base modifiers. Each control is merged into the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["ActorMovementModifiers modifiers"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlMove";
tmpDef.description = "Controls movement in a direction. Each control replaces the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["float direction", "bool run"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlFace";
tmpDef.description = "Controls the facing direction. Each control replaces the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["float direction"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlDown";
tmpDef.description = "Controls dropping through platforms.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlCrouch";
tmpDef.description = "Controls crouching.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlJump";
tmpDef.description = "Controls starting a jump. Only has an effect if canJump is true.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlHoldJump";
tmpDef.description = "Keeps holding jump. Will not trigger a new jump, and can be held in the air.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "controlFly";
tmpDef.description = "Controls flying in the specified direction (or {0, 0} to stop) with the configured flightSpeed parameter. Each control overrides the previous one.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F direction"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "autoClearControls";
tmpDef.description = "Returns whether the controller is currently set to auto clear controls before each script update.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setAutoClearControls";
tmpDef.description = "Set whether to automatically clear controls before each script update.";
tmpDef.returnType = "void";
tmpDef.args = ["bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "clearControls";
tmpDef.description = "Manually clear all controls.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);


tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "parameters";
tmpDef.description = "Returns a table containing the movement parameters for the movement controller.";
tmpDef.returnType = "MovementParameters";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "applyParameters";
tmpDef.description = "Applies the given parameters to the movement controller. The provided parameters are merged into the current movement parameters.";
tmpDef.returnType = "void";
tmpDef.args = ["Json parameters"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "resetParameters";
tmpDef.description = "Resets movement parameters to their original state.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "mass";
tmpDef.description = "Returns the configured mass of the movement controller.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "position";
tmpDef.description = "Returns the current position of the movement controller.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "xPosition";
tmpDef.description = "Returns the current horizontal position of the movement controller.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "yPosition";
tmpDef.description = "Returns the current vertical position of the movement controller.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "velocity";
tmpDef.description = "Returns the current velocity of the movement controller.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "xVelocity";
tmpDef.description = "Returns the current horizontal speed of the movement controller.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "yVelocity";
tmpDef.description = "Returns the current vertical speed of the movement controller.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "rotation";
tmpDef.description = "Returns the current rotation of the movement controller in radians.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "collisionPoly";
tmpDef.description = "Returns the collision poly of the movement controller, in local coordinates.";
tmpDef.returnType = "PolyF";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "collisionBody";
tmpDef.description = "Returns the collision poly of the movement controller, in world coordinates.";
tmpDef.returnType = "PolyF";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "collisionBoundBox";
tmpDef.description = "Returns a rect containing the entire collision poly of the movement controller, in world coordinates.";
tmpDef.returnType = "RectF";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "localBoundBox";
tmpDef.description = "Returns a rect containing the entire collision of the movement controller, in local coordinates.";
tmpDef.returnType = "RectF";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "isColliding";
tmpDef.description = "Returns whether the movement controller is currently colliding with world geometry or a PhysicsMovingCollision.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "isNullColliding";
tmpDef.description = "Returns whether the movement controller is currently colliding with null world geometry. Null collision occurs in unloaded sectors.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "isCollisionStuck";
tmpDef.description = "Returns whether the movement controller is currently stuck colliding. Movement controllers can stick if the stickyCollision movement parameter is set.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "stickingDirection";
tmpDef.description = "Returns the angle that the movement controller is currently stuck at, in radians.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "liquidPercentage";
tmpDef.description = "Returns the percentage of the collision poly currently submerged in liquid;";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "liquidId";
tmpDef.description = "Returns the liquid ID of the liquid that the movement controller is currently submerged in. If this is several liquids this returns the most plentiful one.";
tmpDef.returnType = "LiquidId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "onGround";
tmpDef.description = "Returns whether the movement controller is currently on ground.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "zeroG";
tmpDef.description = "Returns true if the movement controller is at a world position without gravity or if gravity has been disabled.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "atWorldLimit";
tmpDef.description = "Returns true if the movement controller is touching the bottom or the top (unless bottomOnly is specified) of the world.";
tmpDef.returnType = "bool";
tmpDef.args = ["[bool bottomOnly]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setPosition";
tmpDef.description = "Sets the position of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setXPosition";
tmpDef.description = "Sets the horizontal position of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["float x"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setYPosition";
tmpDef.description = "Sets the vertical position of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["float y"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "translate";
tmpDef.description = "Moves the movement controller by the vector provided.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F direction"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setVelocity";
tmpDef.description = "Sets the velocity of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F velocity"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setXVelocity";
tmpDef.description = "Sets the horizontal velocity of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F xVelocity"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setYVelocity";
tmpDef.description = "Sets the vertical velocity of the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F yVelocity"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "addMomentum";
tmpDef.description = "Adds (momentum / mass) velocity to the movement controller.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F momentum"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "setRotation";
tmpDef.description = "Sets the rotation of the movement controller. Angle is in radians.";
tmpDef.returnType = "void";
tmpDef.args = ["float angle"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "rotate";
tmpDef.description = "Rotates the movement controller by an angle relative to its current angle. Angle is in radians.";
tmpDef.returnType = "void";
tmpDef.args = ["float angle"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "accelerate";
tmpDef.description = "Accelerates the movement controller by the given acceleration for one tick.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F acceleration"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "force";
tmpDef.description = "Accelerates the movement controller by (force / mass) for one tick.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F force"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "approachVelocity";
tmpDef.description = "Approaches the targetVelocity using the force provided. If the current velocity is higher than the provided targetVelocity, the targetVelocity will still be approached, effectively slowing down the entity.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F targetVelocity", "float maxControlForce"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "approachVelocityAlongAngle";
tmpDef.description = "Approaches the targetVelocity but only along the provided angle, not affecting velocity in the perpendicular axis. If positiveOnly, then it will not slow down the movementController if it is already moving faster than targetVelocity.";
tmpDef.returnType = "void";
tmpDef.args = ["float angle", "float targetVelocity", "float maxControlForce", "bool positiveOnly = false"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "approachXVelocity";
tmpDef.description = "Approaches an X velocity. Same as using approachVelocityAlongAngle with angle 0.";
tmpDef.returnType = "void";
tmpDef.args = ["float targetVelocity", "float maxControlForce"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "mcontroller";
tmpDef.label = "approachYVelocity";
tmpDef.description = "Approaches a Y velocity. Same as using approachVelocityAlongAngle with angle (Pi / 2).";
tmpDef.returnType = "void";
tmpDef.args = ["float targetVelocity", "float maxControlForce"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// animator
tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setAnimationState";
tmpDef.description = "Sets an animation state. If startNew is true, restart the animation loop if it's already active. Returns whether the state was set.";
tmpDef.returnType = "bool";
tmpDef.args = ["String stateType", "String State", "bool startNew = false"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "animationState";
tmpDef.description = "Returns the current state for a state type.";
tmpDef.returnType = "String";
tmpDef.args = ["String stateType"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "animationStateProperty";
tmpDef.description = "Returns the value of the specified property for a state type.";
tmpDef.returnType = "Json";
tmpDef.args = ["String stateType", "String propertyName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setGlobalTag";
tmpDef.description = "Sets a global animator tag. A global tag replaces any tag <tagName> with the specified tagValue across all animation parts.";
tmpDef.returnType = "void";
tmpDef.args = ["String tagName", "String tagValue"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setPartTag";
tmpDef.description = "Sets a local animator tag. A part tag replaces any tag <tagName> with the specified tagValue in the partType animation part only.";
tmpDef.returnType = "void";
tmpDef.args = ["String partType", "String tagName", "String tagValue"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setFlipped";
tmpDef.description = "Sets whether the animator should be flipped horizontally.";
tmpDef.returnType = "void";
tmpDef.args = ["bool flipped"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setAnimationRate";
tmpDef.description = "Sets the animation rate of the animator.";
tmpDef.returnType = "void";
tmpDef.args = ["float rate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "rotateGroup";
tmpDef.description = "Rotates a rotation group to the specified angle. If immediate, ignore rotation speed.\n*NOTE:* Rotation groups have largely been replaced by transformation groups and should only be used in a context where maintaining a rotation speed is important. When possible use transformation groups.";
tmpDef.returnType = "void";
tmpDef.args = ["String rotationGroup", "float targetAngle", "bool immediate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "currentRotationAngle";
tmpDef.description = "Returns the current angle for a rotation group.";
tmpDef.returnType = "float";
tmpDef.args = ["String rotationGroup"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "hasTransformationGroup";
tmpDef.description = "Returns whether the animator contains the specified transformation group.";
tmpDef.returnType = "bool";
tmpDef.args = ["String transformationGroup"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "translateTransformationGroup";
tmpDef.description = "Translates the specified transformation group.";
tmpDef.returnType = "void";
tmpDef.args = ["String transformationGroup", "Vec2F translate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "rotateTransformationGroup";
tmpDef.description = "Rotates the specified transformation group by the specified angle in radians, optionally around the specified center point.";
tmpDef.returnType = "void";
tmpDef.args = ["String transformationGroup", "float rotation", "[Vec2F rotationCenter]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "scaleTransformationGroup";
tmpDef.description = "Scales the specified transformation group by the specified scale. Optionally scale it from a scaleCenter.";
tmpDef.returnType = "void";
tmpDef.args = ["String transformationGroup", "float/Vec2F scale", "[Vec2F scaleCenter]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "transformTransformationGroup";
tmpDef.description = "Applies a custom Mat3 transform to the specified transformationGroup. The applied matrix will be:\n[a, b, tx,\n c, d, ty,\n 0, 0, 1]";
tmpDef.returnType = "void";
tmpDef.args = ["String transformationGroup", "float a", "float b", "float c", "float d", "float tx", "float ty"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "resetTransformationGroup";
tmpDef.description = "Resets a transformationGroup to the identity transform.\n[1, 0, 0\n0, 1, 0,\n0, 1, 1]";
tmpDef.returnType = "void";
tmpDef.args = ["String transformationGroup"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setParticleEmitterActive";
tmpDef.description = "Sets a particle emitter to be active or inactive.";
tmpDef.returnType = "void";
tmpDef.args = ["String emitterName", "bool active"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setParticleEmitterEmissionRate";
tmpDef.description = "Sets the rate at which a particle emitter emits particles while active.";
tmpDef.returnType = "void";
tmpDef.args = ["String emitterName", "float emissionRate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setParticleEmitterBurstCount";
tmpDef.description = "Sets the amount of each particle the emitter will emit when using burstParticleEmitter.";
tmpDef.returnType = "void";
tmpDef.args = ["String emitterName", "unsigned burstCount"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setParticleEmitterOffsetRegion";
tmpDef.description = "Sets an offset region for the particle emitter. Any particles spawned will have a randomized offset within the region added to their position.";
tmpDef.returnType = "void";
tmpDef.args = ["String emitterName", "RectF offsetRegion"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "burstParticleEmitter";
tmpDef.description = "Spawns the entire set of particles burstCount times, where burstCount can be configured in the animator or set by setParticleEmitterBurstCount.";
tmpDef.returnType = "void";
tmpDef.args = ["String emitterName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setLightActive";
tmpDef.description = "Sets a light to be active/inactive.";
tmpDef.returnType = "void";
tmpDef.args = ["String lightName, bool active"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setLightPosition";
tmpDef.description = "Sets the position of a light.";
tmpDef.returnType = "void";
tmpDef.args = ["String lightName, Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setLightColor";
tmpDef.description = "Sets the color of a light. Brighter color gives a higher light intensity.";
tmpDef.returnType = "void";
tmpDef.args = ["String lightName, Color color"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setLightPointAngle";
tmpDef.description = "Sets the angle of a pointLight.";
tmpDef.returnType = "void";
tmpDef.args = ["String lightName, float angle"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "hasSound";
tmpDef.description = "Returns whether the animator has a sound by the name of soundName";
tmpDef.returnType = "bool";
tmpDef.args = ["String soundName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setSoundPool";
tmpDef.description = "Sets the list of sound assets to pick from when playing a sound.";
tmpDef.returnType = "void";
tmpDef.args = ["String soundName", "List<String> soundPool"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setSoundPosition";
tmpDef.description = "Sets the position that a sound is played at.";
tmpDef.returnType = "void";
tmpDef.args = ["String soundName", "Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "playSound";
tmpDef.description = "Plays a sound. Optionally loop loops times. 0 plays the sound once (no loops), -1 loops indefinitely.";
tmpDef.returnType = "void";
tmpDef.args = ["String soundName", "[int loops = 0]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setSoundVolume";
tmpDef.description = "Sets the volume of a sound. Optionally smoothly transition the volume over rampTime seconds.";
tmpDef.returnType = "void";
tmpDef.args = ["String soundName", "float volume", "[float rampTime = 0.0]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setSoundPitch";
tmpDef.description = "Sets the relative pitch of a sound. Optionally smoothly transition the pitch over rampTime seconds.";
tmpDef.returnType = "void";
tmpDef.args = ["String soundName", "float pitch", "[float rampTime = 0.0]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "stopAllSounds";
tmpDef.description = "Stops all instances of the specified sound.";
tmpDef.returnType = "void";
tmpDef.args = ["String soundName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "setEffectActive";
tmpDef.description = "Sets a configured effect to be active/inactive.";
tmpDef.returnType = "void";
tmpDef.args = ["String effect", "bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "partPoint";
tmpDef.description = "Returns a Vec2F configured in a part's properties with all of the part's transformations applied to it.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["String partName", "String propertyName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "partPoly";
tmpDef.description = "Returns a PolyF configured in a part's properties with all the part's transformations applied to it.";
tmpDef.returnType = "PolyF";
tmpDef.args = ["String partName", "String propertyName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animator";
tmpDef.label = "partProperty";
tmpDef.description = "Returns an animation part property without applying any transformations.";
tmpDef.returnType = "Json";
tmpDef.args = ["String partName", "String propertyName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// celestial
tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "skyFlying";
tmpDef.description = "Returns whether the client sky is currently flying.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "skyFlyingType";
tmpDef.description = "Returns the type of flying the client sky is currently performing.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "skyWarpPhase";
tmpDef.description = "Returns the current warp phase of the client sky, if warping.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "skyWarpProgress";
tmpDef.description = "Returns a value between 0 and 1 for how far through warping the sky is currently.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "skyInHyperspace";
tmpDef.description = "Returns whether the sky is currently under hyperspace flight.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "skyFlying";
tmpDef.description = "Flies the player ship to the specified SystemLocation in the specified system.\nSystemLocation is either of the following types: Null, CelestialCoordinate, Object, Vec2F\nThe locations are specified as a pair of type and value";
tmpDef.returnType = "flyShip";
tmpDef.args = ["Vec3I system", "SystemLocation destination"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "flying";
tmpDef.description = "Returns whether the player ship is flying";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "shipSystemPosition";
tmpDef.description = "Returns the current position of the ship in the system.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "shipDestination";
tmpDef.description = "Returns the current destination of the player ship.";
tmpDef.returnType = "SystemLocation";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "shipLocation";
tmpDef.description = "Returns the current system location of the player ship.";
tmpDef.returnType = "SystemLocation";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "currentSystem";
tmpDef.description = "Returns the CelestialCoordinate for system the ship is currently in.";
tmpDef.returnType = "CelestialCoordinate";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "planetSize";
tmpDef.description = "Returns the diameter of the specified planet in system space.";
tmpDef.returnType = "float";
tmpDef.args = ["CelestialCoordinate planet"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "planetPosition";
tmpDef.description = "Returns the position of the specified planet in system space.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["CelestialCoordinate planet"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "planetParameters";
tmpDef.description = "Returns the celestial parameters for the specified planet.";
tmpDef.returnType = "CelestialParameters";
tmpDef.args = ["CelestialCoordinate planet"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "visitableParameters";
tmpDef.description = "Returns the visitable parameters for the specified visitable planet. For unvisitable planets, returns nil.";
tmpDef.returnType = "VisitableParameters";
tmpDef.args = ["CelestialCoordinate planet"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "planetName";
tmpDef.description = "Returns the name of the specified planet.";
tmpDef.returnType = "String";
tmpDef.args = ["CelestialCoordinate planet"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "planetSeed";
tmpDef.description = "Returns the seed for the specified planet.";
tmpDef.returnType = "uint64_t";
tmpDef.args = ["CelestialCoordinate planet"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "clusterSize";
tmpDef.description = "Returns the diameter of the specified planet and its orbiting moons.";
tmpDef.returnType = "float";
tmpDef.args = ["CelestialCoordinate planet"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "planetOres";
tmpDef.description = "Returns a list of ores available on the specified planet.";
tmpDef.returnType = "List<String>";
tmpDef.args = ["CelestialCoordinate planet"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "systemPosition";
tmpDef.description = "Returns the position of the specified location in the *current system*.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["SystemLocation location"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "orbitPosition";
tmpDef.description = "Returns the calculated position of the provided orbit.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["Orbit orbit"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "systemObjects";
tmpDef.description = "Returns a list of the Uuids for objects in the current system.";
tmpDef.returnType = "List<Uuid>";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "objectType";
tmpDef.description = "Returns the type of the specified object.";
tmpDef.returnType = "String";
tmpDef.args = ["Uuid uuid"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "objectParameters";
tmpDef.description = "Returns the parameters for the specified object.";
tmpDef.returnType = "Json";
tmpDef.args = ["Uuid uuid"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "systemSpawnObject";
tmpDef.description = "Spawns an object of typeName at position. Optionally with the specified UUID and parameters.\nObjects are limited to be spawned outside a distance of  /systemworld.config:clientSpawnObjectPadding from any planet surface (including moons), star surface, planetary orbit (including moons), or permanent objects orbits, and at most within clientSpawnObjectPadding from the outermost orbit.";
tmpDef.returnType = "Uuid";
tmpDef.args = ["String typeName", "Vec2F position", "[Uuid uuid]", "[Json parameters]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "playerShips";
tmpDef.description = "Returns a list of the player ships in the current system.";
tmpDef.returnType = "List<Uuid>";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "playerShipPosition";
tmpDef.description = "Returns the position of the specified player ship.";
tmpDef.returnType = "playerShipPosition";
tmpDef.args = ["Uuid uuid"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "objectParameters";
tmpDef.description = "Returns the children for the specified celestial coordinate. For systems, return planets, for planets, return moons.";
tmpDef.returnType = "List<CelestialCoordinate>";
tmpDef.args = ["CelestialCoordinate coordinate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "scanSystems";
tmpDef.description = "Returns a list of systems in the given region. This scans for systems asynchronously, meaning it may not return all systems if they have not been generated or sent to the client. Use scanRegionFullyLoaded to see if this is the case.";
tmpDef.returnType = "List<CelestialCoordinate>";
tmpDef.args = ["RectI region"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "scanConstellationLines";
tmpDef.description = "Returns the constellation lines for the specified universe region.";
tmpDef.returnType = "List<pair<Vec2I,Vec2I>>";
tmpDef.args = ["RectI region"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "scanRegionFullyLoaded";
tmpDef.description = "Returns whether the specified universe region has been fully loaded.";
tmpDef.returnType = "bool";
tmpDef.args = ["RectI region"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "centralBodyImages";
tmpDef.description = "Returns the images with scales for the central body (star) for the specified system coordinate.";
tmpDef.returnType = "List<pair<String,float>>";
tmpDef.args = ["CelestialCoordinate system"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "planetaryObjectImages";
tmpDef.description = "Returns the smallImages with scales for the specified planet or moon.";
tmpDef.returnType = "List<pair<String,float>>";
tmpDef.args = ["CelestialCoordinate coordinate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "worldImages";
tmpDef.description = "Returns the generated world images with scales for the specified planet or moon.";
tmpDef.returnType = "List<pair<String,float>>";
tmpDef.args = ["CelestialCoordinate coordinate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "celestial";
tmpDef.label = "starImages";
tmpDef.description = "Returns the star image for the specified system. Requires a twinkle time to provide the correct image frame.";
tmpDef.returnType = "List<pair<String,float>>";
tmpDef.args = ["CelestialCoordinate system", "float twinkleTime"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// CommandProcessor
tmpDef = new LuaFunction;
tmpDef.module = "CommandProcessor";
tmpDef.label = "adminCheck";
tmpDef.description = "Checks whether the specified connection id is authorized to perform admin actions and returns nil if authorization is succesful. If unauthorized, returns a String error message to display to the client requesting the action, which may include the specified action description, such as \"Insufficient privileges to do the time warp again.\"";
tmpDef.returnType = "String";
tmpDef.args = ["ConnectionId connectionId", "String actionDescription"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// config
tmpDef = new LuaFunction;
tmpDef.module = "config";
tmpDef.label = "getParameter";
tmpDef.description = "Returns the value for the specified config parameter. If there is no value set, returns the default.";
tmpDef.returnType = "Json";
tmpDef.args = ["String parameter", "Json default"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// pane
tmpDef = new LuaFunction;
tmpDef.module = "pane";
tmpDef.label = "containerEntityId";
tmpDef.description = "Returns the entity id of the container that this pane is connected to.";
tmpDef.returnType = "EntityId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "pane";
tmpDef.label = "playerEntityId";
tmpDef.description = "Returns the entity id of the player that opened this pane.";
tmpDef.returnType = "EntityId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "pane";
tmpDef.label = "dismiss";
tmpDef.description = "Closes the pane.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);


tmpDef = new LuaFunction;
tmpDef.module = "pane";
tmpDef.label = "sourceEntity";
tmpDef.description = "Returns the entity id of the pane's source entity.";
tmpDef.returnType = "EntityId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "pane";
tmpDef.label = "dismiss";
tmpDef.description = "Closes the pane.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "pane";
tmpDef.label = "playSound";
tmpDef.description = "Plays the specified sound asset, optionally looping the specified number of times or at the specified volume.";
tmpDef.returnType = "void";
tmpDef.args = ["String sound", "[int loops]", "[float volume]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "pane";
tmpDef.label = "stopAllSounds";
tmpDef.description = "Stops all instances of the given sound asset, and returns true if any sounds were stopped and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["String sound"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "pane";
tmpDef.label = "setTitle";
tmpDef.description = "Sets the window title and subtitle.";
tmpDef.returnType = "void";
tmpDef.args = ["String title", "String subtitle"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "pane";
tmpDef.label = "setTitleIcon";
tmpDef.description = "Sets the window icon.";
tmpDef.returnType = "void";
tmpDef.args = ["String image"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// entity
tmpDef = new LuaFunction;
tmpDef.module = "entity";
tmpDef.label = "id";
tmpDef.description = "Returns the id number of the entity.";
tmpDef.returnType = "EntityId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "entity";
tmpDef.label = "damageTeam";
tmpDef.description = "Returns a table of the entity's damage team type and team number. Ex: {type = \"enemy\", team = 0}";
tmpDef.returnType = "LuaTable";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "entity";
tmpDef.label = "isValidTarget";
tmpDef.description = "Returns whether the provided entity is a valid target of the current entity. An entity is a valid target if they can be damaged, and in the case of monsters and NPCs if they are aggressive.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "entity";
tmpDef.label = "distanceToEntity";
tmpDef.description = "Returns the vector distance from the current entity to the provided entity.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "entity";
tmpDef.label = "entityInSight";
tmpDef.description = "Returns whether the provided entity is in line of sight of the current entity.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "entity";
tmpDef.label = "position";
tmpDef.description = "Returns the position of the current entity.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "entity";
tmpDef.label = "entityType";
tmpDef.description = "Returns the  type of the current entity.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "entity";
tmpDef.label = "uniqueId";
tmpDef.description = "Returns the unique ID of the entity. Returns nil if there is no unique ID.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "entity";
tmpDef.label = "persistent";
tmpDef.description = "Returns true if the entity is persistent (will be saved to disk on sector unload) or false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

// item
tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "name";
tmpDef.description = "Returns the name of the item.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "count";
tmpDef.description = "Returns the stack count of the item.";
tmpDef.returnType = "size_t";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "setCount";
tmpDef.description = "Sets the item count. Returns any overflow.";
tmpDef.returnType = "size_t";
tmpDef.args = ["size_t count"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "maxStack";
tmpDef.description = "Returns the max number of this item that will fit in a stack.";
tmpDef.returnType = "size_t";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "matches";
tmpDef.description = "Returns whether the item matches the specified item. If exactMatch is true then both the items' names and parameters are compared, otherwise only the items' names.";
tmpDef.returnType = "bool";
tmpDef.args = ["ItemDescriptor desc", "[bool exactMatch]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "consume";
tmpDef.description = "Consumes items from the stack. Returns whether the full count was successfuly consumed.";
tmpDef.returnType = "bool";
tmpDef.args = ["size_t count"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "empty";
tmpDef.description = "Returns whether the item stack is empty.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "descriptor";
tmpDef.description = "Returns an item descriptor for the item.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "description";
tmpDef.description = "Returns the description for the item.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "friendlyName";
tmpDef.description = "Returns the short description for the item.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "rarity";
tmpDef.description = "Returns the rarity for the item.\n* 0 = common\n* 1 = uncommon\n* 2 = rare\n* 3 = legendary\n* 4 = essential";
tmpDef.returnType = "int";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "rarityString";
tmpDef.description = "Returns the rarity as a string.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "price";
tmpDef.description = "Returns the item price.";
tmpDef.returnType = "size_t";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "fuelAmount";
tmpDef.description = "Returns the item fuel amount.";
tmpDef.returnType = "unsigned";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "iconDrawables";
tmpDef.description = "Returns a list of the item's icon drawables.";
tmpDef.returnType = "Json";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "dropDrawables";
tmpDef.description = "Returns a list of the item's itemdrop drawables.";
tmpDef.returnType = "Json";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "largeImage";
tmpDef.description = "Returns the item's configured large image, if any.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "tooltipKind";
tmpDef.description = "Returns the item's tooltip kind.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "category";
tmpDef.description = "Returns the item's category";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "pickupSound";
tmpDef.description = "Returns the item's pickup sound.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "twoHanded";
tmpDef.description = "Returns whether the item is two handed.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "timeToLive";
tmpDef.description = "Returns the items's time to live.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "learnBlueprintsOnPickup";
tmpDef.description = "Returns a list of the blueprints learned on picking up this item.";
tmpDef.returnType = "Json";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "hasItemTag";
tmpDef.description = "Returns whether the set of item tags for this item contains the specified tag.";
tmpDef.returnType = "bool";
tmpDef.args = ["String itemTag"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "item";
tmpDef.label = "pickupQuestTemplates";
tmpDef.description = "Returns a list of quests acquired on picking up this item.";
tmpDef.returnType = "Json";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

// localAnimator
tmpDef = new LuaFunction;
tmpDef.module = "localAnimator";
tmpDef.label = "playAudio";
tmpDef.description = "Immediately plays the specified sound, optionally with the specified loop count and volume.";
tmpDef.returnType = "void";
tmpDef.args = ["String sound", "[int loops]", "[float volume]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "localAnimator";
tmpDef.label = "spawnParticle";
tmpDef.description = "Immediately spawns a particle with the specified name or configuration at the specified position.";
tmpDef.returnType = "void";
tmpDef.args = ["Json particleConfig", "Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "localAnimator";
tmpDef.label = "addDrawable";
tmpDef.description = "Adds the specified drawable to the animator's list of drawables to be rendered. If a render layer is specified, this drawable will be drawn on that layer instead of the parent entity's render layer. Drawables set in this way are retained between script ticks and must be cleared manually using localAnimator.clearDrawables().\nThe drawable object must specify exactly one of the following keys to define its type:\n\n* [pair<Vec2F, Vec2F> __line__] - Defines this drawable as a line between the specified two points.\n* [List<Vec2F> __poly__] - Defines the drawable as a polygon composed of the specified points.\n* [String __image__] - Defines the drawable as an image with the specified asset path.\n\nThe following additional keys may be specified for any drawable type:\n\n* [Vec2F __position__] - Relative position of the drawable.\n* [Color __color__] - Color for the drawable. Defaults to white.\n* [bool __fullbright__] - Specifies whether the drawable is fullbright (ignores world lighting).\n\nThe following additional key may be specified for line drawables:\n\n* [float __width__] - Specifies the width of the line to be rendered.\n\nThe following transformation options may be specified for image drawables. Note that if a __transformation__ is specified, it will be used instead of other specific transformation operations.\n\n* [Mat3F __transformation__]\n* [bool __centered__]\n* [float __rotation__]\n* [bool __mirrored__]\n* [float __scale__]";
tmpDef.returnType = "void";
tmpDef.args = ["Drawable drawable", "[String renderLayer]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "localAnimator";
tmpDef.label = "clearDrawables";
tmpDef.description = "Clears the list of drawables to be rendered.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "localAnimator";
tmpDef.label = "addLightSource";
tmpDef.description = "Adds the specified light source to the animator's list of light sources to be rendered. Light sources set in this way are retained between script ticks and must be cleared manually using localAnimator.clearLightSources(). The configuration object for the light source accepts the following keys:\n\n* Vec2F __position__\n* Color __color__\n* [bool __pointLight__]\n* [float __pointBeam__]\n* [float __beamAngle__]\n* [float __beamAmbience__]\n";
tmpDef.returnType = "void";
tmpDef.args = ["Json lightSource"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "localAnimator";
tmpDef.label = "clearLightSources";
tmpDef.description = "Clears the list of light sources to be rendered.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

// message
tmpDef = new LuaFunction;
tmpDef.module = "message";
tmpDef.label = "setHandler";
tmpDef.description = "Messages of the specified message type received by this script context will call the specified function. The first two arguments passed to the handler function will be the String messageName and a bool indicating whether the message is from a local entity, followed by any arguments sent with the message.";
tmpDef.returnType = "void";
tmpDef.args = ["String messageName", "LuaFunction handler"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// monster
tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "type";
tmpDef.description = "Returns the monster's configured monster type.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "seed";
tmpDef.description = "Returns a string representation of the monster's random seed.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "uniqueParameters";
tmpDef.description = "Returns a table of the monster's unique (override) parameters.";
tmpDef.returnType = "Json";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "familyIndex";
tmpDef.description = "Returns the monster's family index.";
tmpDef.returnType = "unsigned";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "level";
tmpDef.description = "Returns the monster's level.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setDamageOnTouch";
tmpDef.description = "Enables or disables the monster's touch damage.";
tmpDef.returnType = "void";
tmpDef.args = ["bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setDamageSources";
tmpDef.description = "Sets the monster's active damage sources (or clears them if unspecified).";
tmpDef.returnType = "void";
tmpDef.args = ["[List<DamageSource> damageSources]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setDamageParts";
tmpDef.description = "Sets the monster's active damage parts. Damage parts must be defined in the monster's configuration parameters. A damage part specifies a damage source and an animation part to anchor the damage source to. The anchor part's transformation will be applied to the damage source's damage poly, and if a vector, the damage source's knockback.";
tmpDef.returnType = "void";
tmpDef.args = ["StringSet damageParts"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setAggressive";
tmpDef.description = "Sets whether the monster is currently aggressive.";
tmpDef.returnType = "void";
tmpDef.args = ["bool aggressive"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setDropPool";
tmpDef.description = "Sets the monster's drop pool, which determines the items that it will drop on death. This can be specified as the String name of a treasure pool, or as a Map<String, String> to specify different drop pools for different damage types. If specified as a map, the pool should contain a \"default\" entry for unhandled damage types.";
tmpDef.returnType = "void";
tmpDef.args = ["Json dropPool"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "toAbsolutePosition";
tmpDef.description = "Returns an absolute world position calculated from the given relative position.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["Vec2F relativePosition"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "mouthPosition";
tmpDef.description = "Returns the world position of the monster's mouth.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "flyTo";
tmpDef.description = "Causes the monster to controlFly toward the given world position.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setDeathParticleBurst";
tmpDef.description = "Sets the name of the particle emitter (configured in the animation) to burst when the monster dies, or clears it if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["[String particleEmitter"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setDeathSound";
tmpDef.description = "Sets the name of the sound (configured in the animation) to play when the monster dies, or clears it if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["[String sound]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setPhysicsForces";
tmpDef.description = "Sets a list of physics force regions that the monster will project, used for applying forces to other nearby entities. Set an empty list to clear the force regions.";
tmpDef.returnType = "void";
tmpDef.args = ["List<PhysicsForceRegion> forceRegions"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setName";
tmpDef.description = "Sets the monster's name.";
tmpDef.returnType = "void";
tmpDef.args = ["String name"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setDisplayNametag";
tmpDef.description = "Sets whether the monster should display its nametag.";
tmpDef.returnType = "void";
tmpDef.args = ["bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "say";
tmpDef.description = "Causes the monster to say the line, optionally replacing any specified tags in the text. Returns true if anything is said (i.e. the line is not empty) and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["String line", "[Map<String", "String> tags]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "sayPortrait";
tmpDef.description = "Similar to monster.say, but uses a portrait chat bubble with the specified portrait image.";
tmpDef.returnType = "bool";
tmpDef.args = ["String line", "String portrait", "[Map<String, String> tags]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setDamageTeam";
tmpDef.description = "Sets the monster's current damage team type and number.";
tmpDef.returnType = "void";
tmpDef.args = ["DamageTeam team"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setUniqueId";
tmpDef.description = "Sets the monster's unique entity id, or clears it if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["[String uniqueId]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setDamageBar";
tmpDef.description = "Sets the type of damage bar that the monster should display. Valid options are \"default\", \"none\" and \"special\".";
tmpDef.returnType = "void";
tmpDef.args = ["String damageBarType"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setInteractive";
tmpDef.description = "Sets whether the monster is currently interactive.";
tmpDef.returnType = "void";
tmpDef.args = ["bool interactive"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "monster";
tmpDef.label = "setAnimationParameter";
tmpDef.description = "Sets a networked scripted animator parameter to be used in a client side rendering script using animationConfig.getParameter.";
tmpDef.returnType = "void";
tmpDef.args = ["String key", "Json value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// npc
tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "toAbsolutePosition";
tmpDef.description = "Returns the specified local position in world space.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["Vec2F offset"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "species";
tmpDef.description = "Returns the species of the npc.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "gender";
tmpDef.description = "Returns the gender of the npc";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "humanoidIdentity";
tmpDef.description = "Returns the specific humanoid identity of the npc, containing information such as hair style and idle pose.";
tmpDef.returnType = "Json";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "npcType";
tmpDef.description = "Returns the npc type of the npc.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "seed";
tmpDef.description = "Returns the seed used to generate this npc.";
tmpDef.returnType = "uint64_t";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "level";
tmpDef.description = "Returns the level of the npc.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "dropPools";
tmpDef.description = "Returns the list of treasure pools that will spawn when the npc dies.";
tmpDef.returnType = "List<String>";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setDropPools";
tmpDef.description = "Sets the list of treasure pools that will spawn when the npc dies.";
tmpDef.returnType = "void";
tmpDef.args = ["List<String> pools"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "energy";
tmpDef.description = "Returns the current energy of the npc. Same as status.resource(\"energy\")";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "maxEnergy";
tmpDef.description = "Returns the current energy of the npc. Same as status.maxResource(\"energy\")";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "say";
tmpDef.description = "Makes the npc say a string. Optionally pass in tags to replace text tags. Optionally give config options for the chat message.\n\nReturns whether the chat message was successfully added.\n\nAvailable options:\n\n{\n  drawBorder = true,\n  fontSize = 8,\n  color = {255, 255, 255},\n  sound = \"/sfx/humanoid/avian_chatter_male1.ogg\"\n}\n";
tmpDef.returnType = "bool";
tmpDef.args = ["String line", "[Map<String,String> tags]", "[Json config]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "sayPortrait";
tmpDef.description = "Makes the npc say a line, with a portrait chat bubble. Optionally pass in tags to replace text tags. Optionally give config options for the chat message.\nReturns whether the chat message was successfully added.\nAvailable options:\n\n{\n  drawMoreIndicator = true,\n  sound = \"/sfx/humanoid/avian_chatter_male1.ogg\"\n}\n";
tmpDef.returnType = "bool";
tmpDef.args = ["String line", "String portrait", "[Map<String,String> tags]", "[Json config]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "emote";
tmpDef.description = "Makes the npc show a facial emote.";
tmpDef.returnType = "void";
tmpDef.args = ["String emote"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "dance";
tmpDef.description = "Sets the current dance for the npc. Dances are defined in .dance files.";
tmpDef.returnType = "void";
tmpDef.args = ["String dance"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setInteractive";
tmpDef.description = "Sets whether the npc should be interactive.";
tmpDef.returnType = "void";
tmpDef.args = ["bool interactive"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setLounging";
tmpDef.description = "Sets the npc to lounge in a loungeable. Optionally specify which anchor (seat) to use.\nReturns whether the npc successfully lounged.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId loungeable", "[size_t anchorIndex]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "resetLounging";
tmpDef.description = "Makes the npc stop lounging.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "isLounging";
tmpDef.description = "Returns whether the npc is currently lounging.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "loungingIn";
tmpDef.description = "Returns the EntityId of the loungeable the NPC is currently lounging in. Returns nil if not lounging.";
tmpDef.returnType = "Maybe<EntityId>";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setOfferedQuests";
tmpDef.description = "Sets the list of quests the NPC will offer.";
tmpDef.returnType = "void";
tmpDef.args = ["JsonArray quests"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setTurnInQuests";
tmpDef.description = "Sets the list of quests the played can turn in at this npc.";
tmpDef.returnType = "void";
tmpDef.args = ["JsonArray quests"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setItemSlot";
tmpDef.description = "Sets the specified item slot to contain the specified item.\n\nPossible equipment items slots:\n* head\n* headCosmetic\n* chest\n* chestCosmetic\n* legs\n* legsCosmetic\n* back\n* backCosmetic\n* primary\n* alt";
tmpDef.returnType = "bool";
tmpDef.args = ["String slot", "ItemDescriptor item"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "getItemSlot";
tmpDef.description = "Returns the item currently in the specified item slot.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["String slot"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "disableWornArmor";
tmpDef.description = "Set whether the npc should not gain status effects from the equipped armor. Armor will still be visually equipped.";
tmpDef.returnType = "void";
tmpDef.args = ["bool disable"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "beginPrimaryFire";
tmpDef.description = "Toggles on firing the item equipped in the primary item slot.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "beginAltFire";
tmpDef.description = "Toggles on firing the item equipped in the alt item slot.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "endPrimaryFire";
tmpDef.description = "Toggles off firing the item equipped in the primary item slot.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "endAltFire";
tmpDef.description = "Toggles off firing the item equipped in the alt item slot.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setShifting";
tmpDef.description = "Sets whether tools should be used as though shift is held.";
tmpDef.returnType = "void";
tmpDef.args = ["bool shifting"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setDamageOnTouch";
tmpDef.description = "Sets whether damage on touch should be enabled.";
tmpDef.returnType = "void";
tmpDef.args = ["bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "aimPosition";
tmpDef.description = "Returns the current aim position in world space.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setAimPosition";
tmpDef.description = "Sets the aim position in world space.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setDeathParticleBurst";
tmpDef.description = "Sets a particle emitter to burst when the npc dies.";
tmpDef.returnType = "void";
tmpDef.args = ["String emitter"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setStatusText";
tmpDef.description = "Sets the text to appear above the npc when it first appears on screen.";
tmpDef.returnType = "void";
tmpDef.args = ["String status"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setDisplayNametag";
tmpDef.description = "Sets whether the nametag should be displayed above the NPC.";
tmpDef.returnType = "void";
tmpDef.args = ["bool display"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setPersistent";
tmpDef.description = "Sets whether this npc should persist after being unloaded.";
tmpDef.returnType = "void";
tmpDef.args = ["bool persistent"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setKeepAlive";
tmpDef.description = "Sets whether to keep this npc alive. If true, the npc will never be unloaded as long as the world is loaded.";
tmpDef.returnType = "void";
tmpDef.args = ["bool keepAlive"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setDamageTeam";
tmpDef.description = "Sets a damage team for the npc in the format: {type = \"enemy\", team = 2}";
tmpDef.returnType = "void";
tmpDef.args = ["Json damageTeam"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setAggressive";
tmpDef.description = "Sets whether the npc should be flagged as aggressive.";
tmpDef.returnType = "void";
tmpDef.args = ["bool aggressive"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "npc";
tmpDef.label = "setUniqueId";
tmpDef.description = "Sets a unique ID for this npc that can be used to access it. A unique ID has to be unique for the world the npc is on, but not universally unique.";
tmpDef.returnType = "void";
tmpDef.args = ["String uniqueId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// object
tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "name";
tmpDef.description = "Returns the object's type name.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "direction";
tmpDef.description = "Returns the object's facing direction. This will be 1 for right or -1 for left.";
tmpDef.returnType = "int";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "position";
tmpDef.description = "Returns the object's tile position. This is identical to entity.position(), so use that instead.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setInteractive";
tmpDef.description = "Sets whether the object is currently interactive.";
tmpDef.returnType = "void";
tmpDef.args = ["bool interactive"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "uniqueId";
tmpDef.description = "Returns the object's unique entity id, or nil if no unique id is set. This should be identical to entity.uniqueId(), so use that instead.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setUniqueId";
tmpDef.description = "Sets the objects unique entity id, or clears it if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["[String uniqueId]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "boundBox";
tmpDef.description = "Returns the object's metaBoundBox in world space.";
tmpDef.returnType = "RectF";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "spaces";
tmpDef.description = "Returns a list of the tile spaces that the object occupies.";
tmpDef.returnType = "List<Vec2I>";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setProcessingDirectives";
tmpDef.description = "Sets the image processing directives that should be applied to the object's animation.";
tmpDef.returnType = "void";
tmpDef.args = ["String directives"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setSoundEffectEnabled";
tmpDef.description = "Enables or disables the object's persistent sound effect, if one is configured.";
tmpDef.returnType = "void";
tmpDef.args = ["bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "smash";
tmpDef.description = "Breaks the object. If smash is true then it will be smashed, causing it to (by default) drop no items.";
tmpDef.returnType = "void";
tmpDef.args = ["[bool smash]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "level";
tmpDef.description = "Returns the \"level\" parameter if set, otherwise returns the current world's threat level.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "toAbsolutePosition";
tmpDef.description = "Returns an absolute world position calculated from the given relative position.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["Vec2F relativePosition"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "say";
tmpDef.description = "Causes the object to say the line, optionally replacing any specified tags in the text, and using the provided additional chat configuration. Returns true if anything is said (i.e. the line is not empty) and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["String line", "[Map<String, String> tags]", "[Json config]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "sayPortrait";
tmpDef.description = "Similar to object.say, but uses a portrait chat bubble with the specified portrait image.";
tmpDef.returnType = "bool";
tmpDef.args = ["String line", "String portrait", "[Map<String, String> tags]", "[Json config]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "isTouching";
tmpDef.description = "Returns true if the specified entity's collision area overlaps the object's bound box and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setLightColor";
tmpDef.description = "Sets the color of light for the object to emit. This is not the same as animator.setLightColor and the animator light configuration should be used for more featureful light sources.";
tmpDef.returnType = "void";
tmpDef.args = ["Color color"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "getLightColor";
tmpDef.description = "Returns the object's currently configured light color.";
tmpDef.returnType = "Color";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "inputNodeCount";
tmpDef.description = "Returns the number of wire input nodes the object has.";
tmpDef.returnType = "unsigned";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "outputNodeCount";
tmpDef.description = "Returns the number of wire output nodes the object has.";
tmpDef.returnType = "unsigned";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "getInputNodePosition";
tmpDef.description = "Returns the relative position of the specified wire input node.";
tmpDef.returnType = "Vec2I";
tmpDef.args = ["unsigned nodeIndex"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "getOutputNodePosition";
tmpDef.description = "Returns the relative position of the specified wire output node.";
tmpDef.returnType = "Vec2I";
tmpDef.args = ["unsigned nodeIndex"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "getInputNodeLevel";
tmpDef.description = "Returns the current level of the specified wire input node.";
tmpDef.returnType = "bool";
tmpDef.args = ["unsigned nodeIndex"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "getOutputNodeLevel";
tmpDef.description = "Returns the current level of the specified wire output node.";
tmpDef.returnType = "bool";
tmpDef.args = ["unsigned nodeIndex"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "isInputNodeConnected";
tmpDef.description = "Returns true if any wires are currently connected to the specified wire input node and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["unsigned nodeIndex"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "isOutputNodeConnected";
tmpDef.description = "Returns true if any wires are currently connected to the specified wire output node and false otherwise";
tmpDef.returnType = "bool";
tmpDef.args = ["unsigned nodeIndex"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "getInputNodeIds";
tmpDef.description = "Returns a map of the entity id of each wire entity connected to the given wire input node and the index of that entity's output node to which the input node is connected.";
tmpDef.returnType = "Map<EntityId,unsigned>";
tmpDef.args = ["unsigned nodeIndex"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "getOutputNodeIds";
tmpDef.description = "Returns a map of the entity id of each wire entity connected to the given wire output node and the index of that entity's input node to which the output node is connected.";
tmpDef.returnType = "Map<EntityId,unsigned>";
tmpDef.args = ["unsigned nodeIndex"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setOutputNodeLevel";
tmpDef.description = "Sets the level of the specified wire output node.";
tmpDef.returnType = "void";
tmpDef.args = ["unsigned nodeIndex", "bool level"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setAllOutputNodes";
tmpDef.description = "Sets the level of all wire output nodes.";
tmpDef.returnType = "void";
tmpDef.args = ["bool level"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setOfferedQuests";
tmpDef.description = "Sets the list of quests that the object will offer to start, or clears them if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["[JsonArray quests]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setTurnInQuests";
tmpDef.description = "Sets the list of quests that the object will accept turn-in for, or clears them if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["[JsonArray quests]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setConfigParameter";
tmpDef.description = "Sets the specified override configuration parameter for the object.";
tmpDef.returnType = "void";
tmpDef.args = ["String key", "Json value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setAnimationParameter";
tmpDef.description = "Sets the specified animation parameter for the object's scripted animator.";
tmpDef.returnType = "void";
tmpDef.args = ["String key", "Json value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setMaterialSpaces";
tmpDef.description = "Sets the object's material spaces to the specified list, or clears them if unspecified. List entries should be in the form of pair<Vec2I, String> specifying the relative position and material name of materials to be set. __Objects should only set material spaces within their occupied tile spaces to prevent Bad Things TM from happening.__";
tmpDef.returnType = "void";
tmpDef.args = ["[JsonArray spaces]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setDamageSources";
tmpDef.description = "Sets the object's active damage sources (or clears them if unspecified).";
tmpDef.returnType = "void";
tmpDef.args = ["[List<DamageSource> damageSources]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "health";
tmpDef.description = "Returns the object's current health.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "object";
tmpDef.label = "setHealth";
tmpDef.description = "Sets the object's current health.";
tmpDef.returnType = "void";
tmpDef.args = ["float health"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// objectAnimator
tmpDef = new LuaFunction;
tmpDef.module = "objectAnimator";
tmpDef.label = "getParameter";
tmpDef.description = "Returns the value for the specified object parameter. If there is no value set, returns the default.";
tmpDef.returnType = "Json";
tmpDef.args = ["String parameter", "Json default"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "objectAnimator";
tmpDef.label = "direction";
tmpDef.description = "Returns the object's facing direction. This will be 1 for right or -1 for left.";
tmpDef.returnType = "int";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "objectAnimator";
tmpDef.label = "position";
tmpDef.description = "Returns the object's tile position.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

// physics
tmpDef = new LuaFunction;
tmpDef.module = "physics";
tmpDef.label = "setForceEnabled";
tmpDef.description = "Enables or disables the specified physics force region.";
tmpDef.returnType = "void";
tmpDef.args = ["String force", "bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "physics";
tmpDef.label = "setCollisionPosition";
tmpDef.description = "Moves the specified physics collision region to the specified position.";
tmpDef.returnType = "void";
tmpDef.args = ["String collision", "Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "physics";
tmpDef.label = "setCollisionEnabled";
tmpDef.description = "Enables or disables the specified physics collision region.";
tmpDef.returnType = "void";
tmpDef.args = ["String collision", "bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// player
tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "id";
tmpDef.description = "Returns the player's entity id.";
tmpDef.returnType = "EntityId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "uniqueId";
tmpDef.description = "Returns the player's unique id.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "species";
tmpDef.description = "Returns the player's species.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "gender";
tmpDef.description = "Returns the player's gender.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "isAdmin";
tmpDef.description = "Returns whether the player is admin.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "interact";
tmpDef.description = "Triggers an interact action on the player as if they had initiated an interaction and the result had returned the specified interaction type and configuration. Can be used to e.g. open GUI windows normally triggered by player interaction with entities.";
tmpDef.returnType = "void";
tmpDef.args = ["String interactionType", "Json config", "[EntityId sourceEntityId]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "shipUpgrades";
tmpDef.description = "Returns a JSON object containing information about the player's current ship upgrades including \"shipLevel\", \"maxFuel\", \"crewSize\" and a list of \"capabilities\".";
tmpDef.returnType = "Json";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "upgradeShip";
tmpDef.description = "Applies the specified ship upgrades to the player's ship.";
tmpDef.returnType = "void";
tmpDef.args = ["Json shipUpgrades"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "setUniverseFlag";
tmpDef.description = "Sets the specified universe flag on the player's current universe.";
tmpDef.returnType = "void";
tmpDef.args = ["String flagName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "giveBlueprint";
tmpDef.description = "Teaches the player any recipes which can be used to craft the specified item.";
tmpDef.returnType = "void";
tmpDef.args = ["ItemDecriptor item"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "blueprintKnown";
tmpDef.description = "Returns true if the player knows one or more recipes to create the specified item and false otherwise.";
tmpDef.returnType = "void";
tmpDef.args = ["ItemDecriptor item"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "makeTechAvailable";
tmpDef.description = "Adds the specified tech to the player's list of available (unlockable) techs.";
tmpDef.returnType = "void";
tmpDef.args = ["String tech"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "makeTechUnavailable";
tmpDef.description = "Removes the specified tech from player's list of available (unlockable) techs.";
tmpDef.returnType = "void";
tmpDef.args = ["String tech"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "enableTech";
tmpDef.description = "Unlocks the specified tech, allowing it to be equipped through the tech GUI.";
tmpDef.returnType = "void";
tmpDef.args = ["String tech"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "equipTech";
tmpDef.description = "Equips the specified tech.";
tmpDef.returnType = "void";
tmpDef.args = ["String tech"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "unequipTech";
tmpDef.description = "Unequips the specified tech.";
tmpDef.returnType = "void";
tmpDef.args = ["String tech"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "availableTechs";
tmpDef.description = "Returns a list of the techs currently available to the player.";
tmpDef.returnType = "JsonArray";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "enabledTechs";
tmpDef.description = "Returns a list of the techs currently unlocked by the player.";
tmpDef.returnType = "JsonArray";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "equippedTech";
tmpDef.description = "Returns the name of the tech the player has currently equipped in the specified slot, or nil if no tech is equipped in that slot.";
tmpDef.returnType = "String";
tmpDef.args = ["String slot"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "currency";
tmpDef.description = "Returns the player's current total reserves of the specified currency.";
tmpDef.returnType = "unsigned";
tmpDef.args = ["String currencyName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "addCurrency";
tmpDef.description = "Increases the player's reserve of the specified currency by the specified amount.";
tmpDef.returnType = "void";
tmpDef.args = ["String currencyName", "unsigned amount"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "consumeCurrency";
tmpDef.description = "Attempts to consume the specified amount of the specified currency and returns true if successful and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["String currencyName", "unsigned amount"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "cleanupItems";
tmpDef.description = "Triggers an immediate cleanup of the player's inventory, removing item stacks with 0 quantity. May rarely be required in special cases of making several sequential modifications to the player's inventory within a single tick.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "giveItem";
tmpDef.description = "Adds the specified item to the player's inventory.";
tmpDef.returnType = "void";
tmpDef.args = ["ItemDescriptor item"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "hasItem";
tmpDef.description = "Returns true if the player's inventory contains an item matching the specified descriptor and false otherwise. If exactMatch is true then parameters as well as item name must match.";
tmpDef.returnType = "bool";
tmpDef.args = ["ItemDescriptor item", "[bool exactMatch]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "hasCountOfItem";
tmpDef.description = "Returns the total number of items in the player's inventory matching the specified descriptor. If exactMatch is true then parameters as well as item name must match.";
tmpDef.returnType = "unsigned";
tmpDef.args = ["ItemDescriptor item", "[bool exactMatch]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "consumeItem";
tmpDef.description = "Attempts to consume the specified item from the player's inventory and returns the item consumed if successful. If consumePartial is true, matching stacks totalling fewer items than the requested count may be consumed, otherwise the operation will only be performed if the full count can be consumed. If exactMatch is true then parameters as well as item name must match.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["ItemDescriptor item", "[bool consumePartial]", "[bool exactMatch]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "inventoryTags";
tmpDef.description = "Returns a summary of all tags of all items in the player's inventory. Keys in the returned map are tag names and their corresponding values are the total count of items including that tag.";
tmpDef.returnType = "Map<String,unsigned>";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "itemsWithTag";
tmpDef.description = "Returns a list of ItemDescriptors for all items in the player's inventory that include the specified tag.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["String tag"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "consumeTaggedItem";
tmpDef.description = "Consumes items from the player's inventory that include the matching tag, up to the specified count of items.";
tmpDef.returnType = "void";
tmpDef.args = ["String tag", "unsigned count"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "hasItemWithParameter";
tmpDef.description = "Returns true if the player's inventory contains at least one item which has the specified parameter set to the specified value.";
tmpDef.returnType = "bool";
tmpDef.args = ["String parameter", "Json value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "consumeItemWithParameter";
tmpDef.description = "Consumes items from the player's inventory that have the specified parameter set to the specified value, upt to the specified count of items.";
tmpDef.returnType = "void";
tmpDef.args = ["String parameter", "Json value", "unsigned count"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "getItemWithParameter";
tmpDef.description = "Returns the first item in the player's inventory that has the specified parameter set to the specified value, or nil if no such item is found.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["String parameter", "Json value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "primaryHandItem";
tmpDef.description = "Returns the player's currently equipped primary hand item, or nil if no item is equipped.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "altHandItem";
tmpDef.description = "Returns the player's currently equipped alt hand item, or nil if no item is equipped.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "primaryHandItemTags";
tmpDef.description = "Returns a list of the tags on the currently equipped primary hand item, or nil if no item is equipped.";
tmpDef.returnType = "JsonArray";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "altHandItemTags";
tmpDef.description = "Returns a list of the tags on the currently equipped alt hand item, or nil if no item is equipped.";
tmpDef.returnType = "JsonArray";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "essentialItem";
tmpDef.description = "Returns the contents of the specified essential slot, or nil if the slot is empty. Essential slot names are \"beamaxe\", \"wiretool\", \"painttool\" and \"inspectiontool\".";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["String slotName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "giveEssentialItem";
tmpDef.description = "Sets the contents of the specified essential slot to the specified item.";
tmpDef.returnType = "void";
tmpDef.args = ["String slotName", "ItemDescriptor item"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "removeEssentialItem";
tmpDef.description = "Removes the essential item in the specified slot.";
tmpDef.returnType = "void";
tmpDef.args = ["String slotName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "equippedItem";
tmpDef.description = "Returns the contents of the specified equipment slot, or nil if the slot is empty. Equipment slot names are \"head\", \"chest\", \"legs\", \"back\", \"headCosmetic\", \"chestCosmetic\", \"legsCosmetic\" and \"backCosmetic\".";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["String slotName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "setEquippedItem";
tmpDef.description = "Sets the item in the specified equipment slot to the specified item.";
tmpDef.returnType = "void";
tmpDef.args = ["String slotName", "Json item"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "swapSlotItem";
tmpDef.description = "Returns the contents of the player's swap (cursor) slot, or nil if the slot is empty.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "setSwapSlotItem";
tmpDef.description = "Sets the item in the player's swap (cursor) slot to the specified item.";
tmpDef.returnType = "void";
tmpDef.args = ["Json item"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "canStartQuest";
tmpDef.description = "Returns true if the player meets all of the prerequisites to start the specified quest and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Json questDescriptor"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "startQuest";
tmpDef.description = "Starts the specified quest, optionally using the specified server Uuid and world id, and returns the quest id of the started quest.";
tmpDef.returnType = "QuestId";
tmpDef.args = ["Json questDescriptor", "[String serverUuid]", "[String worldId]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "hasQuest";
tmpDef.description = "Returns true if the player has a quest, in any state, with the specified quest id and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["String questId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "hasCompletedQuest";
tmpDef.description = "Returns true if the player has a completed quest with the specified quest id and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["String questId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "enableMission";
tmpDef.description = "Adds the specified mission to the player's list of available missions.";
tmpDef.returnType = "void";
tmpDef.args = ["String missionName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "completeMission";
tmpDef.description = "Adds the specified mission to the player's list of completed missions.";
tmpDef.returnType = "void";
tmpDef.args = ["String missionName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "radioMessage";
tmpDef.description = "Triggers the specified radio message for the player, either immediately or with the specified delay.";
tmpDef.returnType = "void";
tmpDef.args = ["Json messageConfig", "[float delay]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "worldId";
tmpDef.description = "Returns a String representation of the world id of the player's current world.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "serverUuid";
tmpDef.description = "Returns a String representation of the player's Uuid on the server.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "ownShipWorldId";
tmpDef.description = "Returns a String representation of the world id of the player's ship world.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "lounge";
tmpDef.description = "Triggers the player to lounge in the specified loungeable entity at the specified lounge anchor index (default is 0).";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId loungeableId", "[unsigned anchorIndex]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "isLounging";
tmpDef.description = "Returns true if the player is currently occupying a loungeable entity and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "loungingIn";
tmpDef.description = "If the player is currently lounging, returns the entity id of what they are lounging in.";
tmpDef.returnType = "EntityId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "playTime";
tmpDef.description = "Returns the total played time for the player.";
tmpDef.returnType = "double";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "introComplete";
tmpDef.description = "Returns true if the player is marked as having completed the intro instance and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "setIntroComplete";
tmpDef.description = "Sets whether the player is marked as having completed the intro instance.";
tmpDef.returnType = "void";
tmpDef.args = ["bool complete"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "warp";
tmpDef.description = "Immediately warps the player to the specified warp target, optionally using the specified warp animation and deployment.";
tmpDef.returnType = "void";
tmpDef.args = ["String warpAction", "[String animation]", "[bool deploy]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "canDeploy";
tmpDef.description = "Returns whether the player has a deployable mech.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "isDeployed";
tmpDef.description = "Returns whether the player is currently deployed.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "confirm";
tmpDef.description = "Displays a confirmation dialog to the player with the specified dialog configuration and returns an RpcPromise which can be used to retrieve the player's response to that dialog.";
tmpDef.returnType = "RpcPromise";
tmpDef.args = ["Json dialogConfig"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "playCinematic";
tmpDef.description = "Triggers the specified cinematic to be displayed for the player. If unique is true the cinematic will only be shown to that player once.";
tmpDef.returnType = "void";
tmpDef.args = ["Json cinematic", "[bool unique]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "recordEvent";
tmpDef.description = "Triggers the specified event on the player with the specified fields. Used to record data e.g. for achievements.";
tmpDef.returnType = "void";
tmpDef.args = ["String event", "Json fields"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "worldHasOrbitBookmark";
tmpDef.description = "Returns whether the player has a bookmark for the specified celestial coordinate.";
tmpDef.returnType = "bool";
tmpDef.args = ["Json coordinate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "orbitBookmarks";
tmpDef.description = "Returns a list of orbit bookmarks with their system coordinates.";
tmpDef.returnType = "List<pair<Vec3I,Json>>";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "systemBookmarks";
tmpDef.description = "Returns a list of orbit bookmarks in the specified system.";
tmpDef.returnType = "List<Json>";
tmpDef.args = ["Json systemCoordinate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "addOrbitBookmark";
tmpDef.description = "Adds the specified bookmark to the player's bookmark list and returns true if the bookmark was successfully added (and was not already known) and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Json systemCoordinate", "Json bookmarkConfig"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "removeOrbitBookmark";
tmpDef.description = "Removes the specified bookmark from the player's bookmark list and returns true if the bookmark was successfully removed and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Json systemCoordinate", "Json bookmarkConfig"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "addTeleportBookmark";
tmpDef.description = "Adds the specified bookmark to the player's bookmark list and returns true if the bookmark was successfully added (and was not already known) and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Json bookmarkConfig"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "isMapped";
tmpDef.description = "Returns whether the player has previously visited the specified coordinate.";
tmpDef.returnType = "bool";
tmpDef.args = ["Json coordinate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "mappedObjects";
tmpDef.description = "Returns uuid, type, and orbits for all system objects in the specified system;";
tmpDef.returnType = "Json";
tmpDef.args = ["Json systemCoordinate"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "player";
tmpDef.label = "collectables";
tmpDef.description = "Returns a list of names of the collectables the player has unlocked in the specified collection.";
tmpDef.returnType = "List<String>";
tmpDef.args = ["String collectionName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// playerCompanions
tmpDef = new LuaFunction;
tmpDef.module = "playerCompanions";
tmpDef.label = "getCompanions";
tmpDef.description = "Returns a list of configurations for all companions of the specified type.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["String companionType"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "playerCompanions";
tmpDef.label = "setCompanions";
tmpDef.description = "Sets the player's companions of the specified type to the specified list of companion configurations.";
tmpDef.returnType = "void";
tmpDef.args = ["String companionType", "JsonArray companions"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// projectile
tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "getParameter";
tmpDef.description = "Returns the value for the specified config parameter. If there is no value set, returns the default.";
tmpDef.returnType = "Json";
tmpDef.args = ["String parameter", "Json default"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "die";
tmpDef.description = "Destroys the projectile.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "sourceEntity";
tmpDef.description = "Returns the entity id of the projectile's source entity, or nil if no source entity is set.";
tmpDef.returnType = "EntityId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "powerMultiplier";
tmpDef.description = "Returns the projectile's power multiplier.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "power";
tmpDef.description = "Returns the projectile's power (damage).";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "setPower";
tmpDef.description = "Sets the projectile's power (damage).";
tmpDef.returnType = "void";
tmpDef.args = ["float power"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "timeToLive";
tmpDef.description = "Returns the projectile's current remaining time to live.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "setTimeToLive";
tmpDef.description = "Sets the projectile's current remaining time to live. Altering the time to live may cause visual disparity between the projectile's master and slave entities.";
tmpDef.returnType = "void";
tmpDef.args = ["float timeToLive"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "collision";
tmpDef.description = "Returns true if the projectile has collided and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "processAction";
tmpDef.description = "Immediately performs the specified action. Action should be specified in a format identical to a single entry in e.g. actionOnReap in the projectile's configuration. This function will not properly perform rendering actions as they will not be networked.";
tmpDef.returnType = "void";
tmpDef.args = ["Json action"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "projectile";
tmpDef.label = "setReferenceVelocity";
tmpDef.description = "Sets the projectile's reference velocity (a base velocity to which movement is relative)";
tmpDef.returnType = "'void'";
tmpDef.args = ["Maybe<Vec2F> velocity"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// quest
tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "state";
tmpDef.description = "Returns the current state of the quest.\n\nPossible states:\n* \"New\"\n* \"Offer\"\n* \"Active\"\n* \"Complete\"\n* \"Failed\"";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "complete";
tmpDef.description = "Immediately completes the quest.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "fail";
tmpDef.description = "Immediately fails the quest.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setCanTurnIn";
tmpDef.description = "Sets whether the quest can be turned in.";
tmpDef.returnType = "void";
tmpDef.args = ["bool turnIn"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "questId";
tmpDef.description = "Returns the quest id.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "templateId";
tmpDef.description = "Returns the ID of the template used to make this quest.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "seed";
tmpDef.description = "Returns the seed used to generate the quest.";
tmpDef.returnType = "uint64_t";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "questDescriptor";
tmpDef.description = "Returns the quest descriptor including parameters.";
tmpDef.returnType = "Json";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "questArcDescriptor";
tmpDef.description = "Returns the quest arc descriptor.";
tmpDef.returnType = "Json";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "questArcPosition";
tmpDef.description = "Returns the quest arc position. (?)";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "worldId";
tmpDef.description = "Returns the world id for the quest arc.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "serverUuid";
tmpDef.description = "Returns the server uuid for the quest.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "parameters";
tmpDef.description = "Returns all quest parameters.";
tmpDef.returnType = "QuestParameters";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setParameter";
tmpDef.description = "Sets a quest parameter.";
tmpDef.returnType = "void";
tmpDef.args = ["String name", "Json value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setIndicators";
tmpDef.description = "Set a list of quest parameters to use as custom indicators.";
tmpDef.returnType = "void";
tmpDef.args = ["List<String> indicators"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setObjectiveList";
tmpDef.description = "Set the objectives for the quest tracker. Objectives are in the format {text, completed}";
tmpDef.returnType = "void";
tmpDef.args = ["JsonArray objectives"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setProgress";
tmpDef.description = "Sets the progress amount of the quest tracker progress bar. Set nil to hide. Progress is from 0.0 to 1.0.";
tmpDef.returnType = "void";
tmpDef.args = ["float progress"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setCompassDirection";
tmpDef.description = "Set the angle of the quest tracker compass. Setting nil hides the compass.";
tmpDef.returnType = "void";
tmpDef.args = ["float angle"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setTitle";
tmpDef.description = "Sets the title of the quest in the quest log.";
tmpDef.returnType = "void";
tmpDef.args = ["String title"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setText";
tmpDef.description = "Set the text for the quest in the quest log.";
tmpDef.returnType = "void";
tmpDef.args = ["String text"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setCompletionText";
tmpDef.description = "Sets the text shown in the completion window when the quest is completed.";
tmpDef.returnType = "void";
tmpDef.args = ["String completionText"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setFailureText";
tmpDef.description = "Sets the text shown in the completion window when the quest is failed.";
tmpDef.returnType = "void";
tmpDef.args = ["String failureText"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setPortrait";
tmpDef.description = "Sets a portrait to a list of drawables.";
tmpDef.returnType = "void";
tmpDef.args = ["String portraitName", "JsonArray portrait"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "setPortraitTitle";
tmpDef.description = "Sets a portrait title.";
tmpDef.returnType = "void";
tmpDef.args = ["String portraitName", "String title"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "quest";
tmpDef.label = "addReward";
tmpDef.description = "Add an item to the reward pool.";
tmpDef.returnType = "void";
tmpDef.args = ["ItemDescriptor reward"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// root
tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "assetJson";
tmpDef.description = "Returns the contents of the specified JSON asset file.";
tmpDef.returnType = "Json";
tmpDef.args = ["String assetPath"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "makeCurrentVersionedJson";
tmpDef.description = "Returns a versioned JSON representation of the given JSON content with the given identifier and the most recent version as specified in versioning.config.";
tmpDef.returnType = "Json";
tmpDef.args = ["String versioningIdentifier", "Json content"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "loadVersionedJson";
tmpDef.description = "Returns the given JSON content and identifier after applying appropriate versioning scripts to bring it up to the most recent version as specified in versioning.config.";
tmpDef.returnType = "Json";
tmpDef.args = ["Json versionedContent", "String versioningIdentifier"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "evalFunction";
tmpDef.description = "Returns the evaluation of the specified univariate function (as defined in a .functions file) for the given input value.";
tmpDef.returnType = "double";
tmpDef.args = ["String functionName", "double input"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "evalFunction2";
tmpDef.description = "Returns the evaluation of the specified bivariate function (as defined in a .2functions file) for the given input values.";
tmpDef.returnType = "double";
tmpDef.args = ["String functionName", "double input1", "double input2"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "imageSize";
tmpDef.description = "Returns the pixel dimensions of the specified image asset.";
tmpDef.returnType = "Vec2U";
tmpDef.args = ["String imagePath"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "imageSpaces";
tmpDef.description = "Returns a list of the world tile spaces the image would occupy if placed at the given position using the specified spaceScan value (the portion of a space that must be non-transparent for that space to count as filled).";
tmpDef.returnType = "List<Vec2I>";
tmpDef.args = ["String imagePath", "Vec2F worldPosition", "float spaceScan", "bool flip"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "nonEmptyRegion";
tmpDef.description = "Returns the rectangle containing the portion of the specified asset image that is non-transparent.";
tmpDef.returnType = "RectU";
tmpDef.args = ["String imagePath"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "npcConfig";
tmpDef.description = "Returns a representation of the generated JSON configuration for an NPC of the given type.";
tmpDef.returnType = "Json";
tmpDef.args = ["String npcType"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "npcVariant";
tmpDef.description = "Generates an NPC with the specified species, type, level, seed and parameters, and returns its configuration.";
tmpDef.returnType = "Json";
tmpDef.args = ["String species", "String npcType", "float level", "[unsigned seed]", "[Json parameters]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "projectileGravityMultiplier";
tmpDef.description = "Returns the gravity multiplier of the given projectile's movement controller configuration as configured in physics.config.";
tmpDef.returnType = "float";
tmpDef.args = ["String projectileName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "projectileConfig";
tmpDef.description = "Returns a representation of the JSON configuration for the given projectile.";
tmpDef.returnType = "Json";
tmpDef.args = ["String projectileName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "itemDescriptorsMatch";
tmpDef.description = "Returns true if the given item descriptors match. If exactMatch is true then both names and parameters will be compared, otherwise only names.";
tmpDef.returnType = "Json";
tmpDef.args = ["ItemDescriptor descriptor1", "ItemDescriptor descriptor2", "[bool exactMatch]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "recipesForItem";
tmpDef.description = "Returns a list of JSON configurations of all recipes which output the given item.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["String itemName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "itemType";
tmpDef.description = "Returns the item type name for the specified item.";
tmpDef.returnType = "String";
tmpDef.args = ["String itemName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "itemTags";
tmpDef.description = "Returns a list of the tags applied to the specified item.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["String itemName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "itemHasTag";
tmpDef.description = "Returns true if the given item's tags include the specified tag and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["String itemName", "String tagName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "itemConfig";
tmpDef.description = "Generates an item from the specified descriptor, level and seed and returns a JSON object containing the directory, config and parameters for that item.";
tmpDef.returnType = "Json";
tmpDef.args = ["ItemDescriptor descriptor", "[float level]", "[unsigned seed]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "createItem";
tmpDef.description = "Generates an item from the specified descriptor, level and seed and returns a new item descriptor for the resulting item.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["ItemDescriptor descriptor", "[float level]", "[unsigned seed]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "tenantConfig";
tmpDef.description = "Returns the JSON configuration for the given tenant.";
tmpDef.returnType = "Json";
tmpDef.args = ["String tenantName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "getMatchingTenants";
tmpDef.description = "Returns an array of JSON configurations of tenants matching the given map of colony tags and corresponding object counts.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["map<String, unsigned> colonyTags"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "liquidStatusEffects";
tmpDef.description = "Returns an array of status effects applied by the given liquid.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["LiquidId liquid"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "generateName";
tmpDef.description = "Returns a randomly generated name using the specified name gen config and seed.";
tmpDef.returnType = "String";
tmpDef.args = ["String assetPath", "[unsigned seed]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "questConfig";
tmpDef.description = "Returns the JSON configuration of the specified quest template.";
tmpDef.returnType = "Json";
tmpDef.args = ["String questTemplateId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "npcPortrait";
tmpDef.description = "Generates an NPC with the specified type, level, seed and parameters and returns a portrait in the given portraitMode as a list of drawables.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["String portraitMode", "String species", "String npcType", "float level", "[unsigned seed]", "[Json parameters]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "monsterPortrait";
tmpDef.description = "Generates a monster of the given type with the given parameters and returns its portrait as a list of drawables.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["String typeName", "[Json parameters]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "isTreasurePool";
tmpDef.description = "Returns true if the given treasure pool exists and false otherwise. Can be used to guard against errors attempting to generate invalid treasure.";
tmpDef.returnType = "bool";
tmpDef.args = ["String poolName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "createTreasure";
tmpDef.description = "Generates an instance of the specified treasure pool, level and seed and returns the contents as a list of item descriptors.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["String poolName", "float level", "[unsigned seed]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "materialMiningSound";
tmpDef.description = "Returns the path of the mining sound asset for the given material and mod combination, or nil if no mining sound is set.";
tmpDef.returnType = "String";
tmpDef.args = ["String materialName", "[String modName]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "materialFootstepSound";
tmpDef.description = "Returns the path of the footstep sound asset for the given material and mod combination, or nil if no footstep sound is set.";
tmpDef.returnType = "String";
tmpDef.args = ["String materialName", "[String modName]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "materialHealth";
tmpDef.description = "Returns the configured health value for the specified material.";
tmpDef.returnType = "float";
tmpDef.args = ["String materialName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "materialConfig";
tmpDef.description = "Returns a JSON object containing the path and base config for the specified material if it is a real material, or nil if it is a metamaterial or invalid.";
tmpDef.returnType = "Json";
tmpDef.args = ["String materialName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "modConfig";
tmpDef.description = "Returns a JSON object containing the path and base config for the specified mod if it is a real mod, or nil if it is a metamod or invalid.";
tmpDef.returnType = "Json";
tmpDef.args = ["String modName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "liquidConfig";
tmpDef.description = "Returns a JSON object containing the path and base config for the specified liquid name or id if it is a real liquid, or nil if the liquid is empty or invalid.";
tmpDef.returnType = "Json";
tmpDef.args = ["LiquidId/String liquidId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "liquidName";
tmpDef.description = "Returns the string name of the liquid with the given ID.";
tmpDef.returnType = "String";
tmpDef.args = ["LiquidId liquidId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "liquidId";
tmpDef.description = "Returns the numeric ID of the liquid with the given name.";
tmpDef.returnType = "LiquidId";
tmpDef.args = ["String liquidName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "monsterSkillParameter";
tmpDef.description = "Returns the value of the specified parameter for the specified monster skill.";
tmpDef.returnType = "Json";
tmpDef.args = ["String skillName", "String parameterName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "monsterParameters";
tmpDef.description = "Returns the parameters for a monster type.";
tmpDef.returnType = "Json";
tmpDef.args = ["String monsterType"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "monsterMovementSettings";
tmpDef.description = "Returns the configured base movement parameters for the specified monster type.";
tmpDef.returnType = "ActorMovementParameters";
tmpDef.args = ["String monsterType"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "createBiome";
tmpDef.description = "Generates a biome with the specified name, seed, vertical midpoint and threat level, and returns a JSON object containing the configuration for the generated biome.";
tmpDef.returnType = "Json";
tmpDef.args = ["String biomeName", "unsigned seed", "float verticalMidPoint", "float threatLevel"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "hasTech";
tmpDef.description = "Returns true if a tech with the specified name exists and false otherwise.";
tmpDef.returnType = "String";
tmpDef.args = ["String techName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "techType";
tmpDef.description = "Returns the type (tech slot) of the specified tech.";
tmpDef.returnType = "String";
tmpDef.args = ["String techName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "techConfig";
tmpDef.description = "Returns the JSON configuration for the specified tech.";
tmpDef.returnType = "Json";
tmpDef.args = ["String techName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "treeStemDirectory";
tmpDef.description = "Returns the path within assets from which the specified tree stem type was loaded.";
tmpDef.returnType = "String";
tmpDef.args = ["String stemName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "treeFoliageDirectory";
tmpDef.description = "Returns the path within assets from which the specified tree foliage type was loaded.";
tmpDef.returnType = "String";
tmpDef.args = ["String foliageName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "collection";
tmpDef.description = "Returns the metadata for the specified collection.";
tmpDef.returnType = "Collection";
tmpDef.args = ["String collectionName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "collectables";
tmpDef.description = "Returns a list of collectables for the specified collection.";
tmpDef.returnType = "List<Collectable>";
tmpDef.args = ["String collectionName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "elementalResistance";
tmpDef.description = "Returns the name of the stat used to calculate elemental resistance for the specified elemental type.";
tmpDef.returnType = "String";
tmpDef.args = ["String elementalType"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "dungeonMetadata";
tmpDef.description = "Returns the metadata for the specified dungeon definition.";
tmpDef.returnType = "Json";
tmpDef.args = ["String dungeonName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "root";
tmpDef.label = "behavior";
tmpDef.description = "Loads a behavior and returns the behavior state as userdata.\n\ncontext is the current lua context called from, in almost all cases _ENV.\n\nconfig can be either the String name of a behavior tree, or an entire behavior tree configuration to be built.\n\nparameters is overrides for parameters for the behavior tree.\n\nBehaviorState contains 2 methods:\n\nbehavior:init(_ENV) -- initializes the behavior, loads required scripts, and returns a new behavior state\nbehavior:run(state, dt) -- runs the behavior, takes a behavior state for the first argument\nbehavior:clear(state) -- resets the internal state of the behavior";
tmpDef.returnType = "BehaviorState";
tmpDef.args = ["LuaTable context", "Json config", "JsonObject parameters"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// animationConfig
tmpDef = new LuaFunction;
tmpDef.module = "animationConfig";
tmpDef.label = "animationParameter";
tmpDef.description = "Returns a networked value set by the parent entity's master script.";
tmpDef.returnType = "Json";
tmpDef.args = ["String key"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animationConfig";
tmpDef.label = "partPoint";
tmpDef.description = "Returns a Vec2F configured in a part's properties with all of the part's transformations applied to it.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["String partName", "String propertyName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "animationConfig";
tmpDef.label = "partPoly";
tmpDef.description = "Returns a PolyF configured in a part's properties with all the part's transformations applied to it.";
tmpDef.returnType = "PolyF";
tmpDef.args = ["String partName", "String propertyName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// stagehand
tmpDef = new LuaFunction;
tmpDef.module = "stagehand";
tmpDef.label = "id";
tmpDef.description = "Returns the stagehand's entity id. Identical to entity.id(), so use that instead.";
tmpDef.returnType = "EntityId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "stagehand";
tmpDef.label = "position";
tmpDef.description = "Returns the stagehand's position. This is identical to entity.position(), so use that instead.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "stagehand";
tmpDef.label = "setPosition";
tmpDef.description = "Moves the stagehand to the specified position.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "stagehand";
tmpDef.label = "die";
tmpDef.description = "Destroys the stagehand.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "stagehand";
tmpDef.label = "typeName";
tmpDef.description = "Returns the stagehand's type name.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "stagehand";
tmpDef.label = "setUniqueId";
tmpDef.description = "Sets the stagehand's unique entity id, or clears it if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["[String uniqueId]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// status
tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "statusProperty";
tmpDef.description = "Returns the value assigned to the specified status property. If there is no value set, returns default.";
tmpDef.returnType = "Json";
tmpDef.args = ["String name", "Json default"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "setStatusProperty";
tmpDef.description = "Sets a status property to the specified value.";
tmpDef.returnType = "void";
tmpDef.args = ["String name", "Json value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "stat";
tmpDef.description = "Returns the value for the specified stat. Defaults to 0.0 if the stat does not exist.";
tmpDef.returnType = "float";
tmpDef.args = ["String statName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "statPositive";
tmpDef.description = "Returns whether the stat value is greater than 0.";
tmpDef.returnType = "bool";
tmpDef.args = ["String statName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "resourceNames";
tmpDef.description = "Returns a list of the names of all the configured resources;";
tmpDef.returnType = "List<String>";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "isResource";
tmpDef.description = "Returns whether the specified resource exists in this status controller.";
tmpDef.returnType = "bool";
tmpDef.args = ["String resourceName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "resource";
tmpDef.description = "Returns the value of the specified resource.";
tmpDef.returnType = "float";
tmpDef.args = ["String resourceName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "resourcePositive";
tmpDef.description = "Returns whether the value of the specified resource is greater than 0.";
tmpDef.returnType = "bool";
tmpDef.args = ["String resourceName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "setResource";
tmpDef.description = "Sets a resource to the specified value.";
tmpDef.returnType = "void";
tmpDef.args = ["String resourceName", "float value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "modifyResource";
tmpDef.description = "Adds the specified value to a resource.";
tmpDef.returnType = "void";
tmpDef.args = ["String resourceName", "float value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "giveResource";
tmpDef.description = "Adds the specified value to a resource. Returns any overflow.";
tmpDef.returnType = "float";
tmpDef.args = ["String resourceName", "float value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "consumeResource";
tmpDef.description = "Tries to consume the specified amount from a resource. Returns whether the full amount was able to be consumes. Does not modify the resource if unable to consume the full amount.";
tmpDef.returnType = "bool";
tmpDef.args = ["String resourceName", "float amount"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "overConsumeResource";
tmpDef.description = "Tries to consume the specified amount from a resource. If unable to consume the full amount, will consume all the remaining amount. Returns whether it was able to consume any at all of the resource.";
tmpDef.returnType = "bool";
tmpDef.args = ["String resourceName", "float amount"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "resourceLocked";
tmpDef.description = "Returns whether the resource is currently locked.";
tmpDef.returnType = "bool";
tmpDef.args = ["String resourceName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "setResourceLocked";
tmpDef.description = "Sets a resource to be locked/unlocked. A locked resource cannot be consumed.";
tmpDef.returnType = "void";
tmpDef.args = ["String resourceName", "bool locked"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "resetResource";
tmpDef.description = "Resets a resource to its base value.";
tmpDef.returnType = "void";
tmpDef.args = ["String resourceName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "resetAllResources";
tmpDef.description = "Resets all resources to their base values.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "resourceMax";
tmpDef.description = "Returns the max value for the specified resource.";
tmpDef.returnType = "float";
tmpDef.args = ["String resourceName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "resourcePercentage";
tmpDef.description = "Returns the percentage of max that the resource is currently at. From 0.0 to 1.0.";
tmpDef.returnType = "float";
tmpDef.args = ["String resourceName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "setResourcePercentage";
tmpDef.description = "Sets a resource to a percentage of the max value for the resource. From 0.0 to 1.0.";
tmpDef.returnType = "void";
tmpDef.args = ["String resourceName", "float value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "modifyResourcePercentage";
tmpDef.description = "Adds a percentage of the max resource value to the current value of the resource.";
tmpDef.returnType = "void";
tmpDef.args = ["String resourceName", "float value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "getPersistentEffects";
tmpDef.description = "Returns a list of the currently active persistent effects in the specified effect category.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["String effectCategory"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "addPersistentEffect";
tmpDef.description = "Adds a status effect to the specified effect category.";
tmpDef.returnType = "void";
tmpDef.args = ["String effectCategory", "Json effect"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "addPersistentEffects";
tmpDef.description = "Adds a list of effects to the specified effect category.";
tmpDef.returnType = "void";
tmpDef.args = ["String effectCategory", "JsonArray effects"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "setPersistentEffects";
tmpDef.description = "Sets the list of effects of the specified effect category. Replaces the current list active effects.";
tmpDef.returnType = "void";
tmpDef.args = ["String effectCategory", "JsonArray effects"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "clearPersistentEffects";
tmpDef.description = "Clears any status effects from the specified effect category.";
tmpDef.returnType = "void";
tmpDef.args = ["String effectCategory"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "clearAllPersistentEffects";
tmpDef.description = "Clears all persistent status effects from all effect categories.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "addEphemeralEffect";
tmpDef.description = "Adds the specified unique status effect. Optionally with a custom duration, and optionally with a source entity id accessible in the status effect.";
tmpDef.returnType = "void";
tmpDef.args = ["String effectName", "[float duration]", "[EntityId sourceEntity]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "addEphemeralEffects";
tmpDef.description = "Adds a list of unique status effects. Optionally with a source entity id.\n\nUnique status effects can be specified either as a string, \"myuniqueeffect\", or as a table, {effect = \"myuniqueeffect\", duration = 5}. Remember that this function takes a list of these effect descriptors. This is a valid list of effects: { \"myuniqueeffect\", {effect = \"myothereffect\", duration = 5} }";
tmpDef.returnType = "void";
tmpDef.args = ["JsonArray effects", "[EntityId sourceEntity]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "removeEphemeralEffect";
tmpDef.description = "Removes the specified unique status effect.";
tmpDef.returnType = "void";
tmpDef.args = ["String effectName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "clearEphemeralEffects";
tmpDef.description = "Clears all ephemeral status effects.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "damageTakenSince";
tmpDef.description = "Returns two values:\n* A list of damage notifications for the entity's damage taken since the specified heartbeat.\n* The most recent heartbeat to be passed into the function again to get the damage notifications taken since this function call.";
tmpDef.returnType = "List<pair<DamageNotification>>,unsigned";
tmpDef.args = ["[unsigned since = 0]]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "inflictedHitsSince";
tmpDef.description = "Returns two values:\n* A list {{entityId, damageRequest}} for the entity's inflicted hits since the specified heartbeat.\n* The most recent heartbeat to be passed into the function again to get the inflicted hits since this function call.";
tmpDef.returnType = "List<pair<EntityId,DamageRequest>>,unsigned";
tmpDef.args = ["[unsigned since = 0]]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "inflictedDamageSince";
tmpDef.description = "Returns two values:\n* A list of damage notifications for damage inflicted by the entity.\n* The most recent heartbeat to be passed into the function again to get the list of damage notifications since the last call.";
tmpDef.returnType = "List<DamageNotification>,unsigned";
tmpDef.args = ["[unsigned since = 0]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "activeUniqueStatusEffectSummary";
tmpDef.description = "Returns a list of two element tables describing all unique status effects currently active on the status controller. Each entry consists of the String name of the effect and a float between 0 and 1 indicating the remaining portion of that effect's duration.";
tmpDef.returnType = "JsonArray";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "primaryDirectives";
tmpDef.description = "Returns the primary set of image processing directives applied to the animation of the entity using this status controller.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "setPrimaryDirectives";
tmpDef.description = "Sets the primary set of image processing directives that should be applied to the animation of the entity using this status controller.";
tmpDef.returnType = "void";
tmpDef.args = ["[String directives]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "status";
tmpDef.label = "applySelfDamageRequest";
tmpDef.description = "Directly applies the specified damage request to the entity using this status controller.";
tmpDef.returnType = "void";
tmpDef.args = ["DamageRequest damageRequest"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// effect
tmpDef = new LuaFunction;
tmpDef.module = "effect";
tmpDef.label = "duration";
tmpDef.description = "Returns the remaining duration of the status effect.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "effect";
tmpDef.label = "modifyDuration";
tmpDef.description = "Adds the specified duration to the current remaining duration.";
tmpDef.returnType = "void";
tmpDef.args = ["float duration"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "effect";
tmpDef.label = "expire";
tmpDef.description = "Immediately expire the effect, setting the duration to 0.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "effect";
tmpDef.label = "sourceEntity";
tmpDef.description = "Returns the source entity id of the status effect, if any.";
tmpDef.returnType = "EntityId";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "effect";
tmpDef.label = "setParentDirectives";
tmpDef.description = "Sets image processing directives for the entity the status effect is active on.";
tmpDef.returnType = "void";
tmpDef.args = ["String directives"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "effect";
tmpDef.label = "getParameter";
tmpDef.description = "Returns the value associated with the parameter name in the effect configuration. If no value is set, returns the default specified.";
tmpDef.returnType = "Json";
tmpDef.args = ["String name", "Json def"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "effect";
tmpDef.label = "addStatModifierGroup";
tmpDef.description = "Adds a new stat modifier group and returns the ID created for the group. Stat modifier groups will stay active until the effect expires.";
tmpDef.returnType = "StatModifierGroupId";
tmpDef.args = ["List<StatModifier> modifiers"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "effect";
tmpDef.label = "setStatModifierGroup";
tmpDef.description = "Replaces the list of stat modifiers in a group with the specified modifiers.";
tmpDef.returnType = "void";
tmpDef.args = ["StatModifierGroupId, groupId", "List<StatModifier> modifiers"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "effect";
tmpDef.label = "removeStatModifierGroup";
tmpDef.description = "Removes the specified stat modifier group.";
tmpDef.returnType = "void";
tmpDef.args = ["StatModifierGroupId groupId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// tech
tmpDef = new LuaFunction;
tmpDef.module = "tech";
tmpDef.label = "aimPosition";
tmpDef.description = "Returns the current cursor aim position.";
tmpDef.returnType = "Vec2F";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "tech";
tmpDef.label = "setVisible";
tmpDef.description = "Sets whether the tech should be visible.";
tmpDef.returnType = "void";
tmpDef.args = ["bool visible"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "tech";
tmpDef.label = "setParentState";
tmpDef.description = "Set the animation state of the player.\n\nValid states:\n* \"Stand\"\n* \"Fly\"\n* \"Fall\"\n* \"Sit\"\n* \"Lay\"\n* \"Duck\"\n* \"Walk\"\n* \"Run\"\n* \"Swim\"";
tmpDef.returnType = "void";
tmpDef.args = ["String state"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "tech";
tmpDef.label = "setParentDirectives";
tmpDef.description = "Sets the image processing directives for the player.";
tmpDef.returnType = "void";
tmpDef.args = ["String directives"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "tech";
tmpDef.label = "setParentHidden";
tmpDef.description = "Sets whether to make the player invisible. Will still show the tech.";
tmpDef.returnType = "void";
tmpDef.args = ["bool hidden"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "tech";
tmpDef.label = "setParentOffset";
tmpDef.description = "Sets the position of the player relative to the tech.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F offset"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "tech";
tmpDef.label = "parentLounging";
tmpDef.description = "Returns whether the player is lounging.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "tech";
tmpDef.label = "setToolUsageSuppressed";
tmpDef.description = "Sets whether to suppress tool usage on the player. When tool usage is suppressed no items can be used.";
tmpDef.returnType = "void";
tmpDef.args = ["bool suppressed"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// script
tmpDef = new LuaFunction;
tmpDef.module = "script";
tmpDef.label = "setUpdateDelta";
tmpDef.description = "Sets the script's update delta.";
tmpDef.returnType = "void";
tmpDef.args = ["unsigned dt"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "script";
tmpDef.label = "updateDt";
tmpDef.description = "Returns the duration in seconds between periodic updates to the script.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

// sb
tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "nrand";
tmpDef.description = "Returns a randomized value with a normal distribution using the specified standard deviation (default is 1.0) and mean (default is 0).";
tmpDef.returnType = "double";
tmpDef.args = ["[double standardDeviation]", "[double mean]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "makeUuid";
tmpDef.description = "Returns a String representation of a new, randomly-created Uuid.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "logInfo";
tmpDef.description = "Logs the specified formatted string, optionally using the formatted replacement values, to the log file and console with the Info log level.";
tmpDef.returnType = "void";
tmpDef.args = ["String formatString", "[LuaValue formatValues ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "logWarn";
tmpDef.description = "Logs the specified formatted string, optionally using the formatted replacement values, to the log file and console with the Warn log level.";
tmpDef.returnType = "void";
tmpDef.args = ["String formatString", "[LuaValue formatValues ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "logError";
tmpDef.description = "Logs the specified formatted string, optionally using the formatted replacement values, to the log file and console with the Error log level.";
tmpDef.returnType = "void";
tmpDef.args = ["String formatString", "[LuaValue formatValues ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "setLogMap";
tmpDef.description = "Sets an entry in the debug log map (visible while in debug mode) using the specified format string and optional formatted replacement values.";
tmpDef.returnType = "void";
tmpDef.args = ["String key", "String formatString", "[LuaValue formatValues ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "printJson";
tmpDef.description = "Returns a human-readable string representation of the specified JSON value. If pretty is true, objects and arrays will have whitespace added for readability.";
tmpDef.returnType = "String";
tmpDef.args = ["Json value", "[bool pretty]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "print";
tmpDef.description = "Returns a human-readable string representation of the specified LuaValue.";
tmpDef.returnType = "String";
tmpDef.args = ["LuaValue value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "interpolateSinEase";
tmpDef.description = "Returns an interpolated Vec2F or double between the two specified values using a sin ease function.";
tmpDef.returnType = "Variant<Vec2F,double>";
tmpDef.args = ["double offset", "Variant<Vec2F, double> value1", "Variant<Vec2F, double> value2"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "replaceTags";
tmpDef.description = "Replaces all tags in the specified string with the specified tag replacement values.";
tmpDef.returnType = "String";
tmpDef.args = ["String string", "Map<String, String> tags"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "jsonMerge";
tmpDef.description = "Returns the result of merging the contents of b on top of a.";
tmpDef.returnType = "Json";
tmpDef.args = ["Json a", "Json b"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "jsonQuery";
tmpDef.description = "Attempts to extract the value in the specified content at the specified path, and returns the found value or the specified default if no such value exists.";
tmpDef.returnType = "Json";
tmpDef.args = ["Json content", "String path", "Json default"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "staticRandomI32";
tmpDef.description = "Returns a statically randomized 32-bit signed integer based on the given list of seed values.";
tmpDef.returnType = "int";
tmpDef.args = ["[LuaValue hashValues ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "staticRandomI32Range";
tmpDef.description = "Returns a statically randomized 32-bit signed integer within the specified range based on the given list of seed values.";
tmpDef.returnType = "int";
tmpDef.args = ["int min", "int max", "[LuaValue hashValues ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "staticRandomDouble";
tmpDef.description = "Returns a statically randomized double based on the given list of seed values.";
tmpDef.returnType = "double";
tmpDef.args = ["[LuaValue hashValues ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "staticRandomDoubleRange";
tmpDef.description = "Returns a statically randomized double within the specified range based on the given list of seed values.";
tmpDef.returnType = "double";
tmpDef.args = ["double min", "double max", "[LuaValue hashValues ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "makeRandomSource";
tmpDef.description = "Creates and returns a Lua UserData value which can be used as a random source, initialized with the specified seed. The RandomSource has the following methods:";
tmpDef.returnType = "RandomSource";
tmpDef.args = ["[unsigned seed]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "sb";
tmpDef.label = "makePerlinSource";
tmpDef.description = "Creates and returns a Lua UserData value which can be used as a Perlin noise source. The configuration for the PerlinSource should be a JSON object and can include the following keys";
tmpDef.returnType = "PerlinSource";
tmpDef.args = ["Json config"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// vehicle
tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "controlHeld";
tmpDef.description = "Returns true if the specified control is currently being held by an occupant of the specified lounge position and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["String loungeName", "String controlName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "aimPosition";
tmpDef.description = "Returns the world aim position for the specified lounge position.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["String loungeName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "entityLoungingIn";
tmpDef.description = "Returns the entity id of the entity currently occupying the specified lounge position, or nil if the lounge position is unoccupied.";
tmpDef.returnType = "EntityId";
tmpDef.args = ["String loungeName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setLoungeEnabled";
tmpDef.description = "Enables or disables the specified lounge position.";
tmpDef.returnType = "void";
tmpDef.args = ["String loungeName", "bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setLoungeOrientation";
tmpDef.description = "Sets the lounge orientation for the specified lounge position. Valid orientations are \"sit\", \"stand\" or \"lay\".";
tmpDef.returnType = "void";
tmpDef.args = ["String loungeName", "String orientation"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setLoungeEmote";
tmpDef.description = "Sets the emote to be performed by entities occupying the specified lounge position, or clears it if no emote is specified.";
tmpDef.returnType = "void";
tmpDef.args = ["String loungeName", "[String emote]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setLoungeDance";
tmpDef.description = "Sets the dance to be performed by entities occupying the specified lounge position, or clears it if no dance is specified.";
tmpDef.returnType = "void";
tmpDef.args = ["String loungeName", "[String dance]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setLoungeStatusEffects";
tmpDef.description = "Sets the list of status effects to be applied to entities occupying the specified lounge position. To clear the effects, set an empty list.";
tmpDef.returnType = "void";
tmpDef.args = ["String loungeName", "JsonArray statusEffects"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setPersistent";
tmpDef.description = "Sets whether the vehicle is persistent, i.e. whether it will be stored when the world is unloaded and reloaded.";
tmpDef.returnType = "void";
tmpDef.args = ["bool persistent"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setInteractive";
tmpDef.description = "Sets whether the vehicle is currently interactive.";
tmpDef.returnType = "void";
tmpDef.args = ["bool interactive"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setDamageTeam";
tmpDef.description = "Sets the vehicle's current damage team type and number.";
tmpDef.returnType = "void";
tmpDef.args = ["DamageTeam team"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setMovingCollisionEnabled";
tmpDef.description = "Enables or disables the specified collision region.";
tmpDef.returnType = "void";
tmpDef.args = ["String collisionName", "bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setForceRegionEnabled";
tmpDef.description = "Enables or disables the specified force region.";
tmpDef.returnType = "void";
tmpDef.args = ["String regionName", "bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "setDamageSourceEnabled";
tmpDef.description = "Enables or disables the specified damage source.";
tmpDef.returnType = "void";
tmpDef.args = ["String damageSourceName", "bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "vehicle";
tmpDef.label = "destroy";
tmpDef.description = "Destroys the vehicle.";
tmpDef.returnType = "void";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

// widget
tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "playSound";
tmpDef.description = "Plays a sound.";
tmpDef.returnType = "void";
tmpDef.args = ["String audio", "[int loops = 0]", "[float volume = 1.0f]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getPosition";
tmpDef.description = "Returns the position of a widget.";
tmpDef.returnType = "Vec2I";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setPosition";
tmpDef.description = "Sets the position of a widget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "Vec2I position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getSize";
tmpDef.description = "Returns the size of a widget.";
tmpDef.returnType = "Vec2I";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setSize";
tmpDef.description = "Sets the size of a widget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "Vec2I size"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setVisible";
tmpDef.description = "Sets the visibility of a widget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "bool visible"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "active";
tmpDef.description = "Returns whether the widget is visible.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "focus";
tmpDef.description = "Sets focus on the specified widget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "hasFocus";
tmpDef.description = "Returns whether the specified widget is currently focused.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "blur";
tmpDef.description = "Unsets focus on the specified focused widget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getData";
tmpDef.description = "Returns the arbitrary data value set for the widget.";
tmpDef.returnType = "Json";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setData";
tmpDef.description = "Sets arbitrary data for the widget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "Json data"];
tmpDef.argDescs = {};
defs.push(tmpDef);
 tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getChildAt";
tmpDef.description = "Returns the full name for any widget at screenPosition.";
tmpDef.returnType = "String";
tmpDef.args = ["Vec2I screenPosition"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "inMember";
tmpDef.description = "Returns whether the widget contains the specified screenPosition.";
tmpDef.returnType = "bool";
tmpDef.args = ["String widgetName", "Vec2I screenPosition"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getText";
tmpDef.description = "Returns the text set in a TextBoxWidget.";
tmpDef.returnType = "String";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setText";
tmpDef.description = "Sets the text of: LabelWidget, ButtonWidget, TextBoxWidget";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "String text"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setFontColor";
tmpDef.description = "Sets the font color of: LabelWidget, ButtonWidget, TextBoxWidget";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "Color color"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setImage";
tmpDef.description = "Sets the image of an ImageWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "String imagePath"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setImageScale";
tmpDef.description = "Sets the scale of an ImageWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "float imageScale"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setImageRotation";
tmpDef.description = "Sets the rotation of an ImageWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "float imageRotation"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setButtonEnabled";
tmpDef.description = "Sets whether the ButtonWidget should be enabled.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setButtonImage";
tmpDef.description = "Sets the baseImage of a ButtonWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "String baseImage"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setButtonImages";
tmpDef.description = "Sets the full image set of a ButtonWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "Json imageSet"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setButtonCheckedImages";
tmpDef.description = "Similar to widget.setButtonImages, but sets the images used for the checked state of a checkable ButtonWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "Json imageSet"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setButtonOverlayImage";
tmpDef.description = "Sets the overlay image of a ButtonWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "String overlayImage"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getChecked";
tmpDef.description = "Returns whether the ButtonWidget is checked.";
tmpDef.returnType = "bool";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setChecked";
tmpDef.description = "Sets whether a ButtonWidget is checked";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "bool checked"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getSelectedOption";
tmpDef.description = "Returns the index of the selected option in a ButtonGroupWidget.";
tmpDef.returnType = "int";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getSelectedData";
tmpDef.description = "Returns the data of the selected option in a ButtonGroupWidget. Nil if no option is selected.";
tmpDef.returnType = "int";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setSelectedOption";
tmpDef.description = "Sets the selected option index of a ButtonGroupWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "int index"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setOptionEnabled";
tmpDef.description = "Sets whether a ButtonGroupWidget option should be enabled.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "int index", "bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setOptionVisible";
tmpDef.description = "Sets whether a ButtonGroupWidget option should be visible.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "int index", "bool, visible"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setProgress";
tmpDef.description = "Sets the progress of a ProgressWidget. Value should be between 0.0 and 1.0.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "float value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setSliderEnabled";
tmpDef.description = "Sets whether the SliderBarWidget should be enabled.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "bool enabled"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getSliderValue";
tmpDef.description = "Gets the current value of a SliderBarWidget.";
tmpDef.returnType = "float";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setSliderValue";
tmpDef.description = "Sets the current value of a SliderBarWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "int newValue"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getSliderRange";
tmpDef.description = "Sets the minimum, maximum and (optionally) delta values of a SliderBarWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "int newMin", "int newMax", "[int newDelta]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "clearListItems";
tmpDef.description = "Clears all items in a ListWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "addListItem";
tmpDef.description = "Adds a list item to a ListWidget using the configured template, and returns the name of the added list item.";
tmpDef.returnType = "String";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "removeListItem";
tmpDef.description = "Removes a list item from a ListWidget at a specific index.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "size_t at"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "getListSelected";
tmpDef.description = "Returns the name of the currently selected widget in a ListWidget.";
tmpDef.returnType = "String";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setListSelected";
tmpDef.description = "Sets the selected widget of a ListWidget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "String selected"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "registerMemberCallback";
tmpDef.description = "Registers a member callback for a ListWidget's list items to use.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "String callbackName", "LuaFunction callback"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "itemGridItems";
tmpDef.description = "Returns the full item bag contents of an ItemGridWidget.";
tmpDef.returnType = "ItemBag";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "itemSlotItem";
tmpDef.description = "Returns the descriptor of the item in the specified item slot widget.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setItemSlotItem";
tmpDef.description = "Sets the item in the specified item slot widget.";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "Json itemDescriptor"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "setItemSlotProgress";
tmpDef.description = "Sets the progress overlay on the item slot to the specified value (between 0 and 1).";
tmpDef.returnType = "void";
tmpDef.args = ["String widgetName", "float progress"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "widget";
tmpDef.label = "bindCanvas";
tmpDef.description = "Binds the canvas widget with the specified name as userdata for easy access. The CanvasWidget has the following methods:";
tmpDef.returnType = "CanvasWidget";
tmpDef.args = ["String widgetName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

// world
tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "type";
tmpDef.description = "Returns a string describing the world's type. For terrestrial worlds this will be the primary biome, for instance worlds this will be the instance name, and for ship or generic worlds this will be 'unknown'.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "terrestrial";
tmpDef.description = "Returns a true if the current world is a terrestrial world, i.e. a planet, and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "size";
tmpDef.description = "Returns a vector describing the size of the current world.";
tmpDef.returnType = "Vec2I";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "magnitude";
tmpDef.description = "Returns the magnitude of the distance between the specified world positions. Use this rather than simple vector subtraction to handle world wrapping.";
tmpDef.returnType = "float";
tmpDef.args = ["Vec2F position1", "Vec2F position2"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "distance";
tmpDef.description = "Returns the vector difference between the specified world positions. Use this rather than simple vector subtraction to handle world wrapping.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["Vec2F position1", "Vec2F position2"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "polyContains";
tmpDef.description = "Returns true if the specified poly contains the specified position in world space and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["PolyF poly", "Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "xwrap";
tmpDef.description = "Returns the specified position with its X coordinate wrapped around the world width.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "xwrap";
tmpDef.description = "Returns the specified X position wrapped around the world width.";
tmpDef.returnType = "float";
tmpDef.args = ["float xPosition"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "nearestTo";
tmpDef.description = "Returns the point nearest to (i.e. on the same side of the world as) the source point. Either argument can be specified as a Vec2F point or as a float X position. The type of the targetPosition determines the return type.";
tmpDef.returnType = "Variant<Vec2F,float>";
tmpDef.args = ["Variant<Vec2F, float> sourcePosition", "Variant<Vec2F, float> targetPosition"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "pointCollision";
tmpDef.description = "Returns true if the generated collision geometry at the specified point matches any of the specified collision kinds and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2F point", "[CollisionSet collisionKinds]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "pointTileCollision";
tmpDef.description = "Returns true if the tile at the specified point matches any of the specified collision kinds and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2F point", "[CollisionSet collisionKinds]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "lineCollision";
tmpDef.description = "If the line between the specified points overlaps any generated collision geometry of the specified collision kinds, returns the point at which the line collides, or nil if the line does not collide.";
tmpDef.returnType = "Maybe<Vec2F>";
tmpDef.args = ["Vec2F startPoint", "Vec2F endPoint", "[CollisionSet collisionKinds]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "lineTileCollision";
tmpDef.description = "Returns true if the line between the specified points overlaps any tiles of the specified collision kinds and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2F startPoint", "Vec2F endPoint", "[CollisionSet collisionKinds]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "lineTileCollisionPoint";
tmpDef.description = "Returns a table of {position,normal} where position is the position that the line intersects the first collidable tile, and normal is the collision normal. Returns nil if no tile is intersected.";
tmpDef.returnType = "Maybe<pair<Vec2F,Vec2F>>";
tmpDef.args = ["Vec2F startPoint", "Vec2F endPoint", "[CollisionSet collisionKinds]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "rectCollision";
tmpDef.description = "Returns true if the specified rectangle overlaps any generated collision geometry of the specified collision kinds and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["RectF rect", "[CollisionSet collisionKinds]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "rectTileCollision";
tmpDef.description = "Returns true if the specified rectangle overlaps any tiles of the specified collision kinds and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["RectF rect", "[CollisionSet collisionKinds]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "polyCollision";
tmpDef.description = "Returns true if the specified polygon overlaps any generated collision geometry of the specified collision kinds and false otherwise. If a position is specified, the polygon coordinates will be treated as relative to that world position.";
tmpDef.returnType = "bool";
tmpDef.args = ["PolyF poly", "[Vec2F position]", "[CollisionSet collisionKinds]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "collisionBlocksAlongLine";
tmpDef.description = "Returns an ordered list of tile positions along the line between the specified points that match any of the specified collision kinds. If maxReturnCount is specified, the function will only return up to that number of points.";
tmpDef.returnType = "List<Vec2I>";
tmpDef.args = ["Vec2F startPoint", "Vec2F endPoint", "[CollisionSet collisionKinds]", "[int maxReturnCount]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "liquidAlongLine";
tmpDef.description = "Returns a list of pairs containing a position and a LiquidLevel for all tiles along the line between the specified points that contain any liquid.";
tmpDef.returnType = "List<pair<Vec2I,LiquidLevel>>";
tmpDef.args = ["Vec2F startPoint", "Vec2F endPoint"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "resolvePolyCollision";
tmpDef.description = "Attempts to move the specified poly (relative to the specified position) such that it does not collide with any of the specified collision kinds. Will only move the poly up to the distance specified by maximumCorrection. Returns nil if the collision resolution fails.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["PolyF poly", "Vec2F position", "float maximumCorrection", "[CollisionSet collisionKinds]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "tileIsOccupied";
tmpDef.description = "Returns true if the specified tile position is occupied by a material or tile entity and false if it is empty. The check will be performed on the foreground tile layer if foregroundLayer is true (or unspecified) and the background tile layer if it is false. The check will include ephemeral tile entities such as preview objects if includeEphemeral is true, and will not include these entities if it is false (or unspecified).";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2I tilePosition", "[bool foregroundLayer]", "[bool includeEphemeral]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "placeObject";
tmpDef.description = "Attempts to place the specified object into the world at the specified position, preferring it to be right-facing if direction is positive (or unspecified) and left-facing if it is negative. If parameters are specified they will be applied to the object. Returns true if the object is placed successfully and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["String objectName", "Vec2I tilePosition", "[int direction]", "[Json parameters]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "spawnItem";
tmpDef.description = "Attempts to spawn the specified item into the world as the specified position. If item is specified as a name, it will optionally apply the specified count and parameters. The item drop entity can also be spawned with an initial velocity and intangible time (delay before it can be picked up) if specified. Returns an EntityId of the item drop if successful and nil otherwise.";
tmpDef.returnType = "EntityId";
tmpDef.args = ["ItemDescriptor item", "Vec2F position", "[unsigned count]", "[Json parameters]", "[Vec2F velocity]", "[float intangibleTime]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "spawnTreasure";
tmpDef.description = "Attempts to spawn all items in an instance of the specified treasure pool with the specified level and seed at the specified world position. Returns a list of EntityIds of the item drops created if successful and nil otherwise.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F position", "String poolName", "float level", "[unsigned seed]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "spawnMonster";
tmpDef.description = "Attempts to spawn a monster of the specified type at the specified position. If parameters are specified they will be applied to the spawned monster. If they are unspecified, they default to an object setting aggressive to be randomly true or false. Level for the monster may be specified in parameters. Returns the EntityId of the spawned monster if successful and nil otherwise.";
tmpDef.returnType = "EntityId";
tmpDef.args = ["String monsterType", "Vec2F position", "[Json parameters]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "spawnNpc";
tmpDef.description = "Attempts to spawn an NPC of the specified type, species, level with the specified seed and parameters at the specified position. Returns EntityId of the spawned NPC if successful and nil otherwise.";
tmpDef.returnType = "EntityId";
tmpDef.args = ["Vec2F position", "String species", "String npcType", "float level", "[unsigned seed]", "[Json parameters]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "spawnStagehand";
tmpDef.description = "Attempts to spawn a stagehand of the specified type at the specified position with the specified override parameters. Returns EntityId of the spawned stagehand if successful and nil otherwise.";
tmpDef.returnType = "EntityId";
tmpDef.args = ["Vec2F position", "String type", "[Json overrides]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "spawnProjectile";
tmpDef.description = "Attempts to spawn a projectile of the specified type at the specified position with the specified source entity id, direction, and parameters. If trackSourceEntity is true then the projectile's position will be locked relative to its source entity's position. Returns the EntityId of the spawned projectile if successful and nil otherwise.";
tmpDef.returnType = "EntityId";
tmpDef.args = ["String projectileName", "Vec2F position", "[EntityId sourceEntityId]", "[Vec2F direction]", "[bool trackSourceEntity]", "[Json parameters]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "spawnVehicle";
tmpDef.description = "Attempts to spawn a vehicle of the specified type at the specified position with the specified override parameters. Returns the EntityId of the spawned vehicle if successful and nil otherwise.";
tmpDef.returnType = "EntityId";
tmpDef.args = ["String vehicleName", "Vec2F position", "[Json overrides]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "threatLevel";
tmpDef.description = "Returns the threat level of the current world.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "time";
tmpDef.description = "Returns the absolute time of the current world.";
tmpDef.returnType = "double";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "day";
tmpDef.description = "Returns the absolute numerical day of the current world.";
tmpDef.returnType = "unsigned";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "timeOfDay";
tmpDef.description = "Returns a value between 0 and 1 indicating the time within the day of the current world.";
tmpDef.returnType = "double";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "dayLength";
tmpDef.description = "Returns the duration of a day on the current world.";
tmpDef.returnType = "float";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "getProperty";
tmpDef.description = "Returns the JSON value of the specified world property, or defaultValue or nil if it is not set.";
tmpDef.returnType = "Json";
tmpDef.args = ["String propertyName", "[Json defaultValue]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setProperty";
tmpDef.description = "Sets the specified world property to the specified value.";
tmpDef.returnType = "void";
tmpDef.args = ["String propertyName", "Json value"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "liquidAt";
tmpDef.description = "Returns the LiquidLevel at the specified tile position, or nil if there is no liquid.";
tmpDef.returnType = "LiquidLevel";
tmpDef.args = ["Vec2I position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "liquidAt";
tmpDef.description = "Returns the average LiquidLevel of the most plentiful liquid within the specified region, or nil if there is no liquid.";
tmpDef.returnType = "LiquidLevel";
tmpDef.args = ["RectF region"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "gravity";
tmpDef.description = "Returns the gravity at the specified position. This should be consistent for all non-dungeon tiles in a world but can be altered by dungeons.";
tmpDef.returnType = "float";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "spawnLiquid";
tmpDef.description = "Attempts to place the specified quantity of the specified liquid at the specified position. Returns true if successful and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2F position", "LiquidId liquid", "float quantity"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "destroyLiquid";
tmpDef.description = "Removes any liquid at the specified position and returns the LiquidLevel containing the type and quantity of liquid removed, or nil if no liquid is removed.";
tmpDef.returnType = "LiquidLevel";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "isTileProtected";
tmpDef.description = "Returns true if the tile at the specified position is protected and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "findPlatformerPath";
tmpDef.description = "Attempts to synchronously pathfind between the specified positions using the specified movement and pathfinding parameters. Returns the path as a list of nodes as successful, or nil if no path is found.";
tmpDef.returnType = "PlatformerAStar::Path";
tmpDef.args = ["Vec2F startPosition", "Vec2F endPosition", "ActorMovementParameters movementParameters", "PlatformerAStar::Parameters searchParameters"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "platformerPathStart";
tmpDef.description = "Creates and returns a Lua UserData value which can be used for pathfinding over multiple frames. The PathFinder returned has the following two methods:";
tmpDef.returnType = "PlatformerAStar::PathFinder";
tmpDef.args = ["Vec2F startPosition", "Vec2F endPosition", "ActorMovementParameters movementParameters", "PlatformerAStar::Parameters searchParameters"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "lightLevel";
tmpDef.description = "Returns the current logical light level at the specified position. Requires recalculation of lighting, so this should be used sparingly.";
tmpDef.returnType = "float";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "windLevel";
tmpDef.description = "Returns the current wind level at the specified position.";
tmpDef.returnType = "float";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "breathable";
tmpDef.description = "Returns true if the world is breathable at the specified position and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "environmentStatusEffects";
tmpDef.description = "Returns a list of the environmental status effects at the specified position.";
tmpDef.returnType = "List<String>";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "underground";
tmpDef.description = "Returns true if the specified position is below the world's surface level and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "inSurfaceLayer";
tmpDef.description = "Returns true if the world is terrestrial and the specified position is within its surface layer, and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2I position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "oceanLevel";
tmpDef.description = "If the specified position is within a region that has ocean (endless) liquid, returns the world Y level of that ocean's surface, or 0 if there is no ocean in the specified region.";
tmpDef.returnType = "int";
tmpDef.args = ["Vec2I position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "material";
tmpDef.description = "Returns the name of the material at the specified position and layer. Layer can be specified as 'foreground' or 'background'. Returns false if the space is empty in that layer. Returns nil if the material is NullMaterial (e.g. if the position is in an unloaded sector).";
tmpDef.returnType = "Variant<String,bool>";
tmpDef.args = ["Vec2F position", "String layerName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "mod";
tmpDef.description = "Returns the name of the mod at the specified position and layer, or nil if there is no mod.";
tmpDef.returnType = "String";
tmpDef.args = ["Vec2F position", "String layerName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "materialHueShift";
tmpDef.description = "Returns the hue shift of the material at the specified position and layer.";
tmpDef.returnType = "float";
tmpDef.args = ["Vec2F position", "String layerName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "modHueShift";
tmpDef.description = "Returns the hue shift of the mod at the specified position and layer.";
tmpDef.returnType = "float";
tmpDef.args = ["Vec2F position", "String layerName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "materialColor";
tmpDef.description = "Returns the color variant (painted color) of the material at the specified position and layer.";
tmpDef.returnType = "unsigned";
tmpDef.args = ["Vec2F position", "String layerName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setMaterialColor";
tmpDef.description = "Sets the color variant of the material at the specified position and layer to the specified color.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F position", "String layerName", "unsigned color"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "damageTiles";
tmpDef.description = "Damages all tiles in the specified layer and positions by the specified amount. The source position of the damage determines the initial direction of the damage particles. Damage types are: \"plantish\", \"blockish\", \"beamish\", \"explosive\", \"fire\", \"tilling\". Harvest level determines whether destroyed materials or mods will drop as items. Returns true if any damage was done and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["List<Vec2I> positions", "String layerName", "Vec2F sourcePosition", "String damageType", "float damageAmount", "[unsigned harvestLevel]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "damageTileArea";
tmpDef.description = "Identical to world.damageTiles but applies to tiles in a circular radius around the specified center point.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2F center", "float radius", "String layerName", "Vec2F sourcePosition", "String damageType", "float damageAmount", "[unsigned harvestLevel"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "placeMaterial";
tmpDef.description = "Attempts to place the specified material in the specified position and layer. If allowOverlap is true the material can be placed in a space occupied by mobile entities, otherwise such placement attempts will fail. Returns true if the placement succeeds and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2I position", "String layerName", "String materialName", "[int hueShift]", "[bool allowOverlap]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "placeMod";
tmpDef.description = "Attempts to place the specified mod in the specified position and layer. If allowOverlap is true the mod can be placed in a space occupied by mobile entities, otherwise such placement attempts will fail. Returns true if the placement succeeds and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["Vec2I position", "String layerName", "String modName", "[int hueShift]", "[bool allowOverlap]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityQuery";
tmpDef.description = "Queries for entities in a specified area of the world and returns a list of their entity ids. Area can be specified either as the Vec2F lower left and upper right positions of a rectangle, or as the Vec2F center and float radius of a circular area. The following additional parameters can be specified in options:";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F position", "Variant<Vec2F, float positionOrRadius", "[Json options]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "monsterQuery";
tmpDef.description = "Identical to world.entityQuery but only considers monsters.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F position", "Variant<Vec2F, float positionOrRadius", "[Json options]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "npcQuery";
tmpDef.description = "Identical to world.entityQuery but only considers NPCs.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F position", "Variant<Vec2F, float positionOrRadius", "[Json options]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "objectQuery";
tmpDef.description = "Similar to world.entityQuery but only considers objects. Allows an additional option, __name__, which specifies a String object type name and will only return objects of that type.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F position", "Variant<Vec2F, float positionOrRadius", "[Json options]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "itemDropQuery";
tmpDef.description = "Identical to world.entityQuery but only considers item drops.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F position", "Variant<Vec2F, float positionOrRadius", "[Json options]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "playerQuery";
tmpDef.description = "Identical to world.entityQuery but only considers players.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F position", "Variant<Vec2F, float positionOrRadius", "[Json options]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "loungeableQuery";
tmpDef.description = "Similar to world.entityQuery but only considers loungeable entities. Allows an additional option, __orientation__, which specifies the String name of a loungeable orientation (\"sit\", \"lay\" or \"stand\") and only returns loungeable entities which use that orientation.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F position", "Variant<Vec2F, float positionOrRadius", "[Json options]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityLineQuery";
tmpDef.description = "Similar to world.entityQuery but only returns entities that intersect the line between the specified positions.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F startPosition", "Vec2F endPosition", "[Json options]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "objectLineQuery";
tmpDef.description = "Identical to world.entityLineQuery but only considers objects.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F startPosition", "Vec2F endPosition", "[Json options]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "npcLineQuery";
tmpDef.description = "Identical to world.entityLineQuery but only considers NPCs.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = ["Vec2F startPosition", "Vec2F endPosition", "[Json options]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "objectAt";
tmpDef.description = "Returns the entity id of any object occupying the specified tile position, or nil if the position is not occupied by an object.";
tmpDef.returnType = "EntityId";
tmpDef.args = ["Vec2I tilePosition"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityExists";
tmpDef.description = "Returns true if an entity with the specified id exists in the world and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityDamageTeam";
tmpDef.description = "Returns the current damage team (team type and team number) of the specified entity, or nil if the entity doesn't exist.";
tmpDef.returnType = "DamageTeam";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityCanDamage";
tmpDef.description = "Returns true if the specified source entity can damage the specified target entity using their current damage teams and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId sourceId", "EntityId targetId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityAggressive";
tmpDef.description = "Returns true if the specified entity is an aggressive monster or NPC and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entity"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityType";
tmpDef.description = "Returns the entity type name of the specified entity, or nil if the entity doesn't exist.";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityPosition";
tmpDef.description = "Returns the current world position of the specified entity, or nil if the entity doesn't exist.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityMouthPosition";
tmpDef.description = "Returns the current world mouth position of the specified player, monster, NPC or object, or nil if the entity doesn't exist or isn't a valid type.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityVelocity";
tmpDef.description = "Returns the current velocity of the entity if it is a vehicle, monster, NPC or player and nil otherwise.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityCurrency";
tmpDef.description = "Returns the specified player entity's stock of the specified currency type, or nil if the entity is not a player.";
tmpDef.returnType = "unsigned";
tmpDef.args = ["EntityId entityId", "String currencyType"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityHasCountOfItem";
tmpDef.description = "Returns the nubmer of the specified item that the specified player entity is currently carrying, or nil if the entity is not a player. If exactMatch is true then parameters as well as item name must match.\n\nNOTE: This function currently does not work correctly over the network, making it inaccurate when not used from client side scripts such as status.";
tmpDef.returnType = "unsigned";
tmpDef.args = ["EntityId entityId", "Json itemDescriptor", "[bool exactMatch]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityHealth";
tmpDef.description = "Returns a Vec2F containing the specified entity's current and maximum health if the entity is a player, monster or NPC and nil otherwise.";
tmpDef.returnType = "Vec2F";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entitySpecies";
tmpDef.description = "Returns the name of the specified entity's species if it is a player or NPC and nil otherwise.";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityGender";
tmpDef.description = "Returns the name of the specified entity's gender if it is a player or NPC and nil otherwise.";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityName";
tmpDef.description = "Returns a String name of the specified entity which has different behavior for different entity types. For players, monsters and NPCs, this will be the configured name of the specific entity. For objects or vehicles, this will be the name of the object or vehicle type. For item drops, this will be the name of the contained item.";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityTypeName";
tmpDef.description = "Similar to world.entityName but returns the names of configured types for NPCs and monsters.";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityDescription";
tmpDef.description = "Returns the configured description for the specified inspectable entity (currently only objects and plants support this). Will return a species-specific description if species is specified and a generic description otherwise.";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId", "[String species]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityPortrait";
tmpDef.description = "Generates a portrait of the specified entity in the specified portrait mode and returns a list of drawables, or nil if the entity is not a portrait entity.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["EntityId entityId", "String portraitMode"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityHandItem";
tmpDef.description = "Returns the name of the item held in the specified hand of the specified player or NPC, or nil if the entity is not holding an item or is not a player or NPC. Hand name should be specified as \"primary\" or \"alt\".";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId", "String handName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityHandItemDescriptor";
tmpDef.description = "Similar to world.entityHandItem but returns the full descriptor of the item rather than the name.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId", "String handName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "itemDropItem";
tmpDef.description = "Returns the item descriptor of an item drop's contents.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "entityUniqueId";
tmpDef.description = "Returns the unique id of the specified entity, or nil if the entity does not have a unique id.";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "getObjectParameter";
tmpDef.description = "Returns the value of the specified object's config parameter, or defaultValue or nil if the parameter is not set or the entity is not an object.";
tmpDef.returnType = "Json";
tmpDef.args = ["EntityId entityId", "String parameterName", "[Json defaultValue]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "objectSpaces";
tmpDef.description = "Returns a list of tile positions that the specified object occupies, or nil if the entity is not an object.";
tmpDef.returnType = "List<Vec2I>";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "farmableStage";
tmpDef.description = "Returns the current growth stage of the specified farmable object, or nil if the entity is not a farmable object.";
tmpDef.returnType = "int";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerSize";
tmpDef.description = "Returns the total capacity of the specified container, or nil if the entity is not a container.";
tmpDef.returnType = "int";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerClose";
tmpDef.description = "Visually closes the specified container. Returns true if the entity is a container and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerOpen";
tmpDef.description = "Visually opens the specified container. Returns true if the entity is a container and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerItems";
tmpDef.description = "Returns a list of pairs of item descriptors and container positions of all items in the specified container, or nil if the entity is not a container.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerItemAt";
tmpDef.description = "Returns an item descriptor of the item at the specified position in the specified container, or nil if the entity is not a container or the offset is out of range.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId", "unsigned offset"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerConsume";
tmpDef.description = "Attempts to consume items from the specified container that match the specified item descriptor and returns true if successful,false if unsuccessful, or nil if the entity is not a container. Only succeeds if the full count of the specified item can be consumed.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId", "ItemDescriptor item"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerConsumeAt";
tmpDef.description = "Similar to world.containerConsume but only considers the specified slot within the container.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId", "unsigned offset", "unsigned count"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerAvailable";
tmpDef.description = "Returns the number of the specified item that are currently available to consume in the specified container, or nil if the entity is not a container.";
tmpDef.returnType = "unsigned";
tmpDef.args = ["EntityId entityId", "ItemDescriptor item"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerTakeAll";
tmpDef.description = "Similar to world.containerItems but consumes all items in the container.";
tmpDef.returnType = "JsonArray";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerTakeAt";
tmpDef.description = "Similar to world.containerItemAt, but consumes all items in the specified slot of the container.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId", "unsigned offset"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerTakeNumItemsAt";
tmpDef.description = "Similar to world.containerTakeAt, but consumes up to (but not necessarily equal to) the specified count of items from the specified slot of the container and returns only the items consumed.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId", "unsigned offset", "unsigned count"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerItemsCanFit";
tmpDef.description = "Returns the number of times the specified item can fit in the specified container, or nil if the entity is not a container.";
tmpDef.returnType = "unsigned";
tmpDef.args = ["EntityId entityId", "ItemDescriptor item"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerItemsFitWhere";
tmpDef.description = "Returns a JsonObject containing a list of \"slots\" the specified item would fit and the count of \"leftover\" items that would remain after attempting to add the items. Returns nil if the entity is not a container.";
tmpDef.returnType = "Json";
tmpDef.args = ["EntityId entityId", "ItemDescriptor items"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerAddItems";
tmpDef.description = "Adds the specified items to the specified container. Returns the leftover items after filling the container, or all items if the entity is not a container.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId", "ItemDescriptor items"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerStackItems";
tmpDef.description = "Similar to world.containerAddItems but will only combine items with existing stacks and will not fill empty slots.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId", "ItemDescriptor items"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerPutItemsAt";
tmpDef.description = "Similar to world.containerAddItems but only considers the specified slot in the container.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId", "ItemDescriptor items", "unsigned offset"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerItemApply";
tmpDef.description = "Attempts to combine the specified items with the current contents (if any) of the specified container slot and returns any items unable to be placed into the slot.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId", "ItemDescriptor items", "unsigned offset"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerSwapItemsNoCombine";
tmpDef.description = "Places the specified items into the specified container slot and returns the previous contents of the slot if successful, or the original items if unsuccessful.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId", "ItemDescriptor items", "unsigned offset"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "containerSwapItems";
tmpDef.description = "A combination of world.containerItemApply and world.containerSwapItemsNoCombine that attempts to combine items before swapping and returns the leftovers if stacking was successful or the previous contents of the container slot if the items did not stack.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId entityId", "ItemDescriptor items", "unsigned offset"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "callScriptedEntity";
tmpDef.description = "Attempts to call the specified function name in the context of the specified scripted entity with the specified arguments and returns the result. This method is synchronous and thus can only be used on local master entities, i.e. scripts run on the server may only call scripted entities that are also server-side master and scripts run on the client may only call scripted entities that are client-side master on that client. For more featureful entity messaging, use world.sendEntityMessage.";
tmpDef.returnType = "LuaValue";
tmpDef.args = ["EntityId entityId", "String functionName", "[LuaValue args ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "sendEntityMessage";
tmpDef.description = "Sends an asynchronous message to an entity with the specified entity id or unique id with the specified message type and arguments and returns an RpcPromise which can be used to receive the result of the message when available. See the message table for information on entity message handling. This function __should not be called in any entity's init function__ as the sending entity will not have been fully loaded.";
tmpDef.returnType = "RpcPromise<Json>";
tmpDef.args = ["Variant<EntityId, String> entityId", "String messageType", "[LuaValue args ...]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "findUniqueEntity";
tmpDef.description = "Attempts to find an entity on the server by unique id and returns an RpcPromise that can be used to get the position of that entity if successful.";
tmpDef.returnType = "RpcPromise<Vec2F>";
tmpDef.args = ["String uniqueId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "loungeableOccupied";
tmpDef.description = "Checks whether the specified loungeable entity is currently occupied and returns true if it is occupied,false if it is unoccupied, or nil if it is not a loungeable entity.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "isMonster";
tmpDef.description = "Returns true if the specified entity exists and is a monster and false otherwise. If aggressive is specified, will return false unless the monster's aggressive state matches the specified value.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId", "[bool aggressive]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "monsterType";
tmpDef.description = "Returns the monster type of the specified monster, or nil if the entity is not a monster.";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "isNpc";
tmpDef.description = "Returns true if the specified entity exists and is an NPC and false otherwise. If damageTeam is specified, will return false unless the NPC's damage team number matches the specified value.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId", "[int damageTeam]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "npcType";
tmpDef.description = "Returns the NPC type of the specified NPC, or nil if the entity is not an NPC.";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "stagehandType";
tmpDef.description = "Returns the stagehand type of the specified stagehand, or nil if the entity is not a stagehand.";
tmpDef.returnType = "String";
tmpDef.args = ["EntityId entityId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "debugPoint";
tmpDef.description = "Displays a point visible in debug mode at the specified world position.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F position", "Color color"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "debugLine";
tmpDef.description = "Displayes a line visible in debug mode between the specified world positions.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F startPosition", "Vec2F endPosition", "Color color"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "debugPoly";
tmpDef.description = "Displays a polygon consisting of the specified points that is visible in debug mode.";
tmpDef.returnType = "void";
tmpDef.args = ["PolyF poly", "Color color"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "debugText";
tmpDef.description = "Displays text visible in debug mode at the specified position using the specified format string and optional formatted values.\n\nThe following additional world bindings are available only for scripts running on the server.";
tmpDef.returnType = "void";
tmpDef.args = ["String formatString", "[LuaValue formatValues ...]", "Vec2F position", "Color color"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "breakObject";
tmpDef.description = "Breaks the specified object and returns true if successful and false otherwise. If smash is true the object will not (by default) drop any items.";
tmpDef.returnType = "bool";
tmpDef.args = ["EntityId entityId", "bool smash"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "isVisibleToPlayer";
tmpDef.description = "Returns true if any part of the specified region overlaps any player's screen area and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["RectF region"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "loadRegion";
tmpDef.description = "Attempts to load all sectors overlapping the specified region and returns true if all sectors are fully loaded and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["RectF region"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "regionActive";
tmpDef.description = "Returns true if all sectors overlapping the specified region are fully loaded and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["RectF region"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setTileProtection";
tmpDef.description = "Enables or disables tile protection for the specified dungeon id.";
tmpDef.returnType = "void";
tmpDef.args = ["DungeonId dungeonId", "bool protected"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "dungeonId";
tmpDef.description = "Returns the dungeon id at the specified world position.";
tmpDef.returnType = "DungeonId";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setDungeonId";
tmpDef.description = "Sets the dungeonId of all tiles within the specified area.";
tmpDef.returnType = "DungeonId";
tmpDef.args = ["RectI tileArea", "DungeonId dungeonId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "isPlayerModified";
tmpDef.description = "Returns true if any tile within the specified region has been modified (placed or broken) by a player and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["RectI region"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "forceDestroyLiquid";
tmpDef.description = "Identical to world.destroyLiquid but ignores tile protection.";
tmpDef.returnType = "LiquidLevel";
tmpDef.args = ["Vec2F position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "loadUniqueEntity";
tmpDef.description = "Forces (synchronous) loading of the specified unique entity and returns its non-unique entity id or 0 if no such unique entity exists.";
tmpDef.returnType = "EntityId";
tmpDef.args = ["String uniqueId"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setUniqueId";
tmpDef.description = "Sets the unique id of the specified entity to the specified unique id or clears it if no unique id is specified.";
tmpDef.returnType = "void";
tmpDef.args = ["EntityId entityId", "[String uniqueId]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "takeItemDrop";
tmpDef.description = "Takes the specified item drop and returns an ItemDescriptor of its contents or nil if the operation fails. If a source entity id is specified, the item drop will briefly animate toward that entity.";
tmpDef.returnType = "ItemDescriptor";
tmpDef.args = ["EntityId targetEntityId", "[EntityId sourceEntityId]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setPlayerStart";
tmpDef.description = "Sets the world's default beam-down point to the specified position. If respawnInWorld is set to true then players who die in that world will respawn at the specified start position rather than being returned to their ships.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2F position", "[bool respawnInWorld]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "players";
tmpDef.description = "Returns a list of the entity ids of all players currently in the world.";
tmpDef.returnType = "List<EntityId>";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "fidelity";
tmpDef.description = "Returns the name of the fidelity level at which the world is currently running. See worldserver.config for fidelity configuration.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "flyingType";
tmpDef.description = "Returns the current flight status of a ship world.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "warpPhase";
tmpDef.description = "Returns the current warp phase of a ship world.";
tmpDef.returnType = "String";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setUniverseFlag";
tmpDef.description = "Sets the specified universe flag on the current universe.";
tmpDef.returnType = "void";
tmpDef.args = ["String flagName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "universeFlags";
tmpDef.description = "Returns a list of all universe flags set on the current universe.";
tmpDef.returnType = "List<String>";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "universeFlagSet";
tmpDef.description = "Returns true if the specified universe flag is set and false otherwise.";
tmpDef.returnType = "bool";
tmpDef.args = ["String flagName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "skyTime";
tmpDef.description = "Returns the current time for the world's sky.";
tmpDef.returnType = "double";
tmpDef.args = [];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setSkyTime";
tmpDef.description = "Sets the current time for the world's sky to the specified value.";
tmpDef.returnType = "void";
tmpDef.args = ["double time"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "placeDungeon";
tmpDef.description = "Generates the specified dungeon in the world at the specified position, ignoring normal dungeon anchoring rules. If a dungeon id is specified, it will be assigned to the dungeon.";
tmpDef.returnType = "void";
tmpDef.args = ["String dungeonName", "Vec2I position", "[DungeonId dungeonId]"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "addBiomeRegion";
tmpDef.description = "Adds a biome region to the world, centered on position,width blocks wide.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2I position", "String biomeName", "String subBlockSelector", "int width"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "expandBiomeRegion";
tmpDef.description = "Expands the biome region currently at position by width blocks.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2I position", "int width"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "pregenerateAddBiome";
tmpDef.description = "Signals a region for asynchronous generation. The region signaled is the region that needs to be generated to add a biome region of width tiles to position.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2I position", "int width"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "pregenerateExpandBiome";
tmpDef.description = "Signals a region for asynchronous generation. The region signaled is the region that needs to be generated to expand the biome at position by width blocks.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2I position", "int width"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setLayerEnvironmentBiome";
tmpDef.description = "Sets the environment biome for a layer to the biome at position.";
tmpDef.returnType = "void";
tmpDef.args = ["Vec2I position"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setPlanetType";
tmpDef.description = "Sets the planet type of the current world to planetType with primary biome primaryBiomeName.";
tmpDef.returnType = "void";
tmpDef.args = ["String planetType", "String, primaryBiomeName"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setDungeonGravity";
tmpDef.description = "Sets the overriding gravity for the specified dungeon id, or returns it to the world default if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["DungeonId dungeonId", "Maybe<float> gravity"];
tmpDef.argDescs = {};
defs.push(tmpDef);

tmpDef = new LuaFunction;
tmpDef.module = "world";
tmpDef.label = "setDungeonBreathable";
tmpDef.description = "Sets the overriding breathability for the specified dungeon id, or returns it to the world default if unspecified.";
tmpDef.returnType = "void";
tmpDef.args = ["DungeonId dungeonId", "Maybe<bool> breathable"];
tmpDef.argDescs = {};
defs.push(tmpDef);

