// Note: Alternatively, I could just place the functions in here.

import { BiTree } from "./icons/tree";
import { MaterialSymbolsTrain } from "./icons/train";
import { GameIconsGoldNuggets } from "./icons/gold-nugget";
import { FluentEmojiHighContrastMouseFace } from "./icons/mouse";
import { MingcuteMomentLine } from "./icons/moment";

// Exporting icons together. 
// Names are formatted with "Icon{IconType}" to avoid potential conflict with other imports.
export { 
    BiTree as IconTree, 
    MaterialSymbolsTrain as IconTrain,
    GameIconsGoldNuggets as IconGoldNugget,
    FluentEmojiHighContrastMouseFace as IconMouse,
    MingcuteMomentLine as IconMoment,
}