import { useState, useCallback } from 'react'
import useSwipe from '../hooks/useSwipe'

const InnerCarousel = ({ slides, onCaptionChange }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const goTo = useCallback((index) => {
        setActiveIndex(index)
        if (slides[index] && onCaptionChange) {
            onCaptionChange(slides[index].caption)
        }
    }, [slides, onCaptionChange])

    const prevSlide = useCallback(() => {
        goTo(activeIndex > 0 ? activeIndex - 1 : slides.length - 1)
    }, [activeIndex, slides.length, goTo])

    const nextSlide = useCallback(() => {
        goTo(activeIndex < slides.length - 1 ? activeIndex + 1 : 0)
    }, [activeIndex, slides.length, goTo])

    const { onTouchStart, onTouchMove, onTouchEnd, onWheel } = useSwipe({
        onSwipeLeft: nextSlide,
        onSwipeRight: prevSlide,
        threshold: 40,
    })

    return (
        <div
            className="inner-carousel"
            style={{ height: '100%' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onWheel={onWheel}
        >
            <div className="inner-slides">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`inner-slide${index === activeIndex ? ' active' : ''}`}
                        data-caption={slide.caption}
                    >
                        <img src={slide.src} alt={slide.alt} />
                    </div>
                ))}
            </div>
            <div className="inner-dots">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`inner-dot${index === activeIndex ? ' active' : ''}`}
                        onClick={() => goTo(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default InnerCarousel
