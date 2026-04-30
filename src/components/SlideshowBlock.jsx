import { useState } from 'react';

function SlideshowBlock({ blok }) {
    const slides = blok.slides || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!slides.length) {
        return null;
    }

    function showPrevious() {
        setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
    }

    function showNext() {
        setCurrentIndex((currentIndex + 1) % slides.length);
    }

    const currentSlide = slides[currentIndex];

    return (
        <section className="slideshow-block">
            {blok.title && <h2>{blok.title}</h2>}

            {currentSlide.image?.filename && (
                <figure className="slideshow-slide">
                    <img
                        src={currentSlide.image.filename}
                        alt={currentSlide.image.alt || currentSlide.caption || ''}
                    />

                    {currentSlide.caption && (
                        <figcaption>
                            {currentSlide.caption}
                        </figcaption>
                    )}
                </figure>
            )}

            <div className="slideshow-buttons">
                <button type="button" onClick={showPrevious}>
                    Previous
                </button>

                <button type="button" onClick={showNext}>
                    Next
                </button>
            </div>
        </section>
    );
}

export default SlideshowBlock;