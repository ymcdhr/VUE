<template>
    <div>
        <h2 ref="count-down">
            <span class="day-node sn-tag sn-tag-d">{{dayStr}}</span>
            <span class="hour-node sn-tag sn-tag-d">{{hourStr}}</span>
            <span class="minute-node sn-tag sn-tag-d">{{minuteStr}}</span>
            <span class="second-node sn-tag sn-tag-d">{{secStr}}</span>
        </h2>
    </div>
</template>

<style>

</style>



<script>
import base from "../../module/base.js";

export default {
    props: {
        now: {
            default: new Date().getTime()
        },
        start: {
            default: new Date().getTime()
        },
        end: {
            default: new Date().getTime()
        },
        beforeStart: {
            default: () => { }
        },
        isStart: {
            default: () => { }
        },
        callback: {
            default: () => {
                console.log("倒计时结束～");
            }
        }
    },
    data() {
        return {
            dayStr: '',
            hourStr: '',
            minuteStr: '',
            secStr: ''
        }
    },
    mounted() {
        this.initCount();
        this.startCount();
    },
    methods: {
        // 开始执行倒计时
        startCount() {
            this.CountDown({
                // obj: $("#count-down"),
                startTime: this.start,
                endTime: this.end,
                nowTime: this.now,
                beforeStart: this.beforeStart,
                isStart: this.isStart,
                callback: this.callback
            });
        },

        // 初始化倒计时方法
        initCount() {
            var Vue = this;

            // Vue.CountDown = CountDown || {};
            Vue.CountDown = function(t) {
                function e(t) {
                    this.opts = t || {},
                    // this.obj = this.opts.obj,
                    this.nowTime = this.opts.nowTime,
                    this.startTime = this.opts.startTime,
                    this.endTime = this.opts.endTime,
                    this.dayNode = this.opts.dayNode || ".day-node",
                    this.hourNode = this.opts.hourNode || ".hour-node",
                    this.minuteNode = this.opts.minuteNode || ".minute-node",
                    this.secondNode = this.opts.secondNode || ".second-node",
                    this.beforeStart = this.opts.beforeStart ||
                    function() { },
                    this.isStart = this.opts.isStart ||
                    function() { },
                    this.callback = this.opts.callback ||
                    function() { },
                    this.speed = this.opts.speed || 1e3,
                    this.timeOffset = 0,
                    this.gap = [],
                    this.auto = null
                }
                e.prototype = {
                    init: function() {
                        var t = this;
                            t.timeOffset = t.nowTime - (new Date).getTime(),
                            t.timer(),
                            t.run()
                    },
                    timer: function() {
                        var t = this,
                            e = this.nowTime;

                        if (t.startTime && parseInt(t.startTime) > parseInt(e)) {
                            t.gap = t.parse(t.startTime - e), t.html(), this.beforeStart()
                        }
                        else {
                            t.endTime && parseInt(t.endTime) > parseInt(e) && (t.gap = t.parse(t.endTime - e), t.html(), this.isStart())
                        }

                        parseInt(t.endTime) < parseInt(this.nowTime) && (clearTimeout(t.auto), this.callback()),
                            this.nowTime = (new Date).getTime() + this.timeOffset
                    },
                    parse: function(t) {
                        var e = this,
                            i = t / e.speed;
                        return e.second = Math.round(i % 60),
                            e.minute = Math.floor(i / 60 % 60),
                            e.hour = Math.floor(i / 60 / 60 % 24),
                            e.day = Math.floor(i / 60 / 60 / 24),
                            e.second < 10 && (e.second = "0" + e.second),
                            e.minute < 10 && (e.minute = "0" + e.minute),
                            e.hour < 10 && (e.hour = "0" + e.hour),
                            e.day < 10 && (e.day = "0" + e.day),
                            [e.second, e.minute, e.hour, e.day]
                    },
                    html: function() {
                        var t = this;
                        // t.obj.find(this.dayNode).html(t.gap[3]),
                        // t.obj.find(this.hourNode).html(t.gap[2]),
                        // t.obj.find(this.minuteNode).html(t.gap[1]),
                        // t.obj.find(this.secondNode).html(t.gap[0])

                        Vue.dayStr = this.gap[3];
                        Vue.hourStr = this.gap[2];
                        Vue.minuteStr = this.gap[1];
                        Vue.secStr = this.gap[0];
                    },
                    run: function() {
                        var t = this;
                        t.auto = setInterval(function() {
                            t.timer()
                        },
                            500)
                    }
                },
                    new e(t).init()
            };
        }

    }
}
</script>