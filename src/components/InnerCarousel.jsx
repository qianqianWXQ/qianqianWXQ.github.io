import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import useWheelSwipe from '../hooks/useWheelSwipe'

import 'swiper/css'
import 'swiper/css/pagination'

const InnerCarousel = ({ slides, onCaptionChange }) => {
    const [swiper, setSwiper] = useState(null)
    useWheelSwipe(swiper, { stopPropagation: true })

    return (
        <Swiper
            modules={[Pagination]}
            nested={true}
            loop={true}
            passiveListeners={false}
            edgeSwipeDetection="prevent"
            onSwiper={setSwiper}
            pagination={{ clickable: true }}
            onSlideChange={(swiper) => {
                const realIndex = swiper.realIndex
                if (slides[realIndex] && onCaptionChange) {
                    onCaptionChange(slides[realIndex].caption)
                }
            }}
            className="inner-swiper"
        >
            {slides.map((slide, index) => (
                <SwiperSlide key={index}>
                    <img src={slide.src} alt={slide.alt} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default InnerCarousel
