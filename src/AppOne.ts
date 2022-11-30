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
        [grass, grass, grass],
        [grass, tallGrass, grass],
        [grass, grass, grass]
    ], [])

    ow.map.forEach((row, j) => {
        row.forEach((terrain, i) => {
            const tile = BABYLON.MeshBuilder.CreateGround("Overworld Tile", {width: 1, height: 1}, scene)
            tile.material = terrain.material
            tile.position.x = i * 1.1
            tile.position.y = terrain.elevation
            tile.position.z = j * 1.1
        })
    })

    return scene
};