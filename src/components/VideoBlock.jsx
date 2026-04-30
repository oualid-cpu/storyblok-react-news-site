function VideoBlock({ blok }) {
    if (!blok.video_url) {
        return null;
    }

    return (
        <section className="video-block">
            <div className="video-wrapper">
                <iframe
                    src={blok.video_url}
                    title={blok.description || 'Video'}
                    allowFullScreen
                />
            </div>

            {blok.description && (
                <p className="video-description">
                    {blok.description}
                </p>
            )}
        </section>
    );
}

export default VideoBlock;