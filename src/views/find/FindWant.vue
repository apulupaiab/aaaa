<template>
    <div class="container">
      <div class="header">
        <app-nav></app-nav> <!-- 插入导航栏 -->
      </div>
      
      <div class= "frame" v-if="goods">
        <el-card class="frosted-glass" style="margin-bottom: 20px; border-radius: 25px" shadow="hover">
            <h2>商品详情</h2>
          <div style="display: flex; align-items: center;">
            <div style="margin-right: 20px;">
              <img v-if="goods.imageUrls && goods.imageUrls.length > 0" :src="goods.imageUrls[0]" alt="商品图片" style="width: 300px; height: 300px;">
            </div>
            <div style="flex-grow: 1; margin-right: 20px;">
                
              <div><b>商品名：</b>{{ goods.gfname }}</div>
              <div><b>价格：</b>{{ goods.gfprice }}元</div>
              <div><b>商品简介：</b>{{ goods.gfdetail }}</div>
              <!-- <div><b>联系方式：</b>{{ goods.gfowner }}</div> -->
              <el-button class="a" @click="contactSeller(goods)">获得对方联系方式</el-button>
            </div>
          </div>
        </el-card>
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
    name: 'FindDetail',
    data() {
      return {
        goods: null,
        request: axios.create({
          baseURL: 'http://localhost:8081'
        }),
      };
    },
    created() {
      this.fetchGoodsDetail();
    },
    methods: {
    //     contactSeller(goods) {
    //     alert(`卖家联系方式：${ goods.gfowner }`); // 弹出卖家的联系方式
    //   },
    contactSeller(goods) {
    this.request.post(`/findgoods/increase-want/${goods.gfid}`)
      .then(response => {
        if (response.data ) {
          alert(`卖家联系方式：${ goods.gfowner }。当前想出人数：${response.data.data}`);
          this.goods.gfwant = response.data.data; // 更新本地数据
        } else {
          alert('更新想要人数失败');
        }
      })
      .catch(error => {
        console.error('更新想要人数失败:', error);
        alert('更新想要人数失败');
      });
  },
      fetchGoodsDetail() {
        const goodsId = this.$route.params.id;
        console.log('商品ID:', goodsId);
        this.request.get(`/findgoods/${goodsId}`)
          .then(response => {
            console.log('商品详情响应:', response);
            if (response.data && response.data.data) {
              this.goods = response.data.data;
              this.fetchAndProcessImages(this.goods);
            } else {
              console.error('获取商品详情失败: 返回数据格式不符合预期');
            }
          })
          .catch(error => {
            console.error('获取商品详情失败:', error);
          });
      },
      fetchAndProcessImages(goods) {
        if (goods.gfid) {
          const url = `http://localhost:8081/findgoods/search-images/${goods.gfid}`;
          fetch(url)
            .then(response => {
              if (response.ok) {
                console.log('图片请求成功:', response);
                return response.blob();
              }
              throw new Error('图片未找到或请求失败');
            })
            .then(blob => {
              console.log('图片数据:', blob);
              if (blob) {
                const imageUrl = URL.createObjectURL(blob);
                console.log('图片URL:', imageUrl);
                if (!goods.imageUrls) {
                  this.$set(goods, 'imageUrls', [imageUrl]); // 使用 Vue.set 设置响应式属性
                } else {
                  goods.imageUrls.push(imageUrl);
                }
              }
            })
            .catch(error => {
              console.error('获取图片数据失败:', error);
            });
        } else {
          console.error('商品ID (gfid) 为空');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh; /* 确保容器至少和视窗一样高 */
  padding-bottom: 50px;
}

.header {
  margin-bottom: 20px;
}

h2 {
  position: relative;
  color: rgba(49, 109, 102, 1);
  font-size: 36px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 40px;
  margin-top: 20px;
}

.frosted-glass {
  background: rgba(255, 255, 255, 0.618);
  backdrop-filter: blur(10px);
  padding: 20px;
  margin: 0 auto; /* 水平居中 */
  width: 60%; /* 设置宽度为页面的90%，或者根据需要调整 */
  box-sizing: border-box; /* 边框和内边距包含在宽度内 */
  flex-grow: 1; /* 使其占据剩余的空间 */
}

.frame {
  display: flex;
  flex-direction: column;
  align-items: center; /* 垂直居中内容 */
  justify-content: flex-start; /* 从顶部开始堆叠 */
  flex-grow: 1; /* 使其占据剩余的空间 */
  width: 100%; /* 占据整个容器的宽度 */
}

.a {
  display: inline-block;
  color: white;
  background: rgba(49, 109, 102, 1);
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
  margin-top: 100px;
}
  </style>
  