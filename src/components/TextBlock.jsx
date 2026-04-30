import { StoryblokRichText } from '@storyblok/react';

function TextBlock({ blok }) {
    return (
        <section className="text-block">
            <StoryblokRichText doc={blok.text} />
        </section>
    );
}

export default TextBlock;