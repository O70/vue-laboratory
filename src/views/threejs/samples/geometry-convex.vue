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
        camera: new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000),
        renderer: new THREE.WebGLRenderer({ antialias: true })
      },
      group: null
    }
  },
  created() {
    this.initThree()
    this.animate()
  },
  mounted() {
    this.initDom()
  },
  methods: {
    initThree() {
      this.three.renderer.setPixelRatio(window.devicePixelRatio)
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)

      this.three.camera.position.set(15, 20, 30)
      this.three.scene.add(this.three.camera)

      this.three.scene.add(new THREE.AmbientLight(0x222222))
      // light
      const light = new THREE.PointLight(0xffffff, 1)
      this.three.camera.add(light)
      // helper
      this.three.scene.add(new THREE.AxesHelper(20))

      const loader = new THREE.TextureLoader()
      const texture = loader.load('@/assets/threejs/disc.png')

      this.group = new THREE.Group()
      this.three.scene.add(this.group)

      const vertices = new THREE.DodecahedronGeometry(10).vertices
      // for ( const i = 0; i < vertices.length; i ++ ) {
      // vertices[ i ].add( randomPoint().multiplyScalar( 2 ) ); // wiggle the points
      // }

      const pointsMaterial = new THREE.PointsMaterial({
        color: 0x0080ff,
        map: texture,
        size: 1,
        alphaTest: 0.5
      }
      )
      const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices)
      const points = new THREE.Points(pointsGeometry, pointsMaterial)
      this.group.add(points)

      // convex hull
      // const meshMaterial = new THREE.MeshLambertMaterial({
      //   color: 0xffffff,
      //   opacity: 0.5,
      //   transparent: true
      // })
      // const meshGeometry = new THREE.ConvexBufferGeometry(vertices)
      // const mesh = new THREE.Mesh(meshGeometry, meshMaterial)
      // mesh.material.side = THREE.BackSide // back faces
      // mesh.renderOrder = 0
      // this.group.add(mesh)

      // const mesh2 = new THREE.Mesh(meshGeometry, meshMaterial.clone())
      // mesh2.material.side = THREE.FrontSide // front faces
      // mesh2.renderOrder = 1
      // this.group.add(mesh2)

      window.addEventListener('resize', this.onWindowResize, false)
    },
    initDom() {
      this.$refs.container.appendChild(this.three.renderer.domElement)
      // window.addEventListener('resize', this.onWindowResize, false)
      // document.addEventListener('mousemove', this.onDocumentMouseMove, false)
    },
    onWindowResize() {
      this.three.camera.aspect = window.innerWidth / window.innerHeight
      this.three.camera.updateProjectionMatrix()
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    animate() {
      requestAnimationFrame(this.animate)
      this.group.rotation.y += 0.005
      this.render()
    },
    render() {
      this.three.renderer.render(this.three.scene, this.three.camera)
    }
  }
}
</script>
