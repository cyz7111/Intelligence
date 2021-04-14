/**思考:
 * 是什么？
 * 是路由，单页应用，页面跳转，提升性能
 * 为什么？
 * 我想跳到其它的页面组件上面
 * 怎么做？
 * 就像数据库，一个数据库，需要一张表，里面存放着路由的配置信息，路径就是属性，页面组件就是属性值
 * 有初始值  以及历史记录 
 */

// 接收install方法中收到的Vue构造函数
let Vue;
//new ZRouter的时候会调用constructor方法
class ZRouter {
  constructor(options) {//options就是配置的路由信息
    /**
     * {Object}*options
     * 
    */

    //当前路由模式
    this.mode = options.mode || "hash"; 

    //routes*Array
    this.routes = (function() {
      let result={};
      options.routes.forEach(item => {
        //路劲-组件对应
        result[item.path]=item.component;
      });
      return result;
    })();

    //路由跳转
    this.history={
      current:null
    }

    //路由初始化
    this.init()

  }
  
  install(_Vue) {
    console.log(_Vue);
    
  }

  init(){
    if(this.mode==='hash'){
      //location
      
      
    }else{
      //history模式：go back forward pushState replaceState 来完成 URL 跳转而无须重新加载页面。

    }
  }

  push(){

  }

  replace(){

  }

  createMap(routes){
    //实现累加操作
    return routes.reduce((result,current)=>{
      console.log(result,current);
    },{})
  }

}

export default ZRouter;
