<template>
  <div class="app-container">
    <!--<canvas id="c"></canvas>-->

    <el-row :gutter="layout.gutter" v-if="buildings.length > 0" v-for="(rv, r) in layout.rows" style="margin-bottom: 20px;">
      <el-col :span="layout.span" v-for="(cv, c) in layout.cols" v-if="r * layout.cols + c < buildings.length">
        <map-item
          :ref="buildings[r * layout.cols + c].id"
          :canvas-width="layout.canvasWidth"
          :title="buildings[r * layout.cols + c].name"
          :renderer="renderer"/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import buildings from './data'
import MapItem from "./item"
import { WebGLRenderer } from 'three'

export default {
  components: { MapItem },
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
      renderer: new WebGLRenderer({ antialias: true }),
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
    console.info(document.querySelectorAll('canvas').length)
  }
}
</script>
