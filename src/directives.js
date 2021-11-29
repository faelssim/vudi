/*
 * @Author: wangkun
 * @Date: 2021-11-29 13:25:24
 * @LastEditTime: 2021-11-29 14:41:43
 * @LastEditors: wangkun
 * @Description: 
 */
export default function (v) {
    v.directive('sticky-scroll', {
        bind(el, binding) {
            const I = binding.rawName.indexOf(':')
            const R = I > -1 ? parseFloat(binding.rawName.substring(I + 1) || 1) : 1
            const W = document.body.clientWidth * R
            console.log(W)
            el._init = {
                screenWidth: W
            }
            const init = el._init
            function touchstart (event) {
                let tag = event.target
                while (tag.tagName !== 'LI') {
                    tag = tag.parentNode
                }
                init.index = +tag.getAttribute('data-index')
                const { clientX } = event.targetTouches[0]
                init.left = parseFloat(el.style.left) || 0
                init.x = clientX
                init.d = undefined
            }
            function touchmove (event) {
                const { clientX } = event.targetTouches[0]
                init.d = clientX - init.x
                el.style.left = `${init.left + init.d}px`
            }
            function touchend () {
                if (init.d === undefined) {
                    return
                }
                if (Math.abs(init.d) < 50) {
                    el.style.left = `${-1 * init.index * init.screenWidth}px`
                } else {
                    let idx = init.index
                    if (init.d > 0) {
                        idx = idx=== 0 ? 0 : idx - 1
                    } else {
                        idx = idx === el.children.length - 1 ?  el.children.length - 1 : idx + 1
                    }
                    el.style.left = `${-1 * idx * init.screenWidth}px`
                    binding.value && binding.value(idx)
                }
            }
            el.addEventListener('touchstart', touchstart)
            el.addEventListener('touchmove', touchmove)
            el.addEventListener('touchend', touchend)
        }
    })
}
