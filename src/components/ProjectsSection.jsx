import { useState, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import useWheelSwipe from '../hooks/useWheelSwipe'

import 'swiper/css'

/**
 * 项目数据。
 * 每个项目用 fields 键值对（{ label, value }）承载信息：标签写进数据、而不是写死在 JSX 里，
 * 这样增删字段只需改数据，不用动渲染逻辑。
 * value 为字符串 → 渲染成单行文本；为数组 → 渲染成有序列表（如「项目职责」的多条）。
 */
const PROJECTS = [
    {
        name: '人才管理平台',
        fields: [
            { label: '技术要点', value: 'React' },
            { label: '服务对象', value: '政府+教育机构' },
            { label: '业务内容', value: '政府、机构考试全流程' },
            {
                label: '项目职责',
                value: [
                    '独立负责微前端项目的接入和改造',
                    '独立负责微前端项目的接入和改造',
                    '负责项目日常维护及后台cms系统',
                ],
            },
        ],
    },
    {
        name: '考试管理系统',
        fields: [
            { label: '技术要点', value: 'Electron、React' },
            { label: '服务对象', value: '政府+教育机构' },
            { label: '业务内容', value: '离线考试' },
            {
                label: '项目职责',
                value: [
                    '独立负责项目基建工作',
                    '独立负责本地 indexdb 存储',
                ],
            },
        ],
    },
    {
        name: '教之舟',
        fields: [
            { label: '技术要点', value: 'Vue、Uni-app、Echarts' },
            { label: '服务对象', value: '学校、教师、学生' },
            { label: '业务内容', value: '数据可视化' },
            {
                label: '项目职责',
                value: [
                    '独立负责前端项目可视化改造',
                    '接入 uni-app，实现可视化图表跨端展示',
                ],
            },
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
                                {project.fields
                                    // 跳过空值字段（null / 空串 / 空数组），避免留下无内容的「标签：」
                                    .filter((field) => {
                                        const v = field.value
                                        return v != null && v !== '' && !(Array.isArray(v) && v.length === 0)
                                    })
                                    .map((field, i) => (
                                        <div className="project-field" key={i}>
                                            <span className="field-label">{field.label}：</span>
                                            {/* value 是数组 → 渲染成列表；是字符串 → 渲染成文本 */}
                                            {Array.isArray(field.value) ? (
                                                <ol>
                                                    {field.value.map((v, j) => (
                                                        <li key={j}>{v}</li>
                                                    ))}
                                                </ol>
                                            ) : (
                                                <span className="field-value">{field.value}</span>
                                            )}
                                        </div>
                                    ))}
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
