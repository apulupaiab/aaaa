<template>
    <div class="container">
      <div class="header">
        <app-nav></app-nav> <!-- 插入导航栏 -->
      </div>
      <ul class="navlist">
        <h1>管理我的物品</h1>
        <li><router-link to="/user/mygoods/find">收</router-link></li>
        <li><router-link to="/user/mygoods/sell">出</router-link></li>
      </ul>
      <div class="bx bx-menu" id="menu-icon"></div>
      <h2>出</h2>
      <div class="search-box">
        <el-input style="width: 300px" placeholder="搜索我正在出的" v-model="name" clearable @clear="fetchLostPosts"></el-input>
        <el-button icon="el-icon-search" @click="fetchLostPosts">搜索</el-button>
      </div>
      <div>
        <el-row :gutter="12" v-loading="loading" justify="center">
          <el-col v-for="(post, index) in posts" :key="index" class="post-col">
            <el-card class="frosted-glass" style="margin-bottom: 20px;border-radius: 25px" shadow="hover">
              <div style="display: flex; align-items: center;">
                <div style="margin-right: 20px;">
                  <img v-if="post.images && post.images.length > 0" :src="post.images[0].imageUrl" alt="" style="width: 100px; height: 100px;">
                </div>
                <div style="flex-grow: 1; margin-right: 20px;">
                  <div><b>商品名：</b>{{ post.name }}</div>
                  <div><b>价格：</b>{{ post.price }}元</div>
                  <div><b>商品简介：</b>{{ post.detail }}</div>
                </div>
                <div>
                  <el-button style="margin-top: 5px" @click="confirmDelete(post.id)">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div style="padding: 10px 0;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
  
      <!-- 删除确认弹窗 -->
      <el-dialog
        title="确认删除"
        :visible.sync="dialogVisible"
        width="30%">
        <span>确定要删除该商品吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="deletePost">确认</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import AppNav from '@/components/AppNaved.vue';

export default {
  components: {
    AppNav
  },
  name: 'LostList',
  data() {
    return {
      posts: [],
      fit: 'fill',
      lazyLoad: true,
      loading: false,
      total: 0,
      pageNum: 0,
      pageSize: 5,
      name: "",
      dialogVisible: false,
      deleteId: null,
      request: axios.create({
        baseURL: 'http://localhost:8081'
      }),
    };
  },
  created() {
    this.fetchLostPosts();
  },
  methods: {
    contactSeller(contact) {
      alert(`卖家联系方式：${contact}`); // 弹出卖家的联系方式
    },
    confirmDelete(id) {
      this.deleteId = id;
      this.dialogVisible = true;
    },
    deletePost() {
      if (this.deleteId !== null) {
        this.request.delete(`/sellgoods/${this.deleteId}`)
          .then(response => {
            if (response.data && response.data.code === "0") {
              this.dialogVisible = false;
              this.fetchLostPosts(); // 删除成功后重新获取数据
              alert('删除成功');
            } else {
              alert('删除失败');
            }
          })
          .catch(error => {
            console.error('删除失败:', error);
            alert('删除失败');
          });
      }
    },
    fetchLostPosts() {
      this.loading = true;
      let encodedName = encodeURIComponent(this.name); 
      const testUrl = `/sellgoods/search?name=${encodedName}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`;
      console.log("Test URL:", testUrl);

      this.request.get('/sellgoods/search', {
        params: {
          name: encodedName,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      })
      .then(response => {
        if (response.data && response.data.content) {
          console.log("Response data:", response.data);

          this.posts = response.data.content.map(item => ({
            id: item.gsid,
            name: item.gsname,
            price: item.gsprice,
            contact: item.gsowner,
            detail: item.gsdetail,
            images: []
          }));
          this.total = response.data.totalElements;
          console.log("1");
          this.fetchAndProcessImages(this.posts);
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
    fetchAndProcessImages(posts) {
      posts.forEach(post => {
        if (post.id) {
          const url = `http://localhost:8081/sellgoods/search-images/${post.id}`;
          fetch(url, {
            headers: {
              // 根据后端需求添加必要的请求头，例如认证信息等
            }
          })
          .then(response => {
            if (response.ok) {
              return response.blob();
            }
            throw new Error('图片未找到或请求失败');
          })
          .then(blob => {
            if (blob) {
              const imageUrl = URL.createObjectURL(blob);
              if (!post.images) {
                post.images = [{ imageUrl }];
              } else {
                post.images.push({ imageUrl });
              }
            }
          })
          .catch(error => {
            console.error('获取图片数据失败:', error);
          });
        }
      });
    },
    handleSizeChange(newSize) {
      console.log("Size changed to", newSize);
      this.pageSize = newSize;
      this.pageNum = 0;
      this.fetchLostPosts();
    },
    handleCurrentChange(newPage) {
      console.log("Page changed to", newPage);
      this.pageNum = newPage;
      this.fetchLostPosts();
    },
  },
};
</script>
  
  <style scoped>
  .container {
    display: flex; /* 使用Flexbox布局 */
    flex-direction: column; /* 子元素垂直排列 */
    position: relative;
    padding-bottom: 500px;
    /* padding-top: -30px 如果需要调整顶部内边距可以取消注释 */
  }
  
  .search-box {
    display: flex; /* 使搜索框和按钮的容器成为Flex容器 */
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
    margin-bottom: 20px; /* 根据需要调整外边距 */
    width: 100%; /* 使搜索框容器宽度为100%，便于居中 */
  }
  .frosted-glass {
  background-color: rgba(255, 255, 255, 0.6); /* 半透明白色背景 */
  /* 根据需要调整 rgba 的值 */
  /* 例如：rgba(255, 255, 255, 0.6) 表示白色背景，透明度为 60% */
  width: 50%;
} 
.post-col {
  display: flex;
  justify-content: center;
}
.navlist{
            display: flex;
            align-items: center; /* 垂直居中 */
            justify-content: center; /* 水平居中 */
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
        h1{
            color:rgba(49, 109, 102, 1);
            font-size: 30px;
            font-weight: 600;
        }
        h2{
    
    position: relative;

    color: #fff;

    font-size: 48px;

    font-weight: 600;

    letter-spacing: 1px;

    margin-bottom: 40px;

    margin-top: 40px;

}
  </style>