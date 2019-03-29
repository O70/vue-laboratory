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
            <el-button type="primary" icon="el-icon-check" size="mini" circle @click="saveBuilding"/>
            <el-button type="success" icon="el-icon-back" size="mini" circle @click="resetBuilding"/>
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
            <el-button type="primary" icon="el-icon-check" size="mini" circle @click="savePoint"/>
            <el-button type="success" icon="el-icon-back" size="mini" circle @click="resetPoint"/>
            <el-button type="info" icon="el-icon-close" size="mini" circle @click="clearPoint"/>
          </el-form-item>
        </el-form>
        <el-table
          :data="points"
          :max-height="maxHeight"
          border
          highlight-current-row
          @row-click="handleRowPoint">
          <el-table-column property="sort" label="#" width="40" align="center"/>
          <el-table-column property="x" label="X"/>
          <el-table-column property="y" label="Y"/>
          <el-table-column fixed="right" align="center" width="50">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini" circle style="padding: 1px;" @click="handleDeletePoint($event, scope.$index)"/>
            </template>
          </el-table-column>
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
            <el-button type="primary" icon="el-icon-check" size="mini" circle @click="saveOrg"/>
            <el-button type="success" icon="el-icon-back" size="mini" circle @click="resetOrg"/>
            <el-button type="info" icon="el-icon-close" size="mini" circle @click="clearOrg"/>
          </el-form-item>
        </el-form>
        <el-table
          :data="organizations"
          :max-height="maxHeight"
          border
          highlight-current-row
          @row-click="handleRowOrg">
          <el-table-column property="sort" label="#" width="40" align="center"/>
          <el-table-column property="name" label="名称"/>
          <el-table-column property="shortName" label="简称"/>
          <el-table-column property="location" label="位置"/>
          <el-table-column fixed="right" align="center" width="50">
            <template slot-scope="scope">
              <el-button type="danger" icon="el-icon-delete" size="mini" circle style="padding: 1px;" @click="handleDeleteOrg($event, scope.$index)"/>
            </template>
          </el-table-column>
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
        return { id: null, name: null, sort: 0, points: [], organizations: [] }
      }
    },
    maxHeight: {
      type: Number,
      default: 400
    }
  },
  data() {
    const { id, name, sort } = this.value
    const point = { id: null, bid: id, x: 0, y: 0, sort: 0 }
    const organization = { id: null, bid: id, name: null, shortName: null, location: null }
    return {
      building: { id, name, sort },
      point,
      organization,
      source: { point, organization }
    }
  },
  computed: {
    points() {
      return this.value.points
    },
    organizations() {
      return this.value.organizations
    }
  },
  watch: {
    value() {
      const { id, name, sort } = this.value
      this.building = { id, name, sort }
    }
  },
  methods: {
    saveBuilding() {
      // Map TODO
      this.$message('Save Building')
    },
    resetBuilding() {
      const { name, sort } = this.value
      this.building.name = name
      this.building.sort = sort
    },
    savePoint() {
      // Map TODO
      this.$message('Save Point')
    },
    resetPoint() {
      // Map TODO
      this.point = Object.assign({},
        this.points.find(it => it.id === this.point.id) || this.source.point)
    },
    clearPoint() {
      this.point = Object.assign({}, this.source.point)
    },
    saveOrg() {
      // Map TODO
      this.$message('Save Organization')
    },
    resetOrg() {
      // Map TODO
      this.organization = Object.assign({},
        this.organizations.find(it => it.id === this.organization.id) || this.source.organization)
    },
    clearOrg() {
      this.organization = Object.assign({}, this.source.organization)
    },
    handleRowPoint(row) {
      this.point = Object.assign({}, row)
    },
    handleDeletePoint(event, index) {
      // Map TODO
      event.stopPropagation()
      this.clearPoint()
      this.points.splice(index, 1)
    },
    handleRowOrg(row) {
      this.organization = Object.assign({}, row)
    },
    handleDeleteOrg(event, index) {
      // Map TODO
      event.stopPropagation()
      this.clearOrg()
      this.organizations.splice(index, 1)
    }
  }
}
</script>
