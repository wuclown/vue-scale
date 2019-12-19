<!--
 * @Author: wyj
 * @Date: 2019-11-12 22:12:13
 * @LastEditors  : wyj
 * @LastEditTime : 2019-12-18 22:45:28
 * @Description: 
 -->
<template>
    <div style="height:400px">
        <vue-scale-swiper v-model="value"></vue-scale-swiper>
    </div>
</template>
<script>
import VueScaleSwiper from "./app/index.js"
export default {
    components: {
        VueScaleSwiper
    },
    data() {
        return {
            value: 0
        }
    },
    mounted() {}
}
</script>
