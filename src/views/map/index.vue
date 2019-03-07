<template>
  <div>
    <div ref="container"/>

    <div v-show="false" class="el-dialog__wrapper" style="z-index: 2001;width: 300px;height: 200px;background-color: #d3dce6">
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
      info
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
        renderer: new THREE.WebGLRenderer({ antialias: true }),
        raycaster: new THREE.Raycaster(),
        mouse: new THREE.Vector2(),
        group: new THREE.Group()
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
      this.three.camera.position.set(0, 0, 900)
      // this.three.camera.position.set(120, 60, 180)
      // this.three.camera.position.set(15, 15, 15)
      // this.three.camera.up.set(0, 0, 1)
      this.three.scene.add(this.three.camera)
      console.info(window.innerWidth, window.innerHeight, window.innerWidth / window.innerHeight)
      // this.three.camera.position.set(600, 300 + 40, 900 - 165)

      this.three.renderer.setClearColor(new THREE.Color(this.colors.background))
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)

      const axes = new THREE.AxesHelper(400)
      this.three.scene.add(axes)
      this.three.scene.add(this.three.group)
      this.three.group.position.x = -500
      this.three.group.position.y = -500

      this.addShape()
      // var geometry = new THREE.PlaneGeometry(5, 20, 32)
      // var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide })
      // var plane = new THREE.Mesh(geometry, material)
      // this.three.scene.add(plane)

      var material = new THREE.LineBasicMaterial({
        color: 0x0000ff
      })

      var geometry = new THREE.Geometry()
      // 自 点， X= 742.4907  Y= 415.8622  Z=   0.0000
      // 到 点， X= 758.1166  Y= 416.5589  Z=   0.0000
      geometry.vertices.push(
        new THREE.Vector3(742.4907, 415.8622, 0),
        new THREE.Vector3(758.1166, 416.5589, 0)
      )

      var geometry1 = new THREE.Geometry()
      // 自 点， X= 744.3000  Y= 361.5817  Z=   0.0000
      // 到 点， X= 760.4477  Y= 362.3075  Z=   0.0000
      geometry1.vertices.push(
        new THREE.Vector3(744.3000, 361.5817, 0),
        new THREE.Vector3(760.4477, 362.3075, 0)
      )

      var line = new THREE.Line(geometry, material)
      var line1 = new THREE.Line(geometry1, material)
      this.three.group.add(line)
      this.three.group.add(line1)

      // this.three.camera.lookAt(new THREE.Vector3(this.three.camera.position.x, this.three.camera.position.y, 0))
      // this.three.camera.lookAt(new THREE.Vector3(0, 0, 0))
      // this.three.camera.lookAt(new THREE.Vector3(600, 340, 735))
      this.three.camera.lookAt(this.three.scene.position)
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

      this.addShape()
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
        const shapeMaterial = new THREE.MeshBasicMaterial({ color: this.colors.region, wireframe: false })
        const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)
        // console.info(shape.position)
        // shape.position.x = -500
        // shape.position.x = 355
        // shape.position.y = -500
        // shape.position.z = 0
        // console.info(shape.position)
        // this.three.scene.add(shape)
        this.three.group.add(shape)
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
      // const intersects = this.three.raycaster.intersectObjects(this.three.scene.children)
      const intersects = this.three.raycaster.intersectObjects(this.three.group.children)

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
