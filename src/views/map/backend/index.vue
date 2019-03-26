<template>
  <div class="app-container">
    <canvas id="c"/>

    <el-row :gutter="layout.gutter">
      <el-col>
        <el-card>
          <el-input
            v-model.trim="buildingName"
            :clearable="true"
            placeholder="请输入关键字"
            prefix-icon="el-icon-search"
            style="width: 600px;"/>
          <div style="float: right;">
            <el-button type="primary" icon="el-icon-plus" circle/>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div v-if="grids.length > 0">
      <el-row v-for="(rv, r) in layout.rows" :key="`row-${rv}`" :gutter="layout.gutter" style="margin-top: 20px;">
        <el-col v-for="(cv, c) in layout.cols" v-if="r * layout.cols + c < grids.length" :key="`col-${rv}-${cv}`" :span="layout.span">
          <el-card class="trs">
            <div slot="header" class="clearfix">
              <span><label>{{ grids[r * layout.cols + c].name }}</label></span>
              <div style="float: right;">
                <el-tooltip content="删除建筑" placement="top">
                  <el-popover
                    v-model="grids[r * layout.cols + c].visible"
                    placement="bottom"
                    width="130">
                    <p>确定删除？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="grids[r * layout.cols + c].visible = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="remove(r * layout.cols + c)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" circle class="mb"/>
                  </el-popover>
                </el-tooltip>
                <el-tooltip content="楼层信息" placement="top">
                  <el-popover
                    placement="bottom"
                    width="600">
                    <el-table :data="grids[r * layout.cols + c].organizations" :max-height="layout.canvasWidth" border>
                      <el-table-column type="index" width="40" align="center"/>
                      <el-table-column property="name" label="名称"/>
                      <el-table-column property="shortName" label="简称"/>
                      <el-table-column property="location" label="位置"/>
                    </el-table>
                    <el-button slot="reference" type="success" icon="el-icon-view" size="mini" circle class="mb"/>
                  </el-popover>
                </el-tooltip>
                <el-tooltip content="坐标集" placement="top">
                  <el-popover
                    placement="bottom"
                    width="240">
                    <el-table :data="grids[r * layout.cols + c].points" :max-height="layout.canvasWidth" border>
                      <el-table-column type="index" width="40" align="center"/>
                      <el-table-column property="x" label="X"/>
                      <el-table-column property="y" label="Y"/>
                    </el-table>
                    <el-button slot="reference" type="warning" icon="el-icon-location" size="mini" circle class="mb"/>
                  </el-popover>
                </el-tooltip>
              </div>
            </div>
            <div
              :id="`content-${grids[r * layout.cols + c].id}`"
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

    const grids = buildings.map(it => {
      return Object.assign({}, it, { visible: false })
    })

    return {
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
      grids,
      buildingName: null
    }
  },
  watch: {
    buildingName() {
      this.grids = this.buildings.filter(it => it.name.indexOf(this.buildingName) > -1)
    }
  },
  created() {
    this.layout.rows = Math.ceil(this.grids.length / this.layout.cols)
  },
  mounted() {
    this.init()
    this.animate()
  },
  methods: {
    init() {
      this.grids.forEach(item => {
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
    remove(ind) {
      this.grids[ind].visible = false
      // this.$confirm('确认删除？').then(_ => {
      //   this.$message({
      //     message: `TODO: Remove Item ${id}`,
      //     showClose: true
      //   })
      // }).catch(_ => {})
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
