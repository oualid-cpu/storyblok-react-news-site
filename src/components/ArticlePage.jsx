import {  StoryblokRichText } from '@storyblok/react';

function ArticlePage({ story }) {
    const content = story.content;

    return (
        <article className="article-container">
            {content.hero_image?.filename && (
                <img
                    className="article-hero-image"
                    src={content.hero_image.filename}
                    alt={content.hero_image.alt || content.title || ''}
                />
            )}

            <p className="article-meta">
                {content.publish_date} | By {content.author}
            </p>

            <h1>{content.title}</h1>

            {content.intro && (
                <p className="page-intro">
                    {content.intro}
                </p>
            )}

            {content.body && (
                <StoryblokRichText doc={content.body} />
            )}
        </article>
    );
}

export default ArticlePage;