<!--子组件2-->
<template>

    <div>
        <a>{{modData}}</a>
        <br>
        <a>{{mod2Txt}}</a>
   
    </div>

</template>

<script>
    export default {
        // props:['modData'],
        props: {
            modData: {
                type: String,
                default: "2、父子组件通信默认值" //这样可以指定默认的值
            }
        },
        data(){
            return {
                mod2Txt:'2、这是子组件2的文字'
            }
        }
    }
</script>

<style>
</style>