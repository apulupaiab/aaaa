<template>

    <section>
        <div class="box">
          <!-- Squares for design purposes, can be styled as needed -->
          <div class="square" style="--i:0;"></div>
          <div class="square" style="--i:1;"></div>
          <div class="square" style="--i:2;"></div>
          <div class="square" style="--i:3;"></div>
          <div class="square" style="--i:4;"></div>
          <div class="container">
            <div class="form">
              <h2>欢迎回来</h2>
              <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
              >
                <div class="inputBox">
                  <el-input type="text" v-model="ruleForm.phoneNumber" placeholder="Enter your phone number" required></el-input>
                </div>
                <div class="inputBox">
                  <el-input 
                  type="password" 
                  v-model="ruleForm.password"
                   placeholder="Enter your password" required></el-input>
                </div>
                <div class="inputBox">
                  <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="forget">还没有账户？<router-link to="/user/register">点击注册</router-link></p>
                <p class="forget">想要重置表单? <a href="#" @click="resetForm('ruleForm')">点击这里</a></p>
              </el-form>
            </div>
          </div>
        </div>
      </section>
    </template>
    
    <script>
    import AppNav from '@/components/AppNav.vue';
      import axios from 'axios';
      import qs from 'qs';
    export default {
      components: {
      AppNav
    },
      data() {
        //密码验证函数
        var validatePass = (rule, value, callback) => {
          if (value === "") {
            callback(new Error("请输入密码"));
          } else {
            if (this.ruleForm.checkPass !== "") {
              this.$refs.ruleForm.validateField("checkPass");
            }
            callback();
          }
        };
        //手机号验证函数
         const checkPhoneNumber = (rule, value, callback) => {
        const reg = /^1[345789]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号'));
        } else {
          callback();
        }
      };
        return {
          ruleForm: {
            phoneNumber: "",
            password: "",
          },
          rules: {
            phoneNumber: [
              { required: true,  message: '请输入手机号', trigger: "blur" },
              { validator: checkPhoneNumber, trigger: 'blur' }
            ],
            password: [
              { required: true, message: "密码不能为空！", trigger: "blur" },
            ],
          },
        };
      },
    
      
      methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.login(this.ruleForm); // 调用登录方法并传入表单数据
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

    async login(formData) {
    try {
      // 使用 qs.stringify 将对象转换为查询字符串
      const response = await axios.post('http://localhost:8081/user/login', qs.stringify({
        phoneNumber: this.ruleForm.phoneNumber,
        password: this.ruleForm.password
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // 告知服务器发送的是表单数据
        }
      });
    
      // 处理响应数据
      const { code, msg, data } = response.data;
      if (code === "0") {
        // 登录成功
        alert('登录成功！');
        // 在这里可以进一步处理登录成功的逻辑，比如：
        // - 存储用户信息到 localStorage 或 Vuex store
        // - 设置身份验证的 cookie 或 token
        // - 跳转到主页或用户仪表盘等
        this.$router.push('/homed');
      } else {
        // 登录失败
        alert('登录失败：' + msg);
      }
    } catch (error) {
      // 处理错误
      console.error('Login error: ', error);
      if (error.response) {
        // 请求已发出，但服务器响应了错误的状态码
        alert('登录请求出错，状态码：' + error.response.status + '，错误信息：' + error.response.data.msg);
      } else if (error.request) {
        // 请求已发出但没有收到响应
        alert('登录请求没有收到响应，请检查网络连接！');
      } else {
        // 发生了触发错误请求的问题
        alert('登录请求出错，请稍后重试！');
      }
    }
    },
    },
    };
    </script >
    
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
    
    .box .square:nth-child(1){
    
        top: -50px;
    
        right: -60px;
    
        width: 100px;
    
        height: 100px;
    
    }
    
    .box .square:nth-child(2){
    
        top: 150px;
    
        left: -100px;
    
        width: 120px;
    
        height: 120px;
    
        z-index: 2;
    
    }
    
    .box .square:nth-child(3){
    
        bottom: 50px;
    
        right: -60px;
    
        width: 80px;
    
        height: 80px;
    
        z-index: 2;
    
    }
    
    .box .square:nth-child(4){
    
        bottom: -80px;
    
        left: 100px;
    
        width: 50px;
    
        height: 50px;
    
    }
    
    .box .square:nth-child(5){
    
        top: -90px;
    
        left: 140px;
    
        width: 60px;
    
        height: 60px;
    
    }
    
    .container{
    
        position: relative;
    
        width:400px;
    
        min-height: 400px;
    
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
    
        height: 100%;
    
        width: 100%;
    
        padding: 40px;
    
    }
    
    .form h2{
    
        position: relative;
    
        color: #fff;
    
        font-size: 24px;
    
        font-weight: 600;
    
        letter-spacing: 1px;
    
        margin-bottom: 40px;
    
    }
    
    .form h2::before{
    
        content: '';
    
        position: absolute;
    
        left: 0;
    
        bottom: -10px;
    
        width: 80px;
    
        height: 4px;
    
        background: #fff;
    
    }
    
    .form .inputBox{
    
        width: 100%;
    
        margin-top: 20px;
    
    }
    
    .form .inputBox.el-input{
    
        width: 100%;
    
        background: rgb(255,255,255,0.2);
    
        border: none;
    
        outline: none;
    
        padding: 10px 20px;
    
        border-radius: 35px;
    
        border: 1px solid rgb(255,255,255,0.5);
    
        border-right: 1px solid rgb(255,255,255,0.2);
    
        border-bottom: 1px solid rgb(255,255,255,0.2);
    
        font-size: 16px;
    
        letter-spacing: 1px;
    
        color: #fff;
    
        box-shadow: 0 5px 15px rgb(0,0,0,0.05);
    
    }
    
    .form .inputBox.el-input::placeholder{
    
        color: #fff;
    
    }
    
    .el-button{
    
        background: #fff;
    
        color: #666;
    
        width: 100px;
        height: 40px;
    
        cursor: pointer;
    
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
    
    
    
        </style>
    