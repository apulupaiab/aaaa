<template>
    <section>
      <div class="box">
        <div class="square" style="--i:0;"></div>
        <div class="square" style="--i:1;"></div>
        <div class="square" style="--i:2;"></div>
        <div class="square" style="--i:3;"></div>
        <div class="square" style="--i:4;"></div>
        <div class="container">
          <div class="form">
            <h1>Management System</h1>
            <h2>Login Please</h2>
            <el-form
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
            >
              <div class="inputBox">
                <el-input type="text" v-model="ruleForm.username" placeholder="Enter your username" required></el-input>
              </div>
              <div class="inputBox">
                <el-input
                  type="password"
                  v-model="ruleForm.password"
                  placeholder="Enter your password" required></el-input>
              </div>
              <div class="inputBox">
                <el-button type="primary" @click="submitForm('ruleForm')">Login</el-button>
              </div>
              <p class="forget">Want to reset form? <a href="#" @click="resetForm('ruleForm')">Click here</a></p>
              <p class="forget">Don't have an account ? <router-link to="/register">Sign up</router-link></p>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value !== 'admin') {
          callback(new Error('Username must be admin'));
        } else {
          callback();
        }
      };
  
      const validatePassword = (rule, value, callback) => {
        if (value !== 'admin') {
          callback(new Error('Password must be admin'));
        } else {
          callback();
        }
      };
  
      return {
        ruleForm: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            { required: true, message: 'Please input your username', trigger: 'blur' },
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please input your password', trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' }
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('Login successful!');
            this.$router.push('/admin/master');
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  
  body {
    overflow: hidden;
  }
  
  section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  .box {
    position: relative;
  }
  
  .box .square {
    position: absolute;
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgb(0, 0, 0, 0.1);
    border: 1px solid rgb(255, 255, 255, 0.5);
    border-right: 1px solid rgb(255, 255, 255, 0.2);
    border-bottom: 1px solid rgb(255, 255, 255, 0.2);
    background: rgb(255, 255, 255, 0.1);
    border-radius: 10px;
    animation: animate 10s linear infinite;
    animation-delay: calc(-1s * var(--i));
  }
  
  @keyframes animate {
    0%, 100% {
      transform: translateY(-40px);
    }
    50% {
      transform: translate(40px);
    }
  }
  
  .box .square:nth-child(1) {
    top: -50px;
    right: -60px;
    width: 100px;
    height: 100px;
  }
  
  .box .square:nth-child(2) {
    top: 150px;
    left: -100px;
    width: 120px;
    height: 120px;
    z-index: 2;
  }
  
  .box .square:nth-child(3) {
    bottom: 50px;
    right: -60px;
    width: 80px;
    height: 80px;
    z-index: 2;
  }
  
  .box .square:nth-child(4) {
    bottom: -80px;
    left: 100px;
    width: 50px;
    height: 50px;
  }
  
  .box .square:nth-child(5) {
    top: -90px;
    left: 140px;
    width: 60px;
    height: 60px;
  }
  
  .container {
    position: relative;
    width: 400px;
    min-height: 400px;
    background: rgb(255, 255, 255, 0.1);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
    box-shadow: 0 25px 45px rgb(0, 0, 0, 0.1);
    border: 1px solid rgb(255, 255, 255, 0.5);
    border-right: 1px solid rgb(255, 255, 255, 0.2);
    border-bottom: 1px solid rgb(255, 255, 255, 0.2);
  }
  
  .form {
    position: relative;
    height: 100%;
    width: 100%;
    padding: 40px;
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
  
  .form h2::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 80px;
    height: 4px;
    background: #fff;
  }
  
  .form .inputBox {
    width: 100%;
    margin-top: 20px;
  }
  
  .form .inputBox.el-input {
    width: 100%;
    background: rgb(255, 255, 255, 0.2);
    border: none;
    outline: none;
    padding: 10px 20px;
    border-radius: 35px;
    border: 1px solid rgb(255, 255, 255, 0.5);
    border-right: 1px solid rgb(255, 255, 255, 0.2);
    border-bottom: 1px solid rgb(255, 255, 255, 0.2);
    font-size: 16px;
    letter-spacing: 1px;
    color: #fff;
    box-shadow: 0 5px 15px rgb(0, 0, 0, 0.05);
  }
  
  .form .inputBox.el-input::placeholder {
    color: #fff;
  }
  
  .el-button {
    background: #fff;
    color: #666;
    width: 100px;
    height: 40px;
    cursor: pointer;
    margin-bottom: 20px;
    font-weight: 800;
    border-color: transparent;
  }
  
  .forget {
    margin-top: 5px;
    color: #306D66;
  }
  
  .forget a {
    color: #306D66;
    font-weight: 600;
  }
  </style>
  