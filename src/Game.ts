import * as BABYLON from 'babylonjs'

export type Stat = "HP" | "STR" |
            "VIT" | "MAG" |
            "SPR" | "SPD" |
            "EVA" | "HIT" | 
            "LUCK"

export interface StatArray {
    HP: number,
    STR: number, 
    VIT: number,
    MAG: number, 
    SPR: number,
    SPD: number, 
    EVA: number,
    HIT: number, 
    LUCK: number
}

export interface GFLevelUpReward {
    level: number,
    reward: (gf: GF) => void 
}

export interface IHealthExperience {
    exp: number,
    level: number,
    maxHP: number,
    currentHP: number
}

export class GF implements IHealthExperience {
    name: string
    exp: number = 0
    level: number = 1
    maxHP: number = 100
    currentHP: number = 100
    statJunctions: Stat[] = []
    abilities: string[] = ["todo type"]
    commands: string[] = []
    levelUpRewards: GFLevelUpReward[] = []

    constructor(name: string) {
        this.name = name
    }
}

export class Magic {
    name: string
    use?: (state: GameState) => void
    power: number = 1
    stats: StatArray

    constructor(name: string, stats: StatArray, use?: (state: GameState) => void) {
        this.name = name
        this.stats = stats
        this.use = use
    }
}

export interface AmountOfItem {
    item: Item
    amount: number
}

export interface AmountOfMagic {
    magic: Magic
    amount: number
}

export interface Refine {
    ability: string
    amount: number
    // inputs: AmountOfItem[]
    outputs: (AmountOfItem|AmountOfMagic)[]
}

export class Item {
    name: string
    use?: (state: GameState) => void
    refines: Refine[] = []

    constructor(name: string, use?: (state: GameState) => void) {
        this.name = name
        this.use = use
    }
}

export interface Drop {
    chance: number
    drops: (AmountOfItem|AmountOfMagic)[]
}

export class Monster implements IHealthExperience {
    name: string
    exp: number = 0
    level: number = 1
    currentHP: number = 100
    maxHP: number = 100
    stats: StatArray
    magic: AmountOfMagic[] = []
    drops: Drop[] = []
    mugDrops: Drop[] = []

    constructor(name: string, stats: StatArray) {
        this.name = name
        this.stats = stats
    }
}

export type Direction = "Up" | "Down" | "Left" | "Right"

export interface EncounterChance {
    chance: number
    monster: Monster
}

export class Terrain {
    name: string
    texture: string
    elevation: number
    encounters: EncounterChance[]
    passable: boolean
    material: BABYLON.Material

    constructor(name: string, texture: string, elevation: number, encounters: EncounterChance[], scene: BABYLON.Scene, passable: boolean = true ) {
        this.name = name
        this.texture = texture
        this.elevation = elevation
        this.encounters = encounters
        this.passable = passable
        this.material = this.buildMaterial(texture, scene)
    }

    buildMaterial(texture: string, scene: BABYLON.Scene) {
        const mat = new BABYLON.StandardMaterial(this.name, scene)
        const tex = new BABYLON.Texture(texture, scene)
        mat.diffuseTexture = tex
        mat.specularTexture = tex
        mat.backFaceCulling = false
        return mat
    }

}

export class Exit {
    x: number
    y: number
    to: Overworld
    toX: number
    toY: number

    constructor(x: number, y: number, to: Overworld, toX: number, toY: number) {
        this.x = x
        this.y = y
        this.to = to
        this.toX = toX
        this.toY = toY
    }
}

//todo: interface like "IOverworldObject" which is just sprite / x / y and put it on Exit and GameState
//also IBattler, IUsable (items and mag)

export class Overworld {
    name: string
    map: Terrain[][]
    exits: Exit[]

    constructor(name: string, map: Terrain[][], exits: Exit[]) {
        this.name = name
        this.map = map
        this.exits = exits
    }
}

export type GameMode = "Start Menu" | "Pause Menu" | "Overworld" | "Battle" | "Multi Monad"

export class GameState implements IHealthExperience {
    //overall
    fileName: string = "(No Name)"

    //state
    gameMode: GameMode = "Start Menu"

    //progression
    level: number = 1
    exp: number = 0
    //story flags?
    
    //overworld
    overworldX = 0
    overworldY = 0
    facing: Direction = "Down"

    //inventory
    magic: AmountOfMagic[] = []
    inventory: AmountOfItem[] = []

    //GFs
    GFsUnlocked: GF[] = []
    GFsJunctioned: GF[] = []

    //battles
    maxHP = 100
    currentHP = 100
    stats: StatArray = {
        "HP": 10,
        "STR": 10,
        "VIT": 10,
        "MAG": 10,
        "SPR": 10,
        "SPD": 10,
        "EVA": 10,
        "HIT": 10,
        "LUCK": 10
    }
}