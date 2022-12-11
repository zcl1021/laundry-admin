<template>
   <div class="app-container">
  <el-form :inline="true" :model="conditionVo" class="demo-form-inline">
  <el-form-item label="账号:">
    <el-input v-model="conditionVo.username" placeholder="请填写账号"></el-input>
  </el-form-item>
    <el-form-item label="姓名:">
    <el-input v-model="conditionVo.realName" placeholder="请填写姓名"></el-input>
  </el-form-item>
  <el-form-item label="性别:">
    <el-select v-model="conditionVo.gender" placeholder="性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getList()">查询</el-button>
  </el-form-item>
</el-form>
 <el-table
    :data="tableData"
    border
    style="width: 100%">
   <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (conditionVo.pageNum - 1) * pageSize + scope.$index + 1 }}
        </template>
    </el-table-column>

    <el-table-column
      align="center"
      prop="username"
      label="账号"
      width="180"/>

    <el-table-column
      align="center"
      prop="realName"
      label="姓名"
      width="80"/>

      <el-table-column
      align="center"
      prop="gender"
      label="性别"
      width="60"/>
    <el-table-column
      align="center"
      prop="address"
      label="地址"
      width="200"/>
      <el-table-column
      align="center"
      prop="phone"
      label="手机号"
      width="150"/>
      <el-table-column
      align="center"
      prop="role"
      label="角色"
      width="100"/>
      <el-table-column
      align="center"
      prop="createTime"
      label="创建时间"
      width="180"/>
      <el-table-column label="操作" width="200" align="center">

        <template slot-scope="scope">
          <router-link :to="'#'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
 <div>
     <el-pagination
       @current-change="getList"
        background
        layout="prev, pager, next"
        :pageSize="2"
        :total="totalNum">
      </el-pagination>
    </div>
   </div>
    
</template>
<script>
import userApi from '@/api/admin/user'
  export default {
    data() {
      return {
        formInline: {
          user: '',
          region: ''
        },
        input: '',
        tableData: [],
        page:1,//当前页
        pageSize:2,//每页记录数
        totalNum:0, // 总数
        conditionVo:{
          pageNum:1,
          limitNum:2,
          username:null,
          realName:null,
          gender:null

        }//条件封装对象
      }
    },
    created(){
      this.getList()
    },
    methods: {
      getList(page=1){
        this.conditionVo.pageNum=page
         userApi.getUserListPage(this.conditionVo)
         .then(response =>{
          console.log(response)
              this.tableData = response.data.userList;
              this.totalNum = response.data.total;
         })
         .catch(error =>{
             console.log(error)
         })//请求失败
      },
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>