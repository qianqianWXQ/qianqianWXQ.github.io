import { useEffect } from 'react'

/**
 * 导航吸顶效果（替代 jQuery scrollex mode: 'top'）
 * 滚动时检测 #main 顶部是否越过视口顶部：
 *   - 越过 → nav 吸顶（加 alt class）
 *   - 回到视口内 → nav 恢复文档流（去 alt class）
 */
const useNavShrink = () => {
    useEffect(() => {
        const mainEl = document.getElementById('main')
        const navEl = document.getElementById('nav')
        if (!mainEl || !navEl) return

        const onScroll = () => {
            const mainTop = mainEl.getBoundingClientRect().top
            if (mainTop <= 0) {
                navEl.classList.add('alt')
            } else {
                navEl.classList.remove('alt')
            }
        }

        window.addEventListener('scroll', onScroll)
        // 初始化时也检查一次
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])
}

export default useNavShrink
