<template>
  <div>
    <!--<canvas id="c"></canvas>-->
    <el-card>
      <div slot="header" class="clearfix">
        <span><label>{{ title }}</label></span>
        <!--<el-button type="primary" icon="el-icon-plus" size="mini" circle style="float: right;"/>-->
      </div>
      <div>
        <div ref="container"/>
      </div>
    </el-card>
  </div>
</template>
<script>
  import * as THREE from 'three'

  const sample = new THREE.BoxBufferGeometry(1, 1, 1)

  export default {
    name: 'MapItem',
    props: {
      canvasWidth: [String, Number],
      title: {
        type: String,
        default: 'None'
      },
      renderer: THREE.WebGLRenderer
    },
    data() {
      return {
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(50, 1, 1, 10),
        // renderer: new THREE.WebGLRenderer({ antialias: true })
      }
    },
    created() {
      this.initThree()
      // this.animate()
    },
    mounted() {
      this.initDom()
    },
    methods: {
      initThree() {
        // console.info(this.renderer.context)
        // this.renderer.context.canvas = document.getElementById('c')
        this.camera.position.set(0, 0, 2)
        this.scene.add(this.camera)

        this.renderer.setClearColor(0xe0e0e0, 1)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(this.canvasWidth, this.canvasWidth, false)

        const axes = new THREE.AxesHelper(8)
        this.scene.add(axes)
        // const material = new THREE.MeshStandardMaterial( {
        //   color: new THREE.Color().setHSL( Math.random(), 1, 0.75 ),
        //   roughness: 0.5,
        //   metalness: 0,
        //   flatShading: true
        // })
        // this.scene.add(new THREE.Mesh(sample, material))
        //
        // const light = new THREE.DirectionalLight(0xffffff, 0.5)
        // light.position.set(1, 1, 1)
        // this.scene.add(light)

        // this.renderer.setClearColor( 0xffffff )
        // this.renderer.setScissorTest( false )
        // this.renderer.clear()
        // this.renderer.setClearColor( 0xe0e0e0 )
        // this.renderer.setScissorTest( true )
        this.renderer.render(this.scene, this.camera)
      },
      initDom() {
        this.$refs.container.appendChild(this.renderer.domElement)
        // this.renderer.render(this.scene, this.camera)
        // window.addEventListener('resize', this.onWindowResize, false)
        // document.addEventListener('click', this.onDocumentMouseClick, false)
      },
      test() {
        console.info('gui')
      },
      // animate() {
      //   this.render()
      //   requestAnimationFrame(this.animate)
      // },
      render() {
        this.renderer.setClearColor( 0xffffff )
        this.renderer.setScissorTest( false )
        this.renderer.clear()
        this.renderer.setClearColor( 0xe0e0e0 )
        this.renderer.setScissorTest( true )
        this.renderer.render(this.scene, this.camera)
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
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
    clear: both
  }
</style>

<!--
,
  { path: '/map/sample', component: () => import('@/views/user/map/sample') },
  { path: '/map', component: () => import('@/views/user/map/index_bak') }

  10.122.163.75
-->
