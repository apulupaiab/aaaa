<template>
    <section>
      <div class="box">
        <!-- Squares for design purposes, can be styled as needed -->
        <!-- ... 保留其他 square 元素 ... -->
        <div class="square" style="--i:0;"></div>
        <div class="square" style="--i:1;"></div>
        <div class="square" style="--i:2;"></div>
        <div class="square" style="--i:3;"></div>
        <div class="square" style="--i:4;"></div>
        <div class="container">
          <div class="form">
            <h2>欢迎加入maimai</h2>
           <el-form 
           :model="ruleForm" 
           status-icon :rules="rules" 
           ref="ruleForm" >
      <div class="inputBox">
        <el-form-item label="用户名" prop="uname">
          <el-input  v-model="ruleForm.uname" required></el-input>
        </el-form-item>
      </div>
      <div class="inputBox">
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="Enter your password" required></el-input>
        </el-form-item>
      </div>
      <div class="inputBox">
        <el-form-item label="手机号" prop="phoneNumber">
          <el-input type="text" v-model="ruleForm.phoneNumber" placeholder="Enter your phone number" required></el-input>
        </el-form-item>
      </div>
      <!-- 添加提交按钮，注意这里不需要 <el-form-item> 包裹 -->
      <!-- <div class="inputBox">
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      </div> -->
      <div class="inputBox">
                  <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                </div>
    </el-form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from 'axios';
  
    export default {
      data() {
          // var validateName= (rule, value, callback) => {
          //     if (!value) {
          //       return callback(new Error("用户名不能为空"));
          //     }
          //     // 假设有一个检查 uname 的 API endpoint '/api/check-uname'
          //     axios.get(`/api/check-uname?uname=${value}`).then(response => {
          //       if (response.data.exists) {
          //         // 如果 uname 已存在
          //         callback(new Error("该用户名已被使用"));
          //       } else {
          //         // 如果 uname 可用
          //         callback();
          //       }
          //     }).catch(err => {
          //       console.error("校验用户名时发生错误：", err);
          //       callback(new Error("请稍后再试"));
          //     });
          //   };
            
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
      //表单数据和规则返回
        return {
          ruleForm: {
            uname: "",
            password: "",
            phoneNumber: "",
          },
          rules: {
          //     uname: [
          // { required: true, message: "用户名不能为空", trigger: "blur" },
          // {validator:validateName, trigger: 'blur'}
          // ],
            uname: [
              { required: true, message: "用户名不能为空！", trigger: "blur" },
            ],
            password: [{ required: true, validator: validatePass, trigger: "blur" }],
            phoneNumber: [
              { required: true,  message: '请输入手机号', trigger: "blur" },
              { validator: checkPhoneNumber, trigger: 'blur' }
            ],
          },
        };
      },
      methods: {
          //提交表单方法
      //   submitForm(formName) {
      //     this.$refs[formName].validate((valid) => {
      //       if (valid) {
      //         alert("submit!");
      //       } else {
      //         console.log("error submit!!");
      //         return false;
      //       }
      //     });
      //   },
      submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用axios发送POST请求
          
          axios.post('http://localhost:8081/user/register', {
    uname: this.ruleForm.uname,
    password: this.ruleForm.password,
    phoneNumber: this.ruleForm.phoneNumber
  })
          .then(response => {
            // 处理响应
            alert("submit!");
            console.log('提交成功', response);
            alert('注册成功！');
            this.$router.push('/homed');
          })
          .catch(error => {
            // 处理错误情况
            console.error('提交失败', error);
            alert('注册失败，请重试！');
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
        //重置表单方法
      //   resetForm(formName) {
      //     this.$refs[formName].resetFields();
      //   },
      //   goBack() {
      //     this.$router.go(-1);
      //   },
      },
    };
  </script>
  
  <style scoped>
  /* ... 将你提供的 CSS 样式粘贴到这里 ... */
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
  
  .form.inputBox{
  
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
      border-color: transparent; /* 去除边框颜色 */
  
      color: #666;
  
      max-width: 100px;
  
      cursor: pointer;
      margin-top: 20px;
      margin-bottom: 20px;
  
      font-weight: 600;
  
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