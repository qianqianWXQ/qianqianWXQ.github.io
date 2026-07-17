import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * 导航高亮 scroll spy（替代 jQuery scrollex mode: 'middle'）
 * 监听各 section 是否进入视口中央区域，自动更新当前高亮的 nav 链接
 * 支持 active-locked 机制：点击导航时短暂锁定，防止滚动过程中被抢
 */
const SECTION_IDS = ['#intro', '#second', '#first', '#cta', '#concat']

const useScrollSpy = () => {
    const [activeId, setActiveId] = useState('#intro')
    const lockedRef = useRef(null)
    const lockTimerRef = useRef(null)

    // 点击导航时调用：立即高亮 + 锁定 1200ms
    const lockActive = useCallback((id) => {
        setActiveId(id)
        lockedRef.current = id
        if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
        lockTimerRef.current = setTimeout(() => {
            lockedRef.current = null
        }, 1200)
    }, [])

    useEffect(() => {
        const observers = SECTION_IDS.map((id) => {
            const el = document.getElementById(id.replace('#', ''))
            if (!el) return null

            const observer = new IntersectionObserver(
                ([entry]) => {
                    // 如果有锁定的链接，不更新
                    if (lockedRef.current) return

                    if (entry.isIntersecting) {
                        setActiveId('#' + id.replace('#', ''))
                    }
                },
                {
                    // 模拟 scrollex mode: 'middle'，只在视口上部 30% 区域触发
                    rootMargin: '-20% 0px -70% 0px',
                    threshold: 0,
                }
            )
            observer.observe(el)
            return observer
        })

        return () => {
            observers.forEach((o) => o?.disconnect())
            if (lockTimerRef.current) clearTimeout(lockTimerRef.current)
        }
    }, [])

    return { activeId, lockActive }
}

export default useScrollSpy
