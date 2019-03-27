<template>
  <div>
    <el-row>
      <el-col>
        <el-form :inline="true" :model="building">
          <el-form-item>
            <el-input v-model="building.sort" placeholder="序号" size="small" style="width: 60px;"/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="building.name" placeholder="名称" size="small" style="width: 340px;"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" size="mini" circle/>
            <el-button type="info" icon="el-icon-back" size="mini" circle/>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-form :inline="true" :model="point">
          <el-form-item>
            <el-input v-model="point.sort" placeholder="序号" size="small" style="width: 60px;"/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="point.x" placeholder="X" size="small"/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="point.y" placeholder="Y" size="small"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" size="mini" circle/>
            <el-button type="info" icon="el-icon-back" size="mini" circle/>
          </el-form-item>
        </el-form>
        <el-table :data="points" :max-height="maxHeight" border>
          <el-table-column property="sort" label="#" width="40" align="center"/>
          <el-table-column property="x" label="X"/>
          <el-table-column property="y" label="Y"/>
        </el-table>
      </el-col>
      <el-col :span="14">
        <el-form :inline="true" :model="organization">
          <el-form-item>
            <el-input v-model="organization.sort" placeholder="序号" size="small" style="width: 60px;"/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="organization.name" placeholder="名称" size="small"/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="organization.shortName" placeholder="简称" size="small"/>
          </el-form-item>
          <el-form-item>
            <el-input v-model="organization.location" placeholder="位置" size="small"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" size="mini" circle/>
            <el-button type="info" icon="el-icon-back" size="mini" circle/>
          </el-form-item>
        </el-form>
        <el-table :data="organizations" :max-height="maxHeight" border>
          <el-table-column property="sort" label="#" width="40" align="center"/>
          <el-table-column property="name" label="名称"/>
          <el-table-column property="shortName" label="简称"/>
          <el-table-column property="location" label="位置"/>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'MapForm',
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    maxHeight: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      building: {},
      points: [],
      point: {},
      organizations: [],
      organization: {}
    }
  },
  created() {
    const { points, organizations, ...building } = this.value
    this.building = building
    this.points = points
    this.organizations = organizations
  }
}
</script>
