<template>
  <div class="app-container">
    <canvas id="c"/>

    <div v-if="buildings.length > 0">
      <el-row v-for="(rv, r) in layout.rows" :key="`row-${rv}`" :gutter="layout.gutter" style="margin-top: 20px;">
        <el-col v-for="(cv, c) in layout.cols" v-if="r * layout.cols + c < buildings.length" :key="`col-${rv}-${cv}`" :span="layout.span">
          <el-card class="trs">
            <div slot="header" class="clearfix">
              <span><label>{{ buildings[r * layout.cols + c].name }}</label></span>
              <div style="float: right;">
                <el-tooltip content="删除建筑" placement="top">
                  <el-button type="danger" icon="el-icon-delete" size="mini" circle class="mb" @click="remove(buildings[r * layout.cols + c].id)"/>
                </el-tooltip>
                <el-tooltip content="楼层信息" placement="top">
                  <el-button type="success" icon="el-icon-view" size="mini" circle class="mb"/>
                </el-tooltip>
                <el-tooltip content="坐标集" placement="top">
                  <el-popover
                    placement="right-end"
                    width="240">
                    <el-table :data="buildings[r * layout.cols + c].points" :max-height="layout.canvasWidth" border style="width: 100%;">
                      <el-table-column property="x" label="X"/>
                      <el-table-column property="y" label="Y"/>
                    </el-table>
                    <el-button slot="reference" type="warning" icon="el-icon-location" size="mini" circle class="mb"/>
                  </el-popover>
                </el-tooltip>
              </div>
            </div>
            <div
              :id="`content-${buildings[r * layout.cols + c].id}`"
              :style="{ width: `${layout.canvasWidth}px`, height: `${layout.canvasWidth}px` }">
              <div :style="{ width: `${layout.canvasWidth}px`, height: `${layout.canvasWidth}px` }" class="scene"/>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import * as THREE from 'three'
import buildings from './data'

export default {
  data() {
    const gutter = 20
    const cols = 4

    return {
      visible2: false,
      layout: {
        gutter,
        rows: 0,
        cols,
        span: 24 / cols,
        canvasWidth: (window.innerWidth - gutter * ((cols + 1) + (cols * 2)) - (cols * 2)) / cols
      },
      canvas: null,
      scenes: [],
      renderer: null,
      colors: {
        background: 0x414a58,
        region: 0x343c47
      },
      buildings,
      geometries: [
        new THREE.BoxBufferGeometry(1, 1, 1),
        new THREE.SphereBufferGeometry(0.5, 12, 8),
        new THREE.DodecahedronBufferGeometry(0.5),
        new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 12)
      ]
    }
  },
  created() {
    this.layout.rows = Math.ceil(this.buildings.length / this.layout.cols)
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    init() {
      this.buildings.forEach(item => {
        const scene = new THREE.Scene()
        scene.userData.element = document.getElementById(`content-${item.id}`).querySelector('.scene')

        const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000)
        camera.position.z = 900
        scene.userData.camera = camera

        this.addBuilding(scene, item)

        this.scenes.push(scene)
      })

      this.canvas = document.getElementById('c')
      console.info('Canvas is: ', this.canvas)

      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true })
      this.renderer.setClearColor(0xffffff, 1)
      this.renderer.setPixelRatio(window.devicePixelRatio)

      this.render()
    },
    addGeometry(scene) {
      const geometry = this.geometries[this.geometries.length * Math.random() | 0]
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(Math.random(), 1, 0.75),
        roughness: 0.5,
        metalness: 0,
        flatShading: true
      })
      scene.add(new THREE.Mesh(geometry, material))
      scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x444444))

      const light = new THREE.DirectionalLight(0xffffff, 0.5)
      light.position.set(1, 1, 1)
      scene.add(light)
    },
    addLine(scene) {
      var material = new THREE.LineBasicMaterial({ color: 0xff0000 })

      var geometry = new THREE.Geometry()
      geometry.vertices.push(
        new THREE.Vector3(-1.3, 0, 0),
        new THREE.Vector3(0, 1.3, 0),
        new THREE.Vector3(1.3, 0, 0),
        new THREE.Vector3(0, -1.3, 0),
        // new THREE.Vector3(-1.3, 0, 0),
      )

      // var line = new THREE.Line(geometry, material)
      var line = new THREE.LineLoop(geometry, material)
      scene.add(line)
    },
    addBuilding(scene, item) {
      const areaPts = []
      // item.points.forEach(it => { areaPts.push(new THREE.Vector2(it.x, it.y)) })

      // const { x: fx, y: fy } = item.points[0]
      // console.info(item.points.map(t => t.x), Math.max(...item.points.map(t => t.x)), Math.min(...item.points.map(t => t.x)))
      // item.points.map(t => {
      //   console.info(typeof t.x)
      //   return t.x
      // })
      // const np = item.points.map(({ x, y }) => {
      //   return { x: x - fx, y: y - fy }
      // })
      item.points.forEach(it => {
        // np.forEach(it => {
        // areaPts.push(new THREE.Vector2(it.x - fx, it.y - fy))
        areaPts.push(new THREE.Vector2(it.x, it.y))
      })
      // areaPts.push(new THREE.Vector2(-100, 100))
      // areaPts.push(new THREE.Vector2(100, 100))
      // areaPts.push(new THREE.Vector2(100, -100))
      // areaPts.push(new THREE.Vector2(-100, -100))

      const shapeGeometry = new THREE.ShapeBufferGeometry(new THREE.Shape(areaPts))
      const shapeMaterial = new THREE.MeshBasicMaterial({ color: this.colors.region, wireframe: false })
      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)
      // shape.scale = new THREE.Vector3(1, 1, 1)
      // shape.scale.x = 2
      // shape.scale.y = 2
      shape.scale.set(2, 2, 1)
      // console.info(shape.scale)
      // shape.normalize()
      // shape.position.x = -(Math.max(...np.map(t => t.x)) - Math.min(...np.map(t => t.x))) / 2
      // shape.position.y = -(Math.max(...np.map(t => t.y)) - Math.min(...np.map(t => t.y))) / 2
      // shape.position.x = -fx
      // shape.position.y = -fy
      // shape.translateX(-fx)
      // shape.translateY(-fy)
      const xs = item.points.map(t => t.x)
      const maxX = Math.max(...xs)
      const minX = Math.min(...xs)
      const ys = item.points.map(t => t.y)
      const maxY = Math.max(...ys)
      const minY = Math.min(...ys)
      shape.translateX(-(minX + ((maxX - minX) / 2)) * 2)
      shape.translateY(-(minY + ((maxY - minY) / 2)) * 2)
      // shape.position.x = -(minX + ((maxX - minX) / 2))
      // shape.position.y = -(minY + ((maxY - minY) / 2))
      scene.add(shape)
    },
    updateSize() {
      const width = this.canvas.clientWidth
      const height = this.canvas.clientHeight
      if (this.canvas.width !== width || this.canvas.height !== height) {
        this.renderer.setSize(width, height, false)
      }
    },
    animate() {
      this.render()
      requestAnimationFrame(this.animate)
    },
    render() {
      this.updateSize()

      this.canvas.style.transform = `translateY(${window.scrollY}px)`

      this.renderer.setClearColor(0xffffff)
      this.renderer.setScissorTest(false)
      this.renderer.clear()

      this.renderer.setClearColor(this.colors.background)
      this.renderer.setScissorTest(true)

      this.scenes.forEach(scene => {
        // so something moves
        // scene.children[0].rotation.y = Date.now() * 0.001

        // get the element that is a place holder for where we want to
        // draw the scene
        const element = scene.userData.element
        // get its position relative to the page's viewport
        const rect = element.getBoundingClientRect()
        // check if it's offscreen. If so skip it
        if (rect.bottom < 0 || rect.top > this.renderer.domElement.clientHeight ||
          rect.right < 0 || rect.left > this.renderer.domElement.clientWidth) {
          return // it's off screen
        }
        // set the viewport
        const width = rect.right - rect.left
        const height = rect.bottom - rect.top
        const left = rect.left
        const bottom = this.renderer.domElement.clientHeight - rect.bottom
        this.renderer.setViewport(left, bottom, width, height)
        this.renderer.setScissor(left, bottom, width, height)
        const camera = scene.userData.camera
        // camera.aspect = width / height // not changing in this example
        // camera.updateProjectionMatrix()
        // scene.userData.controls.update()
        this.renderer.render(scene, camera)
      })
    },
    remove(id) {
      this.$confirm('确认删除？').then(_ => {
        this.$message({
          message: `TODO: Remove Item ${id}`,
          showClose: true
        })
      }).catch(_ => {})
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .mb {
    outline: none;
    padding: 1px;
    margin-left: 1px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }
</style>
<style>
  #c {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .trs {
    background-color: transparent;
  }
</style>
