import { useState, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import InnerCarousel from './InnerCarousel'
import useWheelSwipe from '../hooks/useWheelSwipe'

import 'swiper/css'

const PROJECTS = [
    {
        name: '留言板',
        description: '全栈项目',
        techPoints: 'React + Vite + Node.js + Mongoose + Express',
        link: 'https://lyb.idsply.xyz/',
        images: null,
    },
    {
        name: '数独游戏',
        description: '数独游戏',
        techPoints: 'Webpack + React',
        link: 'https://shudu.idsply.xyz/',
        images: null,
    },
    {
        name: '即时聊天',
        description: '全栈项目-无数据库',
        techPoints: 'WebSocket',
        link: 'https://client.jishi.idsply.xyz/',
        images: null,
    },
    {
        name: 'Farm 农场',
        description: '一个以农场为主 牧场渔场做补充的在线休闲单机小游戏 ~',
        techPoints: 'react、phaser、supabase',
        link: '#',
        images: [
            { src: '/images/farm-spring.png', alt: 'Farm 春', caption: '春' },
            { src: '/images/farm-summer.png', alt: 'Farm 夏', caption: '夏' },
            { src: '/images/farm-autumn.png', alt: 'Farm 秋', caption: '秋' },
            { src: '/images/farm-winter.png', alt: 'Farm 农', caption: '冬' },
        ],
    },
    {
        name: 'QingDoc',
        description: '项目简介待补充',
        techPoints: '待补充',
        link: '#',
        images: [
            { src: '/images/qingdoc-md.png', alt: 'QingDoc Markdown', caption: 'markdown 预览、编辑' },
            { src: '/images/qingdoc-md-edit.png', alt: 'QingDoc 编辑', caption: 'markdown 预览、编辑' },
            { src: '/images/qingdoc-pdf.png', alt: 'QingDoc PDF', caption: 'pdf 仅预览、固定右上角缩放' },
            { src: '/images/qingdoc-xmind.png', alt: 'QingDoc 思维导图', caption: 'XMind 预览、双指缩放' },
        ],
    },
]

const PortfolioSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [captionMap, setCaptionMap] = useState({
        3: PROJECTS[3].images[0].caption,
        4: PROJECTS[4].images[0].caption,
    })

    const [swiperInstance, setSwiperInstance] = useState(null)
    useWheelSwipe(swiperInstance)

    const handleDotClick = useCallback((index) => {
        if (swiperInstance) {
            swiperInstance.slideTo(index)
        }
    }, [swiperInstance])

    const handleCaptionChange = useCallback((projectIndex, caption) => {
        setCaptionMap((prev) => ({ ...prev, [projectIndex]: caption }))
    }, [])

    return (
        <section id="second" className="main special">
            <header className="major">
                <h2>作品展示</h2>
            </header>
            <div className="portfolio-slider">
                <div className="slider-dots">
                    {PROJECTS.map((project, index) => (
                        <span
                            key={index}
                            className={`slider-dot${index === activeIndex ? ' active' : ''}`}
                            onClick={() => handleDotClick(index)}
                        >
                            {project.name}
                        </span>
                    ))}
                </div>
                <Swiper
                    modules={[]}
                    slidesPerView={1}
                    spaceBetween={0}
                    passiveListeners={false}
                    edgeSwipeDetection="prevent"
                    onSwiper={setSwiperInstance}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    className="portfolio-swiper"
                >
                    {PROJECTS.map((project, index) => (
                        <SwiperSlide key={index}>
                            <div className="portfolio-slide">
                                <div className="slide-content">
                                    <p>
                                        项目简介：{project.description}<br />
                                        技术点：{project.techPoints}<br />
                                        <a target="_blank" href={project.link}>点击跳转</a>
                                    </p>
                                    {project.images && captionMap[index] && (
                                        <p className="slide-desc">当前展示：{captionMap[index]}</p>
                                    )}
                                </div>
                                <div className="slide-image">
                                    {project.images ? (
                                        <InnerCarousel
                                            slides={project.images}
                                            onCaptionChange={(caption) => handleCaptionChange(index, caption)}
                                        />
                                    ) : (
                                        <div className="card-placeholder"></div>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default PortfolioSection
