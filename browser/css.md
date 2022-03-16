## [BFC规范(块级格式化上下文：block formatting context)](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
BFC规定了内部的Block Box如何布局
- 内部的Box会在垂直方向上一个接一个放置
- Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠
- 每个元素的 margin box 的左边，与包含块 border box 的左边相接触
- BFC的区域不会与float box重叠
- BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
- 计算BFC的高度时，浮动元素也会参与计算

触发条件
- 根元素 html
- float 不为 none
- overflow 不为 visible
- display 值为 inline-block table-cell flex inline-flex 等
- position 值为 absolute fixed
