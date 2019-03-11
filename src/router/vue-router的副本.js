// Router 是一个类  
class Router{
   constructor(opts){
	  // opts 传递的参数
	  this.mode = opts.mode||'hash'
	  this.routes = opts.routes
   }
}
Router.install=function(Vue,opts){
  // 每个组件都有this.$router this.$route
  Vue.mixin({//混合 可以定义每个组件都有的属性
    beforeCreate() {
	  //  console.log(this.$options.name)
	  Object.defineProperty(this,'$router',{
		  get(){
			  return {}
		  }
	  })
	 Object.defineProperty(this,'$route',{
		 get(){
			  return {}
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