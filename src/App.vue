<template>
  <div id="app">
    
    <left-nav></left-nav>
    <pos></pos>
    <router-view/>
  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav'
import pos from '@/components/page/pos'
export default {
  name: 'App',
  components:{
    leftNav,
    pos
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.main{
  float:left;
  width:95%; 
  background-color: #EFF2F7;
  height:100%;
  overflow: auto;
 
}
</style>
