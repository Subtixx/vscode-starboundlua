'use strict';

import * as vscode from 'vscode'
import { debuglog } from 'util';

class LuaType {
	label: string;
	description: string;

	/**
	 * 
	 * @param label The actual function name
	 * @param description The description of the function
	 */
	constructor(label: string, description: string) {
		this.label = label;
		this.description = description;
	}

	getMarkdown(): vscode.MarkdownString {
		let str = new vscode.MarkdownString();
		str.appendMarkdown(this.description + "\n\n");
		str.appendCodeblock(this.label, "starboundlua");
		return str;
	}

	toCompletionItem(): vscode.CompletionItem {
		let item = new vscode.CompletionItem(this.label, vscode.CompletionItemKind.TypeParameter);
		item.documentation = this.getMarkdown();
		return item;
	}
}

class LuaFunction {
	label: string;
	args: string[];
	returnType: string;
	description: string;
	argDescs: { [key: string]: string };

	/**
	 * 
	 * @param label The actual function name
	 * @param description The description of the function
	 * @param returnType The return type of the function
	 * @param args An array containing all arguments and their types
	 * @param argDescs A dictionary containing all arguments and their description (Key argument, Value description)
	 */
	constructor(label: string, description: string, returnType: string, args: string[], argDescs: { [key: string]: string }) {
		this.label = label;
		this.args = args;
		this.returnType = returnType;
		this.description = description;
		this.argDescs = argDescs;
	}

	getMarkdown(): vscode.MarkdownString {
		let str = new vscode.MarkdownString();
		str.appendMarkdown(this.description + "\n\n");
		str.appendMarkdown(this.returnType + " " + this.label + " ( " + this.args.join(", ") + " )"); //, "starboundlua");
		for (const key in this.argDescs) {
			if (this.argDescs.hasOwnProperty(key)) {
				const element = this.argDescs[key];
				str.appendMarkdown("- **" + key + "**: " + element + "\n");
			}
		}
		return str;
	}

	toCompletionItem(): vscode.CompletionItem {
		let item = new vscode.CompletionItem(this.label, vscode.CompletionItemKind.Function);
		item.documentation = this.getMarkdown();
		return item;
	}
}

class StarboundLuaProvider implements vscode.CompletionItemProvider {
	provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): any {
		return [
			// Package activeItem (The activeItem table contains bindings which provide functionality for the ActiveItem and for the item's 'owner' (a ToolUser entity currently holding the item).)
			new LuaFunction("activeItem.ownerEntityId", "Returns the entity id of the owner entity.", "EntityId", [], {}).toCompletionItem()
		];
	}
}

export function activate(context: vscode.ExtensionContext) {
	vscode.languages.registerCompletionItemProvider(
		{ language: 'starboundlua', scheme: 'file' },
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
				if (context.triggerKind != vscode.CompletionTriggerKind.TriggerCharacter) {
					return [
						// WIDGET?!?!
						new LuaFunction("size", "Returns the size of the canvas.", "`Vec2I`", [""], {}).toCompletionItem(),
						new LuaFunction("clear", "Clears the canvas.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("mousePosition", "Returns the mouse position relative to the canvas.", "`Vec2I`", [""], {}).toCompletionItem(),
						new LuaFunction("drawImage", "Draws an image to the canvas.", "`void`", ["`String` image", "`Vec2F` position", "[`float` scale]", "[`Color` color]", "[`bool` centered]"], {}).toCompletionItem(),
						new LuaFunction("drawImageDrawable", "Draws an image to the canvas, centered on position, with slightly different options.", "`void`", ["`String` image", "`Vec2F` position", "[`Variant<Vec2F, float>` scale]", "[`Color` color]", "[`float` rotation]"], {}).toCompletionItem(),
						new LuaFunction("drawImageRect", "Draws a rect section of a texture to a rect section of the canvas.", "`void`", ["`String` texName", "`RectF` texCoords", "`RectF` screenCoords", "[`Color` color]"], {}).toCompletionItem(),
						new LuaFunction("drawTiledImage", "Draws an image tiled (and wrapping) within the specified screen area.", "`void`", ["`String` image", "`Vec2F` offset", "`RectF` screenCoords", "[`float` scale]", "[`Color` color]"], {}).toCompletionItem(),
						new LuaFunction("drawLine", "Draws a line on the canvas.", "`void`", ["`Vec2F` start", "`Vec2F` end", "[`Color` color]", "[`float` lineWidth]"], {}).toCompletionItem(),
						new LuaFunction("drawRect", "Draws a filled rectangle on the canvas.", "`void`", ["`RectF` rect", "`Color` color"], {}).toCompletionItem(),
						new LuaFunction("drawPoly", "Draws a polygon on the canvas.", "`void`", ["`PolyF` poly", "`Color` color", "[`float` lineWidth]"], {}).toCompletionItem(),
						new LuaFunction("drawTriangles", "Draws a list of filled triangles to the canvas.", "`void`", ["`List<PolyF>` triangles", "[`Color` color]"], {}).toCompletionItem(),
						new LuaFunction("drawText", "Draws text on the canvas.", "`void`", ["`String` text", "`Json` textPositioning", "`unsigned` fontSize", "[`Color` color]"], {}).toCompletionItem(),

						// WORLD
						new LuaFunction("explore", "Explores the path up to the specified node count limit. Returns `true` if the pathfinding is complete and `false` if it is still incomplete. If nodeLimit is unspecified, this will search up to the configured maximum number of nodes, making it equivalent to world.platformerPathStart.", "`bool`", ["[`int` nodeLimit]"], {}).toCompletionItem(),
						new LuaFunction("result", "Returns the completed path.", "`PlatformerAStar::Path`", [""], {}).toCompletionItem(),

						// Global
						new LuaFunction("init", "Reinitializes the random source, optionally using the specified seed.", "`void`", ["[`unsigned` seed]"], {}).toCompletionItem(),
						new LuaFunction("addEntropy", "Adds entropy to the random source, optionally using the specified seed.", "`void`", ["[`unsigned` seed]"], {}).toCompletionItem(),
						new LuaFunction("randu32", "Returns a random 32-bit unsigned integer value.", "`unsigned`", [""], {}).toCompletionItem(),
						new LuaFunction("randu64", "Returns a random 64-bit unsigned integer value.", "`unsigned`", [""], {}).toCompletionItem(),
						new LuaFunction("randi32", "Returns a random 32-bit signed integer value.", "`int`", [""], {}).toCompletionItem(),
						new LuaFunction("randi64", "Returns a random 64-bit signed integer value.", "`int`", [""], {}).toCompletionItem(),
						new LuaFunction("randf", "Returns a random `float` value within the specified range, or between 0 and 1 if no range is specified.", "`float`", ["[`float` min]", "[`float` max]"], {}).toCompletionItem(),
						new LuaFunction("randf", "Returns a random `double` value within the specified range, or between 0 and 1 if no range is specified.", "`double`", ["[`double` min]", "[`double` max]"], {}).toCompletionItem(),
						new LuaFunction("randf", "Returns a random unsigned integer value between minOrMax and max, or between 0 and minOrMax if no max is specified.", "`unsigned`", ["`unsigned` minOrMax", "[`unsigned` max]"], {}).toCompletionItem(),
						new LuaFunction("randf", "Returns a random signed integer value between minOrMax and max, or between 0 and minOrMax if no max is specified.", "`int`", ["[`int` min]", "[`int` max]"], {}).toCompletionItem(),
						new LuaFunction("randb", "Returns a random `bool` value.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("perlinsource.get", "Returns a `float` value from the Perlin source using 1, 2, or 3 dimensions of input.", "`float`", ["`float` x", "[`float` y]", "[`float` z]"], {}).toCompletionItem(),

						new LuaType("activeItem", "The activeItem table contains bindings which provide functionality for the ActiveItem and for the item's 'owner' (a ToolUser entity currently holding the item).").toCompletionItem(),
						new LuaType("activeItemAnimation", "The activeItemAnimation table contains bindings available to client-side animation scripts for active items.").toCompletionItem(),
						new LuaType("mcontroller", "The `mcontroller` table sometimes contains functions relating to the actor movement controller.\nThe `mcontroller` table contains functions relating to the movement controller.").toCompletionItem(),
						new LuaType("animator", "The *animator* table contains functions that relate to an attached networked animator. Networked animators are found in:").toCompletionItem(),
						new LuaType("celestial", "The *celestial* table contains functions that relate to the client sky, flying the player ship, system positions for planets, system objects, and the celestial database.").toCompletionItem(),
						new LuaType("CommandProcessor", "The command processor has a single binding for performing admin checks, available on the *CommandProcessor* table.").toCompletionItem(),
						new LuaType("config", "The `config` lua bindings relate to anything that has a configuration and needs to access configuration parameters.").toCompletionItem(),
						new LuaType("pane", "These pane bindings are available to container interface panes and include functions not specifically related to widgets within the pane.").toCompletionItem(),
						new LuaType("entity", "The *entity* table contains functions that are common among all entities. Every function refers to the entity the script context is running on.").toCompletionItem(),
						new LuaType("item", "The `item` table is available in all scripted items and contains functions relating to the item itself.").toCompletionItem(),
						new LuaType("localAnimator", "The *localAnimator* table provides bindings used by client side animation scripts (e.g. on objects and active items) to set drawables/lights and perform rendering actions.").toCompletionItem(),
						new LuaType("message", "The message table contains a single function, setHandler, which allows entities to receive messages sent using world.sendEntityMessage.").toCompletionItem(),
						new LuaType("monster", "The monster table contains bindings specific to monsters which are available in addition to their common tables.").toCompletionItem(),
						new LuaType("npc", "The `npc` table is for functions relating directly to the current npc. It is available only in NPC scripts.").toCompletionItem(),
						new LuaType("object", "The object table contains bindings specific to objects which are available in addition to their common tables.").toCompletionItem(),
						new LuaType("objectAnimator", "The objectAnimator table contains bindings available to client-side animation scripts for objects.").toCompletionItem(),
						new LuaType("physics", "The physics table is available to objects and used to control any collisions or force regions configured on those objects.").toCompletionItem(),
						new LuaType("player", "The player table contains functions with privileged access to the player which run in a few contexts on the client such as scripted interface panes, quests, and player companions.").toCompletionItem(),
						new LuaType("playerCompanions", "The playerCompanions table contains bindings used to manage player companions such as pets and crew members.").toCompletionItem(),
						new LuaType("projectile", "The projectile table contains bindings specific to projectiles which are available in addition to their common tables.").toCompletionItem(),
						new LuaType("quest", "The `quest` table contains functions relating directly to the quest whose script its run in.").toCompletionItem(),
						new LuaType("root", "The `root` table contains functions that reference the game's currently loaded assets and don't relate to any more specific context such as a particular world or universe.").toCompletionItem(),
						new LuaType("animationConfig", "The `animationConfig` table contains functions for getting configuration options from the base entity and its networked animator.").toCompletionItem(),
						new LuaType("pane", "These pane bindings are available to scripted interface panes and include functions not specifically related to widgets within the pane.").toCompletionItem(),
						new LuaType("stagehand", "The stagehand table contains bindings specific to stagehands which are available in addition to their common tables.").toCompletionItem(),
						new LuaType("status", "The `status` table relates to the status controller attached to an entity. It is available in:\n\n* monsters\n* npcs\n* status effects\n* companion system scripts\n* quest scripts\n* tech\n* primary status scripts for: player, monster, npc").toCompletionItem(),
						new LuaType("effect", "The `effect` table relates to functions specifically for status effects.").toCompletionItem(),
						new LuaType("tech", "The `tech` table contains functions exclusively available in tech scripts.").toCompletionItem(),
						new LuaType("script", "Most entity script contexts include the *script* table, which provides bindings for getting and setting the script's update rate. Update deltas are specified in numbers of frames, so a script with an update delta of 1 would run every frame, or a script with an update delta of 60 would run once per second. An update delta of 0 means that the script's periodic update will never be called, but it can still perform actions through script calls, messaging, or event hooks.").toCompletionItem(),
						new LuaType("sb", "The sb table contains miscellaneous utility functions that don't directly relate to any assets or content of the game.").toCompletionItem(),
						new LuaType("vehicle", "The vehicle table contains bindings specific to vehicles which are available in addition to their common tables.").toCompletionItem(),
						new LuaType("widget", "The `widget` table contains functions to manipulate and get data about widgets in a scriptpane.\n\nThe widgetName passed into most of these functions can contain period separators for getting children.").toCompletionItem(),
						new LuaType("world", "The `world` table contains functions that perform actions within a specified such as querying or modifying entities, tiles, etc. in that world.").toCompletionItem(),
					];
				}

				if (position.character - 11 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 11), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 11), position)) == "activeItem.") {
					return [
						new LuaFunction("ownerEntityId", "Returns the entity id of the owner entity.", "EntityId", [], {}).toCompletionItem(),
						new LuaFunction("ownerTeam", "Returns the damage team of the owner entity.", "DamageTeam", [], {}).toCompletionItem(),
						new LuaFunction("ownerAimPosition", "Returns the world aim position of the owner entity.", "Vec2F", [], {}).toCompletionItem(),
						new LuaFunction("ownerPowerMultiplier", "Returns the power multiplier of the owner entity.", "float", [], {}).toCompletionItem(),
						new LuaFunction("fireMode", "Returns the current fire mode of the item, which can be \"none\", \"primary\" or \"alt\". Single-handed items held in the off hand will receive right click as \"primary\" rather than \"alt\".", "String", [], {}).toCompletionItem(),
						new LuaFunction("hand", "Returns the name of the hand that the item is currently held in, which can be \"primary\" or \"alt\".", "String", [], {}).toCompletionItem(),
						new LuaFunction("handPosition", "Takes an input position (defaults to [0, 0]) relative to the item and returns a position relative to the owner entity.", "Vec2F", ["`Vec2F` offset"], {}).toCompletionItem(),
						new LuaFunction("aimAngleAndDirection", "Returns a table containing the `float` aim angle and `int` facing direction that would be used for the item to aim at the specified target position with the specified vertical offset. This takes into account the position of the shoulder, distance of the hand from the body, and a lot of other complex factors and should be used to control aimable weapons or tools based on the owner's aim position.", "LuaTable", ["`float` aimVerticalOffset", "`Vec2F` targetPosition"], {}).toCompletionItem(),
						new LuaFunction("aimAngle", "Similar to activeItem.aimAngleAndDirection but only returns the aim angle that would be calculated with the entity's current facing direction. Necessary if, for example, an item needs to aim behind the owner.", "float", ["`float` aimVerticalOffset", "`Vec2F` targetPosition"], {}).toCompletionItem(),
						new LuaFunction("setHoldingItem", "Sets whether the owner is visually holding the item.", "void", ["`bool` holdingItem"], {}).toCompletionItem(),
						new LuaFunction("setBackArmFrame", "Sets the arm image frame that the item should use when held behind the player, or clears it to the default rotation arm frame if no frame is specified.", "void", ["`String` armFrame"], {}).toCompletionItem(),
						new LuaFunction("setFrontArmFrame", "Sets the arm image frame that the item should use when held in front of the player, or clears it to the default rotation arm frame if no frame is specified.", "void", ["`String` armFrame"], {}).toCompletionItem(),
						new LuaFunction("setTwoHandedGrip", "Sets whether the item should be visually held with both hands. Does not alter the functional handedness requirement of the item.", "void", ["`bool` twoHandedGrip"], {}).toCompletionItem(),
						new LuaFunction("setRecoil", "Sets whether the item is in a recoil state, which will translate both the item and the arm holding it slightly toward the back of the character.", "void", ["`bool` recoil"], {}).toCompletionItem(),
						new LuaFunction("setOutsideOfHand", "Sets whether the item should be visually rendered outside the owner's hand. Items outside of the hand will be rendered in front of the arm when held in front and behind the arm when held behind.", "void", ["`bool` outsideOfHand"], {}).toCompletionItem(),
						new LuaFunction("setArmAngle", "Sets the angle to which the owner's arm holding the item should be rotated.", "void", ["`float` angle"], {}).toCompletionItem(),
						new LuaFunction("setFacingDirection", "Sets the item's requested facing direction, which controls the owner's facing. Positive direction values will face right while negative values will face left. If the owner holds two items which request opposing facing directions, the direction requested by the item in the primary hand will take precedence.", "void", ["`float` direction"], {}).toCompletionItem(),
						new LuaFunction("setDamageSources", "Sets a list of active damage sources with coordinates relative to the owner's position or clears them if unspecified.", "void", ["`List<DamageSource>` damageSources"], {}).toCompletionItem(),
						new LuaFunction("setItemDamageSources", "Sets a list of active damage sources with coordinates relative to the item's hand position or clears them if unspecified.", "void", ["`List<DamageSource>` damageSources"], {}).toCompletionItem(),
						new LuaFunction("setShieldPolys", "Sets a list of active shield polygons with coordinates relative to the owner's position or clears them if unspecified.", "void", ["`List<PolyF>` shieldPolys"], {}).toCompletionItem(),
						new LuaFunction("setItemShieldPolys", "Sets a list of active shield polygons with coordinates relative to the item's hand position or clears them if unspecified.", "void", ["`List<PolyF>` shieldPolys"], {}).toCompletionItem(),
						new LuaFunction("setForceRegions", "Sets a list of active physics force regions with coordinates relative to the owner's position or clears them if unspecified.", "void", ["`List<PhysicsForceRegion>` forceRegions"], {}).toCompletionItem(),
						new LuaFunction("setItemForceRegions", "Sets a list of active physics force regions with coordinates relative to the item's hand position or clears them if unspecified.", "void", ["`List<PhysicsForceRegion>` forceRegions"], {}).toCompletionItem(),
						new LuaFunction("setCursor", "Sets the item's overriding cursor image or clears it if unspecified.", "void", ["`String` cursor"], {}).toCompletionItem(),
						new LuaFunction("setScriptedAnimationParameter", "Sets a parameter to be used by the item's scripted animator.", "void", ["`String` parameter", "`Json` value"], {}).toCompletionItem(),
						new LuaFunction("setInventoryIcon", "Sets the inventory icon of the item.", "void", ["`String` image"], {}).toCompletionItem(),
						new LuaFunction("setInstanceValue", "Sets an instance value (parameter) of the item.", "void", ["`String` parameter", "`Json` value"], {}).toCompletionItem(),
						new LuaFunction("callOtherHandScript", "Attempts to call the specified function name with the specified argument values in the context of an ActiveItem held in the opposing hand and synchronously returns the result if successful.", "LuaValue", ["`String` functionName", "[`LuaValue` args ...]"], {}).toCompletionItem(),
						new LuaFunction("interact", "Triggers an interact action on the owner as if they had initiated an interaction and the result had returned the specified interaction type and configuration. Can be used to e.g. open GUI windows normally triggered by player interaction with entities.", "void", ["`String` interactionType", "`Json` config", "[`EntityId` sourceEntityId]"], {}).toCompletionItem(),
						new LuaFunction("emote", "Triggers the owner to perform the specified emote.", "void", ["`String` emote"], {}).toCompletionItem(),
						new LuaFunction("setCameraFocusEntity", "If the owner is a player, sets that player's camera to be centered on the position of the specified entity, or recenters the camera on the player's position if no entity id is specified.", "void", ["[`EntityId` entity]"], {}).toCompletionItem(),

					];
				}
				if (position.character - 20 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 20), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 20), position)) == "activeItemAnimation.") {
					return [
						new LuaFunction("ownerPosition", "Returns the current entity position of the item's owner.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("ownerAimPosition", "Returns the current world aim position of the item's owner.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("ownerArmAngle", "Returns the current angle of the arm holding the item.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("ownerFacingDirection", "Returns the current facing direction of the item's owner. Will return 1 for right or -1 for left.", "`int`", [""], {}).toCompletionItem(),
						new LuaFunction("handPosition", "Takes an input position (defaults to [0, 0]) relative to the item and returns a position relative to the owner entity.", "`Vec2F`", ["[`Vec2F` offset]"], {}).toCompletionItem(),
						new LuaFunction("partPoint", "Returns a transformation of the specified `Vec2F` parameter configured on the specified animation part, relative to the owner's position.", "`Vec2F`", ["`String` partName", "`String` propertyName"], {}).toCompletionItem(),
						new LuaFunction("partPoly", "Returns a transformation of the specified `PolyF` parameter configured on the specified animation part, relative to the owner's position.", "`PolyF`", ["`String` partName", "`String` propertyName"], {}).toCompletionItem(),
					];
				}
				if (position.character - 12 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 12), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 12), position)) == "mcontroller.") {
					return [
						new LuaFunction("boundBox", "Returns a rect containing the entire collision of the movement controller, in local coordinates.", "`RectF`", [""], {}).toCompletionItem(),
						new LuaFunction("collisionPoly", "Returns the collision poly of the movement controller, in local coordinates.", "`PolyF`", [""], {}).toCompletionItem(),
						new LuaFunction("collisionBody", "Returns the collision poly of the movement controller, in world coordinates.", "`PolyF`", [""], {}).toCompletionItem(),
						new LuaFunction("mass", "Returns the configured mass of the movement controller.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("position", "Returns the current position of the movement controller.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("xPosition", "Returns the current horizontal position of the movement controller.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("yPosition", "Returns the current vertical position of the movement controller.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("velocity", "Returns the current velocity of the movement controller.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("xVelocity", "Returns the current horizontal speed of the movement controller.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("yVelocity", "Returns the current vertical speed of the movement controller.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("rotation", "Returns the current rotation of the movement controller in radians.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("isColliding", "Returns whether the movement controller is currently colliding with world geometry or a PhysicsMovingCollision.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("isNullColliding", "Returns whether the movement controller is currently colliding with null world geometry. Null collision occurs in unloaded sectors.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("isCollisionStuck", "Returns whether the movement controller is currently stuck colliding. Movement controllers can stick if the `stickyCollision` movement parameter is set.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("stickingDirection", "Returns the angle that the movement controller is currently stuck at, in radians.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("liquidPercentage", "Returns the percentage of the collision poly currently submerged in liquid;", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("liquidId", "Returns the liquid ID of the liquid that the movement controller is currently submerged in. If this is several liquids this returns the most plentiful one.", "`LiquidId`", [""], {}).toCompletionItem(),
						new LuaFunction("onGround", "Returns whether the movement controller is currently on ground.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("zeroG", "Returns `true` if the movement controller is at a world position without gravity or if gravity has been disabled.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("atWorldLimit", "Returns `true` if the movement controller is touching the bottom or the top (unless bottomOnly is specified) of the world.", "`bool`", ["[`bool` bottomOnly]"], {}).toCompletionItem(),
						new LuaFunction("setAnchorState", "Anchors the movement controller to an anchorable entity at the given anchor index.", "`void`", ["`EntityId` anchorableEntity", "size_t anchorPosition"], {}).toCompletionItem(),
						new LuaFunction("resetAnchorState", "Reset the anchor state.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("anchorState", "Returns ID of anchored entity and index of the anchor position.", "`EntityId`,`int`", [""], {}).toCompletionItem(),
						new LuaFunction("setPosition", "Sets the position of the movement controller.", "`void`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("setXPosition", "Sets the horizontal position of the movement controller.", "`void`", ["`float` x"], {}).toCompletionItem(),
						new LuaFunction("setYPosition", "Sets the vertical position of the movement controller.", "`void`", ["`float` y"], {}).toCompletionItem(),
						new LuaFunction("translate", "Moves the movement controller by the vector provided.", "`void`", ["`Vec2F` direction"], {}).toCompletionItem(),
						new LuaFunction("setVelocity", "Sets the velocity of the movement controller.", "`void`", ["`Vec2F` velocity"], {}).toCompletionItem(),
						new LuaFunction("setXVelocity", "Sets the horizontal velocity of the movement controller.", "`void`", ["`Vec2F` xVelocity"], {}).toCompletionItem(),
						new LuaFunction("setYVelocity", "Sets the vertical velocity of the movement controller.", "`void`", ["`Vec2F` yVelocity"], {}).toCompletionItem(),
						new LuaFunction("addMomentum", "Adds (momentum / mass) velocity to the movement controller.", "`void`", ["`Vec2F` momentum"], {}).toCompletionItem(),
						new LuaFunction("setRotation", "Sets the rotation of the movement controller. Angle is in radians.", "`void`", ["`float` angle"], {}).toCompletionItem(),
						new LuaFunction("baseParameters", "Returns the base movement parameters.", "`ActorMovementParameters`", [""], {}).toCompletionItem(),
						new LuaFunction("walking", "Returns whether the actor movement controller is currently walking.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("running", "Returns whether the actor movement controller is currently running.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("movingDirection", "Returns the direction that the actor movement controller is currently moving in. -1 for left, 1 for right.", "`int`", [""], {}).toCompletionItem(),
						new LuaFunction("facingDirection", "Returns the facing direction. -1 for left, 1 for right.", "`int`", [""], {}).toCompletionItem(),
						new LuaFunction("crouching", "Returns whether the controller is currently crouching.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("flying", "Returns whether the controller is currently flying.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("falling", "Returns whether the controller is currently falling.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("canJump", "Returns whether the controller can currently jump.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("jumping", "Returns whether the controller is currently jumping.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("groundMovement", "Returns whether the controller is currently in a ground movement state. Movement controllers can be in ground movement even when onGround returns false.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("liquidMovement", "Returns whether the controller is currently in liquid movement mode.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("controlRotation", "Rotates the controller. Each control adds to the previous one.", "`void`", ["`float` rotation"], {}).toCompletionItem(),
						new LuaFunction("controlAcceleration", "Controls acceleration. Each control adds to the previous one.", "`void`", ["`Vec2F` acceleration"], {}).toCompletionItem(),
						new LuaFunction("controlForce", "Controls force. Each control adds to the previous one.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("controlApproachVelocity", "Approaches the targetVelocity using the force provided. If the current velocity is higher than the provided targetVelocity, the targetVelocity will still be approached, effectively slowing down the entity. Each control overrides the previous one.", "`void`", ["`Vec2F` targetVelocity", "`float` maxControlForce"], {}).toCompletionItem(),
						new LuaFunction("controlApproachVelocityAlongAngle", "Approaches the targetVelocity but only along the provided angle, not affecting velocity in the perpendicular axis. If positiveOnly, then it will not slow down the movementController if it is already moving faster than targetVelocity. Each control overrides the previous one.", "`void`", ["`float` angle", "`float` targetVelocity", "`float` maxControlForce", "`bool` positiveOnly = false"], {}).toCompletionItem(),
						new LuaFunction("controlApproachXVelocity", "Approaches an X velocity. Same as using approachVelocityAlongAngle with angle 0. Each control overrides the previous one.", "`void`", ["`float` targetVelocity", "`float` maxControlForce"], {}).toCompletionItem(),
						new LuaFunction("controlApproachYVelocity", "Approaches a Y velocity. Same as using approachVelocityAlongAngle with angle (Pi / 2). Each control overrides the previous one.", "`void`", ["`float` targetVelocity", "`float` maxControlForce"], {}).toCompletionItem(),
						new LuaFunction("controlParameters", "Changes movement parameters. Parameters are merged into the base parameters. Each control is merged into the previous one.", "`void`", ["`ActorMovementParameters` parameters"], {}).toCompletionItem(),
						new LuaFunction("controlModifiers", "Changes movement modifiers. Modifiers are merged into the base modifiers. Each control is merged into the previous one.", "`void`", ["`ActorMovementModifiers` modifiers"], {}).toCompletionItem(),
						new LuaFunction("controlMove", "Controls movement in a direction. Each control replaces the previous one.", "`void`", ["`float` direction", "`bool` run"], {}).toCompletionItem(),
						new LuaFunction("controlFace", "Controls the facing direction. Each control replaces the previous one.", "`void`", ["`float` direction"], {}).toCompletionItem(),
						new LuaFunction("controlDown", "Controls dropping through platforms.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("controlCrouch", "Controls crouching.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("controlJump", "Controls starting a jump. Only has an effect if canJump is true.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("controlHoldJump", "Keeps holding jump. Will not trigger a new jump, and can be held in the air.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("controlFly", "Controls flying in the specified direction (or {0, 0} to stop) with the configured flightSpeed parameter. Each control overrides the previous one.", "`void`", ["`Vec2F` direction"], {}).toCompletionItem(),
						new LuaFunction("autoClearControls", "Returns whether the controller is currently set to auto clear controls before each script update.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("setAutoClearControls", "Set whether to automatically clear controls before each script update.", "`void`", ["`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("clearControls", "Manually clear all controls.", "`void`", [], {}).toCompletionItem(),

						new LuaFunction("parameters", "Returns a table containing the movement parameters for the movement controller.", "`MovementParameters`", [""], {}).toCompletionItem(),
						new LuaFunction("applyParameters", "Applies the given parameters to the movement controller. The provided parameters are merged into the current movement parameters.", "`void`", ["`Json` parameters"], {}).toCompletionItem(),
						new LuaFunction("resetParameters", "Resets movement parameters to their original state.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("mass", "Returns the configured mass of the movement controller.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("position", "Returns the current position of the movement controller.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("xPosition", "Returns the current horizontal position of the movement controller.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("yPosition", "Returns the current vertical position of the movement controller.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("velocity", "Returns the current velocity of the movement controller.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("xVelocity", "Returns the current horizontal speed of the movement controller.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("yVelocity", "Returns the current vertical speed of the movement controller.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("rotation", "Returns the current rotation of the movement controller in radians.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("collisionPoly", "Returns the collision poly of the movement controller, in local coordinates.", "`PolyF`", [""], {}).toCompletionItem(),
						new LuaFunction("collisionBody", "Returns the collision poly of the movement controller, in world coordinates.", "`PolyF`", [""], {}).toCompletionItem(),
						new LuaFunction("collisionBoundBox", "Returns a rect containing the entire collision poly of the movement controller, in world coordinates.", "`RectF`", [""], {}).toCompletionItem(),
						new LuaFunction("localBoundBox", "Returns a rect containing the entire collision of the movement controller, in local coordinates.", "`RectF`", [""], {}).toCompletionItem(),
						new LuaFunction("isColliding", "Returns whether the movement controller is currently colliding with world geometry or a PhysicsMovingCollision.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("isNullColliding", "Returns whether the movement controller is currently colliding with null world geometry. Null collision occurs in unloaded sectors.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("isCollisionStuck", "Returns whether the movement controller is currently stuck colliding. Movement controllers can stick if the `stickyCollision` movement parameter is set.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("stickingDirection", "Returns the angle that the movement controller is currently stuck at, in radians.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("liquidPercentage", "Returns the percentage of the collision poly currently submerged in liquid;", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("liquidId", "Returns the liquid ID of the liquid that the movement controller is currently submerged in. If this is several liquids this returns the most plentiful one.", "`LiquidId`", [""], {}).toCompletionItem(),
						new LuaFunction("onGround", "Returns whether the movement controller is currently on ground.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("zeroG", "Returns `true` if the movement controller is at a world position without gravity or if gravity has been disabled.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("atWorldLimit", "Returns `true` if the movement controller is touching the bottom or the top (unless bottomOnly is specified) of the world.", "`bool`", ["[`bool` bottomOnly]"], {}).toCompletionItem(),
						new LuaFunction("setPosition", "Sets the position of the movement controller.", "`void`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("setXPosition", "Sets the horizontal position of the movement controller.", "`void`", ["`float` x"], {}).toCompletionItem(),
						new LuaFunction("setYPosition", "Sets the vertical position of the movement controller.", "`void`", ["`float` y"], {}).toCompletionItem(),
						new LuaFunction("translate", "Moves the movement controller by the vector provided.", "`void`", ["`Vec2F` direction"], {}).toCompletionItem(),
						new LuaFunction("setVelocity", "Sets the velocity of the movement controller.", "`void`", ["`Vec2F` velocity"], {}).toCompletionItem(),
						new LuaFunction("setXVelocity", "Sets the horizontal velocity of the movement controller.", "`void`", ["`Vec2F` xVelocity"], {}).toCompletionItem(),
						new LuaFunction("setYVelocity", "Sets the vertical velocity of the movement controller.", "`void`", ["`Vec2F` yVelocity"], {}).toCompletionItem(),
						new LuaFunction("addMomentum", "Adds (momentum / mass) velocity to the movement controller.", "`void`", ["`Vec2F` momentum"], {}).toCompletionItem(),
						new LuaFunction("setRotation", "Sets the rotation of the movement controller. Angle is in radians.", "`void`", ["`float` angle"], {}).toCompletionItem(),
						new LuaFunction("rotate", "Rotates the movement controller by an angle relative to its current angle. Angle is in radians.", "`void`", ["`float` angle"], {}).toCompletionItem(),
						new LuaFunction("accelerate", "Accelerates the movement controller by the given acceleration for one tick.", "`void`", ["`Vec2F` acceleration"], {}).toCompletionItem(),
						new LuaFunction("force", "Accelerates the movement controller by (force / mass) for one tick.", "`void`", ["`Vec2F` force"], {}).toCompletionItem(),
						new LuaFunction("approachVelocity", "Approaches the targetVelocity using the force provided. If the current velocity is higher than the provided targetVelocity, the targetVelocity will still be approached, effectively slowing down the entity.", "`void`", ["`Vec2F` targetVelocity", "`float` maxControlForce"], {}).toCompletionItem(),
						new LuaFunction("approachVelocityAlongAngle", "Approaches the targetVelocity but only along the provided angle, not affecting velocity in the perpendicular axis. If positiveOnly, then it will not slow down the movementController if it is already moving faster than targetVelocity.", "`void`", ["`float` angle", "`float` targetVelocity", "`float` maxControlForce", "`bool` positiveOnly = false"], {}).toCompletionItem(),
						new LuaFunction("approachXVelocity", "Approaches an X velocity. Same as using approachVelocityAlongAngle with angle 0.", "`void`", ["`float` targetVelocity", "`float` maxControlForce"], {}).toCompletionItem(),
						new LuaFunction("approachYVelocity", "Approaches a Y velocity. Same as using approachVelocityAlongAngle with angle (Pi / 2).", "`void`", ["`float` targetVelocity", "`float` maxControlForce"], {}).toCompletionItem(),
					];
				}
				if (position.character - 9 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 9), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 9), position)) == "animator.") {
					return [
						new LuaFunction("setAnimationState", "Sets an animation state. If startNew is true, restart the animation loop if it's already active. Returns whether the state was set.", "`bool`", ["`String` stateType", "`String` State", "`bool` startNew = false"], {}).toCompletionItem(),
						new LuaFunction("animationState", "Returns the current state for a state type.", "`String`", ["`String` stateType"], {}).toCompletionItem(),
						new LuaFunction("animationStateProperty", "Returns the value of the specified property for a state type.", "`Json`", ["`String` stateType", "`String` propertyName"], {}).toCompletionItem(),
						new LuaFunction("setGlobalTag", "Sets a global animator tag. A global tag replaces any tag <tagName> with the specified tagValue across all animation parts.", "`void`", ["`String` tagName", "`String` tagValue"], {}).toCompletionItem(),
						new LuaFunction("setPartTag", "Sets a local animator tag. A part tag replaces any tag <tagName> with the specified tagValue in the partType animation part only.", "`void`", ["`String` partType", "`String` tagName", "`String` tagValue"], {}).toCompletionItem(),
						new LuaFunction("setFlipped", "Sets whether the animator should be flipped horizontally.", "`void`", ["`bool` flipped"], {}).toCompletionItem(),
						new LuaFunction("setAnimationRate", "Sets the animation rate of the animator.", "`void`", ["`float` rate"], {}).toCompletionItem(),
						new LuaFunction("rotateGroup", "Rotates a rotation group to the specified angle. If immediate, ignore rotation speed.\n*NOTE:* Rotation groups have largely been replaced by transformation groups and should only be used in a context where maintaining a rotation speed is important. When possible use transformation groups.", "`void`", ["`String` rotationGroup", "`float` targetAngle", "`bool` immediate"], {}).toCompletionItem(),
						new LuaFunction("currentRotationAngle", "Returns the current angle for a rotation group.", "`float`", ["`String` rotationGroup"], {}).toCompletionItem(),
						new LuaFunction("hasTransformationGroup", "Returns whether the animator contains the specified transformation group.", "`bool`", ["`String` transformationGroup"], {}).toCompletionItem(),
						new LuaFunction("translateTransformationGroup", "Translates the specified transformation group.", "`void`", ["`String` transformationGroup", "`Vec2F` translate"], {}).toCompletionItem(),
						new LuaFunction("rotateTransformationGroup", "Rotates the specified transformation group by the specified angle in radians, optionally around the specified center point.", "`void`", ["`String` transformationGroup", "`float` rotation", "[`Vec2F` rotationCenter]"], {}).toCompletionItem(),
						new LuaFunction("scaleTransformationGroup", "Scales the specified transformation group by the specified scale. Optionally scale it from a scaleCenter.", "`void`", ["`String` transformationGroup", "`float`/`Vec2F` scale", "[`Vec2F` scaleCenter]"], {}).toCompletionItem(),
						new LuaFunction("transformTransformationGroup", "Applies a custom Mat3 transform to the specified transformationGroup. The applied matrix will be:\n[a, b, tx,\n c, d, ty,\n 0, 0, 1]", "`void`", ["`String` transformationGroup", "`float` a", "`float` b", "`float` c", "`float` d", "`float` tx", "`float` ty"], {}).toCompletionItem(),
						new LuaFunction("resetTransformationGroup", "Resets a transformationGroup to the identity transform.\n[1, 0, 0\n0, 1, 0,\n0, 1, 1]", "`void`", ["`String` transformationGroup"], {}).toCompletionItem(),
						new LuaFunction("setParticleEmitterActive", "Sets a particle emitter to be active or inactive.", "`void`", ["`String` emitterName", "`bool` active"], {}).toCompletionItem(),
						new LuaFunction("setParticleEmitterEmissionRate", "Sets the rate at which a particle emitter emits particles while active.", "`void`", ["`String` emitterName", "`float` emissionRate"], {}).toCompletionItem(),
						new LuaFunction("setParticleEmitterBurstCount", "Sets the amount of each particle the emitter will emit when using burstParticleEmitter.", "`void`", ["`String` emitterName", "`unsigned` burstCount"], {}).toCompletionItem(),
						new LuaFunction("setParticleEmitterOffsetRegion", "Sets an offset region for the particle emitter. Any particles spawned will have a randomized offset within the region added to their position.", "`void`", ["`String` emitterName", "`RectF` offsetRegion"], {}).toCompletionItem(),
						new LuaFunction("burstParticleEmitter", "Spawns the entire set of particles `burstCount` times, where `burstCount` can be configured in the animator or set by setParticleEmitterBurstCount.", "`void`", ["`String` emitterName"], {}).toCompletionItem(),
						new LuaFunction("setLightActive", "Sets a light to be active/inactive.", "`void`", ["`String` lightName, bool active"], {}).toCompletionItem(),
						new LuaFunction("setLightPosition", "Sets the position of a light.", "`void`", ["`String` lightName, Vec2F position"], {}).toCompletionItem(),
						new LuaFunction("setLightColor", "Sets the color of a light. Brighter color gives a higher light intensity.", "`void`", ["`String` lightName, Color color"], {}).toCompletionItem(),
						new LuaFunction("setLightPointAngle", "Sets the angle of a pointLight.", "`void`", ["`String` lightName, float angle"], {}).toCompletionItem(),
						new LuaFunction("hasSound", "Returns whether the animator has a sound by the name of `soundName`", "`bool`", ["`String` soundName"], {}).toCompletionItem(),
						new LuaFunction("setSoundPool", "Sets the list of sound assets to pick from when playing a sound.", "`void`", ["`String` soundName", "`List<String>` soundPool"], {}).toCompletionItem(),
						new LuaFunction("setSoundPosition", "Sets the position that a sound is played at.", "`void`", ["`String` soundName", "`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("playSound", "Plays a sound. Optionally loop `loops` times. 0 plays the sound once (no loops), -1 loops indefinitely.", "`void`", ["`String` soundName", "[`int` loops = 0]"], {}).toCompletionItem(),
						new LuaFunction("setSoundVolume", "Sets the volume of a sound. Optionally smoothly transition the volume over `rampTime` seconds.", "`void`", ["`String` soundName", "`float` volume", "[`float` rampTime = 0.0]"], {}).toCompletionItem(),
						new LuaFunction("setSoundPitch", "Sets the relative pitch of a sound. Optionally smoothly transition the pitch over `rampTime` seconds.", "`void`", ["`String` soundName", "`float` pitch", "[`float` rampTime = 0.0]"], {}).toCompletionItem(),
						new LuaFunction("stopAllSounds", "Stops all instances of the specified sound.", "`void`", ["`String` soundName"], {}).toCompletionItem(),
						new LuaFunction("setEffectActive", "Sets a configured effect to be active/inactive.", "`void`", ["`String` effect", "`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("partPoint", "Returns a `Vec2F` configured in a part's properties with all of the part's transformations applied to it.", "`Vec2F`", ["`String` partName", "`String` propertyName"], {}).toCompletionItem(),
						new LuaFunction("partPoly", "Returns a `PolyF` configured in a part's properties with all the part's transformations applied to it.", "`PolyF`", ["`String` partName", "`String` propertyName"], {}).toCompletionItem(),
						new LuaFunction("partProperty", "Returns an animation part property without applying any transformations.", "`Json`", ["`String` partName", "`String` propertyName"], {}).toCompletionItem(),
					];
				}
				if (position.character - 11 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 11), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 11), position)) == "celestial.") {
					return [
						new LuaFunction("skyFlying", "Returns whether the client sky is currently flying.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("skyFlyingType", "Returns the type of flying the client sky is currently performing.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("skyWarpPhase", "Returns the current warp phase of the client sky, if warping.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("skyWarpProgress", "Returns a value between 0 and 1 for how far through warping the sky is currently.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("skyInHyperspace", "Returns whether the sky is currently under hyperspace flight.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("skyFlying", "Flies the player ship to the specified SystemLocation in the specified system.\nSystemLocation is either of the following types: Null, CelestialCoordinate, Object, Vec2F\nThe locations are specified as a pair of type and value", "`flyShip`", ["`Vec3I` system", "`SystemLocation` destination"], {}).toCompletionItem(),
						new LuaFunction("flying", "Returns whether the player ship is flying", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("shipSystemPosition", "Returns the current position of the ship in the system.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("shipDestination", "Returns the current destination of the player ship.", "`SystemLocation`", [""], {}).toCompletionItem(),
						new LuaFunction("shipLocation", "Returns the current system location of the player ship.", "`SystemLocation`", [""], {}).toCompletionItem(),
						new LuaFunction("currentSystem", "Returns the CelestialCoordinate for system the ship is currently in.", "`CelestialCoordinate`", [""], {}).toCompletionItem(),
						new LuaFunction("planetSize", "Returns the diameter of the specified planet in system space.", "`float`", ["`CelestialCoordinate` planet"], {}).toCompletionItem(),
						new LuaFunction("planetPosition", "Returns the position of the specified planet in system space.", "`Vec2F`", ["`CelestialCoordinate` planet"], {}).toCompletionItem(),
						new LuaFunction("planetParameters", "Returns the celestial parameters for the specified planet.", "`CelestialParameters`", ["`CelestialCoordinate` planet"], {}).toCompletionItem(),
						new LuaFunction("visitableParameters", "Returns the visitable parameters for the specified visitable planet. For unvisitable planets, returns nil.", "`VisitableParameters`", ["`CelestialCoordinate` planet"], {}).toCompletionItem(),
						new LuaFunction("planetName", "Returns the name of the specified planet.", "`String`", ["`CelestialCoordinate` planet"], {}).toCompletionItem(),
						new LuaFunction("planetSeed", "Returns the seed for the specified planet.", "`uint64_t`", ["`CelestialCoordinate` planet"], {}).toCompletionItem(),
						new LuaFunction("clusterSize", "Returns the diameter of the specified planet and its orbiting moons.", "`float`", ["`CelestialCoordinate` planet"], {}).toCompletionItem(),
						new LuaFunction("planetOres", "Returns a list of ores available on the specified planet.", "`List<String>`", ["`CelestialCoordinate` planet"], {}).toCompletionItem(),
						new LuaFunction("systemPosition", "Returns the position of the specified location in the *current system*.", "`Vec2F`", ["`SystemLocation` location"], {}).toCompletionItem(),
						new LuaFunction("orbitPosition", "Returns the calculated position of the provided orbit.", "`Vec2F`", ["`Orbit` orbit"], {}).toCompletionItem(),
						new LuaFunction("systemObjects", "Returns a list of the Uuids for objects in the current system.", "`List<Uuid>`", [""], {}).toCompletionItem(),
						new LuaFunction("objectType", "Returns the type of the specified object.", "`String`", ["`Uuid` uuid"], {}).toCompletionItem(),
						new LuaFunction("objectParameters", "Returns the parameters for the specified object.", "`Json`", ["`Uuid` uuid"], {}).toCompletionItem(),
						new LuaFunction("systemSpawnObject", "Spawns an object of typeName at position. Optionally with the specified UUID and parameters.\nObjects are limited to be spawned outside a distance of  `/systemworld.config:clientSpawnObjectPadding` from any planet surface (including moons), star surface, planetary orbit (including moons), or permanent objects orbits, and at most within `clientSpawnObjectPadding` from the outermost orbit.", "`Uuid`", ["`String` typeName", "`Vec2F` position", "[`Uuid` uuid]", "[`Json` parameters]"], {}).toCompletionItem(),
						new LuaFunction("playerShips", "Returns a list of the player ships in the current system.", "`List<Uuid>`", [""], {}).toCompletionItem(),
						new LuaFunction("playerShipPosition", "Returns the position of the specified player ship.", "`playerShipPosition`", ["`Uuid` uuid"], {}).toCompletionItem(),
						new LuaFunction("objectParameters", "Returns the children for the specified celestial coordinate. For systems, return planets, for planets, return moons.", "`List<CelestialCoordinate>`", ["`CelestialCoordinate` coordinate"], {}).toCompletionItem(),
						new LuaFunction("scanSystems", "Returns a list of systems in the given region. This scans for systems asynchronously, meaning it may not return all systems if they have not been generated or sent to the client. Use `scanRegionFullyLoaded` to see if this is the case.", "`List<CelestialCoordinate>`", ["`RectI` region"], {}).toCompletionItem(),
						new LuaFunction("scanConstellationLines", "Returns the constellation lines for the specified universe region.", "`List<pair<Vec2I,Vec2I>>`", ["`RectI` region"], {}).toCompletionItem(),
						new LuaFunction("scanRegionFullyLoaded", "Returns whether the specified universe region has been fully loaded.", "`bool`", ["`RectI` region"], {}).toCompletionItem(),
						new LuaFunction("centralBodyImages", "Returns the images with scales for the central body (star) for the specified system coordinate.", "`List<pair<String,float>>`", ["`CelestialCoordinate` system"], {}).toCompletionItem(),
						new LuaFunction("planetaryObjectImages", "Returns the smallImages with scales for the specified planet or moon.", "`List<pair<String,float>>`", ["`CelestialCoordinate` coordinate"], {}).toCompletionItem(),
						new LuaFunction("worldImages", "Returns the generated world images with scales for the specified planet or moon.", "`List<pair<String,float>>`", ["`CelestialCoordinate` coordinate"], {}).toCompletionItem(),
						new LuaFunction("starImages", "Returns the star image for the specified system. Requires a twinkle time to provide the correct image frame.", "`List<pair<String,float>>`", ["`CelestialCoordinate` system", "`float` twinkleTime"], {}).toCompletionItem(),
					];

				}
				if (position.character - 17 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 17), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 17), position)) == "CommandProcessor.") {
					return [
						new LuaFunction("adminCheck", "Checks whether the specified connection id is authorized to perform admin actions and returns `nil` if authorization is succesful. If unauthorized, returns a `String` error message to display to the client requesting the action, which may include the specified action description, such as \"Insufficient privileges to do the time warp again.\"", "`String`", ["`ConnectionId` connectionId", "`String` actionDescription"], {}).toCompletionItem(),
					];
				}
				if (position.character - 7 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) == "config.") {
					return [
						new LuaFunction("getParameter", "Returns the value for the specified config parameter. If there is no value set, returns the default.", "`Json`", ["`String` parameter", "`Json` default"], {}).toCompletionItem(),
					];
				}
				if (position.character - 5 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 5), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 5), position)) == "pane.") {
					return [
						new LuaFunction("containerEntityId", "Returns the entity id of the container that this pane is connected to.", "`EntityId`", [""], {}).toCompletionItem(),
						new LuaFunction("playerEntityId", "Returns the entity id of the player that opened this pane.", "`EntityId`", [""], {}).toCompletionItem(),
						new LuaFunction("dismiss", "Closes the pane.", "`void`", [""], {}).toCompletionItem(),

						new LuaFunction("sourceEntity", "Returns the entity id of the pane's source entity.", "`EntityId`", [""], {}).toCompletionItem(),
						new LuaFunction("dismiss", "Closes the pane.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("playSound", "Plays the specified sound asset, optionally looping the specified number of times or at the specified volume.", "`void`", ["`String` sound", "[`int` loops]", "[`float` volume]"], {}).toCompletionItem(),
						new LuaFunction("stopAllSounds", "Stops all instances of the given sound asset, and returns `true` if any sounds were stopped and `false` otherwise.", "`bool`", ["`String` sound"], {}).toCompletionItem(),
						new LuaFunction("setTitle", "Sets the window title and subtitle.", "`void`", ["`String` title", "`String` subtitle"], {}).toCompletionItem(),
						new LuaFunction("setTitleIcon", "Sets the window icon.", "`void`", ["`String` image"], {}).toCompletionItem(),
					];
				}
				if (position.character - 7 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) == "entity.") {
					return [
						new LuaFunction("id", "Returns the id number of the entity.", "`EntityId`", [""], {}).toCompletionItem(),
						new LuaFunction("damageTeam", "Returns a table of the entity's damage team type and team number. Ex: {type = \"enemy\", team = 0}", "`LuaTable`", [""], {}).toCompletionItem(),
						new LuaFunction("isValidTarget", "Returns whether the provided entity is a valid target of the current entity. An entity is a valid target if they can be damaged, and in the case of monsters and NPCs if they are aggressive.", "`bool`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("distanceToEntity", "Returns the vector distance from the current entity to the provided entity.", "`Vec2F`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityInSight", "Returns whether the provided entity is in line of sight of the current entity.", "`bool`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("position", "Returns the position of the current entity.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("entityType", "Returns the  type of the current entity.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("uniqueId", "Returns the unique ID of the entity. Returns nil if there is no unique ID.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("persistent", "Returns `true` if the entity is persistent (will be saved to disk on sector unload) or `false` otherwise.", "`bool`", [""], {}).toCompletionItem(),
					];
				}
				if (position.character - 5 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 5), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 5), position)) == "item.") {
					return [
						new LuaFunction("name", "Returns the name of the item.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("count", "Returns the stack count of the item.", "`size_t`", [""], {}).toCompletionItem(),
						new LuaFunction("setCount", "Sets the item count. Returns any overflow.", "`size_t`", ["`size_t` count"], {}).toCompletionItem(),
						new LuaFunction("maxStack", "Returns the max number of this item that will fit in a stack.", "`size_t`", [""], {}).toCompletionItem(),
						new LuaFunction("matches", "Returns whether the item matches the specified item. If exactMatch is `true` then both the items' names and parameters are compared, otherwise only the items' names.", "`bool`", ["`ItemDescriptor` desc", "[`bool` exactMatch]"], {}).toCompletionItem(),
						new LuaFunction("consume", "Consumes items from the stack. Returns whether the full count was successfuly consumed.", "`bool`", ["`size_t` count"], {}).toCompletionItem(),
						new LuaFunction("empty", "Returns whether the item stack is empty.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("descriptor", "Returns an item descriptor for the item.", "`ItemDescriptor`", [""], {}).toCompletionItem(),
						new LuaFunction("description", "Returns the description for the item.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("friendlyName", "Returns the short description for the item.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("rarity", "Returns the rarity for the item.\n* 0 = common\n* 1 = uncommon\n* 2 = rare\n* 3 = legendary\n* 4 = essential", "`int`", [""], {}).toCompletionItem(),
						new LuaFunction("rarityString", "Returns the rarity as a string.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("price", "Returns the item price.", "`size_t`", [""], {}).toCompletionItem(),
						new LuaFunction("fuelAmount", "Returns the item fuel amount.", "`unsigned`", [""], {}).toCompletionItem(),
						new LuaFunction("iconDrawables", "Returns a list of the item's icon drawables.", "`Json`", [""], {}).toCompletionItem(),
						new LuaFunction("dropDrawables", "Returns a list of the item's itemdrop drawables.", "`Json`", [""], {}).toCompletionItem(),
						new LuaFunction("largeImage", "Returns the item's configured large image, if any.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("tooltipKind", "Returns the item's tooltip kind.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("category", "Returns the item's category", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("pickupSound", "Returns the item's pickup sound.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("twoHanded", "Returns whether the item is two handed.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("timeToLive", "Returns the items's time to live.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("learnBlueprintsOnPickup", "Returns a list of the blueprints learned on picking up this item.", "`Json`", [""], {}).toCompletionItem(),
						new LuaFunction("hasItemTag", "Returns whether the set of item tags for this item contains the specified tag.", "`bool`", ["`String` itemTag"], {}).toCompletionItem(),
						new LuaFunction("pickupQuestTemplates", "Returns a list of quests acquired on picking up this item.", "`Json`", [""], {}).toCompletionItem(),
					];
				}
				if (position.character - 14 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 14), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 14), position)) == "localAnimator.") {
					return [
						new LuaFunction("playAudio", "Immediately plays the specified sound, optionally with the specified loop count and volume.", "`void`", ["`String` sound", "[`int` loops]", "[`float` volume]"], {}).toCompletionItem(),
						new LuaFunction("spawnParticle", "Immediately spawns a particle with the specified name or configuration at the specified position.", "`void`", ["`Json` particleConfig", "`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("addDrawable", "Adds the specified drawable to the animator's list of drawables to be rendered. If a render layer is specified, this drawable will be drawn on that layer instead of the parent entity's render layer. Drawables set in this way are retained between script ticks and must be cleared manually using localAnimator.clearDrawables().\nThe drawable object must specify exactly one of the following keys to define its type:\n\n* [`pair<Vec2F, Vec2F>` __line__] - Defines this drawable as a line between the specified two points.\n* [`List<Vec2F>` __poly__] - Defines the drawable as a polygon composed of the specified points.\n* [`String` __image__] - Defines the drawable as an image with the specified asset path.\n\nThe following additional keys may be specified for any drawable type:\n\n* [`Vec2F` __position__] - Relative position of the drawable.\n* [`Color` __color__] - Color for the drawable. Defaults to white.\n* [`bool` __fullbright__] - Specifies whether the drawable is fullbright (ignores world lighting).\n\nThe following additional key may be specified for line drawables:\n\n* [`float` __width__] - Specifies the width of the line to be rendered.\n\nThe following transformation options may be specified for image drawables. Note that if a __transformation__ is specified, it will be used instead of other specific transformation operations.\n\n* [`Mat3F` __transformation__]\n* [`bool` __centered__]\n* [`float` __rotation__]\n* [`bool` __mirrored__]\n* [`float` __scale__]", "`void`", ["`Drawable` drawable", "[`String` renderLayer]"], {}).toCompletionItem(),
						new LuaFunction("clearDrawables", "Clears the list of drawables to be rendered.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("addLightSource", "Adds the specified light source to the animator's list of light sources to be rendered. Light sources set in this way are retained between script ticks and must be cleared manually using localAnimator.clearLightSources(). The configuration object for the light source accepts the following keys:\n\n* `Vec2F` __position__\n* `Color` __color__\n* [`bool` __pointLight__]\n* [`float` __pointBeam__]\n* [`float` __beamAngle__]\n* [`float` __beamAmbience__]\n", "`void`", ["`Json` lightSource"], {}).toCompletionItem(),
						new LuaFunction("clearLightSources", "Clears the list of light sources to be rendered.", "`void`", [""], {}).toCompletionItem(),
					];
				}
				if (position.character - 8 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 8), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 8), position)) == "message.") {
					return [
						new LuaFunction("setHandler", "Messages of the specified message type received by this script context will call the specified function. The first two arguments passed to the handler function will be the `String` messageName and a `bool` indicating whether the message is from a local entity, followed by any arguments sent with the message.", "`void`", ["`String` messageName", "`LuaFunction` handler"], {}).toCompletionItem(),
					];
				}
				if (position.character - 8 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 8), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 8), position)) == "monster.") {
					return [
						new LuaFunction("type", "Returns the monster's configured monster type.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("seed", "Returns a string representation of the monster's random seed.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("uniqueParameters", "Returns a table of the monster's unique (override) parameters.", "`Json`", [""], {}).toCompletionItem(),
						new LuaFunction("familyIndex", "Returns the monster's family index.", "`unsigned`", [""], {}).toCompletionItem(),
						new LuaFunction("level", "Returns the monster's level.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("setDamageOnTouch", "Enables or disables the monster's touch damage.", "`void`", ["`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("setDamageSources", "Sets the monster's active damage sources (or clears them if unspecified).", "`void`", ["[`List<DamageSource>` damageSources]"], {}).toCompletionItem(),
						new LuaFunction("setDamageParts", "Sets the monster's active damage parts. Damage parts must be defined in the monster's configuration parameters. A damage part specifies a damage source and an animation part to anchor the damage source to. The anchor part's transformation will be applied to the damage source's damage poly, and if a vector, the damage source's knockback.", "`void`", ["`StringSet` damageParts"], {}).toCompletionItem(),
						new LuaFunction("setAggressive", "Sets whether the monster is currently aggressive.", "`void`", ["`bool` aggressive"], {}).toCompletionItem(),
						new LuaFunction("setDropPool", "Sets the monster's drop pool, which determines the items that it will drop on death. This can be specified as the `String` name of a treasure pool, or as a `Map<String, String>` to specify different drop pools for different damage types. If specified as a map, the pool should contain a \"default\" entry for unhandled damage types.", "`void`", ["`Json` dropPool"], {}).toCompletionItem(),
						new LuaFunction("toAbsolutePosition", "Returns an absolute world position calculated from the given relative position.", "`Vec2F`", ["`Vec2F` relativePosition"], {}).toCompletionItem(),
						new LuaFunction("mouthPosition", "Returns the world position of the monster's mouth.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("flyTo", "Causes the monster to controlFly toward the given world position.", "`void`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("setDeathParticleBurst", "Sets the name of the particle emitter (configured in the animation) to burst when the monster dies, or clears it if unspecified.", "`void`", ["[`String` particleEmitter"], {}).toCompletionItem(),
						new LuaFunction("setDeathSound", "Sets the name of the sound (configured in the animation) to play when the monster dies, or clears it if unspecified.", "`void`", ["[`String` sound]"], {}).toCompletionItem(),
						new LuaFunction("setPhysicsForces", "Sets a list of physics force regions that the monster will project, used for applying forces to other nearby entities. Set an empty list to clear the force regions.", "`void`", ["`List<PhysicsForceRegion>` forceRegions"], {}).toCompletionItem(),
						new LuaFunction("setName", "Sets the monster's name.", "`void`", ["`String` name"], {}).toCompletionItem(),
						new LuaFunction("setDisplayNametag", "Sets whether the monster should display its nametag.", "`void`", ["`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("say", "Causes the monster to say the line, optionally replacing any specified tags in the text. Returns `true` if anything is said (i.e. the line is not empty) and `false` otherwise.", "`bool`", ["`String` line", "[`Map<String", "String>` tags]"], {}).toCompletionItem(),
						new LuaFunction("sayPortrait", "Similar to monster.say, but uses a portrait chat bubble with the specified portrait image.", "`bool`", ["`String` line", "`String` portrait", "[`Map<String, String>` tags]"], {}).toCompletionItem(),
						new LuaFunction("setDamageTeam", "Sets the monster's current damage team type and number.", "`void`", ["`DamageTeam` team"], {}).toCompletionItem(),
						new LuaFunction("setUniqueId", "Sets the monster's unique entity id, or clears it if unspecified.", "`void`", ["[`String` uniqueId]"], {}).toCompletionItem(),
						new LuaFunction("setDamageBar", "Sets the type of damage bar that the monster should display. Valid options are \"default\", \"none\" and \"special\".", "`void`", ["`String` damageBarType"], {}).toCompletionItem(),
						new LuaFunction("setInteractive", "Sets whether the monster is currently interactive.", "`void`", ["`bool` interactive"], {}).toCompletionItem(),
						new LuaFunction("setAnimationParameter", "Sets a networked scripted animator parameter to be used in a client side rendering script using animationConfig.getParameter.", "`void`", ["`String` key", "`Json` value"], {}).toCompletionItem(),
					];
				}
				if (position.character - 4 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 4), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 4), position)) == "npc.") {
					return [
						new LuaFunction("toAbsolutePosition", "Returns the specified local position in world space.", "`Vec2F`", ["`Vec2F` offset"], {}).toCompletionItem(),
						new LuaFunction("species", "Returns the species of the npc.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("gender", "Returns the gender of the npc", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("humanoidIdentity", "Returns the specific humanoid identity of the npc, containing information such as hair style and idle pose.", "`Json`", [""], {}).toCompletionItem(),
						new LuaFunction("npcType", "Returns the npc type of the npc.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("seed", "Returns the seed used to generate this npc.", "`uint64_t`", [""], {}).toCompletionItem(),
						new LuaFunction("level", "Returns the level of the npc.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("dropPools", "Returns the list of treasure pools that will spawn when the npc dies.", "`List<String>`", [""], {}).toCompletionItem(),
						new LuaFunction("setDropPools", "Sets the list of treasure pools that will spawn when the npc dies.", "`void`", ["`List<String>` pools"], {}).toCompletionItem(),
						new LuaFunction("energy", "Returns the current energy of the npc. Same as `status.resource(\"energy\")`", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("maxEnergy", "Returns the current energy of the npc. Same as `status.maxResource(\"energy\")`", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("say", "Makes the npc say a string. Optionally pass in tags to replace text tags. Optionally give config options for the chat message.\n\nReturns whether the chat message was successfully added.\n\nAvailable options:\n```\n{\n  drawBorder = true,\n  fontSize = 8,\n  color = {255, 255, 255},\n  sound = \"/sfx/humanoid/avian_chatter_male1.ogg\"\n}\n```", "`bool`", ["`String` line", "[`Map<String,String>` tags]", "[`Json` config]"], {}).toCompletionItem(),
						new LuaFunction("sayPortrait", "Makes the npc say a line, with a portrait chat bubble. Optionally pass in tags to replace text tags. Optionally give config options for the chat message.\nReturns whether the chat message was successfully added.\nAvailable options:\n```\n{\n  drawMoreIndicator = true,\n  sound = \"/sfx/humanoid/avian_chatter_male1.ogg\"\n}\n```", "`bool`", ["`String` line", "`String` portrait", "[`Map<String,String>` tags]", "[`Json` config]"], {}).toCompletionItem(),
						new LuaFunction("emote", "Makes the npc show a facial emote.", "`void`", ["`String` emote"], {}).toCompletionItem(),
						new LuaFunction("dance", "Sets the current dance for the npc. Dances are defined in .dance files.", "`void`", ["`String` dance"], {}).toCompletionItem(),
						new LuaFunction("setInteractive", "Sets whether the npc should be interactive.", "`void`", ["`bool` interactive"], {}).toCompletionItem(),
						new LuaFunction("setLounging", "Sets the npc to lounge in a loungeable. Optionally specify which anchor (seat) to use.\nReturns whether the npc successfully lounged.", "`bool`", ["`EntityId` loungeable", "[`size_t` anchorIndex]"], {}).toCompletionItem(),
						new LuaFunction("resetLounging", "Makes the npc stop lounging.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("isLounging", "Returns whether the npc is currently lounging.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("loungingIn", "Returns the EntityId of the loungeable the NPC is currently lounging in. Returns nil if not lounging.", "`Maybe<EntityId>`", [""], {}).toCompletionItem(),
						new LuaFunction("setOfferedQuests", "Sets the list of quests the NPC will offer.", "`void`", ["`JsonArray` quests"], {}).toCompletionItem(),
						new LuaFunction("setTurnInQuests", "Sets the list of quests the played can turn in at this npc.", "`void`", ["`JsonArray` quests"], {}).toCompletionItem(),
						new LuaFunction("setItemSlot", "Sets the specified item slot to contain the specified item.\n\nPossible equipment items slots:\n* head\n* headCosmetic\n* chest\n* chestCosmetic\n* legs\n* legsCosmetic\n* back\n* backCosmetic\n* primary\n* alt", "`bool`", ["`String` slot", "`ItemDescriptor` item"], {}).toCompletionItem(),
						new LuaFunction("getItemSlot", "Returns the item currently in the specified item slot.", "`ItemDescriptor`", ["`String` slot"], {}).toCompletionItem(),
						new LuaFunction("disableWornArmor", "Set whether the npc should not gain status effects from the equipped armor. Armor will still be visually equipped.", "`void`", ["`bool` disable"], {}).toCompletionItem(),
						new LuaFunction("beginPrimaryFire", "Toggles `on` firing the item equipped in the `primary` item slot.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("beginAltFire", "Toggles `on` firing the item equipped in the `alt` item slot.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("endPrimaryFire", "Toggles `off` firing the item equipped in the `primary` item slot.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("endAltFire", "Toggles `off` firing the item equipped in the `alt` item slot.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("setShifting", "Sets whether tools should be used as though shift is held.", "`void`", ["`bool` shifting"], {}).toCompletionItem(),
						new LuaFunction("setDamageOnTouch", "Sets whether damage on touch should be enabled.", "`void`", ["`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("aimPosition", "Returns the current aim position in world space.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("setAimPosition", "Sets the aim position in world space.", "`void`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("setDeathParticleBurst", "Sets a particle emitter to burst when the npc dies.", "`void`", ["`String` emitter"], {}).toCompletionItem(),
						new LuaFunction("setStatusText", "Sets the text to appear above the npc when it first appears on screen.", "`void`", ["`String` status"], {}).toCompletionItem(),
						new LuaFunction("setDisplayNametag", "Sets whether the nametag should be displayed above the NPC.", "`void`", ["`bool` display"], {}).toCompletionItem(),
						new LuaFunction("setPersistent", "Sets whether this npc should persist after being unloaded.", "`void`", ["`bool` persistent"], {}).toCompletionItem(),
						new LuaFunction("setKeepAlive", "Sets whether to keep this npc alive. If true, the npc will never be unloaded as long as the world is loaded.", "`void`", ["`bool` keepAlive"], {}).toCompletionItem(),
						new LuaFunction("setDamageTeam", "Sets a damage team for the npc in the format: `{type = \"enemy\", team = 2}`", "`void`", ["`Json` damageTeam"], {}).toCompletionItem(),
						new LuaFunction("setAggressive", "Sets whether the npc should be flagged as aggressive.", "`void`", ["`bool` aggressive"], {}).toCompletionItem(),
						new LuaFunction("setUniqueId", "Sets a unique ID for this npc that can be used to access it. A unique ID has to be unique for the world the npc is on, but not universally unique.", "`void`", ["`String` uniqueId"], {}).toCompletionItem(),
					];
				}
				if (position.character - 7 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) == "object.") {
					return [
						new LuaFunction("name", "Returns the object's type name.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("direction", "Returns the object's facing direction. This will be 1 for right or -1 for left.", "`int`", [""], {}).toCompletionItem(),
						new LuaFunction("position", "Returns the object's tile position. This is identical to entity.position(), so use that instead.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("setInteractive", "Sets whether the object is currently interactive.", "`void`", ["`bool` interactive"], {}).toCompletionItem(),
						new LuaFunction("uniqueId", "Returns the object's unique entity id, or `nil` if no unique id is set. This should be identical to entity.uniqueId(), so use that instead.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("setUniqueId", "Sets the objects unique entity id, or clears it if unspecified.", "`void`", ["[`String` uniqueId]"], {}).toCompletionItem(),
						new LuaFunction("boundBox", "Returns the object's metaBoundBox in world space.", "`RectF`", [""], {}).toCompletionItem(),
						new LuaFunction("spaces", "Returns a list of the tile spaces that the object occupies.", "`List<Vec2I>`", [""], {}).toCompletionItem(),
						new LuaFunction("setProcessingDirectives", "Sets the image processing directives that should be applied to the object's animation.", "`void`", ["`String` directives"], {}).toCompletionItem(),
						new LuaFunction("setSoundEffectEnabled", "Enables or disables the object's persistent sound effect, if one is configured.", "`void`", ["`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("smash", "Breaks the object. If smash is `true` then it will be smashed, causing it to (by default) drop no items.", "`void`", ["[`bool` smash]"], {}).toCompletionItem(),
						new LuaFunction("level", "Returns the \"level\" parameter if set, otherwise returns the current world's threat level.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("toAbsolutePosition", "Returns an absolute world position calculated from the given relative position.", "`Vec2F`", ["`Vec2F` relativePosition"], {}).toCompletionItem(),
						new LuaFunction("say", "Causes the object to say the line, optionally replacing any specified tags in the text, and using the provided additional chat configuration. Returns `true` if anything is said (i.e. the line is not empty) and `false` otherwise.", "`bool`", ["`String` line", "[`Map<String, String>` tags]", "[`Json` config]"], {}).toCompletionItem(),
						new LuaFunction("sayPortrait", "Similar to object.say, but uses a portrait chat bubble with the specified portrait image.", "`bool`", ["`String` line", "`String` portrait", "[`Map<String, String>` tags]", "[`Json` config]"], {}).toCompletionItem(),
						new LuaFunction("isTouching", "Returns `true` if the specified entity's collision area overlaps the object's bound box and `false` otherwise.", "`bool`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("setLightColor", "Sets the color of light for the object to emit. This is not the same as animator.setLightColor and the animator light configuration should be used for more featureful light sources.", "`void`", ["`Color` color"], {}).toCompletionItem(),
						new LuaFunction("getLightColor", "Returns the object's currently configured light color.", "`Color`", [""], {}).toCompletionItem(),
						new LuaFunction("inputNodeCount", "Returns the number of wire input nodes the object has.", "`unsigned`", [""], {}).toCompletionItem(),
						new LuaFunction("outputNodeCount", "Returns the number of wire output nodes the object has.", "`unsigned`", [""], {}).toCompletionItem(),
						new LuaFunction("getInputNodePosition", "Returns the relative position of the specified wire input node.", "`Vec2I`", ["`unsigned` nodeIndex"], {}).toCompletionItem(),
						new LuaFunction("getOutputNodePosition", "Returns the relative position of the specified wire output node.", "`Vec2I`", ["`unsigned` nodeIndex"], {}).toCompletionItem(),
						new LuaFunction("getInputNodeLevel", "Returns the current level of the specified wire input node.", "`bool`", ["`unsigned` nodeIndex"], {}).toCompletionItem(),
						new LuaFunction("getOutputNodeLevel", "Returns the current level of the specified wire output node.", "`bool`", ["`unsigned` nodeIndex"], {}).toCompletionItem(),
						new LuaFunction("isInputNodeConnected", "Returns `true` if any wires are currently connected to the specified wire input node and `false` otherwise.", "`bool`", ["`unsigned` nodeIndex"], {}).toCompletionItem(),
						new LuaFunction("isOutputNodeConnected", "Returns `true` if any wires are currently connected to the specified wire output node and `false` otherwise", "`bool`", ["`unsigned` nodeIndex"], {}).toCompletionItem(),
						new LuaFunction("getInputNodeIds", "Returns a map of the entity id of each wire entity connected to the given wire input node and the index of that entity's output node to which the input node is connected.", "`Map<EntityId,unsigned>`", ["`unsigned` nodeIndex"], {}).toCompletionItem(),
						new LuaFunction("getOutputNodeIds", "Returns a map of the entity id of each wire entity connected to the given wire output node and the index of that entity's input node to which the output node is connected.", "`Map<EntityId,unsigned>`", ["`unsigned` nodeIndex"], {}).toCompletionItem(),
						new LuaFunction("setOutputNodeLevel", "Sets the level of the specified wire output node.", "`void`", ["`unsigned` nodeIndex", "`bool` level"], {}).toCompletionItem(),
						new LuaFunction("setAllOutputNodes", "Sets the level of all wire output nodes.", "`void`", ["`bool` level"], {}).toCompletionItem(),
						new LuaFunction("setOfferedQuests", "Sets the list of quests that the object will offer to start, or clears them if unspecified.", "`void`", ["[`JsonArray` quests]"], {}).toCompletionItem(),
						new LuaFunction("setTurnInQuests", "Sets the list of quests that the object will accept turn-in for, or clears them if unspecified.", "`void`", ["[`JsonArray` quests]"], {}).toCompletionItem(),
						new LuaFunction("setConfigParameter", "Sets the specified override configuration parameter for the object.", "`void`", ["`String` key", "`Json` value"], {}).toCompletionItem(),
						new LuaFunction("setAnimationParameter", "Sets the specified animation parameter for the object's scripted animator.", "`void`", ["`String` key", "`Json` value"], {}).toCompletionItem(),
						new LuaFunction("setMaterialSpaces", "Sets the object's material spaces to the specified list, or clears them if unspecified. List entries should be in the form of `pair<Vec2I, String>` specifying the relative position and material name of materials to be set. __Objects should only set material spaces within their occupied tile spaces to prevent Bad Things TM from happening.__", "`void`", ["[`JsonArray` spaces]"], {}).toCompletionItem(),
						new LuaFunction("setDamageSources", "Sets the object's active damage sources (or clears them if unspecified).", "`void`", ["[`List<DamageSource>` damageSources]"], {}).toCompletionItem(),
						new LuaFunction("health", "Returns the object's current health.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("setHealth", "Sets the object's current health.", "`void`", ["`float` health"], {}).toCompletionItem(),
					];
				}
				if (position.character - 15 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 15), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 15), position)) == "objectAnimator.") {
					return [
						new LuaFunction("getParameter", "Returns the value for the specified object parameter. If there is no value set, returns the default.", "`Json`", ["`String` parameter", "`Json` default"], {}).toCompletionItem(),
						new LuaFunction("direction", "Returns the object's facing direction. This will be 1 for right or -1 for left.", "`int`", [""], {}).toCompletionItem(),
						new LuaFunction("position", "Returns the object's tile position.", "`Vec2F`", [""], {}).toCompletionItem(),
					];
				}
				if (position.character - 8 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 8), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 8), position)) == "physics.") {
					return [
						new LuaFunction("setForceEnabled", "Enables or disables the specified physics force region.", "`void`", ["`String` force", "`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("setCollisionPosition", "Moves the specified physics collision region to the specified position.", "`void`", ["`String` collision", "`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("setCollisionEnabled", "Enables or disables the specified physics collision region.", "`void`", ["`String` collision", "`bool` enabled"], {}).toCompletionItem(),
					];
				}
				if (position.character - 7 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) == "player.") {
					return [
						new LuaFunction("id", "Returns the player's entity id.", "`EntityId`", [""], {}).toCompletionItem(),
						new LuaFunction("uniqueId", "Returns the player's unique id.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("species", "Returns the player's species.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("gender", "Returns the player's gender.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("isAdmin", "Returns whether the player is admin.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("interact", "Triggers an interact action on the player as if they had initiated an interaction and the result had returned the specified interaction type and configuration. Can be used to e.g. open GUI windows normally triggered by player interaction with entities.", "`void`", ["`String` interactionType", "`Json` config", "[`EntityId` sourceEntityId]"], {}).toCompletionItem(),
						new LuaFunction("shipUpgrades", "Returns a JSON object containing information about the player's current ship upgrades including \"shipLevel\", \"maxFuel\", \"crewSize\" and a list of \"capabilities\".", "`Json`", [""], {}).toCompletionItem(),
						new LuaFunction("upgradeShip", "Applies the specified ship upgrades to the player's ship.", "`void`", ["`Json` shipUpgrades"], {}).toCompletionItem(),
						new LuaFunction("setUniverseFlag", "Sets the specified universe flag on the player's current universe.", "`void`", ["`String` flagName"], {}).toCompletionItem(),
						new LuaFunction("giveBlueprint", "Teaches the player any recipes which can be used to craft the specified item.", "`void`", ["`ItemDecriptor` item"], {}).toCompletionItem(),
						new LuaFunction("blueprintKnown", "Returns `true` if the player knows one or more recipes to create the specified item and `false` otherwise.", "`void`", ["`ItemDecriptor` item"], {}).toCompletionItem(),
						new LuaFunction("makeTechAvailable", "Adds the specified tech to the player's list of available (unlockable) techs.", "`void`", ["`String` tech"], {}).toCompletionItem(),
						new LuaFunction("makeTechUnavailable", "Removes the specified tech from player's list of available (unlockable) techs.", "`void`", ["`String` tech"], {}).toCompletionItem(),
						new LuaFunction("enableTech", "Unlocks the specified tech, allowing it to be equipped through the tech GUI.", "`void`", ["`String` tech"], {}).toCompletionItem(),
						new LuaFunction("equipTech", "Equips the specified tech.", "`void`", ["`String` tech"], {}).toCompletionItem(),
						new LuaFunction("unequipTech", "Unequips the specified tech.", "`void`", ["`String` tech"], {}).toCompletionItem(),
						new LuaFunction("availableTechs", "Returns a list of the techs currently available to the player.", "`JsonArray`", [""], {}).toCompletionItem(),
						new LuaFunction("enabledTechs", "Returns a list of the techs currently unlocked by the player.", "`JsonArray`", [""], {}).toCompletionItem(),
						new LuaFunction("equippedTech", "Returns the name of the tech the player has currently equipped in the specified slot, or `nil` if no tech is equipped in that slot.", "`String`", ["`String` slot"], {}).toCompletionItem(),
						new LuaFunction("currency", "Returns the player's current total reserves of the specified currency.", "`unsigned`", ["`String` currencyName"], {}).toCompletionItem(),
						new LuaFunction("addCurrency", "Increases the player's reserve of the specified currency by the specified amount.", "`void`", ["`String` currencyName", "`unsigned` amount"], {}).toCompletionItem(),
						new LuaFunction("consumeCurrency", "Attempts to consume the specified amount of the specified currency and returns `true` if successful and `false` otherwise.", "`bool`", ["`String` currencyName", "`unsigned` amount"], {}).toCompletionItem(),
						new LuaFunction("cleanupItems", "Triggers an immediate cleanup of the player's inventory, removing item stacks with 0 quantity. May rarely be required in special cases of making several sequential modifications to the player's inventory within a single tick.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("giveItem", "Adds the specified item to the player's inventory.", "`void`", ["`ItemDescriptor` item"], {}).toCompletionItem(),
						new LuaFunction("hasItem", "Returns `true` if the player's inventory contains an item matching the specified descriptor and `false` otherwise. If exactMatch is `true` then parameters as well as item name must match.", "`bool`", ["`ItemDescriptor` item", "[`bool` exactMatch]"], {}).toCompletionItem(),
						new LuaFunction("hasCountOfItem", "Returns the total number of items in the player's inventory matching the specified descriptor. If exactMatch is `true` then parameters as well as item name must match.", "`unsigned`", ["`ItemDescriptor` item", "[`bool` exactMatch]"], {}).toCompletionItem(),
						new LuaFunction("consumeItem", "Attempts to consume the specified item from the player's inventory and returns the item consumed if successful. If consumePartial is `true`, matching stacks totalling fewer items than the requested count may be consumed, otherwise the operation will only be performed if the full count can be consumed. If exactMatch is `true` then parameters as well as item name must match.", "`ItemDescriptor`", ["`ItemDescriptor` item", "[`bool` consumePartial]", "[`bool` exactMatch]"], {}).toCompletionItem(),
						new LuaFunction("inventoryTags", "Returns a summary of all tags of all items in the player's inventory. Keys in the returned map are tag names and their corresponding values are the total count of items including that tag.", "`Map<String,unsigned>`", [""], {}).toCompletionItem(),
						new LuaFunction("itemsWithTag", "Returns a list of `ItemDescriptor`s for all items in the player's inventory that include the specified tag.", "`JsonArray`", ["`String` tag"], {}).toCompletionItem(),
						new LuaFunction("consumeTaggedItem", "Consumes items from the player's inventory that include the matching tag, up to the specified count of items.", "`void`", ["`String` tag", "`unsigned` count"], {}).toCompletionItem(),
						new LuaFunction("hasItemWithParameter", "Returns `true` if the player's inventory contains at least one item which has the specified parameter set to the specified value.", "`bool`", ["`String` parameter", "`Json` value"], {}).toCompletionItem(),
						new LuaFunction("consumeItemWithParameter", "Consumes items from the player's inventory that have the specified parameter set to the specified value, upt to the specified count of items.", "`void`", ["`String` parameter", "`Json` value", "`unsigned` count"], {}).toCompletionItem(),
						new LuaFunction("getItemWithParameter", "Returns the first item in the player's inventory that has the specified parameter set to the specified value, or `nil` if no such item is found.", "`ItemDescriptor`", ["`String` parameter", "`Json` value"], {}).toCompletionItem(),
						new LuaFunction("primaryHandItem", "Returns the player's currently equipped primary hand item, or `nil` if no item is equipped.", "`ItemDescriptor`", [""], {}).toCompletionItem(),
						new LuaFunction("altHandItem", "Returns the player's currently equipped alt hand item, or `nil` if no item is equipped.", "`ItemDescriptor`", [""], {}).toCompletionItem(),
						new LuaFunction("primaryHandItemTags", "Returns a list of the tags on the currently equipped primary hand item, or `nil` if no item is equipped.", "`JsonArray`", [""], {}).toCompletionItem(),
						new LuaFunction("altHandItemTags", "Returns a list of the tags on the currently equipped alt hand item, or `nil` if no item is equipped.", "`JsonArray`", [""], {}).toCompletionItem(),
						new LuaFunction("essentialItem", "Returns the contents of the specified essential slot, or `nil` if the slot is empty. Essential slot names are \"beamaxe\", \"wiretool\", \"painttool\" and \"inspectiontool\".", "`ItemDescriptor`", ["`String` slotName"], {}).toCompletionItem(),
						new LuaFunction("giveEssentialItem", "Sets the contents of the specified essential slot to the specified item.", "`void`", ["`String` slotName", "`ItemDescriptor` item"], {}).toCompletionItem(),
						new LuaFunction("removeEssentialItem", "Removes the essential item in the specified slot.", "`void`", ["`String` slotName"], {}).toCompletionItem(),
						new LuaFunction("equippedItem", "Returns the contents of the specified equipment slot, or `nil` if the slot is empty. Equipment slot names are \"head\", \"chest\", \"legs\", \"back\", \"headCosmetic\", \"chestCosmetic\", \"legsCosmetic\" and \"backCosmetic\".", "`ItemDescriptor`", ["`String` slotName"], {}).toCompletionItem(),
						new LuaFunction("setEquippedItem", "Sets the item in the specified equipment slot to the specified item.", "`void`", ["`String` slotName", "`Json` item"], {}).toCompletionItem(),
						new LuaFunction("swapSlotItem", "Returns the contents of the player's swap (cursor) slot, or `nil` if the slot is empty.", "`ItemDescriptor`", [""], {}).toCompletionItem(),
						new LuaFunction("setSwapSlotItem", "Sets the item in the player's swap (cursor) slot to the specified item.", "`void`", ["`Json` item"], {}).toCompletionItem(),
						new LuaFunction("canStartQuest", "Returns `true` if the player meets all of the prerequisites to start the specified quest and `false` otherwise.", "`bool`", ["`Json` questDescriptor"], {}).toCompletionItem(),
						new LuaFunction("startQuest", "Starts the specified quest, optionally using the specified server Uuid and world id, and returns the quest id of the started quest.", "`QuestId`", ["`Json` questDescriptor", "[`String` serverUuid]", "[`String` worldId]"], {}).toCompletionItem(),
						new LuaFunction("hasQuest", "Returns `true` if the player has a quest, in any state, with the specified quest id and `false` otherwise.", "`bool`", ["`String` questId"], {}).toCompletionItem(),
						new LuaFunction("hasCompletedQuest", "Returns `true` if the player has a completed quest with the specified quest id and `false` otherwise.", "`bool`", ["`String` questId"], {}).toCompletionItem(),
						new LuaFunction("enableMission", "Adds the specified mission to the player's list of available missions.", "`void`", ["`String` missionName"], {}).toCompletionItem(),
						new LuaFunction("completeMission", "Adds the specified mission to the player's list of completed missions.", "`void`", ["`String` missionName"], {}).toCompletionItem(),
						new LuaFunction("radioMessage", "Triggers the specified radio message for the player, either immediately or with the specified delay.", "`void`", ["`Json` messageConfig", "[`float` delay]"], {}).toCompletionItem(),
						new LuaFunction("worldId", "Returns a `String` representation of the world id of the player's current world.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("serverUuid", "Returns a `String` representation of the player's Uuid on the server.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("ownShipWorldId", "Returns a `String` representation of the world id of the player's ship world.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("lounge", "Triggers the player to lounge in the specified loungeable entity at the specified lounge anchor index (default is 0).", "`bool`", ["`EntityId` loungeableId", "[`unsigned` anchorIndex]"], {}).toCompletionItem(),
						new LuaFunction("isLounging", "Returns `true` if the player is currently occupying a loungeable entity and `false` otherwise.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("loungingIn", "If the player is currently lounging, returns the entity id of what they are lounging in.", "`EntityId`", [""], {}).toCompletionItem(),
						new LuaFunction("playTime", "Returns the total played time for the player.", "`double`", [""], {}).toCompletionItem(),
						new LuaFunction("introComplete", "Returns `true` if the player is marked as having completed the intro instance and `false` otherwise.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("setIntroComplete", "Sets whether the player is marked as having completed the intro instance.", "`void`", ["`bool` complete"], {}).toCompletionItem(),
						new LuaFunction("warp", "Immediately warps the player to the specified warp target, optionally using the specified warp animation and deployment.", "`void`", ["`String` warpAction", "[`String` animation]", "[`bool` deploy]"], {}).toCompletionItem(),
						new LuaFunction("canDeploy", "Returns whether the player has a deployable mech.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("isDeployed", "Returns whether the player is currently deployed.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("confirm", "Displays a confirmation dialog to the player with the specified dialog configuration and returns an `RpcPromise` which can be used to retrieve the player's response to that dialog.", "`RpcPromise`", ["`Json` dialogConfig"], {}).toCompletionItem(),
						new LuaFunction("playCinematic", "Triggers the specified cinematic to be displayed for the player. If unique is `true` the cinematic will only be shown to that player once.", "`void`", ["`Json` cinematic", "[`bool` unique]"], {}).toCompletionItem(),
						new LuaFunction("recordEvent", "Triggers the specified event on the player with the specified fields. Used to record data e.g. for achievements.", "`void`", ["`String` event", "`Json` fields"], {}).toCompletionItem(),
						new LuaFunction("worldHasOrbitBookmark", "Returns whether the player has a bookmark for the specified celestial coordinate.", "`bool`", ["`Json` coordinate"], {}).toCompletionItem(),
						new LuaFunction("orbitBookmarks", "Returns a list of orbit bookmarks with their system coordinates.", "`List<pair<Vec3I,Json>>`", [""], {}).toCompletionItem(),
						new LuaFunction("systemBookmarks", "Returns a list of orbit bookmarks in the specified system.", "`List<Json>`", ["`Json` systemCoordinate"], {}).toCompletionItem(),
						new LuaFunction("addOrbitBookmark", "Adds the specified bookmark to the player's bookmark list and returns `true` if the bookmark was successfully added (and was not already known) and `false` otherwise.", "`bool`", ["`Json` systemCoordinate", "`Json` bookmarkConfig"], {}).toCompletionItem(),
						new LuaFunction("removeOrbitBookmark", "Removes the specified bookmark from the player's bookmark list and returns `true` if the bookmark was successfully removed and `false` otherwise.", "`bool`", ["`Json` systemCoordinate", "`Json` bookmarkConfig"], {}).toCompletionItem(),
						new LuaFunction("addTeleportBookmark", "Adds the specified bookmark to the player's bookmark list and returns `true` if the bookmark was successfully added (and was not already known) and `false` otherwise.", "`bool`", ["`Json` bookmarkConfig"], {}).toCompletionItem(),
						new LuaFunction("isMapped", "Returns whether the player has previously visited the specified coordinate.", "`bool`", ["`Json` coordinate"], {}).toCompletionItem(),
						new LuaFunction("mappedObjects", "Returns uuid, type, and orbits for all system objects in the specified system;", "`Json`", ["`Json` systemCoordinate"], {}).toCompletionItem(),
						new LuaFunction("collectables", "Returns a list of names of the collectables the player has unlocked in the specified collection.", "`List<String>`", ["`String` collectionName"], {}).toCompletionItem(),
					];
				}
				if (position.character - 18 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 18), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 18), position)) == "playerCompanions.") {
					return [
						new LuaFunction("getCompanions", "Returns a list of configurations for all companions of the specified type.", "`JsonArray`", ["`String` companionType"], {}).toCompletionItem(),
						new LuaFunction("setCompanions", "Sets the player's companions of the specified type to the specified list of companion configurations.", "`void`", ["`String` companionType", "`JsonArray` companions"], {}).toCompletionItem(),
					];
				}
				if (position.character - 11 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 11), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 11), position)) == "projectile.") {
					return [
						new LuaFunction("getParameter", "Returns the value for the specified config parameter. If there is no value set, returns the default.", "`Json`", ["`String` parameter", "`Json` default"], {}).toCompletionItem(),
						new LuaFunction("die", "Destroys the projectile.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("sourceEntity", "Returns the entity id of the projectile's source entity, or `nil` if no source entity is set.", "`EntityId`", [""], {}).toCompletionItem(),
						new LuaFunction("powerMultiplier", "Returns the projectile's power multiplier.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("power", "Returns the projectile's power (damage).", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("setPower", "Sets the projectile's power (damage).", "`void`", ["`float` power"], {}).toCompletionItem(),
						new LuaFunction("timeToLive", "Returns the projectile's current remaining time to live.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("setTimeToLive", "Sets the projectile's current remaining time to live. Altering the time to live may cause visual disparity between the projectile's master and slave entities.", "`void`", ["`float` timeToLive"], {}).toCompletionItem(),
						new LuaFunction("collision", "Returns `true` if the projectile has collided and `false` otherwise.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("processAction", "Immediately performs the specified action. Action should be specified in a format identical to a single entry in e.g. actionOnReap in the projectile's configuration. This function will not properly perform rendering actions as they will not be networked.", "`void`", ["`Json` action"], {}).toCompletionItem(),
						new LuaFunction("setReferenceVelocity", "Sets the projectile's reference velocity (a base velocity to which movement is relative)", "'void'", ["Maybe<`Vec2F`> velocity"], {}).toCompletionItem(),
					];
				}
				if (position.character - 7 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) == "quest.") {
					return [
						new LuaFunction("state", "Returns the current state of the quest.\n\nPossible states:\n* \"New\"\n* \"Offer\"\n* \"Active\"\n* \"Complete\"\n* \"Failed\"", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("complete", "Immediately completes the quest.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("fail", "Immediately fails the quest.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("setCanTurnIn", "Sets whether the quest can be turned in.", "`void`", ["`bool` turnIn"], {}).toCompletionItem(),
						new LuaFunction("questId", "Returns the quest id.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("templateId", "Returns the ID of the template used to make this quest.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("seed", "Returns the seed used to generate the quest.", "`uint64_t`", [""], {}).toCompletionItem(),
						new LuaFunction("questDescriptor", "Returns the quest descriptor including parameters.", "`Json`", [""], {}).toCompletionItem(),
						new LuaFunction("questArcDescriptor", "Returns the quest arc descriptor.", "`Json`", [""], {}).toCompletionItem(),
						new LuaFunction("questArcPosition", "Returns the quest arc position. (?)", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("worldId", "Returns the world id for the quest arc.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("serverUuid", "Returns the server uuid for the quest.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("parameters", "Returns all quest parameters.", "`QuestParameters`", [""], {}).toCompletionItem(),
						new LuaFunction("setParameter", "Sets a quest parameter.", "`void`", ["`String` name", "`Json` value"], {}).toCompletionItem(),
						new LuaFunction("setIndicators", "Set a list of quest parameters to use as custom indicators.", "`void`", ["`List<String>` indicators"], {}).toCompletionItem(),
						new LuaFunction("setObjectiveList", "Set the objectives for the quest tracker. Objectives are in the format {text, completed}", "`void`", ["`JsonArray` objectives"], {}).toCompletionItem(),
						new LuaFunction("setProgress", "Sets the progress amount of the quest tracker progress bar. Set nil to hide. Progress is from 0.0 to 1.0.", "`void`", ["`float` progress"], {}).toCompletionItem(),
						new LuaFunction("setCompassDirection", "Set the angle of the quest tracker compass. Setting nil hides the compass.", "`void`", ["`float` angle"], {}).toCompletionItem(),
						new LuaFunction("setTitle", "Sets the title of the quest in the quest log.", "`void`", ["`String` title"], {}).toCompletionItem(),
						new LuaFunction("setText", "Set the text for the quest in the quest log.", "`void`", ["`String` text"], {}).toCompletionItem(),
						new LuaFunction("setCompletionText", "Sets the text shown in the completion window when the quest is completed.", "`void`", ["`String` completionText"], {}).toCompletionItem(),
						new LuaFunction("setFailureText", "Sets the text shown in the completion window when the quest is failed.", "`void`", ["`String` failureText"], {}).toCompletionItem(),
						new LuaFunction("setPortrait", "Sets a portrait to a list of drawables.", "`void`", ["`String` portraitName", "`JsonArray` portrait"], {}).toCompletionItem(),
						new LuaFunction("setPortraitTitle", "Sets a portrait title.", "`void`", ["`String` portraitName", "`String` title"], {}).toCompletionItem(),
						new LuaFunction("addReward", "Add an item to the reward pool.", "`void`", ["`ItemDescriptor` reward"], {}).toCompletionItem(),
					];
				}
				if (position.character - 5 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 5), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 5), position)) == "root.") {
					return [
						new LuaFunction("assetJson", "Returns the contents of the specified JSON asset file.", "`Json`", ["`String` assetPath"], {}).toCompletionItem(),
						new LuaFunction("makeCurrentVersionedJson", "Returns a versioned JSON representation of the given JSON content with the given identifier and the most recent version as specified in `versioning.config`.", "`Json`", ["`String` versioningIdentifier", "`Json` content"], {}).toCompletionItem(),
						new LuaFunction("loadVersionedJson", "Returns the given JSON content and identifier after applying appropriate versioning scripts to bring it up to the most recent version as specified in `versioning.config`.", "`Json`", ["`Json` versionedContent", "`String` versioningIdentifier"], {}).toCompletionItem(),
						new LuaFunction("evalFunction", "Returns the evaluation of the specified univariate function (as defined in a `.functions` file) for the given input value.", "`double`", ["`String` functionName", "`double` input"], {}).toCompletionItem(),
						new LuaFunction("evalFunction2", "Returns the evaluation of the specified bivariate function (as defined in a `.2functions` file) for the given input values.", "`double`", ["`String` functionName", "`double` input1", "`double` input2"], {}).toCompletionItem(),
						new LuaFunction("imageSize", "Returns the pixel dimensions of the specified image asset.", "`Vec2U`", ["`String` imagePath"], {}).toCompletionItem(),
						new LuaFunction("imageSpaces", "Returns a list of the world tile spaces the image would occupy if placed at the given position using the specified spaceScan value (the portion of a space that must be non-transparent for that space to count as filled).", "`List<Vec2I>`", ["`String` imagePath", "`Vec2F` worldPosition", "`float` spaceScan", "`bool` flip"], {}).toCompletionItem(),
						new LuaFunction("nonEmptyRegion", "Returns the rectangle containing the portion of the specified asset image that is non-transparent.", "`RectU`", ["`String` imagePath"], {}).toCompletionItem(),
						new LuaFunction("npcConfig", "Returns a representation of the generated JSON configuration for an NPC of the given type.", "`Json`", ["`String` npcType"], {}).toCompletionItem(),
						new LuaFunction("npcVariant", "Generates an NPC with the specified species, type, level, seed and parameters, and returns its configuration.", "`Json`", ["`String` species", "`String` npcType", "`float` level", "[`unsigned` seed]", "[`Json` parameters]"], {}).toCompletionItem(),
						new LuaFunction("projectileGravityMultiplier", "Returns the gravity multiplier of the given projectile's movement controller configuration as configured in `physics.config`.", "`float`", ["`String` projectileName"], {}).toCompletionItem(),
						new LuaFunction("projectileConfig", "Returns a representation of the JSON configuration for the given projectile.", "`Json`", ["`String` projectileName"], {}).toCompletionItem(),
						new LuaFunction("itemDescriptorsMatch", "Returns `true` if the given item descriptors match. If exactMatch is `true` then both names and parameters will be compared, otherwise only names.", "`Json`", ["`ItemDescriptor` descriptor1", "`ItemDescriptor` descriptor2", "[`bool` exactMatch]"], {}).toCompletionItem(),
						new LuaFunction("recipesForItem", "Returns a list of JSON configurations of all recipes which output the given item.", "`JsonArray`", ["`String` itemName"], {}).toCompletionItem(),
						new LuaFunction("itemType", "Returns the item type name for the specified item.", "`String`", ["`String` itemName"], {}).toCompletionItem(),
						new LuaFunction("itemTags", "Returns a list of the tags applied to the specified item.", "`JsonArray`", ["`String` itemName"], {}).toCompletionItem(),
						new LuaFunction("itemHasTag", "Returns true if the given item's tags include the specified tag and false otherwise.", "`bool`", ["`String` itemName", "`String` tagName"], {}).toCompletionItem(),
						new LuaFunction("itemConfig", "Generates an item from the specified descriptor, level and seed and returns a JSON object containing the `directory`, `config` and `parameters` for that item.", "`Json`", ["`ItemDescriptor` descriptor", "[`float` level]", "[`unsigned` seed]"], {}).toCompletionItem(),
						new LuaFunction("createItem", "Generates an item from the specified descriptor, level and seed and returns a new item descriptor for the resulting item.", "`ItemDescriptor`", ["`ItemDescriptor` descriptor", "[`float` level]", "[`unsigned` seed]"], {}).toCompletionItem(),
						new LuaFunction("tenantConfig", "Returns the JSON configuration for the given tenant.", "`Json`", ["`String` tenantName"], {}).toCompletionItem(),
						new LuaFunction("getMatchingTenants", "Returns an array of JSON configurations of tenants matching the given map of colony tags and corresponding object counts.", "`JsonArray`", ["`map<String, unsigned>` colonyTags"], {}).toCompletionItem(),
						new LuaFunction("liquidStatusEffects", "Returns an array of status effects applied by the given liquid.", "`JsonArray`", ["`LiquidId` liquid"], {}).toCompletionItem(),
						new LuaFunction("generateName", "Returns a randomly generated name using the specified name gen config and seed.", "`String`", ["`String` assetPath", "[`unsigned` seed]"], {}).toCompletionItem(),
						new LuaFunction("questConfig", "Returns the JSON configuration of the specified quest template.", "`Json`", ["`String` questTemplateId"], {}).toCompletionItem(),
						new LuaFunction("npcPortrait", "Generates an NPC with the specified type, level, seed and parameters and returns a portrait in the given portraitMode as a list of drawables.", "`JsonArray`", ["`String` portraitMode", "`String` species", "`String` npcType", "`float` level", "[`unsigned` seed]", "[`Json` parameters]"], {}).toCompletionItem(),
						new LuaFunction("monsterPortrait", "Generates a monster of the given type with the given parameters and returns its portrait as a list of drawables.", "`JsonArray`", ["`String` typeName", "[`Json` parameters]"], {}).toCompletionItem(),
						new LuaFunction("isTreasurePool", "Returns true if the given treasure pool exists and false otherwise. Can be used to guard against errors attempting to generate invalid treasure.", "`bool`", ["`String` poolName"], {}).toCompletionItem(),
						new LuaFunction("createTreasure", "Generates an instance of the specified treasure pool, level and seed and returns the contents as a list of item descriptors.", "`JsonArray`", ["`String` poolName", "`float` level", "[`unsigned` seed]"], {}).toCompletionItem(),
						new LuaFunction("materialMiningSound", "Returns the path of the mining sound asset for the given material and mod combination, or `nil` if no mining sound is set.", "`String`", ["`String` materialName", "[`String` modName]"], {}).toCompletionItem(),
						new LuaFunction("materialFootstepSound", "Returns the path of the footstep sound asset for the given material and mod combination, or `nil` if no footstep sound is set.", "`String`", ["`String` materialName", "[`String` modName]"], {}).toCompletionItem(),
						new LuaFunction("materialHealth", "Returns the configured health value for the specified material.", "`float`", ["`String` materialName"], {}).toCompletionItem(),
						new LuaFunction("materialConfig", "Returns a JSON object containing the `path` and base `config` for the specified material if it is a real material, or `nil` if it is a metamaterial or invalid.", "`Json`", ["`String` materialName"], {}).toCompletionItem(),
						new LuaFunction("modConfig", "Returns a JSON object containing the `path` and base `config` for the specified mod if it is a real mod, or `nil` if it is a metamod or invalid.", "`Json`", ["`String` modName"], {}).toCompletionItem(),
						new LuaFunction("liquidConfig", "Returns a JSON object containing the `path` and base `config` for the specified liquid name or id if it is a real liquid, or `nil` if the liquid is empty or invalid.", "`Json`", ["`LiquidId`/`String` liquidId"], {}).toCompletionItem(),
						new LuaFunction("liquidName", "Returns the string name of the liquid with the given ID.", "`String`", ["`LiquidId` liquidId"], {}).toCompletionItem(),
						new LuaFunction("liquidId", "Returns the numeric ID of the liquid with the given name.", "`LiquidId`", ["`String` liquidName"], {}).toCompletionItem(),
						new LuaFunction("monsterSkillParameter", "Returns the value of the specified parameter for the specified monster skill.", "`Json`", ["`String` skillName", "`String` parameterName"], {}).toCompletionItem(),
						new LuaFunction("monsterParameters", "Returns the parameters for a monster type.", "`Json`", ["`String` monsterType"], {}).toCompletionItem(),
						new LuaFunction("monsterMovementSettings", "Returns the configured base movement parameters for the specified monster type.", "`ActorMovementParameters`", ["`String` monsterType"], {}).toCompletionItem(),
						new LuaFunction("createBiome", "Generates a biome with the specified name, seed, vertical midpoint and threat level, and returns a JSON object containing the configuration for the generated biome.", "`Json`", ["`String` biomeName", "`unsigned` seed", "`float` verticalMidPoint", "`float` threatLevel"], {}).toCompletionItem(),
						new LuaFunction("hasTech", "Returns `true` if a tech with the specified name exists and `false` otherwise.", "`String`", ["`String` techName"], {}).toCompletionItem(),
						new LuaFunction("techType", "Returns the type (tech slot) of the specified tech.", "`String`", ["`String` techName"], {}).toCompletionItem(),
						new LuaFunction("techConfig", "Returns the JSON configuration for the specified tech.", "`Json`", ["`String` techName"], {}).toCompletionItem(),
						new LuaFunction("treeStemDirectory", "Returns the path within assets from which the specified tree stem type was loaded.", "`String`", ["`String` stemName"], {}).toCompletionItem(),
						new LuaFunction("treeFoliageDirectory", "Returns the path within assets from which the specified tree foliage type was loaded.", "`String`", ["`String` foliageName"], {}).toCompletionItem(),
						new LuaFunction("collection", "Returns the metadata for the specified collection.", "`Collection`", ["`String` collectionName"], {}).toCompletionItem(),
						new LuaFunction("collectables", "Returns a list of collectables for the specified collection.", "`List<Collectable>`", ["`String` collectionName"], {}).toCompletionItem(),
						new LuaFunction("elementalResistance", "Returns the name of the stat used to calculate elemental resistance for the specified elemental type.", "`String`", ["`String` elementalType"], {}).toCompletionItem(),
						new LuaFunction("dungeonMetadata", "Returns the metadata for the specified dungeon definition.", "`Json`", ["`String` dungeonName"], {}).toCompletionItem(),
						new LuaFunction("behavior", "Loads a behavior and returns the behavior state as userdata.\n\ncontext is the current lua context called from, in almost all cases _ENV.\n\nconfig can be either the `String` name of a behavior tree, or an entire behavior tree configuration to be built.\n\nparameters is overrides for parameters for the behavior tree.\n\nBehaviorState contains 2 methods:\n\nbehavior:init(_ENV) -- initializes the behavior, loads required scripts, and returns a new behavior state\nbehavior:run(state, dt) -- runs the behavior, takes a behavior state for the first argument\nbehavior:clear(state) -- resets the internal state of the behavior", "`BehaviorState`", ["`LuaTable` context", "`Json` config", "`JsonObject` parameters"], {}).toCompletionItem(),
					];
				}
				if (position.character - 16 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 16), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 16), position)) == "animationConfig.") {
					return [
						new LuaFunction("animationParameter", "Returns a networked value set by the parent entity's master script.", "`Json`", ["`String` key"], {}).toCompletionItem(),
						new LuaFunction("partPoint", "Returns a `Vec2F` configured in a part's properties with all of the part's transformations applied to it.", "`Vec2F`", ["`String` partName", "`String` propertyName"], {}).toCompletionItem(),
						new LuaFunction("partPoly", "Returns a `PolyF` configured in a part's properties with all the part's transformations applied to it.", "`PolyF`", ["`String` partName", "`String` propertyName"], {}).toCompletionItem(),
					];
				}
				if (position.character - 10 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 10), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 10), position)) == "stagehand.") {
					return [
						new LuaFunction("id", "Returns the stagehand's entity id. Identical to entity.id(), so use that instead.", "`EntityId`", [""], {}).toCompletionItem(),
						new LuaFunction("position", "Returns the stagehand's position. This is identical to entity.position(), so use that instead.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("setPosition", "Moves the stagehand to the specified position.", "`void`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("die", "Destroys the stagehand.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("typeName", "Returns the stagehand's type name.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("setUniqueId", "Sets the stagehand's unique entity id, or clears it if unspecified.", "`void`", ["[`String` uniqueId]"], {}).toCompletionItem(),
					];
				}
				if (position.character - 7 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) == "status.") {
					return [
						new LuaFunction("statusProperty", "Returns the value assigned to the specified status property. If there is no value set, returns default.", "`Json`", ["`String` name", "`Json` default"], {}).toCompletionItem(),
						new LuaFunction("setStatusProperty", "Sets a status property to the specified value.", "`void`", ["`String` name", "`Json` value"], {}).toCompletionItem(),
						new LuaFunction("stat", "Returns the value for the specified stat. Defaults to 0.0 if the stat does not exist.", "`float`", ["`String` statName"], {}).toCompletionItem(),
						new LuaFunction("statPositive", "Returns whether the stat value is greater than 0.", "`bool`", ["`String` statName"], {}).toCompletionItem(),
						new LuaFunction("resourceNames", "Returns a list of the names of all the configured resources;", "`List<String>`", [""], {}).toCompletionItem(),
						new LuaFunction("isResource", "Returns whether the specified resource exists in this status controller.", "`bool`", ["`String` resourceName"], {}).toCompletionItem(),
						new LuaFunction("resource", "Returns the value of the specified resource.", "`float`", ["`String` resourceName"], {}).toCompletionItem(),
						new LuaFunction("resourcePositive", "Returns whether the value of the specified resource is greater than 0.", "`bool`", ["`String` resourceName"], {}).toCompletionItem(),
						new LuaFunction("setResource", "Sets a resource to the specified value.", "`void`", ["`String` resourceName", "`float` value"], {}).toCompletionItem(),
						new LuaFunction("modifyResource", "Adds the specified value to a resource.", "`void`", ["`String` resourceName", "`float` value"], {}).toCompletionItem(),
						new LuaFunction("giveResource", "Adds the specified value to a resource. Returns any overflow.", "`float`", ["`String` resourceName", "`float` value"], {}).toCompletionItem(),
						new LuaFunction("consumeResource", "Tries to consume the specified amount from a resource. Returns whether the full amount was able to be consumes. Does not modify the resource if unable to consume the full amount.", "`bool`", ["`String` resourceName", "`float` amount"], {}).toCompletionItem(),
						new LuaFunction("overConsumeResource", "Tries to consume the specified amount from a resource. If unable to consume the full amount, will consume all the remaining amount. Returns whether it was able to consume any at all of the resource.", "`bool`", ["`String` resourceName", "`float` amount"], {}).toCompletionItem(),
						new LuaFunction("resourceLocked", "Returns whether the resource is currently locked.", "`bool`", ["`String` resourceName"], {}).toCompletionItem(),
						new LuaFunction("setResourceLocked", "Sets a resource to be locked/unlocked. A locked resource cannot be consumed.", "`void`", ["`String` resourceName", "`bool` locked"], {}).toCompletionItem(),
						new LuaFunction("resetResource", "Resets a resource to its base value.", "`void`", ["`String` resourceName"], {}).toCompletionItem(),
						new LuaFunction("resetAllResources", "Resets all resources to their base values.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("resourceMax", "Returns the max value for the specified resource.", "`float`", ["`String` resourceName"], {}).toCompletionItem(),
						new LuaFunction("resourcePercentage", "Returns the percentage of max that the resource is currently at. From 0.0 to 1.0.", "`float`", ["`String` resourceName"], {}).toCompletionItem(),
						new LuaFunction("setResourcePercentage", "Sets a resource to a percentage of the max value for the resource. From 0.0 to 1.0.", "`void`", ["`String` resourceName", "`float` value"], {}).toCompletionItem(),
						new LuaFunction("modifyResourcePercentage", "Adds a percentage of the max resource value to the current value of the resource.", "`void`", ["`String` resourceName", "`float` value"], {}).toCompletionItem(),
						new LuaFunction("getPersistentEffects", "Returns a list of the currently active persistent effects in the specified effect category.", "`JsonArray`", ["`String` effectCategory"], {}).toCompletionItem(),
						new LuaFunction("addPersistentEffect", "Adds a status effect to the specified effect category.", "`void`", ["`String` effectCategory", "`Json` effect"], {}).toCompletionItem(),
						new LuaFunction("addPersistentEffects", "Adds a list of effects to the specified effect category.", "`void`", ["`String` effectCategory", "`JsonArray` effects"], {}).toCompletionItem(),
						new LuaFunction("setPersistentEffects", "Sets the list of effects of the specified effect category. Replaces the current list active effects.", "`void`", ["`String` effectCategory", "`JsonArray` effects"], {}).toCompletionItem(),
						new LuaFunction("clearPersistentEffects", "Clears any status effects from the specified effect category.", "`void`", ["`String` effectCategory"], {}).toCompletionItem(),
						new LuaFunction("clearAllPersistentEffects", "Clears all persistent status effects from all effect categories.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("addEphemeralEffect", "Adds the specified unique status effect. Optionally with a custom duration, and optionally with a source entity id accessible in the status effect.", "`void`", ["`String` effectName", "[`float` duration]", "[`EntityId` sourceEntity]"], {}).toCompletionItem(),
						new LuaFunction("addEphemeralEffects", "Adds a list of unique status effects. Optionally with a source entity id.\n\nUnique status effects can be specified either as a string, \"myuniqueeffect\", or as a table, {effect = \"myuniqueeffect\", duration = 5}. Remember that this function takes a `list` of these effect descriptors. This is a valid list of effects: { \"myuniqueeffect\", {effect = \"myothereffect\", duration = 5} }", "`void`", ["`JsonArray` effects", "[`EntityId` sourceEntity]"], {}).toCompletionItem(),
						new LuaFunction("removeEphemeralEffect", "Removes the specified unique status effect.", "`void`", ["`String` effectName"], {}).toCompletionItem(),
						new LuaFunction("clearEphemeralEffects", "Clears all ephemeral status effects.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("damageTakenSince", "Returns two values:\n* A list of damage notifications for the entity's damage taken since the specified heartbeat.\n* The most recent heartbeat to be passed into the function again to get the damage notifications taken since this function call.", "`List<pair<DamageNotification>>`,`unsigned`", ["[`unsigned` since = 0]]"], {}).toCompletionItem(),
						new LuaFunction("inflictedHitsSince", "Returns two values:\n* A list {{entityId, damageRequest}} for the entity's inflicted hits since the specified heartbeat.\n* The most recent heartbeat to be passed into the function again to get the inflicted hits since this function call.", "`List<pair<EntityId,DamageRequest>>`,`unsigned`", ["[`unsigned` since = 0]]"], {}).toCompletionItem(),
						new LuaFunction("inflictedDamageSince", "Returns two values:\n* A list of damage notifications for damage inflicted by the entity.\n* The most recent heartbeat to be passed into the function again to get the list of damage notifications since the last call.", "`List<DamageNotification>`,`unsigned`", ["[`unsigned` since = 0]"], {}).toCompletionItem(),
						new LuaFunction("activeUniqueStatusEffectSummary", "Returns a list of two element tables describing all unique status effects currently active on the status controller. Each entry consists of the `String` name of the effect and a `float` between 0 and 1 indicating the remaining portion of that effect's duration.", "`JsonArray`", [""], {}).toCompletionItem(),
						new LuaFunction("primaryDirectives", "Returns the primary set of image processing directives applied to the animation of the entity using this status controller.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("setPrimaryDirectives", "Sets the primary set of image processing directives that should be applied to the animation of the entity using this status controller.", "`void`", ["[`String` directives]"], {}).toCompletionItem(),
						new LuaFunction("applySelfDamageRequest", "Directly applies the specified damage request to the entity using this status controller.", "`void`", ["`DamageRequest` damageRequest"], {}).toCompletionItem(),
					];
				}
				if (position.character - 7 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) == "effect.") {
					return [
						new LuaFunction("duration", "Returns the remaining duration of the status effect.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("modifyDuration", "Adds the specified duration to the current remaining duration.", "`void`", ["`float` duration"], {}).toCompletionItem(),
						new LuaFunction("expire", "Immediately expire the effect, setting the duration to 0.", "`void`", [""], {}).toCompletionItem(),
						new LuaFunction("sourceEntity", "Returns the source entity id of the status effect, if any.", "`EntityId`", [""], {}).toCompletionItem(),
						new LuaFunction("setParentDirectives", "Sets image processing directives for the entity the status effect is active on.", "`void`", ["`String` directives"], {}).toCompletionItem(),
						new LuaFunction("getParameter", "Returns the value associated with the parameter name in the effect configuration. If no value is set, returns the default specified.", "`Json`", ["`String` name", "`Json` def"], {}).toCompletionItem(),
						new LuaFunction("addStatModifierGroup", "Adds a new stat modifier group and returns the ID created for the group. Stat modifier groups will stay active until the effect expires.", "`StatModifierGroupId`", ["`List<StatModifier>` modifiers"], {}).toCompletionItem(),
						new LuaFunction("setStatModifierGroup", "Replaces the list of stat modifiers in a group with the specified modifiers.", "`void`", ["`StatModifierGroupId`, groupId", "`List<StatModifier>` modifiers"], {}).toCompletionItem(),
						new LuaFunction("removeStatModifierGroup", "Removes the specified stat modifier group.", "`void`", ["`StatModifierGroupId` groupId"], {}).toCompletionItem(),
					];
				}
				if (position.character - 5 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 5), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 5), position)) == "tech.") {
					return [
						new LuaFunction("aimPosition", "Returns the current cursor aim position.", "`Vec2F`", [""], {}).toCompletionItem(),
						new LuaFunction("setVisible", "Sets whether the tech should be visible.", "`void`", ["`bool` visible"], {}).toCompletionItem(),
						new LuaFunction("setParentState", "Set the animation state of the player.\n\nValid states:\n* \"Stand\"\n* \"Fly\"\n* \"Fall\"\n* \"Sit\"\n* \"Lay\"\n* \"Duck\"\n* \"Walk\"\n* \"Run\"\n* \"Swim\"", "`void`", ["`String` state"], {}).toCompletionItem(),
						new LuaFunction("setParentDirectives", "Sets the image processing directives for the player.", "`void`", ["`String` directives"], {}).toCompletionItem(),
						new LuaFunction("setParentHidden", "Sets whether to make the player invisible. Will still show the tech.", "`void`", ["`bool` hidden"], {}).toCompletionItem(),
						new LuaFunction("setParentOffset", "Sets the position of the player relative to the tech.", "`void`", ["`Vec2F` offset"], {}).toCompletionItem(),
						new LuaFunction("parentLounging", "Returns whether the player is lounging.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("setToolUsageSuppressed", "Sets whether to suppress tool usage on the player. When tool usage is suppressed no items can be used.", "`void`", ["`bool` suppressed"], {}).toCompletionItem(),
					];
				}
				if (position.character - 7 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) == "script.") {
					return [
						new LuaFunction("setUpdateDelta", "Sets the script's update delta.", "`void`", ["`unsigned` dt"], {}).toCompletionItem(),
						new LuaFunction("updateDt", "Returns the duration in seconds between periodic updates to the script.", "`float`", [""], {}).toCompletionItem(),
					];
				}
				if (position.character - 3 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 3), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 3), position)) == "sb.") {
					return [
						new LuaFunction("nrand", "Returns a randomized value with a normal distribution using the specified standard deviation (default is 1.0) and mean (default is 0).", "`double`", ["[`double` standardDeviation]", "[`double` mean]"], {}).toCompletionItem(),
						new LuaFunction("makeUuid", "Returns a `String` representation of a new, randomly-created `Uuid`.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("logInfo", "Logs the specified formatted string, optionally using the formatted replacement values, to the log file and console with the Info log level.", "`void`", ["`String` formatString", "[`LuaValue` formatValues ...]"], {}).toCompletionItem(),
						new LuaFunction("logWarn", "Logs the specified formatted string, optionally using the formatted replacement values, to the log file and console with the Warn log level.", "`void`", ["`String` formatString", "[`LuaValue` formatValues ...]"], {}).toCompletionItem(),
						new LuaFunction("logError", "Logs the specified formatted string, optionally using the formatted replacement values, to the log file and console with the Error log level.", "`void`", ["`String` formatString", "[`LuaValue` formatValues ...]"], {}).toCompletionItem(),
						new LuaFunction("setLogMap", "Sets an entry in the debug log map (visible while in debug mode) using the specified format string and optional formatted replacement values.", "`void`", ["`String` key", "`String` formatString", "[`LuaValue` formatValues ...]"], {}).toCompletionItem(),
						new LuaFunction("printJson", "Returns a human-readable string representation of the specified JSON value. If pretty is `true`, objects and arrays will have whitespace added for readability.", "`String`", ["`Json` value", "[`bool` pretty]"], {}).toCompletionItem(),
						new LuaFunction("print", "Returns a human-readable string representation of the specified `LuaValue`.", "`String`", ["`LuaValue` value"], {}).toCompletionItem(),
						new LuaFunction("interpolateSinEase", "Returns an interpolated `Vec2F` or `double` between the two specified values using a sin ease function.", "`Variant<Vec2F,double>`", ["`double` offset", "`Variant<Vec2F, double>` value1", "`Variant<Vec2F, double>` value2"], {}).toCompletionItem(),
						new LuaFunction("replaceTags", "Replaces all tags in the specified string with the specified tag replacement values.", "`String`", ["`String` string", "`Map<String, String>` tags"], {}).toCompletionItem(),
						new LuaFunction("jsonMerge", "Returns the result of merging the contents of b on top of a.", "`Json`", ["`Json` a", "`Json` b"], {}).toCompletionItem(),
						new LuaFunction("jsonQuery", "Attempts to extract the value in the specified content at the specified path, and returns the found value or the specified default if no such value exists.", "`Json`", ["`Json` content", "`String` path", "`Json` default"], {}).toCompletionItem(),
						new LuaFunction("staticRandomI32", "Returns a statically randomized 32-bit signed integer based on the given list of seed values.", "`int`", ["[`LuaValue` hashValues ...]"], {}).toCompletionItem(),
						new LuaFunction("staticRandomI32Range", "Returns a statically randomized 32-bit signed integer within the specified range based on the given list of seed values.", "`int`", ["`int` min", "`int` max", "[`LuaValue` hashValues ...]"], {}).toCompletionItem(),
						new LuaFunction("staticRandomDouble", "Returns a statically randomized `double` based on the given list of seed values.", "`double`", ["[`LuaValue` hashValues ...]"], {}).toCompletionItem(),
						new LuaFunction("staticRandomDoubleRange", "Returns a statically randomized `double` within the specified range based on the given list of seed values.", "`double`", ["`double` min", "`double` max", "[`LuaValue` hashValues ...]"], {}).toCompletionItem(),
						new LuaFunction("makeRandomSource", "Creates and returns a Lua UserData value which can be used as a random source, initialized with the specified seed. The `RandomSource` has the following methods:", "`RandomSource`", ["[`unsigned` seed]"], {}).toCompletionItem(),
						new LuaFunction("makePerlinSource", "Creates and returns a Lua UserData value which can be used as a Perlin noise source. The configuration for the `PerlinSource` should be a JSON object and can include the following keys", "`PerlinSource`", ["`Json` config"], {}).toCompletionItem(),
					];
				}
				if (position.character - 8 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 8), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 8), position)) == "vehicle.") {
					return [
						new LuaFunction("controlHeld", "Returns `true` if the specified control is currently being held by an occupant of the specified lounge position and `false` otherwise.", "`bool`", ["`String` loungeName", "`String` controlName"], {}).toCompletionItem(),
						new LuaFunction("aimPosition", "Returns the world aim position for the specified lounge position.", "`Vec2F`", ["`String` loungeName"], {}).toCompletionItem(),
						new LuaFunction("entityLoungingIn", "Returns the entity id of the entity currently occupying the specified lounge position, or `nil` if the lounge position is unoccupied.", "`EntityId`", ["`String` loungeName"], {}).toCompletionItem(),
						new LuaFunction("setLoungeEnabled", "Enables or disables the specified lounge position.", "`void`", ["`String` loungeName", "`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("setLoungeOrientation", "Sets the lounge orientation for the specified lounge position. Valid orientations are \"sit\", \"stand\" or \"lay\".", "`void`", ["`String` loungeName", "`String` orientation"], {}).toCompletionItem(),
						new LuaFunction("setLoungeEmote", "Sets the emote to be performed by entities occupying the specified lounge position, or clears it if no emote is specified.", "`void`", ["`String` loungeName", "[`String` emote]"], {}).toCompletionItem(),
						new LuaFunction("setLoungeDance", "Sets the dance to be performed by entities occupying the specified lounge position, or clears it if no dance is specified.", "`void`", ["`String` loungeName", "[`String` dance]"], {}).toCompletionItem(),
						new LuaFunction("setLoungeStatusEffects", "Sets the list of status effects to be applied to entities occupying the specified lounge position. To clear the effects, set an empty list.", "`void`", ["`String` loungeName", "`JsonArray` statusEffects"], {}).toCompletionItem(),
						new LuaFunction("setPersistent", "Sets whether the vehicle is persistent, i.e. whether it will be stored when the world is unloaded and reloaded.", "`void`", ["`bool` persistent"], {}).toCompletionItem(),
						new LuaFunction("setInteractive", "Sets whether the vehicle is currently interactive.", "`void`", ["`bool` interactive"], {}).toCompletionItem(),
						new LuaFunction("setDamageTeam", "Sets the vehicle's current damage team type and number.", "`void`", ["`DamageTeam` team"], {}).toCompletionItem(),
						new LuaFunction("setMovingCollisionEnabled", "Enables or disables the specified collision region.", "`void`", ["`String` collisionName", "`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("setForceRegionEnabled", "Enables or disables the specified force region.", "`void`", ["`String` regionName", "`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("setDamageSourceEnabled", "Enables or disables the specified damage source.", "`void`", ["`String` damageSourceName", "`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("destroy", "Destroys the vehicle.", "`void`", [""], {}).toCompletionItem(),
					];
				}
				if (position.character - 7 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 7), position)) == "widget.") {
					return [
						new LuaFunction("playSound", "Plays a sound.", "`void`", ["`String` audio", "[`int` loops = 0]", "[`float` volume = 1.0f]"], {}).toCompletionItem(),
						new LuaFunction("getPosition", "Returns the position of a widget.", "`Vec2I`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("setPosition", "Sets the position of a widget.", "`void`", ["`String` widgetName", "`Vec2I` position"], {}).toCompletionItem(),
						new LuaFunction("getSize", "Returns the size of a widget.", "`Vec2I`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("setSize", "Sets the size of a widget.", "`void`", ["`String` widgetName", "`Vec2I` size"], {}).toCompletionItem(),
						new LuaFunction("setVisible", "Sets the visibility of a widget.", "`void`", ["`String` widgetName", "`bool` visible"], {}).toCompletionItem(),
						new LuaFunction("active", "Returns whether the widget is visible.", "`void`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("focus", "Sets focus on the specified widget.", "`void`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("hasFocus", "Returns whether the specified widget is currently focused.", "`void`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("blur", "Unsets focus on the specified focused widget.", "`void`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("getData", "Returns the arbitrary data value set for the widget.", "`Json`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("setData", "Sets arbitrary data for the widget.", "`void`", ["`String` widgetName", "`Json` data"], {}).toCompletionItem(), new LuaFunction("getChildAt", "Returns the full name for any widget at screenPosition.", "`String`", ["`Vec2I` screenPosition"], {}).toCompletionItem(),
						new LuaFunction("inMember", "Returns whether the widget contains the specified screenPosition.", "`bool`", ["`String` widgetName", "`Vec2I` screenPosition"], {}).toCompletionItem(),
						new LuaFunction("getText", "Returns the text set in a TextBoxWidget.", "`String`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("setText", "Sets the text of: LabelWidget, ButtonWidget, TextBoxWidget", "`void`", ["`String` widgetName", "`String` text"], {}).toCompletionItem(),
						new LuaFunction("setFontColor", "Sets the font color of: LabelWidget, ButtonWidget, TextBoxWidget", "`void`", ["`String` widgetName", "`Color` color"], {}).toCompletionItem(),
						new LuaFunction("setImage", "Sets the image of an ImageWidget.", "`void`", ["`String` widgetName", "`String` imagePath"], {}).toCompletionItem(),
						new LuaFunction("setImageScale", "Sets the scale of an ImageWidget.", "`void`", ["`String` widgetName", "`float` imageScale"], {}).toCompletionItem(),
						new LuaFunction("setImageRotation", "Sets the rotation of an ImageWidget.", "`void`", ["`String` widgetName", "`float` imageRotation"], {}).toCompletionItem(),
						new LuaFunction("setButtonEnabled", "Sets whether the ButtonWidget should be enabled.", "`void`", ["`String` widgetName", "`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("setButtonImage", "Sets the baseImage of a ButtonWidget.", "`void`", ["`String` widgetName", "`String` baseImage"], {}).toCompletionItem(),
						new LuaFunction("setButtonImages", "Sets the full image set of a ButtonWidget.", "`void`", ["`String` widgetName", "`Json` imageSet"], {}).toCompletionItem(),
						new LuaFunction("setButtonCheckedImages", "Similar to widget.setButtonImages, but sets the images used for the checked state of a checkable ButtonWidget.", "`void`", ["`String` widgetName", "`Json` imageSet"], {}).toCompletionItem(),
						new LuaFunction("setButtonOverlayImage", "Sets the overlay image of a ButtonWidget.", "`void`", ["`String` widgetName", "`String` overlayImage"], {}).toCompletionItem(),
						new LuaFunction("getChecked", "Returns whether the ButtonWidget is checked.", "`bool`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("setChecked", "Sets whether a ButtonWidget is checked", "`void`", ["`String` widgetName", "`bool` checked"], {}).toCompletionItem(),
						new LuaFunction("getSelectedOption", "Returns the index of the selected option in a ButtonGroupWidget.", "`int`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("getSelectedData", "Returns the data of the selected option in a ButtonGroupWidget. Nil if no option is selected.", "`int`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("setSelectedOption", "Sets the selected option index of a ButtonGroupWidget.", "`void`", ["`String` widgetName", "`int` index"], {}).toCompletionItem(),
						new LuaFunction("setOptionEnabled", "Sets whether a ButtonGroupWidget option should be enabled.", "`void`", ["`String` widgetName", "`int` index", "`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("setOptionVisible", "Sets whether a ButtonGroupWidget option should be visible.", "`void`", ["`String` widgetName", "`int` index", "`bool`, visible"], {}).toCompletionItem(),
						new LuaFunction("setProgress", "Sets the progress of a ProgressWidget. Value should be between 0.0 and 1.0.", "`void`", ["`String` widgetName", "`float` value"], {}).toCompletionItem(),
						new LuaFunction("setSliderEnabled", "Sets whether the SliderBarWidget should be enabled.", "`void`", ["`String` widgetName", "`bool` enabled"], {}).toCompletionItem(),
						new LuaFunction("getSliderValue", "Gets the current value of a SliderBarWidget.", "`float`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("setSliderValue", "Sets the current value of a SliderBarWidget.", "`void`", ["`String` widgetName", "`int` newValue"], {}).toCompletionItem(),
						new LuaFunction("getSliderRange", "Sets the minimum, maximum and (optionally) delta values of a SliderBarWidget.", "`void`", ["`String` widgetName", "`int` newMin", "`int` newMax", "[`int` newDelta]"], {}).toCompletionItem(),
						new LuaFunction("clearListItems", "Clears all items in a ListWidget.", "`void`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("addListItem", "Adds a list item to a ListWidget using the configured template, and returns the name of the added list item.", "`String`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("removeListItem", "Removes a list item from a ListWidget at a specific index.", "`void`", ["`String` widgetName", "`size_t` at"], {}).toCompletionItem(),
						new LuaFunction("getListSelected", "Returns the name of the currently selected widget in a ListWidget.", "`String`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("setListSelected", "Sets the selected widget of a ListWidget.", "`void`", ["`String` widgetName", "`String` selected"], {}).toCompletionItem(),
						new LuaFunction("registerMemberCallback", "Registers a member callback for a ListWidget's list items to use.", "`void`", ["`String` widgetName", "`String` callbackName", "`LuaFunction` callback"], {}).toCompletionItem(),
						new LuaFunction("itemGridItems", "Returns the full item bag contents of an ItemGridWidget.", "`ItemBag`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("itemSlotItem", "Returns the descriptor of the item in the specified item slot widget.", "`ItemDescriptor`", ["`String` widgetName"], {}).toCompletionItem(),
						new LuaFunction("setItemSlotItem", "Sets the item in the specified item slot widget.", "`void`", ["`String` widgetName", "`Json` itemDescriptor"], {}).toCompletionItem(),
						new LuaFunction("setItemSlotProgress", "Sets the progress overlay on the item slot to the specified value (between 0 and 1).", "`void`", ["`String` widgetName", "`float` progress"], {}).toCompletionItem(),
						new LuaFunction("bindCanvas", "Binds the canvas widget with the specified name as userdata for easy access. The `CanvasWidget` has the following methods:", "`CanvasWidget`", ["`String` widgetName"], {}).toCompletionItem(),
					];
				}
				if (position.character - 6 >= 0 &&
					document.validateRange(new vscode.Range(new vscode.Position(position.line, position.character - 6), position)) &&
					document.getText(new vscode.Range(new vscode.Position(position.line, position.character - 6), position)) == "world.") {
					return [
						new LuaFunction("type", "Returns a string describing the world's type. For terrestrial worlds this will be the primary biome, for instance worlds this will be the instance name, and for ship or generic worlds this will be 'unknown'.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("terrestrial", "Returns a `true` if the current world is a terrestrial world, i.e. a planet, and `false` otherwise.", "`bool`", [""], {}).toCompletionItem(),
						new LuaFunction("size", "Returns a vector describing the size of the current world.", "`Vec2I`", [""], {}).toCompletionItem(),
						new LuaFunction("magnitude", "Returns the magnitude of the distance between the specified world positions. Use this rather than simple vector subtraction to handle world wrapping.", "`float`", ["`Vec2F` position1", "`Vec2F` position2"], {}).toCompletionItem(),
						new LuaFunction("distance", "Returns the vector difference between the specified world positions. Use this rather than simple vector subtraction to handle world wrapping.", "`Vec2F`", ["`Vec2F` position1", "`Vec2F` position2"], {}).toCompletionItem(),
						new LuaFunction("polyContains", "Returns `true` if the specified poly contains the specified position in world space and `false` otherwise.", "`bool`", ["`PolyF` poly", "`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("xwrap", "Returns the specified position with its X coordinate wrapped around the world width.", "`Vec2F`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("xwrap", "Returns the specified X position wrapped around the world width.", "`float`", ["`float` xPosition"], {}).toCompletionItem(),
						new LuaFunction("nearestTo", "Returns the point nearest to (i.e. on the same side of the world as) the source point. Either argument can be specified as a `Vec2F` point or as a `float` X position. The type of the targetPosition determines the return type.", "`Variant<Vec2F,float>`", ["`Variant<Vec2F, float>` sourcePosition", "`Variant<Vec2F, float>` targetPosition"], {}).toCompletionItem(),
						new LuaFunction("pointCollision", "Returns `true` if the generated collision geometry at the specified point matches any of the specified collision kinds and `false` otherwise.", "`bool`", ["`Vec2F` point", "[`CollisionSet` collisionKinds]"], {}).toCompletionItem(),
						new LuaFunction("pointTileCollision", "Returns `true` if the tile at the specified point matches any of the specified collision kinds and `false` otherwise.", "`bool`", ["`Vec2F` point", "[`CollisionSet` collisionKinds]"], {}).toCompletionItem(),
						new LuaFunction("lineCollision", "If the line between the specified points overlaps any generated collision geometry of the specified collision kinds, returns the point at which the line collides, or `nil` if the line does not collide.", "`Maybe<Vec2F>`", ["`Vec2F` startPoint", "`Vec2F` endPoint", "[`CollisionSet` collisionKinds]"], {}).toCompletionItem(),
						new LuaFunction("lineTileCollision", "Returns `true` if the line between the specified points overlaps any tiles of the specified collision kinds and `false` otherwise.", "`bool`", ["`Vec2F` startPoint", "`Vec2F` endPoint", "[`CollisionSet` collisionKinds]"], {}).toCompletionItem(),
						new LuaFunction("lineTileCollisionPoint", "Returns a table of {`position`,`normal`} where `position` is the position that the line intersects the first collidable tile, and `normal` is the collision normal. Returns `nil` if no tile is intersected.", "`Maybe<pair<Vec2F,Vec2F>>`", ["`Vec2F` startPoint", "`Vec2F` endPoint", "[`CollisionSet` collisionKinds]"], {}).toCompletionItem(),
						new LuaFunction("rectCollision", "Returns `true` if the specified rectangle overlaps any generated collision geometry of the specified collision kinds and `false` otherwise.", "`bool`", ["`RectF` rect", "[`CollisionSet` collisionKinds]"], {}).toCompletionItem(),
						new LuaFunction("rectTileCollision", "Returns `true` if the specified rectangle overlaps any tiles of the specified collision kinds and `false` otherwise.", "`bool`", ["`RectF` rect", "[`CollisionSet` collisionKinds]"], {}).toCompletionItem(),
						new LuaFunction("polyCollision", "Returns `true` if the specified polygon overlaps any generated collision geometry of the specified collision kinds and `false` otherwise. If a position is specified, the polygon coordinates will be treated as relative to that world position.", "`bool`", ["`PolyF` poly", "[`Vec2F` position]", "[`CollisionSet` collisionKinds]"], {}).toCompletionItem(),
						new LuaFunction("collisionBlocksAlongLine", "Returns an ordered list of tile positions along the line between the specified points that match any of the specified collision kinds. If maxReturnCount is specified, the function will only return up to that number of points.", "`List<Vec2I>`", ["`Vec2F` startPoint", "`Vec2F` endPoint", "[`CollisionSet` collisionKinds]", "[`int` maxReturnCount]"], {}).toCompletionItem(),
						new LuaFunction("liquidAlongLine", "Returns a list of pairs containing a position and a `LiquidLevel` for all tiles along the line between the specified points that contain any liquid.", "`List<pair<Vec2I,LiquidLevel>>`", ["`Vec2F` startPoint", "`Vec2F` endPoint"], {}).toCompletionItem(),
						new LuaFunction("resolvePolyCollision", "Attempts to move the specified poly (relative to the specified position) such that it does not collide with any of the specified collision kinds. Will only move the poly up to the distance specified by maximumCorrection. Returns `nil` if the collision resolution fails.", "`Vec2F`", ["`PolyF` poly", "`Vec2F` position", "`float` maximumCorrection", "[`CollisionSet` collisionKinds]"], {}).toCompletionItem(),
						new LuaFunction("tileIsOccupied", "Returns `true` if the specified tile position is occupied by a material or tile entity and `false` if it is empty. The check will be performed on the foreground tile layer if foregroundLayer is `true` (or unspecified) and the background tile layer if it is `false`. The check will include ephemeral tile entities such as preview objects if includeEphemeral is `true`, and will not include these entities if it is `false` (or unspecified).", "`bool`", ["`Vec2I` tilePosition", "[`bool` foregroundLayer]", "[`bool` includeEphemeral]"], {}).toCompletionItem(),
						new LuaFunction("placeObject", "Attempts to place the specified object into the world at the specified position, preferring it to be right-facing if direction is positive (or unspecified) and left-facing if it is negative. If parameters are specified they will be applied to the object. Returns `true` if the object is placed successfully and `false` otherwise.", "`bool`", ["`String` objectName", "`Vec2I` tilePosition", "[`int` direction]", "[`Json` parameters]"], {}).toCompletionItem(),
						new LuaFunction("spawnItem", "Attempts to spawn the specified item into the world as the specified position. If item is specified as a name, it will optionally apply the specified count and parameters. The item drop entity can also be spawned with an initial velocity and intangible time (delay before it can be picked up) if specified. Returns an `EntityId` of the item drop if successful and `nil` otherwise.", "`EntityId`", ["`ItemDescriptor` item", "`Vec2F` position", "[`unsigned` count]", "[`Json` parameters]", "[`Vec2F` velocity]", "[`float` intangibleTime]"], {}).toCompletionItem(),
						new LuaFunction("spawnTreasure", "Attempts to spawn all items in an instance of the specified treasure pool with the specified level and seed at the specified world position. Returns a list of `EntityId`s of the item drops created if successful and `nil` otherwise.", "`List<EntityId>`", ["`Vec2F` position", "`String` poolName", "`float` level", "[`unsigned` seed]"], {}).toCompletionItem(),
						new LuaFunction("spawnMonster", "Attempts to spawn a monster of the specified type at the specified position. If parameters are specified they will be applied to the spawned monster. If they are unspecified, they default to an object setting aggressive to be randomly `true` or `false`. Level for the monster may be specified in parameters. Returns the `EntityId` of the spawned monster if successful and `nil` otherwise.", "`EntityId`", ["`String` monsterType", "`Vec2F` position", "[`Json` parameters]"], {}).toCompletionItem(),
						new LuaFunction("spawnNpc", "Attempts to spawn an NPC of the specified type, species, level with the specified seed and parameters at the specified position. Returns `EntityId` of the spawned NPC if successful and `nil` otherwise.", "`EntityId`", ["`Vec2F` position", "`String` species", "`String` npcType", "`float` level", "[`unsigned` seed]", "[`Json` parameters]"], {}).toCompletionItem(),
						new LuaFunction("spawnStagehand", "Attempts to spawn a stagehand of the specified type at the specified position with the specified override parameters. Returns `EntityId` of the spawned stagehand if successful and `nil` otherwise.", "`EntityId`", ["`Vec2F` position", "`String` type", "[`Json` overrides]"], {}).toCompletionItem(),
						new LuaFunction("spawnProjectile", "Attempts to spawn a projectile of the specified type at the specified position with the specified source entity id, direction, and parameters. If trackSourceEntity is `true` then the projectile's position will be locked relative to its source entity's position. Returns the `EntityId` of the spawned projectile if successful and `nil` otherwise.", "`EntityId`", ["`String` projectileName", "`Vec2F` position", "[`EntityId` sourceEntityId]", "[`Vec2F` direction]", "[`bool` trackSourceEntity]", "[`Json` parameters]"], {}).toCompletionItem(),
						new LuaFunction("spawnVehicle", "Attempts to spawn a vehicle of the specified type at the specified position with the specified override parameters. Returns the `EntityId` of the spawned vehicle if successful and `nil` otherwise.", "`EntityId`", ["`String` vehicleName", "`Vec2F` position", "[`Json` overrides]"], {}).toCompletionItem(),
						new LuaFunction("threatLevel", "Returns the threat level of the current world.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("time", "Returns the absolute time of the current world.", "`double`", [""], {}).toCompletionItem(),
						new LuaFunction("day", "Returns the absolute numerical day of the current world.", "`unsigned`", [""], {}).toCompletionItem(),
						new LuaFunction("timeOfDay", "Returns a value between 0 and 1 indicating the time within the day of the current world.", "`double`", [""], {}).toCompletionItem(),
						new LuaFunction("dayLength", "Returns the duration of a day on the current world.", "`float`", [""], {}).toCompletionItem(),
						new LuaFunction("getProperty", "Returns the JSON value of the specified world property, or defaultValue or `nil` if it is not set.", "`Json`", ["`String` propertyName", "[`Json` defaultValue]"], {}).toCompletionItem(),
						new LuaFunction("setProperty", "Sets the specified world property to the specified value.", "`void`", ["`String` propertyName", "`Json` value"], {}).toCompletionItem(),
						new LuaFunction("liquidAt", "Returns the `LiquidLevel` at the specified tile position, or `nil` if there is no liquid.", "`LiquidLevel`", ["`Vec2I` position"], {}).toCompletionItem(),
						new LuaFunction("liquidAt", "Returns the average `LiquidLevel` of the most plentiful liquid within the specified region, or `nil` if there is no liquid.", "`LiquidLevel`", ["`RectF` region"], {}).toCompletionItem(),
						new LuaFunction("gravity", "Returns the gravity at the specified position. This should be consistent for all non-dungeon tiles in a world but can be altered by dungeons.", "`float`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("spawnLiquid", "Attempts to place the specified quantity of the specified liquid at the specified position. Returns `true` if successful and `false` otherwise.", "`bool`", ["`Vec2F` position", "`LiquidId` liquid", "`float` quantity"], {}).toCompletionItem(),
						new LuaFunction("destroyLiquid", "Removes any liquid at the specified position and returns the LiquidLevel containing the type and quantity of liquid removed, or `nil` if no liquid is removed.", "`LiquidLevel`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("isTileProtected", "Returns `true` if the tile at the specified position is protected and `false` otherwise.", "`bool`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("findPlatformerPath", "Attempts to synchronously pathfind between the specified positions using the specified movement and pathfinding parameters. Returns the path as a list of nodes as successful, or `nil` if no path is found.", "`PlatformerAStar::Path`", ["`Vec2F` startPosition", "`Vec2F` endPosition", "`ActorMovementParameters` movementParameters", "`PlatformerAStar::Parameters` searchParameters"], {}).toCompletionItem(),
						new LuaFunction("platformerPathStart", "Creates and returns a Lua UserData value which can be used for pathfinding over multiple frames. The `PathFinder` returned has the following two methods:", "`PlatformerAStar::PathFinder`", ["`Vec2F` startPosition", "`Vec2F` endPosition", "`ActorMovementParameters` movementParameters", "`PlatformerAStar::Parameters` searchParameters"], {}).toCompletionItem(),
						new LuaFunction("lightLevel", "Returns the current logical light level at the specified position. Requires recalculation of lighting, so this should be used sparingly.", "`float`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("windLevel", "Returns the current wind level at the specified position.", "`float`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("breathable", "Returns `true` if the world is breathable at the specified position and `false` otherwise.", "`bool`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("environmentStatusEffects", "Returns a list of the environmental status effects at the specified position.", "`List<String>`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("underground", "Returns `true` if the specified position is below the world's surface level and `false` otherwise.", "`bool`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("inSurfaceLayer", "Returns `true` if the world is terrestrial and the specified position is within its surface layer, and `false` otherwise.", "`bool`", ["`Vec2I` position"], {}).toCompletionItem(),
						new LuaFunction("oceanLevel", "If the specified position is within a region that has ocean (endless) liquid, returns the world Y level of that ocean's surface, or 0 if there is no ocean in the specified region.", "`int`", ["`Vec2I` position"], {}).toCompletionItem(),
						new LuaFunction("material", "Returns the name of the material at the specified position and layer. Layer can be specified as 'foreground' or 'background'. Returns `false` if the space is empty in that layer. Returns `nil` if the material is NullMaterial (e.g. if the position is in an unloaded sector).", "`Variant<String,bool>`", ["`Vec2F` position", "`String` layerName"], {}).toCompletionItem(),
						new LuaFunction("mod", "Returns the name of the mod at the specified position and layer, or `nil` if there is no mod.", "`String`", ["`Vec2F` position", "`String` layerName"], {}).toCompletionItem(),
						new LuaFunction("materialHueShift", "Returns the hue shift of the material at the specified position and layer.", "`float`", ["`Vec2F` position", "`String` layerName"], {}).toCompletionItem(),
						new LuaFunction("modHueShift", "Returns the hue shift of the mod at the specified position and layer.", "`float`", ["`Vec2F` position", "`String` layerName"], {}).toCompletionItem(),
						new LuaFunction("materialColor", "Returns the color variant (painted color) of the material at the specified position and layer.", "`unsigned`", ["`Vec2F` position", "`String` layerName"], {}).toCompletionItem(),
						new LuaFunction("setMaterialColor", "Sets the color variant of the material at the specified position and layer to the specified color.", "`void`", ["`Vec2F` position", "`String` layerName", "`unsigned` color"], {}).toCompletionItem(),
						new LuaFunction("damageTiles", "Damages all tiles in the specified layer and positions by the specified amount. The source position of the damage determines the initial direction of the damage particles. Damage types are: \"plantish\", \"blockish\", \"beamish\", \"explosive\", \"fire\", \"tilling\". Harvest level determines whether destroyed materials or mods will drop as items. Returns `true` if any damage was done and `false` otherwise.", "`bool`", ["`List<Vec2I>` positions", "`String` layerName", "`Vec2F` sourcePosition", "`String` damageType", "`float` damageAmount", "[`unsigned` harvestLevel]"], {}).toCompletionItem(),
						new LuaFunction("damageTileArea", "Identical to world.damageTiles but applies to tiles in a circular radius around the specified center point.", "`bool`", ["`Vec2F` center", "`float` radius", "`String` layerName", "`Vec2F` sourcePosition", "`String` damageType", "`float` damageAmount", "[`unsigned` harvestLevel"], {}).toCompletionItem(),
						new LuaFunction("placeMaterial", "Attempts to place the specified material in the specified position and layer. If allowOverlap is `true` the material can be placed in a space occupied by mobile entities, otherwise such placement attempts will fail. Returns `true` if the placement succeeds and `false` otherwise.", "`bool`", ["`Vec2I` position", "`String` layerName", "`String` materialName", "[`int` hueShift]", "[`bool` allowOverlap]"], {}).toCompletionItem(),
						new LuaFunction("placeMod", "Attempts to place the specified mod in the specified position and layer. If allowOverlap is `true` the mod can be placed in a space occupied by mobile entities, otherwise such placement attempts will fail. Returns `true` if the placement succeeds and `false` otherwise.", "`bool`", ["`Vec2I` position", "`String` layerName", "`String` modName", "[`int` hueShift]", "[`bool` allowOverlap]"], {}).toCompletionItem(),
						new LuaFunction("entityQuery", "Queries for entities in a specified area of the world and returns a list of their entity ids. Area can be specified either as the `Vec2F` lower left and upper right positions of a rectangle, or as the `Vec2F` center and `float` radius of a circular area. The following additional parameters can be specified in options:", "`List<EntityId>`", ["`Vec2F` position", "`Variant<Vec2F, float` positionOrRadius", "[`Json` options]"], {}).toCompletionItem(),
						new LuaFunction("monsterQuery", "Identical to world.entityQuery but only considers monsters.", "`List<EntityId>`", ["`Vec2F` position", "`Variant<Vec2F, float` positionOrRadius", "[`Json` options]"], {}).toCompletionItem(),
						new LuaFunction("npcQuery", "Identical to world.entityQuery but only considers NPCs.", "`List<EntityId>`", ["`Vec2F` position", "`Variant<Vec2F, float` positionOrRadius", "[`Json` options]"], {}).toCompletionItem(),
						new LuaFunction("objectQuery", "Similar to world.entityQuery but only considers objects. Allows an additional option, __name__, which specifies a `String` object type name and will only return objects of that type.", "`List<EntityId>`", ["`Vec2F` position", "`Variant<Vec2F, float` positionOrRadius", "[`Json` options]"], {}).toCompletionItem(),
						new LuaFunction("itemDropQuery", "Identical to world.entityQuery but only considers item drops.", "`List<EntityId>`", ["`Vec2F` position", "`Variant<Vec2F, float` positionOrRadius", "[`Json` options]"], {}).toCompletionItem(),
						new LuaFunction("playerQuery", "Identical to world.entityQuery but only considers players.", "`List<EntityId>`", ["`Vec2F` position", "`Variant<Vec2F, float` positionOrRadius", "[`Json` options]"], {}).toCompletionItem(),
						new LuaFunction("loungeableQuery", "Similar to world.entityQuery but only considers loungeable entities. Allows an additional option, __orientation__, which specifies the `String` name of a loungeable orientation (\"sit\", \"lay\" or \"stand\") and only returns loungeable entities which use that orientation.", "`List<EntityId>`", ["`Vec2F` position", "`Variant<Vec2F, float` positionOrRadius", "[`Json` options]"], {}).toCompletionItem(),
						new LuaFunction("entityLineQuery", "Similar to world.entityQuery but only returns entities that intersect the line between the specified positions.", "`List<EntityId>`", ["`Vec2F` startPosition", "`Vec2F` endPosition", "[`Json` options]"], {}).toCompletionItem(),
						new LuaFunction("objectLineQuery", "Identical to world.entityLineQuery but only considers objects.", "`List<EntityId>`", ["`Vec2F` startPosition", "`Vec2F` endPosition", "[`Json` options]"], {}).toCompletionItem(),
						new LuaFunction("npcLineQuery", "Identical to world.entityLineQuery but only considers NPCs.", "`List<EntityId>`", ["`Vec2F` startPosition", "`Vec2F` endPosition", "[`Json` options]"], {}).toCompletionItem(),
						new LuaFunction("objectAt", "Returns the entity id of any object occupying the specified tile position, or `nil` if the position is not occupied by an object.", "`EntityId`", ["`Vec2I` tilePosition"], {}).toCompletionItem(),
						new LuaFunction("entityExists", "Returns `true` if an entity with the specified id exists in the world and `false` otherwise.", "`bool`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityDamageTeam", "Returns the current damage team (team type and team number) of the specified entity, or `nil` if the entity doesn't exist.", "`DamageTeam`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityCanDamage", "Returns `true` if the specified source entity can damage the specified target entity using their current damage teams and `false` otherwise.", "`bool`", ["`EntityId` sourceId", "`EntityId` targetId"], {}).toCompletionItem(),
						new LuaFunction("entityAggressive", "Returns `true` if the specified entity is an aggressive monster or NPC and `false` otherwise.", "`bool`", ["`EntityId` entity"], {}).toCompletionItem(),
						new LuaFunction("entityType", "Returns the entity type name of the specified entity, or `nil` if the entity doesn't exist.", "`String`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityPosition", "Returns the current world position of the specified entity, or `nil` if the entity doesn't exist.", "`Vec2F`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityMouthPosition", "Returns the current world mouth position of the specified player, monster, NPC or object, or `nil` if the entity doesn't exist or isn't a valid type.", "`Vec2F`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityVelocity", "Returns the current velocity of the entity if it is a vehicle, monster, NPC or player and `nil` otherwise.", "`Vec2F`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityCurrency", "Returns the specified player entity's stock of the specified currency type, or `nil` if the entity is not a player.", "`unsigned`", ["`EntityId` entityId", "`String` currencyType"], {}).toCompletionItem(),
						new LuaFunction("entityHasCountOfItem", "Returns the nubmer of the specified item that the specified player entity is currently carrying, or `nil` if the entity is not a player. If exactMatch is `true` then parameters as well as item name must match.\n\nNOTE: This function currently does not work correctly over the network, making it inaccurate when not used from client side scripts such as status.", "`unsigned`", ["`EntityId` entityId", "`Json` itemDescriptor", "[`bool` exactMatch]"], {}).toCompletionItem(),
						new LuaFunction("entityHealth", "Returns a `Vec2F` containing the specified entity's current and maximum health if the entity is a player, monster or NPC and `nil` otherwise.", "`Vec2F`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entitySpecies", "Returns the name of the specified entity's species if it is a player or NPC and `nil` otherwise.", "`String`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityGender", "Returns the name of the specified entity's gender if it is a player or NPC and `nil` otherwise.", "`String`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityName", "Returns a `String` name of the specified entity which has different behavior for different entity types. For players, monsters and NPCs, this will be the configured name of the specific entity. For objects or vehicles, this will be the name of the object or vehicle type. For item drops, this will be the name of the contained item.", "`String`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityTypeName", "Similar to world.entityName but returns the names of configured types for NPCs and monsters.", "`String`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityDescription", "Returns the configured description for the specified inspectable entity (currently only objects and plants support this). Will return a species-specific description if species is specified and a generic description otherwise.", "`String`", ["`EntityId` entityId", "[`String` species]"], {}).toCompletionItem(),
						new LuaFunction("entityPortrait", "Generates a portrait of the specified entity in the specified portrait mode and returns a list of drawables, or `nil` if the entity is not a portrait entity.", "`JsonArray`", ["`EntityId` entityId", "`String` portraitMode"], {}).toCompletionItem(),
						new LuaFunction("entityHandItem", "Returns the name of the item held in the specified hand of the specified player or NPC, or `nil` if the entity is not holding an item or is not a player or NPC. Hand name should be specified as \"primary\" or \"alt\".", "`String`", ["`EntityId` entityId", "`String` handName"], {}).toCompletionItem(),
						new LuaFunction("entityHandItemDescriptor", "Similar to world.entityHandItem but returns the full descriptor of the item rather than the name.", "`ItemDescriptor`", ["`EntityId` entityId", "`String` handName"], {}).toCompletionItem(),
						new LuaFunction("itemDropItem", "Returns the item descriptor of an item drop's contents.", "`ItemDescriptor`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("entityUniqueId", "Returns the unique id of the specified entity, or `nil` if the entity does not have a unique id.", "`String`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("getObjectParameter", "Returns the value of the specified object's config parameter, or defaultValue or `nil` if the parameter is not set or the entity is not an object.", "`Json`", ["`EntityId` entityId", "`String` parameterName", "[`Json` defaultValue]"], {}).toCompletionItem(),
						new LuaFunction("objectSpaces", "Returns a list of tile positions that the specified object occupies, or `nil` if the entity is not an object.", "`List<Vec2I>`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("farmableStage", "Returns the current growth stage of the specified farmable object, or `nil` if the entity is not a farmable object.", "`int`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("containerSize", "Returns the total capacity of the specified container, or `nil` if the entity is not a container.", "`int`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("containerClose", "Visually closes the specified container. Returns `true` if the entity is a container and `false` otherwise.", "`bool`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("containerOpen", "Visually opens the specified container. Returns `true` if the entity is a container and `false` otherwise.", "`bool`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("containerItems", "Returns a list of pairs of item descriptors and container positions of all items in the specified container, or `nil` if the entity is not a container.", "`JsonArray`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("containerItemAt", "Returns an item descriptor of the item at the specified position in the specified container, or `nil` if the entity is not a container or the offset is out of range.", "`ItemDescriptor`", ["`EntityId` entityId", "`unsigned` offset"], {}).toCompletionItem(),
						new LuaFunction("containerConsume", "Attempts to consume items from the specified container that match the specified item descriptor and returns `true` if successful,`false` if unsuccessful, or `nil` if the entity is not a container. Only succeeds if the full count of the specified item can be consumed.", "`bool`", ["`EntityId` entityId", "`ItemDescriptor` item"], {}).toCompletionItem(),
						new LuaFunction("containerConsumeAt", "Similar to world.containerConsume but only considers the specified slot within the container.", "`bool`", ["`EntityId` entityId", "`unsigned` offset", "`unsigned` count"], {}).toCompletionItem(),
						new LuaFunction("containerAvailable", "Returns the number of the specified item that are currently available to consume in the specified container, or `nil` if the entity is not a container.", "`unsigned`", ["`EntityId` entityId", "`ItemDescriptor` item"], {}).toCompletionItem(),
						new LuaFunction("containerTakeAll", "Similar to world.containerItems but consumes all items in the container.", "`JsonArray`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("containerTakeAt", "Similar to world.containerItemAt, but consumes all items in the specified slot of the container.", "`ItemDescriptor`", ["`EntityId` entityId", "`unsigned` offset"], {}).toCompletionItem(),
						new LuaFunction("containerTakeNumItemsAt", "Similar to world.containerTakeAt, but consumes up to (but not necessarily equal to) the specified count of items from the specified slot of the container and returns only the items consumed.", "`ItemDescriptor`", ["`EntityId` entityId", "`unsigned` offset", "`unsigned` count"], {}).toCompletionItem(),
						new LuaFunction("containerItemsCanFit", "Returns the number of times the specified item can fit in the specified container, or `nil` if the entity is not a container.", "`unsigned`", ["`EntityId` entityId", "`ItemDescriptor` item"], {}).toCompletionItem(),
						new LuaFunction("containerItemsFitWhere", "Returns a JsonObject containing a list of \"slots\" the specified item would fit and the count of \"leftover\" items that would remain after attempting to add the items. Returns `nil` if the entity is not a container.", "`Json`", ["`EntityId` entityId", "`ItemDescriptor` items"], {}).toCompletionItem(),
						new LuaFunction("containerAddItems", "Adds the specified items to the specified container. Returns the leftover items after filling the container, or all items if the entity is not a container.", "`ItemDescriptor`", ["`EntityId` entityId", "`ItemDescriptor` items"], {}).toCompletionItem(),
						new LuaFunction("containerStackItems", "Similar to world.containerAddItems but will only combine items with existing stacks and will not fill empty slots.", "`ItemDescriptor`", ["`EntityId` entityId", "`ItemDescriptor` items"], {}).toCompletionItem(),
						new LuaFunction("containerPutItemsAt", "Similar to world.containerAddItems but only considers the specified slot in the container.", "`ItemDescriptor`", ["`EntityId` entityId", "`ItemDescriptor` items", "`unsigned` offset"], {}).toCompletionItem(),
						new LuaFunction("containerItemApply", "Attempts to combine the specified items with the current contents (if any) of the specified container slot and returns any items unable to be placed into the slot.", "`ItemDescriptor`", ["`EntityId` entityId", "`ItemDescriptor` items", "`unsigned` offset"], {}).toCompletionItem(),
						new LuaFunction("containerSwapItemsNoCombine", "Places the specified items into the specified container slot and returns the previous contents of the slot if successful, or the original items if unsuccessful.", "`ItemDescriptor`", ["`EntityId` entityId", "`ItemDescriptor` items", "`unsigned` offset"], {}).toCompletionItem(),
						new LuaFunction("containerSwapItems", "A combination of world.containerItemApply and world.containerSwapItemsNoCombine that attempts to combine items before swapping and returns the leftovers if stacking was successful or the previous contents of the container slot if the items did not stack.", "`ItemDescriptor`", ["`EntityId` entityId", "`ItemDescriptor` items", "`unsigned` offset"], {}).toCompletionItem(),
						new LuaFunction("callScriptedEntity", "Attempts to call the specified function name in the context of the specified scripted entity with the specified arguments and returns the result. This method is synchronous and thus can only be used on local master entities, i.e. scripts run on the server may only call scripted entities that are also server-side master and scripts run on the client may only call scripted entities that are client-side master on that client. For more featureful entity messaging, use world.sendEntityMessage.", "`LuaValue`", ["`EntityId` entityId", "`String` functionName", "[`LuaValue` args ...]"], {}).toCompletionItem(),
						new LuaFunction("sendEntityMessage", "Sends an asynchronous message to an entity with the specified entity id or unique id with the specified message type and arguments and returns an `RpcPromise` which can be used to receive the result of the message when available. See the message table for information on entity message handling. This function __should not be called in any entity's init function__ as the sending entity will not have been fully loaded.", "`RpcPromise<Json>`", ["`Variant<EntityId, String>` entityId", "`String` messageType", "[`LuaValue` args ...]"], {}).toCompletionItem(),
						new LuaFunction("findUniqueEntity", "Attempts to find an entity on the server by unique id and returns an `RpcPromise` that can be used to get the position of that entity if successful.", "`RpcPromise<Vec2F>`", ["`String` uniqueId"], {}).toCompletionItem(),
						new LuaFunction("loungeableOccupied", "Checks whether the specified loungeable entity is currently occupied and returns `true` if it is occupied,`false` if it is unoccupied, or `nil` if it is not a loungeable entity.", "`bool`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("isMonster", "Returns `true` if the specified entity exists and is a monster and `false` otherwise. If aggressive is specified, will return `false` unless the monster's aggressive state matches the specified value.", "`bool`", ["`EntityId` entityId", "[`bool` aggressive]"], {}).toCompletionItem(),
						new LuaFunction("monsterType", "Returns the monster type of the specified monster, or `nil` if the entity is not a monster.", "`String`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("isNpc", "Returns `true` if the specified entity exists and is an NPC and `false` otherwise. If damageTeam is specified, will return `false` unless the NPC's damage team number matches the specified value.", "`bool`", ["`EntityId` entityId", "[`int` damageTeam]"], {}).toCompletionItem(),
						new LuaFunction("npcType", "Returns the NPC type of the specified NPC, or `nil` if the entity is not an NPC.", "`String`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("stagehandType", "Returns the stagehand type of the specified stagehand, or `nil` if the entity is not a stagehand.", "`String`", ["`EntityId` entityId"], {}).toCompletionItem(),
						new LuaFunction("debugPoint", "Displays a point visible in debug mode at the specified world position.", "`void`", ["`Vec2F` position", "`Color` color"], {}).toCompletionItem(),
						new LuaFunction("debugLine", "Displayes a line visible in debug mode between the specified world positions.", "`void`", ["`Vec2F` startPosition", "`Vec2F` endPosition", "`Color` color"], {}).toCompletionItem(),
						new LuaFunction("debugPoly", "Displays a polygon consisting of the specified points that is visible in debug mode.", "`void`", ["`PolyF` poly", "`Color` color"], {}).toCompletionItem(),
						new LuaFunction("debugText", "Displays text visible in debug mode at the specified position using the specified format string and optional formatted values.\n\nThe following additional world bindings are available only for scripts running on the server.", "`void`", ["`String` formatString", "[`LuaValue` formatValues ...]", "`Vec2F` position", "`Color` color"], {}).toCompletionItem(),
						new LuaFunction("breakObject", "Breaks the specified object and returns `true` if successful and `false` otherwise. If smash is `true` the object will not (by default) drop any items.", "`bool`", ["`EntityId` entityId", "`bool` smash"], {}).toCompletionItem(),
						new LuaFunction("isVisibleToPlayer", "Returns `true` if any part of the specified region overlaps any player's screen area and `false` otherwise.", "`bool`", ["`RectF` region"], {}).toCompletionItem(),
						new LuaFunction("loadRegion", "Attempts to load all sectors overlapping the specified region and returns `true` if all sectors are fully loaded and `false` otherwise.", "`bool`", ["`RectF` region"], {}).toCompletionItem(),
						new LuaFunction("regionActive", "Returns `true` if all sectors overlapping the specified region are fully loaded and `false` otherwise.", "`bool`", ["`RectF` region"], {}).toCompletionItem(),
						new LuaFunction("setTileProtection", "Enables or disables tile protection for the specified dungeon id.", "`void`", ["`DungeonId` dungeonId", "`bool` protected"], {}).toCompletionItem(),
						new LuaFunction("dungeonId", "Returns the dungeon id at the specified world position.", "`DungeonId`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("setDungeonId", "Sets the dungeonId of all tiles within the specified area.", "`DungeonId`", ["`RectI` tileArea", "`DungeonId` dungeonId"], {}).toCompletionItem(),
						new LuaFunction("isPlayerModified", "Returns `true` if any tile within the specified region has been modified (placed or broken) by a player and `false` otherwise.", "`bool`", ["`RectI` region"], {}).toCompletionItem(),
						new LuaFunction("forceDestroyLiquid", "Identical to world.destroyLiquid but ignores tile protection.", "`LiquidLevel`", ["`Vec2F` position"], {}).toCompletionItem(),
						new LuaFunction("loadUniqueEntity", "Forces (synchronous) loading of the specified unique entity and returns its non-unique entity id or 0 if no such unique entity exists.", "`EntityId`", ["`String` uniqueId"], {}).toCompletionItem(),
						new LuaFunction("setUniqueId", "Sets the unique id of the specified entity to the specified unique id or clears it if no unique id is specified.", "`void`", ["`EntityId` entityId", "[`String` uniqueId]"], {}).toCompletionItem(),
						new LuaFunction("takeItemDrop", "Takes the specified item drop and returns an `ItemDescriptor` of its contents or `nil` if the operation fails. If a source entity id is specified, the item drop will briefly animate toward that entity.", "`ItemDescriptor`", ["`EntityId` targetEntityId", "[`EntityId` sourceEntityId]"], {}).toCompletionItem(),
						new LuaFunction("setPlayerStart", "Sets the world's default beam-down point to the specified position. If respawnInWorld is set to `true` then players who die in that world will respawn at the specified start position rather than being returned to their ships.", "`void`", ["`Vec2F` position", "[`bool` respawnInWorld]"], {}).toCompletionItem(),
						new LuaFunction("players", "Returns a list of the entity ids of all players currently in the world.", "`List<EntityId>`", [""], {}).toCompletionItem(),
						new LuaFunction("fidelity", "Returns the name of the fidelity level at which the world is currently running. See worldserver.config for fidelity configuration.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("flyingType", "Returns the current flight status of a ship world.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("warpPhase", "Returns the current warp phase of a ship world.", "`String`", [""], {}).toCompletionItem(),
						new LuaFunction("setUniverseFlag", "Sets the specified universe flag on the current universe.", "`void`", ["`String` flagName"], {}).toCompletionItem(),
						new LuaFunction("universeFlags", "Returns a list of all universe flags set on the current universe.", "`List<String>`", [""], {}).toCompletionItem(),
						new LuaFunction("universeFlagSet", "Returns `true` if the specified universe flag is set and `false` otherwise.", "`bool`", ["`String` flagName"], {}).toCompletionItem(),
						new LuaFunction("skyTime", "Returns the current time for the world's sky.", "`double`", [""], {}).toCompletionItem(),
						new LuaFunction("setSkyTime", "Sets the current time for the world's sky to the specified value.", "`void`", ["`double` time"], {}).toCompletionItem(),
						new LuaFunction("placeDungeon", "Generates the specified dungeon in the world at the specified position, ignoring normal dungeon anchoring rules. If a dungeon id is specified, it will be assigned to the dungeon.", "`void`", ["`String` dungeonName", "`Vec2I` position", "[`DungeonId` dungeonId]"], {}).toCompletionItem(),
						new LuaFunction("addBiomeRegion", "Adds a biome region to the world, centered on `position`,`width` blocks wide.", "`void`", ["`Vec2I` position", "`String` biomeName", "`String` subBlockSelector", "`int` width"], {}).toCompletionItem(),
						new LuaFunction("expandBiomeRegion", "Expands the biome region currently at `position` by `width` blocks.", "`void`", ["`Vec2I` position", "`int` width"], {}).toCompletionItem(),
						new LuaFunction("pregenerateAddBiome", "Signals a region for asynchronous generation. The region signaled is the region that needs to be generated to add a biome region of `width` tiles to `position`.", "`void`", ["`Vec2I` position", "`int` width"], {}).toCompletionItem(),
						new LuaFunction("pregenerateExpandBiome", "Signals a region for asynchronous generation. The region signaled is the region that needs to be generated to expand the biome at `position` by `width` blocks.", "`void`", ["`Vec2I` position", "`int` width"], {}).toCompletionItem(),
						new LuaFunction("setLayerEnvironmentBiome", "Sets the environment biome for a layer to the biome at `position`.", "`void`", ["`Vec2I` position"], {}).toCompletionItem(),
						new LuaFunction("setPlanetType", "Sets the planet type of the current world to `planetType` with primary biome `primaryBiomeName`.", "`void`", ["`String` planetType", "`String`, primaryBiomeName"], {}).toCompletionItem(),
						new LuaFunction("setDungeonGravity", "Sets the overriding gravity for the specified dungeon id, or returns it to the world default if unspecified.", "`void`", ["`DungeonId` dungeonId", "`Maybe<float>` gravity"], {}).toCompletionItem(),
						new LuaFunction("setDungeonBreathable", "Sets the overriding breathability for the specified dungeon id, or returns it to the world default if unspecified.", "`void`", ["`DungeonId` dungeonId", "`Maybe<bool>` breathable"], {}).toCompletionItem(),

					];
				}
			},
		}, ".");
}