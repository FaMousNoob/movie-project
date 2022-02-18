import React from 'react';
import CarouselHome from './carousel/carousel.component';
import HotMovieHome from './hot-movie/hot-movie.component';

function Home() {
  return (
    <div>
      <CarouselHome />
      <HotMovieHome />
    </div>
  );
}

export default Home;
