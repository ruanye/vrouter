// Router 是一个类  
class History{
	constructor(){
		this.current= null;
  }
}
class Router{
   constructor(opts){
	  // opts 传递的参数
	  this.mode = opts.mode||'hash'
	  this.routes = opts.routes
	  console.log(this.routes)  
	  //  把路由表变成 {'/':Home,'about':About}
	  // creatRouteMap 路由表数组转换成对象的方法  
	//  [{ path: '/',component: Home},{path: '/about',component:About}]
	  this.routeMap = this.creatRouteMap(this.routes) 
	 // 每次访问都需要有一个路由状态 定义一个路由的初始状态
	//   this.history = {current:null}
	  this.history = new History;
	  //  初始化路由
	  this.init()
   }
  creatRouteMap(routes){
	  return routes.reduce((memo,current)=>{
           memo[current.path]= current.component
		   return memo
	   },{})
   }
   init(){
	   // 每一次监听事件把我们需要的值存到路由的状态中去
	   if(this.mode ==='hash'){
        // 监控地址是否有路径 如果没有默认跳转到'/'
		 location.hash?'':location.hash='/'
		// 监听加载完成事件 和hash值改变事件
		 window.addEventListener('load',()=>{
		    this.history.current = location.hash.slice(1)
		 })
		 window.addEventListener('hashchange',()=>{
			this.history.current = location.hash.slice(1)
		 })
	   }else{
		 location.pathname?'':location.pathname='/'
		//  监听加载完成事件 和地址改变事件
		 window.addEventListener('load',()=>{
			 this.history.current=location.pathname
		 })
		 window.addEventListener('popstate',()=>{
			 this.history.current=location.pathname
		 })
	   }
   }
}
Router.install=function(Vue,opts){
  // 每个组件都有this.$router this.$route
  Vue.mixin({//混合 可以定义每个组件都有的属性
    beforeCreate() {
		// 为了确保在每个组件中拿到的this.$router是同一个
		//首先判断是不是根组件 vue组件渲染顺序 父->子->孙子
		if(this.$options&&this.$options.router){
			this._root = this;
			this._router  = this.$options.router
		}else{
			// 可以通过this.$parent 拿到父组件 
			this._root = this.$parent._root
			// 这样我们就可以通过this._root._router 拿到同一个路由实例
		}
	  //  console.log(this.$options.name)
	  Object.defineProperty(this,'$router',{
		  get(){  //路由实例 方法
			  return this._root._router 
		  }
	  })
	 Object.defineProperty(this,'$route',{
		 get(){// 属性 current 
			  return this._root._router.history.current
		  }
	 })
	} 
  })
//  定义2个全局组件 router-link 和router-view 
  Vue.component('router-link',{
	 render(){
		 return <div>router-link</div>
	 }
  })
  Vue.component('router-view',{
	  render(){
		  return <div>router-view</div>
	 }
  })
}

export default Router

