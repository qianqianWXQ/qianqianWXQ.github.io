import { useState, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import useWheelSwipe from '../hooks/useWheelSwipe'

import 'swiper/css'

const PROJECTS = [
    {
        name: '人才管理平台',
        tech: 'React',
        audience: '政府+教育机构',
        business: '政府、机构考试全流程',
        duties: [
            '独立负责微前端项目的接入和改造',
            '独立负责微前端项目的接入和改造',
            '负责项目日常维护及后台cms系统',
        ],
    },
    {
        name: '考试管理系统',
        tech: 'Electron、React',
        audience: '政府+教育机构',
        business: '离线考试',
        duties: [
            '独立负责项目基建工作',
            '独立负责本地 indexdb 存储',
        ],
    },
    {
        name: '教之舟',
        tech: 'Vue、Uni-app、Echarts',
        audience: '学校、教师、学生',
        business: '数据可视化',
        duties: [
            '独立负责前端项目可视化改造',
            '接入 uni-app，实现可视化图表跨端展示',
        ],
    },
]

const ProjectsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const [swiperInstance, setSwiperInstance] = useState(null)
    useWheelSwipe(swiperInstance)

    const handleDotClick = useCallback((index) => {
        if (swiperInstance) {
            swiperInstance.slideTo(index)
        }
    }, [swiperInstance])

    return (
        <section id="first" className="main">
            <header className="major">
                <h2 className="center">项目介绍</h2>
            </header>
            <div className="projects-slider">
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
                    slidesPerView={2}
                    slidesPerGroup={1}
                    spaceBetween={24}
                    passiveListeners={false}
                    edgeSwipeDetection="prevent"
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        481: { slidesPerView: 2 },
                    }}
                    onSwiper={setSwiperInstance}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    className="projects-swiper"
                >
                    {PROJECTS.map((project, index) => (
                        <SwiperSlide key={index}>
                            <div className="project-card">
                                <h3>{project.name}</h3>
                                <p>技术要点：{project.tech}</p>
                                <p>服务对象：{project.audience}</p>
                                <p>业务内容：{project.business}</p>
                                <div className="project-duties">
                                    <span className="duties-label">项目职责：</span>
                                    <ol>
                                        {project.duties.map((duty, i) => (
                                            <li key={i}>{duty}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <footer className="major">
                <ul className="actions special">
                    <span>详见简历</span>
                </ul>
            </footer>
        </section>
    )
}

export default ProjectsSection
