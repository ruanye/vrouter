// Router 是一个类 
// new Router({
//   mode: 'history',
//   routes
// })
// 初始化路由状态
class History{
	constructor(){
		this.current = null;
	}
}
class Router{
   constructor(opts){
      this.mode = opts.mode;
	  this.routes = opts.routes;
	  //  把路由表变成 {'/':Home,'about':About}  routeMap['/'] 
	 // 转换之后我们就可以感觉路径名去渲染相关的组件
	  this.routeMap = this.creatRouteMap(this.routes)
	  console.log(this.routeMap);
	  // 存路由的状态 初始化路由的状态
	  this.history = new History 
	 // 初始化路由
	  this.init()
   }
  creatRouteMap(routes){
	//[{ path: '/',component: Home},{path: '/about',component:About}]
     return routes.reduce((memo,current)=>{
         memo[current.path]=current.component;
		return memo
	 },{})
  } 
  init(){
	  if(this.mode==='hash'){
		// 判断用户是否输入了路由 如果没有直接跳转到 '/'
		 location.hash?'':location.hash='/' 
		//  监听加载完成和路径改变事件 放路由的状态 把路径放在current里面
		  window.addEventListener('load',()=>{
			  this.history.current = location.hash.slice(1)
		  })
		  window.addEventListener('hashchange',()=>{
			  this.history.current = location.hash.slice(1)
		  })
	   }else{
		 location.pathname?'':location.pathname='/';
		 window.addEventListener('load',()=>{
			  this.history.current = location.pathname
		  })
		  window.addEventListener('popstate',()=>{
			  this.history.current = location.pathname
		  })
	  }
  }
}
Router.install= function(Vue){
 Vue.mixin({ //混入 混合 所有的组件都可以走这个方法
   beforeCreate() {
	//  this.$options.router 证明这个组件是根组件
      if(this.$options&&this.$options.router){
		  this._root = this;
		  this._router = this.$options.router;
		  // this.xxx = this._router  只要调用了这个方法就会把传入的对象进行深度劫持
		 Vue.util.defineReactive(this,'xxx',this._router.history)
       }else{
		  this._root= this.$parent._root
	  }
	  Object.defineProperty(this,'$router',{ //路由实例 
         get(){
		   return this._root._router
		 }
	  })
	  Object.defineProperty(this,'$route',{ //路由属性  current
		get(){
		   return this._root._router.history.current
		 }
	  })
    }
})
// 注册2个全局组件
Vue.component('router-link',{
	props:{
		to:String,
		tag:String
	},
	methods:{
       
	},
	// h 就是creatElement vue支持jsx语法的 
	render(h){
		 let mode = this._root._router.mode
        // return h('a',{},'导航')
		 return <a  href={mode=='hash'?`#${this.to}`:this.to}>{this.$slots.default}</a>
	 }
 })
 Vue.component('router-view',{
	 render(h){
		 let current = this._self._root._router.history.current;
		  console.log(current) 
		//   需要动态的current get set 
		 let routeMap = this._self._root._router.routeMap;
		  //  routeMap[current] 
		 return h(routeMap[current])
	 } 
 })
}
export default Router