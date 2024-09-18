<template>
	<div class="container">
		 <header>
			<app-nav></app-nav> <!-- 插入导航栏 -->
		</header>
	
		<section class="hero">
			<div class="hero-text">
				<h1>Welcome To MAIMAI</h1>
				<p>-为大学生服务的二手物品信息交换平台-</p>
				<a href="http://localhost:8080/findgoods" class="ctaa"><i class="ri-play-fill"></i>我要收物</a>
				<a href="http://localhost:8080/sellgoods">我要出物</a>
				
			</div>
		</section>
	
		<div class="scroll-down">
			<a href="#"><i class="ri-arrow-down-s-fill"></i></a>
		</div>
	
	  </div>
	</template>
	
	
	<script>
	import AppNav from '@/components/AppNaved.vue';
	import ScrollReveal from 'scrollreveal';
	
	
	export default {
	  components: {
		AppNav
	  },
	  name: 'MaimaiHomePage',
	  data() {
		return {
		  // 如果需要，初始化数据属性
		};
	  },
	  methods: {
		navigateTo(page) {
		  // 这里可以根据实际需求添加导航逻辑，如跳转到不同的路由
		  console.log(`Navigating to ${page}`);
		},
		toggleMenu() {
		  const menu = document.querySelector('#menu-icon');
		  const navlist = document.querySelector('.navlist');
		  menu.classList.toggle('bx-x');
		  navlist.classList.toggle('open');
		},
		initScrollReveal() {
		  ScrollReveal({
			distance: '65px',
			duration: 2600,
			delay: 450,
			reset: true
		  });
	
		  ScrollReveal().reveal('.hero-text', { delay: 200, origin: 'top' });
		  ScrollReveal().reveal('.hero-img', { delay: 450, origin: 'top' });
		  ScrollReveal().reveal('.icons', { delay: 500, origin: 'left' });
		  ScrollReveal().reveal('.scroll-down', { delay: 500, origin: 'right' });
		}
	  },
	  mounted() {
	  // 在组件挂载后调用方法
	  this.toggleMenu(); // 绑定点击事件
	  this.initScrollReveal(); // 初始化滚动揭示效果
	
	  // 以下代码应该在 mounted 钩子函数的内部
	  let menu = document.querySelector('#menu-icon');
	  let navlist = document.querySelector('.navlist');
	
	  // 为 menu 元素添加点击事件监听器
	  menu.onclick = () => {
		menu.classList.toggle('bx-x');
		navlist.classList.toggle('open');
	  };
	},
	};
	</script>
	
	<style class="scoped" >
	*{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
		font-family: 'Poppins', sans-serif;
		list-style: none;
		text-decoration: none;
	}
	header{
		position: fixed;
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
		font-size: 30px;
		font-weight: 700;
		color: rgba(49, 109, 102, 1);
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
	
	.hero{
		height: 100%;
		width: 100%;
		min-height: 100vh;
		/* background: linear-gradient(245.59deg, #4d9559 0%, #38703d 28.53%, #133917 75.52%); */
		background-image: url('/src/assets/背景图.png');
		background-size: cover;
		position: relative;
		/* display: grid; */
		grid-template-columns: repeat(2, 1fr);
		align-items: center;
		gap: 2rem;
		 display: flex; 
	   align-items: center; 
	  justify-content: center;  
		
	}
	section{
		padding: 0 19%;
	}
	
	.hero-text h5{
		font-size: 14px;
		font-weight: 400;
		color: white;
		margin-bottom: 40px;
	}
	.hero-text h1{
		font-family: 'Permanent Marker', cursive;
		font-size: 90px;
		line-height: 1;
		color: white;
		margin: 0 0 45px;
		white-space: nowrap; /* 防止文本换行 */
		/* margin-left: -30%; */
	  
	
	}
	.hero-text h4{
		font-size: 18px;
		font-weight: 600;
		color: white;
		margin-bottom: 10px;
	}
	.hero-text p{
		color: white;
		font-size: 20px;
		line-height: 1.9;
		margin-bottom: 40px;
		 /* margin-left: -9%;  */
		
	}
	.hero-img img{
		width: 700px;
		height: auto;
	}
	.hero-text a{
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
	}
	.hero-text a:hover{
		background: transparent;
		border: 1px solid white;
		transform: translateX(8px);
		/* margin-left: 28%; */
	}
	.hero-text a.ctaa{
		background: transparent;
		border: 1px solid white;
		margin-left: 20px;
	}
	.hero-text a.ctaa i{
		vertical-align: middle;
		margin-right: 5px;
	}
	
	/* .icons{
		position: absolute;
		top: 50%;
		padding: 0 9%;
		transform: translateY(-50%);
	}
	.icons i{
		display: block;
		margin: 26px 0;
		font-size: 24px;
		color: white;
		transition: all .50s ease;
	}
	.icons i:hover{
		color: #4d9559;
		transform: translateY(-5px);
	} */
	.scroll-down{
		position: absolute;
		bottom: 6%;
		right: 9%;
	}
	.scroll-down i{
		display: block;
		padding: 12px;
		font-size: 25px;
		color: white;
		background: #4d9559;
		border-radius: 30px;
		transition: all .50s ease;
	}
	.scroll-down i:hover{
		transform: translateY(-5px);
	}
	
	@media (max-width: 1535px){
		header{
			padding: 15px 3%;
			transition: .2s;
		}
		.icons{
			padding: 0 3%;
			transition: .2s;
		}
		.scroll-down{
			right: 3%;
			transition: .2s;
		}
	}
	@media (max-width: 1460px){
		section{
			padding: 0 12%;
			transition: .2s;
		}
	}
	@media (max-width: 1340px){
		.hero-img img{
			width: 100%;
			height: auto;
		}
		.hero-text h1{
			font-size: 75px;
			margin: 0 0 30px;
		}
		.hero-text h5{
			margin-bottom: 25px;
		}
	}
	@media (max-width: 1195px){
		section{
			padding: 0 3%;
			transition: .2s;
		}
		.hero-text{
			padding-top: 115px;
		}
		.hero-img{
			text-align: center;
		}
		.hero-img img{
			width: 560px;
			height: auto;
		}
		.hero{
			height: 100%;
			gap: 1rem;
			grid-template-columns: 1fr;
		}
		.icons{
			display: none;
		}
		.scroll-down{
			display: none;
		}
	}
	
	@media (max-width: 990px){
		#menu-icon{
			display: block;
		}
		.navlist{
			position: absolute;
			top: 100%;
			right: -100%;
			width: 300px;
			height: 40vh;
			background: #4d9559;
			display: flex;
			align-items: center;
			flex-direction: column;
			padding: 50px 20px;
			transition: all .55s ease;
		}
		.navlist a{
			margin-left: 0;
			display: block;
			margin: 7px 0;
		}
		.navlist.open{
			right: 0;
		}
	}
	
	@media (max-width: 680px){
		.hero-img img{
			width: 100%;
			height: auto;
		}
	}
	</style>