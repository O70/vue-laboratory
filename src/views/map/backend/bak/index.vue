<template>
  <div class="app-container">
    <canvas id="c"></canvas>

    <div id="content">
      <el-row :gutter="layout.gutter" v-if="buildings.length > 0" v-for="(rv, r) in layout.rows" style="margin-bottom: 20px;">
        <el-col :span="layout.span" v-for="(cv, c) in layout.cols" v-if="r * layout.cols + c < buildings.length">
          <!--<map-item
            :ref="buildings[r * layout.cols + c].id"
            :canvas-width="layout.canvasWidth"
            :title="buildings[r * layout.cols + c].name"
            :renderer="renderer"/>-->
          <el-card>
            <div slot="header" class="clearfix">
              <span><label>{{ buildings[r * layout.cols + c].name }}</label></span>
              <!--<el-button type="primary" icon="el-icon-plus" size="mini" circle style="float: right;"/>-->
            </div>
            <div>
              <div ref="container"/>
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
      const cols = 6

      return {
        layout: {
          gutter,
          rows: 0,
          cols,
          span: 24 / cols,
          canvasWidth: (window.innerWidth - gutter * ((cols + 1) + (cols * 2)) - (cols * 2)) / cols
        },
        // renderer: new WebGLRenderer({ canvas: document.getElementById('c'), antialias: true }),
        // renderer: new WebGLRenderer({ antialias: true }),
        canvas: null,
        scenes: [],
        renderer: null,
        buildings
      }
    },
    created() {
      this.layout.rows = Math.ceil(this.buildings.length / this.layout.cols)
      // console.info(this.buildings)
    },
    mounted() {
      // console.info(1, this.$refs.id0)

      // console.info(this.renderer)
      // this.buildings.forEach((it, ind) => {
        // this.$refs[it.id][0].render()
        // console.info(it.id, this.$refs[it.id])
      // })
      // console.info(document.querySelectorAll('canvas').length)

      this.init()
      this.animate()
    },
    methods: {
      init() {
        this.canvas = document.getElementById('c')
        console.info('Canvas is: ', this.canvas)

        const geometries = [
          new THREE.BoxBufferGeometry(1, 1, 1),
          new THREE.SphereBufferGeometry(0.5, 12, 8),
          new THREE.DodecahedronBufferGeometry(0.5),
          new THREE.CylinderBufferGeometry(0.5, 0.5, 1, 12)
        ]

        // const template = document.getElementById('template').text
        const content = document.getElementById('content')
        console.info('Content is: ', content)

        for (let i = 0; i < 40; i++) {
          const scene = new THREE.Scene()
          // make a list item
          const element = document.createElement('div')
          element.className = 'list-item'
          // element.innerHTML = template.replace('$', i + 1)
          element.innerHTML = `
            			<div class="scene"></div>
			            <div class="description">Scene ${i + 1}</div>
          `

          scene.userData.element = element.querySelector('.scene')
          content.appendChild(element)

          const camera = new THREE.PerspectiveCamera(50, 1, 1, 10)
          camera.position.z = 2
          scene.userData.camera = camera

          // const controls = new THREE.OrbitControls(scene.userData.camera, scene.userData.element)
          // controls.minDistance = 2
          // controls.maxDistance = 5
          // controls.enablePan = false
          // controls.enableZoom = false
          // scene.userData.controls = controls

          const geometry = geometries[geometries.length * Math.random() | 0]
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
          this.scenes.push(scene)
        }

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true })
        this.renderer.setClearColor(0xffffff, 1)
        this.renderer.setPixelRatio(window.devicePixelRatio)

        this.render()
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

        this.renderer.setClearColor(0xe0e0e0)
        this.renderer.setScissorTest(true)

        this.scenes.forEach(scene => {
          // so something moves
          scene.children[0].rotation.y = Date.now() * 0.001
          // get the element that is a place holder for where we want to
          // draw the scene
          const element = scene.userData.element
          // get its position relative to the page's viewport
          const rect = element.getBoundingClientRect()
          // check if it's offscreen. If so skip it
          if (rect.bottom < 0 || rect.top > this.renderer.domElement.clientHeight ||
            rect.right < 0 || rect.left > this.renderer.domElement.clientWidth ) {
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
          //camera.aspect = width / height // not changing in this example
          //camera.updateProjectionMatrix()
          //scene.userData.controls.update()
          this.renderer.render(scene, camera)
        })
      }
    }
  }
</script>
<!--<style rel="stylesheet/scss" lang="scss" scoped>-->
<style>
  .el-button {
    outline: none;
    padding: 2px;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  * {
    box-sizing: border-box;
    -moz-box-sizing: border-box;
  }
  body {
    color: #000;
    font-family:Monospace;
    font-size:13px;
    background-color: #fff;
    margin: 0;
  }
  #info {
    position: absolute;
    top: 0; width: 100%;
    padding: 5px;
    text-align:center;
  }
  #content {
    position: absolute;
    top: 0; width: 100%;
    z-index: 1;
    padding: 3em 0 0 0;
  }
  a {
    color: #0080ff;
  }
  #c {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .list-item {
    display: inline-block;
    margin: 1em;
    padding: 1em;
    box-shadow: 1px 2px 4px 0px rgba(0,0,0,0.25);
  }
  .list-item .scene {
    width: 200px;
    height: 200px;
  }
  .list-item .description {
    color: #888;
    font-family: sans-serif;
    font-size: large;
    width: 200px;
    margin-top: 1.5em;
  }
</style>
