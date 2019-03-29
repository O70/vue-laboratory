<template>
  <div class="app-container">
    <canvas id="c"/>

    <div class="el-add">
      <el-button type="primary" icon="el-icon-plus" circle @click="openForm"/>
    </div>

    <div v-if="buildings.length > 0">
      <el-row v-for="(rv, r) in layout.rows" :key="`row-${rv}`" :gutter="layout.gutter" :style="{ marginTop: `${r===0?0:20}px` }">
        <el-col v-for="(cv, c) in layout.cols" v-if="r * layout.cols + c < buildings.length" :key="`col-${rv}-${cv}`" :span="layout.span">
          <el-card class="trs">
            <div slot="header" class="clearfix">
              <span><label>{{ buildings[r * layout.cols + c].name }}</label></span>
              <div style="float: right;">
                <el-tooltip content="删除" placement="top">
                  <el-popover
                    v-model="buildings[r * layout.cols + c].visible"
                    placement="bottom"
                    width="130">
                    <p>确定删除？</p>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="buildings[r * layout.cols + c].visible = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="remove(r * layout.cols + c)">确定</el-button>
                    </div>
                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" circle class="mb"/>
                  </el-popover>
                </el-tooltip>
                <el-tooltip content="编辑" placement="top">
                  <!--<el-popover
                    placement="bottom"
                    width="300">
                    <div>
                      <el-row :gutter="layout.gutter">
                        <el-col :span="6">
                          <el-input :value="buildings[r * layout.cols + c].sort" placeholder="序号"/>
                        </el-col>
                        <el-col :span="12">
                          <el-input :value="buildings[r * layout.cols + c].name" placeholder="名称"/>
                        </el-col>
                        <el-col :span="6">
                          <el-button type="primary" icon="el-icon-edit" size="mini" circle/>
                        </el-col>
                      </el-row>
                    </div>
                    <el-button slot="reference" type="primary" icon="el-icon-edit" size="mini" circle class="mb"/>
                  </el-popover>-->
                  <el-button type="primary" icon="el-icon-edit" size="mini" circle class="mb" @click="openForm(r * layout.cols + c)"/>
                </el-tooltip>
                <el-tooltip content="坐标集" placement="top">
                  <el-popover
                    placement="bottom"
                    width="240">
                    <el-table :data="buildings[r * layout.cols + c].points" :max-height="layout.canvasWidth" border>
                      <el-table-column property="sort" label="#" width="40" align="center"/>
                      <el-table-column property="x" label="X"/>
                      <el-table-column property="y" label="Y"/>
                    </el-table>
                    <el-button slot="reference" type="warning" icon="el-icon-location" size="mini" circle class="mb"/>
                  </el-popover>
                </el-tooltip>
                <el-tooltip content="楼层信息" placement="top">
                  <el-popover
                    placement="bottom"
                    width="600">
                    <el-table :data="buildings[r * layout.cols + c].organizations" :max-height="layout.canvasWidth" border>
                      <el-table-column property="sort" label="#" width="40" align="center"/>
                      <el-table-column property="name" label="名称"/>
                      <el-table-column property="shortName" label="简称"/>
                      <el-table-column property="location" label="位置"/>
                    </el-table>
                    <el-button slot="reference" type="success" icon="el-icon-view" size="mini" circle class="mb"/>
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

    <el-dialog :visible.sync="form.visible" :title="form.title || 'None'" width="90%" @close="resetForm">
      <map-form ref="mapForm" v-model="form.value" :max-height="layout.canvasWidth"/>
    </el-dialog>
  </div>
</template>
<script>
import * as THREE from 'three'
import buildings from './data'
import MapForm from './form'

export default {
  components: { MapForm },
  data() {
    const gutter = 20
    const cols = 4

    buildings.forEach(it => {
      it.visible = false
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
      form: {
        visible: false,
        title: null,
        value: null
      }
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
    addBuilding(scene, item) {
      const areaPts = []
      if (item.points.length === 0) return

      item.points.forEach(it => {
        areaPts.push(new THREE.Vector2(it.x, it.y))
      })

      const shapeGeometry = new THREE.ShapeBufferGeometry(new THREE.Shape(areaPts))
      const shapeMaterial = new THREE.MeshBasicMaterial({ color: this.colors.region, wireframe: false })
      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)
      shape.scale.set(2, 2, 1)
      const xs = item.points.map(t => t.x)
      const maxX = Math.max(...xs)
      const minX = Math.min(...xs)
      const ys = item.points.map(t => t.y)
      const maxY = Math.max(...ys)
      const minY = Math.min(...ys)
      shape.translateX(-(minX + ((maxX - minX) / 2)) * 2)
      shape.translateY(-(minY + ((maxY - minY) / 2)) * 2)
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
    openForm(index) {
      this.form.visible = true
      this.form.value = this.buildings[index]
      this.form.title = this.form.value ? this.form.value.name : null
    },
    resetForm() {
      this.$refs.mapForm.resetBuilding()
      this.$refs.mapForm.clearPoint()
      this.$refs.mapForm.clearOrg()
    },
    remove(ind) {
      this.buildings[ind].visible = false
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
  .el-add {
    position: fixed;
    right: 100px;
    bottom: 100px;
    z-index: 2002;
    opacity: 0.4;
  }
  .el-add:hover {
    opacity: 1;
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
