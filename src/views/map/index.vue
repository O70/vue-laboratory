<template>
  <div>
    <div ref="container"/>

    <div v-show="dialogVisible" class="el-dialog__wrapper" style="z-index: 2001;width: 300px;height: 200px;background-color: #d3dce6">
      <el-popover
        placement="top-start"
        title="标题"
        width="200"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <el-button slot="reference">hover 激活</el-button>
      </el-popover>
    </div>

    <div v-show="dialogVisible" class="el-p">
      guiwang
    </div>
  </div>
</template>

<script>
import * as THREE from 'three'
import coordinates from './coordinates'

export default {
  data() {
    return {
      dialogVisible: false,
      three: {
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000),
        renderer: new THREE.WebGLRenderer(),
        raycaster: new THREE.Raycaster(),
        mouse: new THREE.Vector2()
      },
      colors: {
        background: 0x414a58,
        region: 0x343c47,
        selected: 0x2b333b
      },
      INTERSECTED: null
    }
  },
  created() {
    this.initThrees()
  },
  mounted() {
    this.initDom()
  },
  methods: {
    initThrees() {
      // this.three.camera.position.set(120, 60, 180)
      this.three.camera.position.set(600, 300 + 40, 900 - 165)

      this.three.renderer.setClearColor(new THREE.Color(this.colors.background))
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)

      const axes = new THREE.AxesHelper(400)
      this.three.scene.add(axes)

      this.addShape()

      // this.three.camera.lookAt(new THREE.Vector3(600, 340, 735))
      // this.three.camera.lookAt(this.three.scene.position)
      this.three.renderer.render(this.three.scene, this.three.camera)
    },
    initThree() {
      this.three.camera.position.set(0, 0, 1000)

      this.three.renderer.setClearColor(new THREE.Color(this.colors.background))
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)

      // The X axis is red. The Y axis is green. The Z axis is blue.
      const axes = new THREE.AxesHelper(400)
      // axes.position.set(-400, 0, 0)
      this.three.scene.add(axes)

      /*
      this.addShape()

      const fontJson = require('three/examples/fonts/helvetiker_regular.typeface')
      const font = new THREE.Font(fontJson)
      const shapes = font.generateShapes('Main Building', 18)
      const geometry = new THREE.ShapeBufferGeometry(shapes)
      geometry.userData.isFont = true
      // geometry.computeBoundingBox()
      // const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x)
      // geometry.translate(xMid, 0, 0)
      const matLite = new THREE.MeshBasicMaterial({
        // color: 0x006699,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      })
      const text = new THREE.Mesh(geometry, matLite)
      this.three.scene.add(text)

      const geo2 = new THREE.PlaneBufferGeometry(100, 25)
      geo2.userData.isFont = true
      const mesh = new THREE.Mesh(geo2, this.generateLabelMaterial())
      // mesh.position.set(-100, 100, 0)
      this.three.scene.add(mesh)
      */

      // console.info(JSON.stringify(this.three.scene.position))
      this.three.camera.lookAt(this.three.scene.position)
      // alert(window.innerWidth + ', ' + (window.innerWidth / 2))
      // alert(window.innerHeight + ', ' + (window.innerHeight / 2))
      // this.three.camera.lookAt(new THREE.Vector3(0, 0, 0))
      this.three.renderer.render(this.three.scene, this.three.camera)
    },
    initDom() {
      this.$refs.container.appendChild(this.three.renderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false)
      document.addEventListener('mousemove', this.onDocumentMouseMove, false)
    },
    addShape() {
      coordinates.forEach(points => {
        const areaPts = []
        points.forEach(it => { areaPts.push(new THREE.Vector2(it.x, it.y)) })

        const shapeGeometry = new THREE.ShapeBufferGeometry(new THREE.Shape(areaPts))
        const shapeMaterial = new THREE.MeshBasicMaterial({ color: this.colors.region })
        const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)
        this.three.scene.add(shape)
      })
    },
    onWindowResize() {
      this.three.camera.aspect = window.innerWidth / window.innerHeight
      this.three.camera.updateProjectionMatrix()

      this.three.renderer.setSize(window.innerWidth, window.innerHeight)

      this.render()
    },
    onDocumentMouseMove(event) {
      event.preventDefault()

      this.three.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.three.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      this.render()
    },
    render() {
      this.three.raycaster.setFromCamera(this.three.mouse, this.three.camera)
      const intersects = this.three.raycaster.intersectObjects(this.three.scene.children)

      if (intersects.length > 0 &&
        !intersects[0].object.geometry.userData.isFont) {
        if (this.INTERSECTED !== intersects[0].object) {
          this.INTERSECTED && this.INTERSECTED.material.color.set(this.colors.region)

          this.INTERSECTED = intersects[0].object
          this.INTERSECTED.material.color.set(this.colors.selected)
          // this.dialogVisible = true
        }
      } else {
        this.INTERSECTED && this.INTERSECTED.material.color.set(this.colors.region)
        this.INTERSECTED = null
        // this.dialogVisible = false
      }

      this.three.renderer.render(this.three.scene, this.three.camera)
    },
    generateLabelMaterial() {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 128
      canvas.height = 32
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)'
      ctx.fillRect(0, 0, 128, 32)
      ctx.fillStyle = 'white'
      ctx.font = '12pt arial bold'
      ctx.fillText('主楼', 10, 22)
      const map = new THREE.CanvasTexture(canvas)
      const material = new THREE.MeshBasicMaterial({ map: map, transparent: true })
      return material
    }
  }
}
</script>

<style>
  html, body {
    margin: 0;
    overflow: hidden;
  }
  .el-dialog__wrapper {
    position: fixed;
    top: 350px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
  }

  .el-p {
    background-color: #d3dce6;
    width: 200px;
    height: 200px;
    position: fixed;
    top: 10px;
    left: 10px;
    /*transform-origin: center top 0px;*/
    z-index: 2001;
    /*osition: absolute;*/
    /*min-width: 150px;*/
    /*border: 1px solid #ebeef5;*/
    /*padding: 12px;*/
    /*z-index: 2001;*/
    /*color: #606266;*/
    /*line-height: 1.4;*/
    /*text-align: justify;*/
    /*font-size: 14px;*/
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
  }
</style>
