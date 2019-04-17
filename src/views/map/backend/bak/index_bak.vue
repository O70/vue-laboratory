<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>建筑列表</span>
            <el-button type="primary" icon="el-icon-plus" size="mini" circle style="float: right;"/>
          </div>
          <div>
            <el-table
              :data="buildings"
              max-height="650"
              border>
              <el-table-column type="index" width="40" align="center"/>
              <el-table-column prop="name" label="名称"/>
              <el-table-column
                fixed="right"
                label="操作"
                width="80"
                align="center"
                header-align="center">
                <template slot-scope="scope">
                  <el-button type="success" icon="el-icon-edit" size="mini" circle/>
                  <el-button type="danger" icon="el-icon-delete" size="mini" circle/>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header" class="clearfix">
            <span>坐标集</span>
            <el-button type="primary" icon="el-icon-plus" size="mini" circle style="float: right;"/>
          </div>
          <div>
            123
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import buildings from './data'

export default {
  data() {
    return {
      buildings
    }
  },
  created() {
    console.info(this.buildings)
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
