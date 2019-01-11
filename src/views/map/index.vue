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
  mounted() {
    this.initThree()
  },
  methods: {
    initThree() {
      this.three.camera.position.set(0, 0, 400)

      this.three.renderer.setClearColor(new THREE.Color(this.colors.background))
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)

      const axes = new THREE.AxesHelper(80)
      this.three.scene.add(axes)

      const shapeGeometry = new THREE.ShapeGeometry(this.getShape())
      const shapeMaterial = new THREE.MeshBasicMaterial({ color: this.colors.region })
      const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)
      this.three.scene.add(shape)

      this.$refs.container.appendChild(this.three.renderer.domElement)
      this.three.camera.lookAt(this.three.scene.position)
      this.three.renderer.render(this.three.scene, this.three.camera)

      window.addEventListener('resize', this.onWindowResize, false)
      document.addEventListener('mousemove', this.onDocumentMouseMove, false)
    },
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
    onDocumentMouseMove(event) {
      event.preventDefault()

      this.three.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.three.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      this.render()
    },
    render() {
      this.three.raycaster.setFromCamera(this.three.mouse, this.three.camera)
      var intersects = this.three.raycaster.intersectObjects(this.three.scene.children)

      if (intersects.length > 0) {
        if (this.INTERSECTED !== intersects[0].object) {
          this.INTERSECTED = intersects[0].object
          this.INTERSECTED.material.color.set(this.colors.selected)
        }
      } else {
        this.INTERSECTED && this.INTERSECTED.material.color.set(this.colors.region)
        this.INTERSECTED = null
      }

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
