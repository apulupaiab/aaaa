<template>
  <div class="background">
      <header>
          <ul class="navlist">
              <h1>Management System</h1>
              <li><router-link to="/admin/master/find">Find</router-link></li>
              <li><router-link to="/admin/master/sell">Sell</router-link></li>
          </ul>
          <div class="bx bx-menu" id="menu-icon"></div>
      </header>
      <div style="margin-bottom: 5px;">
          <h2>Goods On Finding</h2>
          <el-input v-model="name" placeholder="请输入商品名" suffix-icon="el-icon-search" style="width: 200px;"
                    @keyup.enter.native="loadPost"></el-input>

          <el-button type="primary" style="margin-left: 5px;" @click="loadPost">查询</el-button>
          <el-button type="success" @click="resetParam">重置</el-button>

          <el-button type="primary" style="margin-left: 5px;" @click="add">新增</el-button>
      </div>
      <el-table :data="tableData"
                :header-cell-style="{ background: '#f2f5fc', color: '#555555' }"
                border
                highlight-current-row
                @current-change="selectCurrentChange"
      >
          <el-table-column prop="id" label="ID" width="60">
          </el-table-column>
          <el-table-column prop="name" label="商品名" width="180">
          </el-table-column>
          <el-table-column prop="count" label="数量" width="180">
          </el-table-column>
          <el-table-column prop="remark" label="商品详情">
          </el-table-column>
          <el-table-column prop="operate" label="操作">
              <template slot-scope="scope">
                  <el-button size="small" type="success" @click="mod(scope.row)">编辑</el-button>
                  <el-popconfirm
                          title="确定删除吗？"
                          @confirm="deletePost(scope.row.id)"
                          style="margin-left: 5px;"
                  >
                      <el-button slot="reference" size="small" type="danger">删除</el-button>
                  </el-popconfirm>
              </template>
          </el-table-column>
      </el-table>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[5, 10, 20,30]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>

      <el-dialog
              title="物品维护"
              :visible.sync="centerDialogVisible"
              width="30%"
              center>

          <el-form ref="form" :rules="rules" :model="form" label-width="80px">
              <el-form-item label="商品名称" prop="name">
                  <el-col :span="20">
                      <el-input v-model="form.name"></el-input>
                  </el-col>
              </el-form-item>
              <el-form-item label="分类" prop="goodstype">
                  <el-col :span="20">
                      <el-select v-model="form.goodstype" placeholder="请选择分类" style="margin-left: 5px;">
                          <el-option
                                  v-for="item in goodstypeData"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id">
                          </el-option>
                      </el-select>
                  </el-col>
              </el-form-item>
              <el-form-item label="数量" prop="count">
                  <el-col :span="20">
                      <el-input v-model="form.count"></el-input>
                  </el-col>
              </el-form-item>
              <el-form-item label="商品详情" prop="remark">
                  <el-col :span="20">
                      <el-input type="textarea" v-model="form.remark"></el-input>
                  </el-col>
              </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="save">确定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'GoodsOnSelling',
  data() {
    return {
      tableData: [],
      fit: 'fill',
      lazyLoad: true,
      loading: false,
      total: 0,
      pageNum: 1,
      pageSize: 20,
      name: "",
      centerDialogVisible: false,
      form: {
        name: '',
        goodstype: '',
        count: '',
        remark: ''
      },
      goodstypeData: [],
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goodstype: [{ required: true, message: '请选择分类', trigger: 'change' }],
        count: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        remark: [{ required: true, message: '请输入商品详情', trigger: 'blur' }]
      },
      request: axios.create({
        baseURL: 'http://localhost:8081'
      })
    };
  },
  created() {
    this.loadPost();
  },
  methods: {
    loadPost() {
      this.loading = true;
      let encodedName = encodeURIComponent(this.name);
      this.request.get('/findgoods/search', {
        params: {
          name: encodedName,
          pageNum: this.pageNum - 1,
          pageSize: this.pageSize
        }
      })
      .then(response => {
        if (response.data && response.data.content) {
          this.tableData = response.data.content.map(item => ({
            id: item.gfid,
            name: item.gfname,
            count: item.gfprice, // Assuming count corresponds to gfprice
            remark: item.gfdetail // Assuming remark corresponds to gfdetail
          }));
          this.total = response.data.totalElements;
        } else {
          console.error('获取数据失败: 返回数据格式不符合预期');
        }
        this.loading = false;
      })
      .catch(error => {
        console.error('获取数据失败:', error);
        this.loading = false;
      });
    },
    handleSizeChange(newSize) {
      this.pageSize = newSize;
      this.pageNum = 1;
      this.loadPost();
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage;
      this.loadPost();
    },
    resetParam() {
      this.name = '';
      this.loadPost();
    },
    add() {
      this.centerDialogVisible = true;
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // Handle save logic here
          this.centerDialogVisible = false;
          // Reset form after save
          this.form = {
            name: '',
            goodstype: '',
            count: '',
            remark: ''
          };
        }
      });
    },
    deletePost(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.request.delete(`/findgoods/${id}`)
          .then(response => {
            if (response.data && response.data.code === "0") {
              this.loadPost(); // 删除成功后重新获取数据
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              });
            }
          })
          .catch(error => {
            console.error('删除失败:', error);
            this.$message({
              type: 'error',
              message: '删除失败!'
            });
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    mod(row) {
      // Handle edit logic here
      this.form = { ...row };
      this.centerDialogVisible = true;
    },
    selectCurrentChange(row) {
      console.log(row);
    }
  }
};
</script>


<style scoped>
  /* .background {
    background-color: rgb(233, 233, 233);
    height: 100%;
  } */
    /*导航栏样式*/
    *{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: 'Poppins', sans-serif;
            list-style: none;
            text-decoration: none;
        }
        header{
            position: relative;
            right: 0;
            top: 0;
            z-index: 1000;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 33px 9%;
            background: transparent;
        }
        .navlist{
            display: flex;
            align-items: center; /* 垂直居中 */
        }
        .navlist li {
        margin-right: 120px; /* 给每个导航项设置右边距 */
    }

    .navlist li:first-child a {
        margin-left: 120px; /* 给第一个导航项设置左边距，以保持两端对齐 */
    }
        .navlist a{
            color:rgba(49, 109, 102, 1);
            font-size: 17px;
            font-weight: 600;
            border-bottom: 2px solid transparent;
            transition: all .55s ease;
        }
        .navlist a:hover{
            border-bottom: 2px solid rgba(49, 109, 102, 1);
        }
        #menu-icon{
            color: white;
            font-size: 35px;
            z-index: 10001;
            cursor: pointer;
            display: none;
        }
        .form h1 {
    position: relative;
    color: #306D66;
    font-size: 36px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 40px;
  }
  .form h2 {
    position: relative;
    color: #fff;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 40px;
  }
</style>