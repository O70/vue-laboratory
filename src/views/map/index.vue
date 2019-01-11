<template>
  <div ref="container"/>
</template>

<script>
import * as THREE from 'three'

export default {
  data() {
    return {
      three: {
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000),
        renderer: new THREE.WebGLRenderer()
      }
    }
  },
  mounted() {
    this.initThree()
  },
  methods: {
    initThree() {
      this.three.camera.position.set(0, 0, 400)

      this.three.renderer.setClearColor(new THREE.Color(0x414a58))
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)

      const axes = new THREE.AxesHelper(80)
      this.three.scene.add(axes)

      const shapeGeometry = new THREE.ShapeGeometry(this.getShape())
      const shapeMaterial = new THREE.MeshBasicMaterial({ color: 0x343c47 })
      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)
      this.three.scene.add(shape)

      this.$refs.container.appendChild(this.three.renderer.domElement)
      this.three.camera.lookAt(this.three.scene.position)
      this.three.renderer.render(this.three.scene, this.three.camera)

      window.addEventListener('resize', this.onWindowResize, false)
    },
    /*
    drawShape() {
      var x = -140, y = 60;
      var shape = new THREE.Shape();
      shape.moveTo(x, y);
      shape.lineTo(x, y);
      // shape.lineTo(x + 10, y);
      // shape.lineTo(x + 10, y + 10);
      // shape.lineTo(x, y + 10);
      shape.lineTo(-120, 60)
      shape.lineTo(-120, 50)
      shape.lineTo(-75, 50)
      shape.lineTo(-75, 25)
      shape.lineTo(-85, 25)
      shape.lineTo(-85, -35)
      shape.lineTo(-80, -35)
      shape.lineTo(-80, -75)
      shape.lineTo(-85, -75)
      shape.lineTo(-85, -135)
      shape.lineTo(-75, -135)
      shape.lineTo(-75, -160)
      shape.lineTo(-120, -160)
      shape.lineTo(-130, -160)
      shape.lineTo(-150, -160)
      shape.lineTo(-150, -125)
      shape.lineTo(-120, -125)
      shape.lineTo(-120, 25)
      shape.lineTo(-140, 25)

      return shape;
    },
    */
    getShape() {
      const points = [
        { x: -140, y: 60 },
        { x: -120, y: 60 },
        { x: -120, y: 50 },
        { x: -75, y: 50 },
        { x: -75, y: 25 },
        { x: -85, y: 25 },
        { x: -85, y: -35 },
        { x: -80, y: -35 },
        { x: -80, y: -75 },
        { x: -85, y: -75 },
        { x: -85, y: -135 },
        { x: -75, y: -135 },
        { x: -75, y: -160 },
        { x: -120, y: -160 },
        { x: -130, y: -160 },
        { x: -150, y: -160 },
        { x: -150, y: -125 },
        { x: -120, y: -125 },
        { x: -120, y: 25 },
        { x: -140, y: 25 }
      ]

      const areaPts = []
      for (let i = 0; i < points.length; i++) {
        areaPts.push(new THREE.Vector2(points[i].x, points[i].y))
      }

      return new THREE.Shape(areaPts)
    },
    onWindowResize() {
      this.three.camera.aspect = window.innerWidth / window.innerHeight
      this.three.camera.updateProjectionMatrix()
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)
      this.render()
    },
    render() {
      this.three.renderer.render(this.three.scene, this.three.camera)
    }
  }
}
</script>

<style>
  html, body {
    margin: 0;
    overflow: hidden;
    /*background-color: #414a58;*/
  }
</style>
