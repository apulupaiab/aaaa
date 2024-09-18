<template>
  <div class="container">
    <div class="header">
      <app-nav></app-nav> <!-- 插入导航栏 -->
    </div>
    <h2>出</h2>
    <div class="search-box">
      <el-input style="width: 300px" placeholder="搜索你想出的" v-model="name" clearable @clear="fetchLostPosts"></el-input>
      <el-button icon="el-icon-search" @click="fetchLostPosts">搜索</el-button>
      
    </div>
    <p class="forget">没有找到你想出的？<router-link to="/sellgoods/create">发布出物贴</router-link></p>
    <h1>大家正在收</h1>
    <div>
      <el-row :gutter="12" v-loading="loading" justify="center">
        <el-col v-for="(post, index) in posts" :key="index" class="post-col">
            <!-- 添加磨砂半透明类 -->
            <el-card class="frosted-glass" style="margin-bottom: 20px;border-radius: 25px" shadow="hover">
            <!-- 使用 Flex 布局来调整内部元素 -->
            <div style="display: flex; align-items: center;">
              <!-- 图片放在左侧 -->
              <div style="margin-right: 20px;">
                <img v-if="post.images && post.images.length > 0" :src="post.images[0].imageUrl" alt="" style="width: 100px; height: 100px;">
              </div>
              <!-- 信息放在中间 -->
              <div style="flex-grow: 1; margin-right: 20px;">
                <div><b>商品名：</b>{{ post.name }}</div>
                <div><b>价格：</b>{{ post.price }}元</div>
                <!-- <div><b>商品简介：</b>{{ post.detail }}</div> -->
              </div>
              <!-- 按钮放在右侧 -->
              <div>
                <el-button class="a" @click="viewDetails(post.id)">查看详情</el-button>
                
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
        :total="total"
      >
      </el-pagination>
    </div>
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
      request: axios.create({
        baseURL: 'http://localhost:8081'
      }),
    };
  },
  created() {
    this.fetchLostPosts();
  },
  methods: {
    viewDetails(id) {
    this.$router.push({ name: 'SellWant', params: { id } });
  },
    contactSeller(contact) {
      alert(`卖家联系方式：${contact}`); // 弹出卖家的联系方式
    },
    getItem(id) {
      // 原有的getItem方法内容，根据需要保留或删除
    },

    
    fetchLostPosts() {
  this.loading = true;

  this.request.get('/sellgoods/search', {
    params: {
      name: this.name,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
      
    }
  })
  .then(response => {
    if (response.data && response.data.content) {
      console.log("Response data:", response.data);

      // 映射商品信息，初始化 images 数组为空
      this.posts = response.data.content.map(item => ({
        id: item.gsid,
    name: item.gsname,
    price: item.gsprice,
    contact: item.gsowner, // 假设contact对应gfowner
    detail: item.gsdetail,
        images: [] // 初始化 images 数组
      }));
      this.total = response.data.totalElements;
      console.log("1");
      // 调用 fetchAndProcessImages 来获取并处理图片
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
// 为每个商品请求图片数据
posts.forEach(post => {
  if (post.id) { // 确保商品ID存在
    // 使用 this.request.baseURL 动态构造完整的 URL
    const url = `http://localhost:8081/sellgoods/search-images/${post.id}`;
    fetch(url, { // 注意这里不需要在模板字符串中再次使用 ${post.id}
      headers: {
        // 根据后端需求添加必要的请求头，例如认证信息等
      }
    })
    .then(response => {
      if (response.ok) {
        return response.blob(); // 转换为blob
      }
      throw new Error('图片未找到或请求失败');
    })
    .then(blob => {
      if (blob) {
        const imageUrl = URL.createObjectURL(blob);
        // 向对应的 post 添加图片 URL
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

.forget{
  
  margin-top: 5px;

  color: #306D66;

  margin-bottom: 20px;
}

.forget a{

  color: #306D66;

  font-weight: 600;

}

.a{
  display: inline-block;
  color: white;
  background: rgba(74, 163, 133, 0.696);
  border: 1px solid transparent;
  padding: 12px 30px;
  margin: 10px 15px;
  line-height: 1.4;
  font-size: 14px;
  font-weight: 500;
  border-radius: 30px;
  text-transform: uppercase;
  transition: all .55s ease;
  /* margin-left: 28%; */
}
h1 {
  color: rgb(255, 255, 255);
  font-size: 30px;
  font-weight: 600;
  text-align: left; /* 居左对齐 */
  margin-left: 350px; /* 根据需要调整左边距 */
  margin-bottom: 20px;
  letter-spacing: 1px;
}
</style>