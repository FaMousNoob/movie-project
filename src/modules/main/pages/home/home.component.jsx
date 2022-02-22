import React, { useEffect } from 'react';
import CarouselHome from './carousel/carousel.component';
import HotMovieHome from './hot-movie/hot-movie.component';
import { useDispatch } from 'react-redux';
import { getMovieListAction } from '../../../../store/actions/movie.actions';
import { useSelector } from 'react-redux';

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieListAction());
  }, []);

  return (
    <div>
      <CarouselHome />
      <HotMovieHome />
    </div>
  );
}

export default Home;
