import { useEffect, useState } from 'react';
import { getStoryblokApi, StoryblokComponent } from '@storyblok/react';

import Navigation from './components/Navigation.jsx';
import ArticlePage from './components/ArticlePage.jsx';

function App() {
    const [story, setStory] = useState(null);
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function loadStory() {
            try {
                const storyblokApi = getStoryblokApi();

                const path = window.location.pathname;
                const slug = path === '/' ? 'home' : path.replace('/', '');

                const response = await storyblokApi.get(`cdn/stories/${slug}`, {
                    version: 'draft',
                });

                setStory(response.data.story);

                if (slug === 'politics' || slug === 'technology' || slug === 'sports') {
                    const articlesResponse = await storyblokApi.get('cdn/stories', {
                        version: 'draft',
                        starts_with: '',
                        content_type: 'article',
                        filter_query: {
                            category: {
                                in: slug,
                            },
                        },
                    });

                    setArticles(articlesResponse.data.stories);
                }
            } catch (err) {
                console.error(err);
                setError('Could not load story from Storyblok.');
            }
        }

        loadStory();
    }, []);

    useEffect(() => {
        if (!story) {
            return;
        }

        const content = story.content;

        document.title = content.meta_title || content.title || 'Storyblok News';

        let metaDescription = document.querySelector('meta[name="description"]');

        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }

        metaDescription.content = content.meta_description || content.intro || '';
    }, [story]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!story) {
        return <p>Loading...</p>;
    }

    const content = story.content;

    return (
        <>
            <Navigation />

            {content.component === 'article' ? (
                <ArticlePage story={story} />
            ) : (
                <main className="page-container">
                    <h1>{content.title}</h1>

                    {content.intro && (
                        <p className="page-intro">
                            {content.intro}
                        </p>
                    )}

                    {content.body?.map((blok) => (
                        <StoryblokComponent blok={blok} key={blok._uid} />
                    ))}

                    {content.component === 'page' &&
                        (story.slug === 'politics' ||
                            story.slug === 'technology' ||
                            story.slug === 'sports') &&
                        articles.length > 0 && (
                            <section className="article-list">
                                <h2>Latest {content.title} Articles</h2>

                                {articles.map((article) => (
                                    <a
                                        href={`/${article.slug}`}
                                        className="article-card-link"
                                        key={article.id}
                                    >
                                        <article className="article-card">
                                            <h3>{article.content.title}</h3>

                                            {article.content.intro && (
                                                <p>{article.content.intro}</p>
                                            )}

                                            <p className="article-meta">
                                                {article.content.publish_date} | By {article.content.author}
                                            </p>
                                        </article>
                                    </a>
                                ))}
                            </section>
                        )}
                </main>
            )}
        </>
    );
}

export default App;