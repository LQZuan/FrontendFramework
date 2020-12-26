<template>
    <div>
        <template>
            <v-tabs :value="3" background-color="primary">
                <v-tab @click="$router.push({name: 'Case'})">用例管理</v-tab>
                <v-tab @click="$router.push({name: 'Task'})">任务管理</v-tab>
                <v-tab @click="$router.push({name: 'Jenkins'})">Jenkins管理</v-tab>
                <v-tab @click="$router.push({name: 'Report'})">报告管理</v-tab>
            </v-tabs>
        </template>
        <div id="main" style="width: 500px;height: 500px"></div>
        Report
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
        methods: {

        },
        mounted(){
            // 引用echarts
            var echarts = require('echarts');
            // 基于准备好的dom，可以理解为画布，初始化echarts实例
            var myChart = echarts.init(document.getElementById('main'))

            var data = [];

            for (var i = 0; i <= 360; i++) {
                var t = i / 180 * Math.PI;
                var r = Math.sin(2 * t) * Math.cos(2 * t);
                data.push([r, i]);
            }

            myChart.setOption({
                title: {
                    text: '极坐标双数值轴'
                },
                legend: {
                    data: ['line']
                },
                polar: {
                    center: ['50%', '54%']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                angleAxis: {
                    type: 'value',
                    startAngle: 0
                },
                radiusAxis: {
                    min: 0
                },
                series: [{
                    coordinateSystem: 'polar',
                    name: 'line',
                    type: 'line',
                    showSymbol: false,
                    data: data
                }],
                animationDuration: 2000
            })
        }
    }
</script>

<style scoped>

</style>