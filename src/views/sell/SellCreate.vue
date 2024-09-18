<template>
    <section>
        <div class="box">

          <!-- Squares for design purposes, can be styled as needed -->
          <div class="container">
            <div class="form">
              <h2>发布出物贴</h2>
              <el-form
                  :ref="'ruleForm'"
                  :model="ruleForm"
                  status-icon
                  :rules="rules"
                  @submit.prevent="submitForm"
                >
              <div class="inputBox">
          <el-form-item label="名字" prop="name">
            <el-input  v-model="ruleForm.name" placeholder="Enter the product name" required></el-input>
          </el-form-item>
        </div>
                <div class="inputBox">
                  <el-form-item label="价格" prop="price">
                  <el-input type="number" v-model="ruleForm.price" placeholder="Enter the product price" required></el-input>
                  </el-form-item>
                </div>
                <div class="inputBox">
                  <el-form-item label="联系方式" prop="contact">
                  <el-input 
                  type="text" 
                  v-model="ruleForm.contact"
                  placeholder="QQ/VX/电话 xxxxxxxxxx" required></el-input>
                  </el-form-item>
                </div>
                <div class="inputBox">
                  <el-form-item label="介绍" prop="detail">
                  <el-input 
                  type="textarea" 
                  v-model="ruleForm.detail"
                  placeholder="Enter the product details" required></el-input>
                  </el-form-item>
                </div>
                <div class="inputBox">
        <el-form-item label="图片" prop="pic">
          <el-upload
        :action="uploadAction"
        :on-remove="handleImageRemove"
        :on-change="handleFileChange"
        :before-upload="beforeImageUpload"
        :file-list="imageFileList"
        ref="upload"
        name="file"
        :auto-upload="false"
        list-type="picture">
        <el-button size="small" type="primary">点击上传图片</el-button>
      </el-upload>
        </el-form-item>
      </div>
                <div class="inputBox">
                  <el-button type="primary" @click="submitForm">提交</el-button>
                </div>
                <p class="forget">想要返回首页？
<router-link to="/home">点击这里</router-link></p>

              </el-form>
            </div>
          </div>
        </div>
      </section>
    </template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';

export default {
  data() {
    return {
      ruleForm: {
        name: '',    // 产品名称
        price: '',   // 产品价格
        contact: '', // 联系方式
        detail: '',  // 产品详情
        pic: ''      // 用于存储图片上传的相关信息
      },
      rules: {
        name: [
          { required: true, message: 'Product name is required', trigger: 'blur' }
        ],
        price: [
          { required: true, message: 'Price is required', trigger: 'blur' },
          // { type: 'number', message: 'Price must be a number', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: 'Contact information is required', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: 'Product details are required', trigger: 'blur' }
        ],
      },
      imageFileList: [], // 用于存储图片上传列表
      imageId: null, // 用于存储图片上传成功后的ID或URL
      uploadAction: 'http://localhost:8081/sellgoods/upload-image',  // 图片上传的API端点
    };
  },

  methods: {
// 假设uploadImage方法现在返回一个Promise
uploadImage() {
  let file = this.imageFileList[0].raw;
  let formData = new FormData();
  formData.append("file", file);

  return fetch("http://localhost:8081/sellgoods/upload-image", {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(result => {
    console.log("Image upload success response:", result);
    // 假设后端返回图片的ID
    this.imageId = result.data;
    return result;
  })
  .catch(error => {
    console.error("Image upload failed:", error);
    throw error; // 抛出错误以便在await处捕获
  });
},

    handleFileChange(file, fileList) {
    this.imageFileList = fileList; // 更新图片列表
  },


    handleImageUploadSuccess(response, file, fileList) {
      console.log("Image upload success response:", response);
      if (response && response.imageId) {
        this.imageId = response.imageId;
        this.ruleForm.pic = file.response.url; // 假设后端返回图片的URL
        this.imageFileList = fileList; // 更新图片列表
        console.log("Image URL after upload:", this.ruleForm.pic);
        Message.success('Image uploaded successfully');
      } else {
        Message.error('Failed to upload image');
      }
    },


    beforeImageUpload(file) {
      const isImage = file.type.startsWith('image/');
      console.log(`Checking if file is an image: ${isImage}`);
      if (!isImage) {
        Message.error('Only image files are allowed');
      }
      return isImage;
    },


    handleImageRemove(file, fileList) {
      console.log(`File removed: ${file.name}`);
      this.imageFileList = fileList;
    },



    submitFormData() {
  let goodsFindData = {
    gsname: this.ruleForm.name,
    gsprice: parseFloat(this.ruleForm.price), // 确保 price 是数字类型
    gsowner: this.ruleForm.contact,
    gsdetail: this.ruleForm.detail,
    gspic: this.imageId
  };

  axios.post('http://localhost:8081/sellgoods/create', goodsFindData, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    console.log("Form submission successful:", response);
    Message.success('Form submitted successfully');
  })
  .catch(error => {
    console.error("Form submission failed:", error);
    // 尝试提取更具体的错误信息
    let errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;
    Message.error('Form submission failed: ' + errorMessage);
  });
},

async submitForm() {
  const isFormValid = await this.$refs['ruleForm'].validate();
  if (isFormValid) {
    try {
      console.log("Form is valid, proceeding with image upload.");
      // 等待图片上传完成
      await this.uploadImage();
      // 图片上传成功后，提交表单数据
      this.submitFormData();
    } catch (error) {
      console.error("Image upload failed:", error);
      Message.error('Failed to upload image');
    }
  } else {
    console.log("Form validation failed, submission cancelled.");
    Message.error('Form validation failed, submission cancelled.');
  }
},

  },
};
</script>
  
<style scoped>

*{

    margin: 0;

    padding: 0;

    box-sizing: border-box;

    font-family: 'Poppins',sans-serif;

}

body{

    overflow: hidden;


} 

section{

    display: flex;

    justify-content: center;

    align-items: center;

    min-height: 100vh;


}


.box{

    position: relative;

}

.box .square{

    position: absolute;

    backdrop-filter: blur(5px);

    box-shadow: 0 25px 45px rgb(0,0,0,0.1);

    border: 1px solid rgb(255,255,255,0.5);

    border-right: 1px solid rgb(255,255,255,0.2);

    border-bottom: 1px solid rgb(255,255,255,0.2);

    background:rgb(255,255,255,0.1);

    border-radius: 10px;

    animation: animate 10s linear infinite;

    animation-delay: calc(-1s*var(--i));

}

/*      */

@keyframes animate{

    0%,100%{

        transform: translateY(-40px);

    }

    50%{

        transform: translate(40px);

    }

}


.container{

    position: relative;

    width:500px;
    margin-top: 5%;

    max-height: 700px;

    background:rgb(255,255,255,0.1);

    border-radius: 10px;

    display: flex;

    justify-content: center;

    align-items: center;

    backdrop-filter: blur(5px);

    box-shadow: 0 25px 45px rgb(0,0,0,0.1);

    border: 1px solid rgb(255,255,255,0.5);

    border-right: 1px solid rgb(255,255,255,0.2);

    border-bottom: 1px solid rgb(255,255,255,0.2);

}

.form{

    position: relative;
    display: fixed;

    height: 100%;

    width: 100%;

    padding: 15px;

}

.form h2{

    position: relative;

    /* color: #fff; */

    font-size: 24px;

    font-weight: 600;

    letter-spacing: 1px;

    margin-bottom: 7px;

}



.form .inputBox{

    width: 80%;
    height: 40%;
    margin-top: 8px;
    margin-left: auto;
  margin-right: auto;

}


.form .inputBox.el-input{

    width: 100%;
    height: 50%;

    background: rgb(255,255,255,0.2);

    border: none;

    outline: none;

    padding: 10px 10px;

    border-radius: 35px;

    border: 1px solid rgb(255,255,255,0.5);

    border-right: 1px solid rgb(255,255,255,0.2);

    border-bottom: 1px solid rgb(255,255,255,0.2);

    font-size: 1px;

    letter-spacing: 1px;

    color: #fff;

    box-shadow: 0 5px 10px rgb(0,0,0,0.05);

}
.form .inputBox .el-input__inner {
  padding: 4px 4px; /* 调整输入框内部的内边距 */
  font-size: 4px; /* 调整字体大小 */
  height: 30px;
}

.el-button{

    background: #097cb2;

    color: #fff;

    width: 100px;
    height: 40px;

    cursor: pointer;
    margin-top: 20px;

    margin-bottom: 20px;

    font-weight: 800;
    /* size: medium; */
    border-color: transparent;

}

.forget{

    margin-top: 5px;

    color: #306D66;

}

.forget a{

    color: #306D66;

    font-weight: 600;

}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  max-width: 100%; /* 让图片的宽度最大为100% */
  max-height: 100%; /* 让图片的高度最大为100% */
  height: auto; /* 保持图片的宽高比 */
  width: auto; /* 根据高度自动调整宽度 */
  object-fit: cover; /* 如果图片过大，裁剪覆盖 */
}
.avatar-uploader {
  background-color: #fbfdff; /* 背景颜色 */
  border: 1px dashed #c0ccda; /* 边框颜色和样式 */
  border-radius: 6px; /* 边框圆角 */
  box-sizing: border-box; /* 确保边框和内边距包含在宽度和高度内 */
  width: 100px; /* 宽度 */
  height: 100px; /* 高度 */
  margin-top: 20px; /* 上边距 */
  cursor: pointer; /* 鼠标悬停时显示指针 */
  overflow: hidden; /* 防止图片超出容器 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-uploader:hover {
  border-color: #409eff; /* 鼠标悬停时边框颜色 */
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover; /* 确保图片覆盖整个上传区域，不变形 */
}
.nav-bar {
  position: fixed; /* 使导航栏在滚动时固定在顶部 */
  top: 0; /* 固定在页面顶部 */
  z-index: 1000; /* 确保它在页面其他内容的上方 */
  /* 其他样式保持不变 */
}


    </style>

