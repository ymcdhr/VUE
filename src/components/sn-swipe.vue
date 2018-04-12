<template>
	<swipe class="my-swipe" :speed="opts.speed" :auto="opts.auto" :continuous="opts.continuous" :showIndicators="opts.showIndicators" :noDragWhenSingle="opts.noDragWhenSingle" :prevent="opts.prevent">
		<swipe-item class="slide" v-for="(item,idx) in list" :key="idx">
			<a class="" href="#">
				<img class="swipe-img" :src="item.url">
			</a>
		</swipe-item>
	</swipe>
</template>

<style>
	.my-swipe {
		width: 15rem;
		height: 7.5rem;
		color: #fff;
		font-size: 30px;
		text-align: center;
	}
	
	.swipe-img {
		width: 15rem;
		height: 7.5rem;
	}
</style>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => {
					return [];
				}
			},
			opts: {
				type: Object,
				default: () => { //默认配置
					return {
						speed: 300,
						auto: 5000,
						continuous: true,
						showIndicators: true,
						noDragWhenSingle: true,
						prevent: false
					}
				}
			}
		},
		data() {
			return {
				tabIndex: 0
			}
		},
		mounted() {

		},
		components: {
			'swipe': require('./swipe/swipe.vue'),
			'swipe-item': require('./swipe/swipe-item.vue')
		},
		methods: {

		}
	}
</script>