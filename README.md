# vue-scale

这是一个基于 better-scroll 滑动刻度尺，他支持水平，垂直滑动。

`npm i vue-scale -s`

```
import VueScale from "vue-scale"
<vue-scale v-model="value"/>
```

### 演示

[这是显示 demo》》](http://www.baidu.com)

注意：使用出错请检查组件宽度/高度，版本号。

### API

| 参数         | 说明                                      | 类型              | 默认值                  | 版本 |
| ------------ | ----------------------------------------- | ----------------- | ----------------------- | ---- |
| v-model      | 初始化滑动位置（实时监听滑动 val）        | Number            | 0                       | -    |
| type         | 刻度尺类型 horizontal/verticality         | String            | horizontal              | -    |
| color        | 刻度尺 文字颜色                           | String            | #484848                 | -    |
| max          | 刻度尺最大刻度                            | Number            | 100                     | -    |
| min          | 刻度尺最小刻度                            | Number            | 0                       | -    |
| ratio        | 刻度尺刻度比例                            | Number            | 1                       | -    |
| interval     | 刻度尺刻度与刻度间隔                      | Number            | 8                       | -    |
| group        | 刻度尺刻度组                              | Number            | 10                      | -    |
| flipVertical | 刻度尺刻水平/垂直翻转（与刻度尺类型关联） | Boolean           | false                   | -    |
| mask         | 刻度尺刻遮罩 （与刻度尺类型关联）         | Boolean           | true                    | -    |
| scroll       | 当前滑动中回调                            | Function(value,e) | -                       | -    |
| scrollEnd    | 当前滑动停止                              | Function(value,e) | -                       | -    |
| setValue     | 动态设置滑动位置                          | Methods           | \$refs.xx.setValue(val) | -    |

> 说明：  
> 1、刻度尺组件 type="verticality"，请设置高度，默认 100%。  
> 2、如何你聪明就应该知道，你可以任意修改刻度尺组件的样式（任何 css 样式）。  
> 3、刻度尺的刻度是背景图片，你可以设置的自己背景图片结合 group 来修改成你想要的。