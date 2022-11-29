interface StatArray {
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

type Stat = "HP" | "STR" |
            "VIT" | "MAG" |
            "SPR" | "SPD" |
            "EVA" | "HIT" | 
            "LUCK"

interface GFLevelUpReward {
    level: number,
    reward: (gf: GF) => void 
}

class GF {
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

class Magic {
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

interface AmountOfItem {
    item: Item
    amount: number
}

interface AmountOfMagic {
    magic: Magic
    amount: number
}

interface Refine {
    ability: string
    amount: number
    // inputs: AmountOfItem[]
    outputs: (AmountOfItem|AmountOfMagic)[]
}

class Item {
    name: string
    use?: (state: GameState) => void
    refines: Refine[] = []

    constructor(name: string, use?: (state: GameState) => void) {
        this.name = name
        this.use = use
    }
}

interface Drop {
    chance: number
    drops: (AmountOfItem|AmountOfMagic)[]
}

class Monster {
    name: string
    exp: number = 1
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

type Direction = "Up" | "Down" | "Left" | "Right"

interface EncounterChance {
    chance: number
    monster: Monster
}

class Terrain {
    name: string
    elevation: number
    encounters: EncounterChance[]
    passable: boolean

    constructor(name: string, elevation: number, encounters: EncounterChance[], passable: boolean = true ) {
        this.name = name
        this.elevation = elevation
        this.encounters = encounters
        this.passable = passable
    }
}

class Exit {
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

class Overworld {
    name: string
    map: Terrain[][]
    exits: Exit[]

    constructor(name: string, map: Terrain[][], exits: Exit[]) {
        this.name = name
        this.map = map
        this.exits = exits
    }
}

type GameMode = "Start Menu" | "Pause Menu" | "Overworld" | "Battle" | "Multi Monad"

class GameState {
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