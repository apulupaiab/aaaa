// 此文件专门负责项目的路由

import VueRouter from "vue-router"

// 引入组件
import Login from '../views/user/Login'
import Register from '../views/user/Register'
import Home from '../views/home/Home'
import FindCreate from '../views/find/FindCreate'
import FindSearch from '../views/find/FindSearch'
import SellCreate from '../views/sell/SellCreate'
import SellSearch from '../views/sell/SellSearch'
import AdminLogin from '../views/master/AdminLogin'
import AdminMasterFind from '../views/master/AdminMasterFind'
import AdminMasterSell from '../views/master/AdminMasterSell'
import MyFindGoods from '../views/user/MyFindGoods'
import MySellGoods from '../views/user/MySellGoods'
import HomeLogined from '../views/home/HomeLogined'
import FindWant from '../views/find/FindWant'
import SellWant from '../views/sell/SellWant'
// 创建并暴露一个路由器
export default new VueRouter({
    mode: 'history',    // 路由模式，该模式不会在地址中显示井号#
    routes: [
        {
            path: '/',          // 路径
            redirect: '/home'  // 重定向
        },
        {
            path: '/home',     // 路径
            component: Home    // 跳转到的组件
        },
        {
                path: '/homed',     // 路径
                component: HomeLogined    // 跳转到的组件
        },


        {
            path: '/user/login',     // 路径
            component: Login    // 跳转到的组件
        },
        {
            path: '/user/register',     // 路径
            component: Register    // 跳转到的组件
        },
        {
                path: '/user/mygoods',          // 路径
                redirect: '/user/mygoods/find'  // 重定向
            },
    {
        path: '/user/mygoods/find',     // 路径
        component: MyFindGoods    // 跳转到的组件
    },    
        {
            path: '/user/mygoods/sell',     // 路径
            component: MySellGoods    // 跳转到的组件
        },   


        {
            path: '/findgoods/create',     // 路径
            component: FindCreate    // 跳转到的组件
        },
        {
            path: '/findgoods/search',     // 路径
            component: FindSearch    // 跳转到的组件
        },
    {
        path: '/findgoods/:id',
        name: 'FindWant',
        component: FindWant, // 新的详情页路由
      },
        {
            path: '/findgoods',     // 路径
            redirect: '/findgoods/search'   // 重定向
        },


        {
            path: '/sellgoods/create',     // 路径
            component: SellCreate    // 跳转到的组件
        },
        {
            path: '/sellgoods/search',     // 路径
            component: SellSearch    // 跳转到的组件
        },
        {
            path: '/sellgoods/:id',
            name: 'SellWant',
            component: SellWant, // 新的详情页路由
          },
        {
            path: '/sellgoods',     // 路径
            redirect: '/sellgoods/search'   // 重定向
        },
        
        
        {
            path: '/admin',     // 路径
            component: AdminLogin    // 跳转到的组件
        },
        {
                path: '/admin/master',     // 路径
                redirect: '/admin/master/find'   // 重定向
            },
            {
                path: '/admin/master/find',     // 路径
                component: AdminMasterFind    // 跳转到的组件
            },
                {
                    path: '/admin/master/sell',     // 路径
                    component: AdminMasterSell    // 跳转到的组件
                }, 
                             
    ]
})