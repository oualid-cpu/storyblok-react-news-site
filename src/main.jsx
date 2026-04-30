import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import './index.css';
import App from './App.jsx';
import TextBlock from './components/TextBlock.jsx';
import ImageBlock from './components/ImageBlock.jsx';
import VideoBlock from './components/VideoBlock.jsx';
import SlideshowBlock from './components/SlideshowBlock.jsx';

//console.log(
//    'Storyblok token:',
//    import.meta.env.VITE_STORYBLOK_DELIVERY_API_TOKEN
//);

storyblokInit({
    accessToken: import.meta.env.VITE_STORYBLOK_DELIVERY_API_TOKEN,
    use: [apiPlugin],
    apiOptions: {
        region: 'eu',
    },
    components: {
        text_block: TextBlock,
        image_block: ImageBlock,
        video_block: VideoBlock,
        slideshow_block: SlideshowBlock,
},
});

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);