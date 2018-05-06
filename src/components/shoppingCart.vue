<style>
.product-list{
    margin: 20px 0;
}

.product-list ul li{
    height: 50px;
    line-height: 50px;
    background-color: #f2f2f2;
    border-bottom: 1px dotted #ffffff;
    padding: 0 20px;
}

</style>

<template>
    <div class="product-list">
        <div>商品列表：</div>
        <div class="show-list">
            <ul>
                <li v-for="(item,index) in productList" :key="index" @click="addProductToCart(item)">{{item.title}}</li>
            </ul>
        </div>
        <div>购物车：</div>
        <div class="added-list">
            <ul>
                <li v-for="(item,index) in addedList" :key="index" @click="deleteProduct(item)">{{item.title}}</li>
            </ul>
        </div>
    </div>

</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    data(){
        return {

        };
    },
    components: {

    },
    computed: {
        ...mapState([
            'productList',
            'addedList'
        ])
    },
    mounted: function(){
        this.$store.dispatch('getAllProducts');
    },
    methods: {
        ...mapActions([
            'addProductToCart',
            'deleteProduct'
        ])
    }
}
</script>
