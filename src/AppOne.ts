import * as BABYLON from 'babylonjs'
import * as game from './Game'
export class AppOne {
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas)
        window.addEventListener('resize', () => {
            this.engine.resize();
        })
        this.scene = createScene(this.engine, this.canvas)

    }

    debug(debugOn: boolean = true) {
        if (debugOn) {
            this.scene.debugLayer.show({ overlay: true });
        } else {
            this.scene.debugLayer.hide();
        }
    }

    run() {
        this.debug(false);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        })
    }

}


const createScene = function (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    // this is the default code from the playground:

    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine)

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene)

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero())

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene)

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7

    // Our built-in 'sphere' shape.
    // const sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene)

    // Move the sphere upward 1/2 its height
    // sphere.position.y = 1

    // const sm = new BABYLON.SpriteManager("Squall Manager", "src/img/squall-idle.png", 1, {width: 61, height: 77}, scene)
    // const sm2 = new BABYLON.SpriteManager("Squall Attack Manager", "src/img/squall-attack.png", 1, {width: 155, height: 115}, scene)
    // const squall = new BABYLON.Sprite("Squall", sm)
    // squall.width = (61 * 3) / 100
    // squall.height = (77 * 3) / 100
    // squall.position.y = 1
    // squall.position.x = 3
    // squall.playAnimation(0, 3, true, 150)

    // const pillarMaterial = new BABYLON.StandardMaterial("Pillar", scene)
    // pillarMaterial.diffuseTexture = new BABYLON.Texture("src/img/pillar.png", scene)

    // const leftWall = BABYLON.MeshBuilder.CreateBox("Left Box", {size: 2})
    // leftWall.material = pillarMaterial
    // leftWall.position.x = -3
    // leftWall.position.y = -1

    // const rightWall = BABYLON.MeshBuilder.CreateBox("Right Box", {size: 2})
    // rightWall.material = pillarMaterial
    // rightWall.position.x = 3
    // rightWall.position.y = -1

    // // Our built-in 'ground' shape.
    // // const ground = BABYLON.MeshBuilder.CreateGround("ground", { width: 6, height: 6 }, scene)

    // scene.onKeyboardObservable.add((kbInfo) => {
    //     if (kbInfo.type === BABYLON.KeyboardEventTypes.KEYDOWN) {
    //         if (kbInfo.event.key === " ") {
    //             squall.isVisible = false
    //             const squall2 = new BABYLON.Sprite("Squall Attack", sm2)
    //             squall2.width = (155 * 3) / 100
    //             squall2.height = (115 * 3) / 100
    //             squall2.position.y = 1
    //             squall2.position.x = 3 - 1
    //             squall2.playAnimation(0, 11, false, 80)
    //         }
    //     }
    // })

    const grass = new game.Terrain("Grass", "src/img/pillar.png", 0, [], scene)
    const tallGrass = new game.Terrain("Grass", "src/img/pillar.png", 0.1, [], scene)
    const ow = new game.Overworld("Test", [
        [grass],
    ], [])

    // ow.map.forEach((row, j) => {
    //     row.forEach((terrain, i) => {
    //         const tile = BABYLON.MeshBuilder.CreateGround("Overworld Tile", {width: 1, height: 1}, scene)
    //         tile.material = terrain.material
    //         tile.position.x = i * 1.1
    //         tile.position.y = terrain.elevation
    //         tile.position.z = j * 1.1
    //         tile.setVerticesData(BABYLON.VertexBuffer.PositionKind, [
    //             Math.random() - 2,
    //             Math.random(),
    //             Math.random() + 2,
                
    //             Math.random() + 2,
    //             Math.random(),
    //             Math.random() + 2,

    //             Math.random() + 2,
    //             Math.random(),
    //             Math.random() - 2,

    //             Math.random() - 2,
    //             Math.random(),
    //             Math.random() - 2,
    //         ])
    //         console.log(tile.getVerticesData(BABYLON.VertexBuffer.PositionKind))
    //     })
    // })

    const makeTileMesh = (x: number, z: number, tl: number, tr: number, bl: number, br: number) => {
        const verticies = new BABYLON.VertexData()
        verticies.positions = [
            1 + x, tr, 1 + z,
            1 + x, br, 0 + z,
            0 + x, bl, 0 + z,

            1 + x, tr, 1 + z,
            0 + x, tl, 1 + z,
            0 + x, bl, 0 + z,
        ]
        verticies.indices = [0, 1, 2, 3, 4, 5]
        return verticies
    } 
    
    const r = () => Math.random()
    const heightMap = [
        [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
        [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
        [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
        [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
        [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
        [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
        [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
        [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
        [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
        [r(), r(), r(), r(), r(), r(), r(), r(), r(), r()],
    ]

    for (let j = 0; j < 10; j++) {
        for (let i = 0; i < 10; i++) {
            const tile = new BABYLON.Mesh("custom", scene)
            tile.material = grass.material

            let tl = [heightMap[i][j]]
            if (j+1 < 10) tl.push(heightMap[i][j+1])
            if (i-1 >= 0) tl.push(heightMap[i-1][j])
            if (j+1 < 10 && i-1 >= 0) tl.push(heightMap[i-1][j+1])
            const tla = tl.reduce((a, b) => a + b) / tl.length

            let tr = [heightMap[i][j]]
            if (j+1 < 10) tr.push(heightMap[i][j+1])
            if (i+1 < 10) tr.push(heightMap[i+1][j])
            if (j+1 < 10 && i+1 < 10) tr.push(heightMap[i+1][j+1])
            const tra = tr.reduce((a, b) => a + b) / tr.length

            let bl = [heightMap[i][j]]
            if (j-1 >= 0) bl.push(heightMap[i][j-1])
            if (i-1 >= 0) bl.push(heightMap[i-1][j])
            if (j-1 >= 0 && i-1 >= 0) bl.push(heightMap[i-1][j-1])
            const bla = bl.reduce((a, b) => a + b) / bl.length

            let br = [heightMap[i][j]]
            if (j-1 >= 0) br.push(heightMap[i][j-1])
            if (i+1 < 10) br.push(heightMap[i+1][j])
            if (j-1 >= 0 && i+1 < 10) br.push(heightMap[i+1][j-1])
            const bra = br.reduce((a, b) => a + b) / br.length

            makeTileMesh(i, j, tla, tra, bla, bra).applyToMesh(tile)
        }
    }

    const refTile = BABYLON.MeshBuilder.CreateGround("Overworld Tile", {width: 1, height: 1}, scene)
    refTile.position.x = -4

    return scene
};