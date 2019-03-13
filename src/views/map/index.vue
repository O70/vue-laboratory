<template>
  <div>
    <div ref="container"/>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-input
          v-model.trim="orgName"
          :clearable="true"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"/>
      </div>
      <div class="box-content">
        <div v-for="b in buildings" :key="b.building">
          <label>{{ b.building }}</label>
          <ul v-for="o in b.organizations" :key="o.name">
            <li>{{ o.name }} {{ o.location ? `- ${o.location}` : '' }}</li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as THREE from 'three'
import coordinates from './coordinates'

export default {
  data() {
    return {
      orgName: '',
      buildings: [],
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
      }
    }
  },
  watch: {
    orgName() {
      this.resetColor()

      if (this.orgName) {
        const name = this.orgName.toLowerCase()
        this.three.group.children.forEach(it => {
          const orgs = (it.geometry.userData.organizations || [])
            .filter(e => e.name.toLowerCase().indexOf(name) > -1 ||
              e.spell.toLowerCase().indexOf(name) > -1 ||
              e.initials.toLowerCase().indexOf(name) > -1 ||
              e.shortName.toLowerCase().indexOf(name) > -1 ||
              e.shortSpell.toLowerCase().indexOf(name) > -1 ||
              e.shortInitials.toLowerCase().indexOf(name) > -1)

          if (orgs.length > 0) {
            const { building, organizations } = it.geometry.userData
            this.buildings.push({ building, organizations })

            it.material.color.set(this.colors.selected)
            this.render()
          }
        })
      }
    }
  },
  created() {
    this.initThree()
  },
  mounted() {
    this.initDom()
  },
  methods: {
    initThree() {
      this.three.camera.position.set(0, 0, 900)
      this.three.scene.add(this.three.camera)

      this.three.renderer.setClearColor(new THREE.Color(this.colors.background))
      this.three.renderer.setSize(window.innerWidth, window.innerHeight)

      // const axes = new THREE.AxesHelper(400)
      // this.three.scene.add(axes)

      this.three.group.position.x = -350
      this.three.group.position.y = -500
      this.three.scene.add(this.three.group)

      this.addShape()

      this.three.camera.lookAt(this.three.scene.position)
      this.render()
    },
    initDom() {
      this.$refs.container.appendChild(this.three.renderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false)
      // document.addEventListener('mousemove', this.onDocumentMouseMove, false)
      document.addEventListener('click', this.onDocumentMouseClick, false)
    },
    addShape() {
      coordinates.forEach(({ points, userData }) => {
        const areaPts = []
        points.forEach(it => { areaPts.push(new THREE.Vector2(it.x, it.y)) })

        const shapeGeometry = new THREE.ShapeBufferGeometry(new THREE.Shape(areaPts))
        shapeGeometry.userData = userData
        const shapeMaterial = new THREE.MeshBasicMaterial({ color: this.colors.region, wireframe: false })
        const shape = new THREE.Mesh(shapeGeometry, shapeMaterial)
        this.three.group.add(shape)
      })
    },
    onWindowResize() {
      this.three.camera.aspect = window.innerWidth / window.innerHeight
      this.three.camera.updateProjectionMatrix()

      this.three.renderer.setSize(window.innerWidth, window.innerHeight)

      this.render()
    },
    onDocumentMouseClick(event) {
      event.preventDefault()

      this.three.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      this.three.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      this.three.raycaster.setFromCamera(this.three.mouse, this.three.camera)
      const intersects = this.three.raycaster.intersectObjects(this.three.group.children)

      if (intersects.length > 0 && !intersects[0].object.geometry.userData.placeholder) {
        this.orgName = ''

        setTimeout(() => {
          this.resetColor()

          const { building, organizations } = intersects[0].object.geometry.userData
          this.buildings.push({ building, organizations })

          intersects[0].object.material.color.set(this.colors.selected)
          this.render()
        })
      }
    },
    render() {
      this.three.renderer.render(this.three.scene, this.three.camera)
    },
    resetColor() {
      this.buildings = []

      this.three.group.children.forEach(it => {
        it.material.color.set(this.colors.region)
      })
      this.render()
    }
  }
}
</script>

<style>
  html, body {
    margin: 0;
    overflow: hidden;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    position: fixed;
    top: 10px;
    left: 10px;
  }

  .box-content {
    max-height: 400px;
    overflow: auto;
  }
</style>
