<template>
    <header>
                <img src="~@/assets/MAIMAI图标.png" alt="Website Logo" class="logopng">
                <!-- <a href="#" class="logo">MAIMAI</a> -->
        
                <ul class="navlist">
                    <li><router-link to="/home">首页</router-link></li>
                    <li><router-link to="/findgoods/search">收</router-link></li>
                    <li><router-link to="/sellgoods/search">出</router-link></li>
                    <li><router-link to="/user/mygoods">我的物品</router-link></li>
                </ul>
                <div class="bx bx-menu" id="menu-icon"></div>
            </header>
    </template>
    
    <script>
    import VueRouter from 'vue-router';
    export default {
        name: 'AppNav',
        
        // Add any necessary logic or functionality here
    }
    </script>
    
    <style scoped>
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
            justify-content: space-between;
            padding: 33px 9%;
            background: transparent;
        }
        .logo{
            font-size: 50px;
            font-weight: 700;
            color: rgba(49, 109, 102, 1);
        }
        .logopng {
                  max-width: 100px;
                  /* 设置最大宽度 */
                  height: auto;
              }
        .navlist{
            display: flex;
        }
        .navlist a{
            color:rgba(49, 109, 102, 1);
            margin-left: 60px;
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
    </style>