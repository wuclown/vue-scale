import BScroll from "@better-scroll/core"
import "./styles.less"
export default {
    name: "vue-scale-swiper",
    props: {
        // horizontal/verticality
        type: {
            type: String,
            default: "horizontal"
        },
        // 当前刻度value
        value: {
            type: Number,
            default: 0
        },
        // 最大数
        max: {
            type: Number,
            default: 100
        },
        // 最小数
        min: {
            type: Number,
            default: 0
        },
        // 刻度比例(1:1)
        ratio: {
            type: Number,
            default: 1
        },
        // 刻度与刻度之间的距离
        interval: {
            type: Number,
            default: 8
        },
        // 刻度组合，多少刻度为一组
        group: {
            type: Number,
            default: 10
        },
        // 垂直翻转
        flipVertical: Boolean,
        // 遮罩
        mask: {
            type: Boolean,
            default: false
        },
        // 刻度数格式
        format: {
            type: Function,
            default: e => e
        }
    },
    data() {
        return {
            list: [],
            scaleSize: 0,
            preventDefault: false,
            direction: true
        }
    },
    created() {
        this.direction = this.type === "horizontal"
        this.scaleList()
    },
    mounted() {
        const width = this.$refs.scale.clientWidth
        const height = this.$refs.scale.clientHeight
        this.scaleSize = this.direction ? width : height
        this.$nextTick(() => {
            const x = this.calcScrollX(this.value)
            const scrollX = this.direction ? true : false
            const scrollY = this.direction ? false : true
            const startX = this.direction ? x : 0
            const startY = this.direction ? 0 : x
            const preventDefault = this.direction ? false : true
            this.bs = new BScroll(this.$refs.scroll, {
                scrollX,
                scrollY,
                startX,
                startY,
                preventDefault,
                probeType: 3
            })
            this.bs.on("scroll", e => this.scroll(e))
            this.bs.on("scrollEnd", e => this.scrollEnd(e))
            this.bs.on("scrollStart", e => (this.preventDefault = true))
            this.bs.on("touchEnd", e => (this.preventDefault = false))
        })
        document.addEventListener(
            "touchmove",
            event => {
                this.preventDefault ? event.preventDefault() : null
            },
            { passive: false }
        )
    },
    methods: {
        scroll(e) {
            const value = this.calcValue(e)
            this.$emit("input", value)
            this.$emit("scroll", { value, e })
        },
        scrollEnd(e) {
            const position = e.x / this.interval
            const value = this.calcValue(e)
            const x = this.direction ? this.calcScrollX(value) : 0
            const y = this.direction ? 0 : this.calcScrollX(value)
            this.bs.scrollTo(x, y, 300)
            if (Number.isInteger(position))
                this.$emit("scrollEnd", { value, e })
        },
        calcScrollX(val) {
            const value = val - this.min
            const x = (value * this.interval) / this.ratio
            return -x
        },
        calcValue({ x, y }) {
            const xy = this.direction ? x : y
            const round = Math.round(xy / this.interval)
            const value = Math.abs(round * this.ratio) + this.min
            const num = Number(this.limbNumber(value))
            return num
        },
        limbNumber(num) {
            return Number.isInteger(num) ? parseInt(num) : num.toFixed(1)
        },
        scaleList() {
            const liWidth = this.interval * this.group
            const widthGroup = this.group * this.interval
            const max = this.max / this.ratio / this.group
            const min = this.min / this.ratio / this.group
            const bsx = liWidth - this.interval + 1
            const bsy = (liWidth - this.interval + 1) / 2
            const x = this.direction ? bsx : bsy
            const y = this.direction ? bsy : bsx
            let list = []
            for (let i = min; i <= max; i++) {
                const value = i * this.ratio * this.group
                const ifs = i === min
                const width = ifs ? `${this.interval}px` : `${widthGroup}px`
                const height = ifs ? `${this.interval}px` : `${widthGroup}px`
                const leftX = ifs ? -liWidth / 2 : liWidth / 2 - this.interval
                const flipVertical = this.direction ? "rotateX" : "rotateY"
                const item = (
                    <li
                        key={i}
                        class={["limb", ifs ? "first-li" : null]}
                        style={{
                            width: this.direction ? width : "inherit",
                            height: this.direction ? "inherit" : height,
                            "background-size": `${x}px ${y}px`
                        }}
                    >
                        <i
                            class={[
                                "limb-number",
                                this.flipVertical ? flipVertical : null
                            ]}
                            style={{
                                width: `${this.direction ? liWidth : null}px`,
                                height: `${this.direction ? null : liWidth}px`,
                                left: `${this.direction ? leftX : null}px`,
                                top: `${
                                    this.direction
                                        ? null
                                        : liWidth / 2 - this.interval
                                }px`
                            }}
                        >
                            {this.format(this.limbNumber(value))}
                        </i>
                    </li>
                )
                list.push(item)
            }
            this.list = list
        }
    },
    render() {
        const lineX = this.scaleSize / 2
        const placeholder = lineX > 0 ? lineX : 0
        const value = (this.max - this.min) / this.ratio
        const width = value * this.interval + placeholder * 2
        const height = value * this.interval + placeholder * 2
        const flipVertical = this.direction
            ? "rotateX(180deg)"
            : "rotateY(180deg)"
        const placeholderLi = (
            <li
                class="placeholder"
                style={{
                    width: this.direction
                        ? `${parseInt(placeholder)}px`
                        : "inherit",
                    height: this.direction
                        ? "inherit"
                        : `${parseInt(placeholder)}px`
                }}
            ></li>
        )
        return (
            <div
                class={[
                    "clown-scale",
                    this.type,
                    this.mask ? "clown-scale-mask" : null
                ]}
                ref="scale"
                style={{
                    transform: this.flipVertical ? flipVertical : null
                }}
            >
                {this.value}
                {this.$slots.standard ? (
                    this.$slots.standard
                ) : (
                    <div class="standard">
                        <span
                            class="standard-line"
                            style={{
                                transform: this.direction
                                    ? `translateX(${lineX}px)`
                                    : `translateY(${lineX}px)`
                            }}
                        ></span>
                    </div>
                )}
                <div ref="scroll" class="clown-scale-swiper">
                    <ul
                        class="swiper"
                        style={{
                            width: this.direction ? `${width}px` : "inherit",
                            height: this.direction ? "inherit" : `${height}px`
                        }}
                    >
                        {placeholderLi}
                        {this.list}
                        {placeholderLi}
                    </ul>
                </div>
            </div>
        )
    }
}
