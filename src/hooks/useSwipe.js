import { useRef, useCallback } from 'react'

const useSwipe = ({ onSwipeLeft, onSwipeRight, onSwiping, threshold = 50 }) => {
    const startXRef = useRef(0)
    const currentXRef = useRef(0)
    const wheelTimerRef = useRef(null)

    // --- touch 事件（移动端 + 触屏） ---
    const onTouchStart = useCallback((e) => {
        startXRef.current = e.touches[0].clientX
        currentXRef.current = e.touches[0].clientX
    }, [])

    const onTouchMove = useCallback((e) => {
        currentXRef.current = e.touches[0].clientX
        const deltaX = currentXRef.current - startXRef.current
        onSwiping && onSwiping(deltaX)
    }, [onSwiping])

    const onTouchEnd = useCallback(() => {
        const deltaX = currentXRef.current - startXRef.current
        if (Math.abs(deltaX) < threshold) {
            onSwiping && onSwiping(0)
            return
        }
        if (deltaX < 0) {
            onSwipeLeft && onSwipeLeft()
        } else {
            onSwipeRight && onSwipeRight()
        }
        onSwiping && onSwiping(0)
    }, [onSwipeLeft, onSwipeRight, onSwiping, threshold])

    // --- wheel 事件（PC 触摸板左右滑动） ---
    // 一个手势只切换一张：首次检测到方向即触发，后续事件忽略直到手势结束
    const gestureLockedRef = useRef(false)

    const onWheel = useCallback((e) => {
        // 手势期间已触发过，忽略
        if (gestureLockedRef.current) return

        // 仅处理水平滚动（触摸板左右滑动）
        if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return

        e.preventDefault()

        // 手势结束检测：清除旧定时器，设定新的等待窗口
        if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current)
        wheelTimerRef.current = setTimeout(() => {
            gestureLockedRef.current = false
        }, 150)

        // 首次检测到足够方向即触发切换
        if (Math.abs(e.deltaX) >= threshold) {
            if (e.deltaX < 0) {
                onSwipeLeft && onSwipeLeft()
            } else {
                onSwipeRight && onSwipeRight()
            }
            gestureLockedRef.current = true
        }
    }, [onSwipeLeft, onSwipeRight, threshold])

    return { onTouchStart, onTouchMove, onTouchEnd, onWheel }
}

export default useSwipe
