<template>
  <div class="app-container">

    <div class="svg-container">
      <div v-for="it in svgList" :key="it" class="svg-item">
        <div>
          <svg-icon :icon-class="it" class-name="is"/>
        </div>
        <label>{{ it }}</label>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      svgList: []
    }
  },
  created() {
    const keys = require.context('@/icons/svg', true, /\.svg$/).keys()
    this.svgList = keys.map(it => it.replace(/\.svg/, '').split('/').pop()).sort()
  }
}
</script>
<style scoped>
.svg-container {
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  align-content: center;
  -webkit-align-content: center;
}
.svg-item {
  width: 130px;
  text-align: center;
}
.is {
  width: 5em;
  height: 5em;
  margin: 10px;
  cursor: pointer;
  /*color: brown;*/
}
</style>
