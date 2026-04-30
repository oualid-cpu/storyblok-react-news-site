function ImageBlock({ blok }) {
    if (!blok.image || !blok.image.filename) {
        return null;
    }

    return (
        <figure className="image-block">
            <img
                src={blok.image.filename}
                alt={blok.image.alt || blok.caption || ''}
            />

            {blok.caption && (
                <figcaption>
                    {blok.caption}
                </figcaption>
            )}
        </figure>
    );
}

export default ImageBlock;