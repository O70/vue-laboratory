<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <router-link :to="{ name: 'Map' }" target="_blank">Map</router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <router-link :to="{ name: 'Map-Backend' }" target="_blank">Map Backend</router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <router-link :to="{ name: 'geometry-convex' }" target="_blank">geometry-convex</router-link>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <router-link :to="{ name: 'geometry-extrude-shapes2' }" target="_blank">geometry-extrude-shapes2</router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style rel="stylesheet/scss" lang="scss">
  body {
    /*background-color: #414a58;*/
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
