import { useEffect, useRef } from 'react'

/**
 * 在 Swiper 容器上监听水平 wheel，实现一次手势切一张 + 快速连切。
 *
 * 采用「固定冷却」而非「跟随惯性锁定」：
 * 切换后固定冷却 releaseDelay 毫秒（期间忽略所有 wheel，含惯性尖峰），
 * 冷却结束后用 threshold 过滤惯性末期的小幅 delta，只响应明确的新手势。
 * 这样连续横滑的间隔只取决于 releaseDelay，不被触控板惯性时长拖慢。
 *
 * 仅处理水平主导的 wheel（垂直滚动放行），并 preventDefault 阻止浏览器前进/后退。
 *
 * @param {object|null} swiper - Swiper 实例（来自 onSwiper），为 null 时不生效
 * @param {object} options
 * @param {number} options.threshold - 触发切换的最小 |deltaX|，默认 15（同时用于过滤惯性小 delta）
 * @param {number} options.releaseDelay - 切换后固定冷却时长（ms），默认 200
 * @param {boolean} options.stopPropagation - 是否阻止 wheel 冒泡（嵌套内层用），默认 false
 */
const useWheelSwipe = (swiper, {
    threshold = 15,
    releaseDelay = 200,
    stopPropagation = false,
} = {}) => {
    const lockRef = useRef(false)
    const releaseTimerRef = useRef(null)

    useEffect(() => {
        if (!swiper || !swiper.el) return
        const el = swiper.el

        const handleWheel = (e) => {
            // 只处理水平主导的 wheel，垂直滚动原样放行
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return
            // 拦截默认行为，避免浏览器把它当成前进/后退导航
            e.preventDefault()
            if (stopPropagation) e.stopPropagation()

            // 切换后的固定冷却期：忽略所有 wheel（含惯性尖峰）
            if (lockRef.current) return

            // 用 threshold 过滤惯性末期的小幅 delta，避免冷却结束后误切
            if (Math.abs(e.deltaX) < threshold) return

            // 有效手势：切一张并进入固定冷却
            // deltaX > 0：向左滑（内容左移、露出右侧）→ 下一张
            // deltaX < 0：向右滑 → 上一张
            if (e.deltaX > 0) {
                swiper.slideNext()
            } else {
                swiper.slidePrev()
            }
            lockRef.current = true
            if (releaseTimerRef.current) clearTimeout(releaseTimerRef.current)
            releaseTimerRef.current = setTimeout(() => {
                lockRef.current = false
            }, releaseDelay)
        }

        el.addEventListener('wheel', handleWheel, { passive: false })
        return () => {
            el.removeEventListener('wheel', handleWheel)
            if (releaseTimerRef.current) clearTimeout(releaseTimerRef.current)
        }
    }, [swiper, threshold, releaseDelay, stopPropagation])
}

export default useWheelSwipe
