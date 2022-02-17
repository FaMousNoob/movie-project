import MovieDetail from '../modules/main/components/movie-detail/movie-detail.component';
import Booking from '../modules/main/pages/booking/booking.component';
import Home from '../modules/main/pages/home/home.component';
import Movie from '../modules/main/pages/movie/movie.component';
import TicketPrice from '../modules/main/pages/ticket-price/ticket-price.component';

export const mainRoutes = [
  { path: '/', Element: Home },
  { path: '/booking', Element: Booking },
  { path: '/ticket-price', Element: TicketPrice },
  { path: '/movie', Element: Movie },
  { path: '/movie-detail/:id', Element: MovieDetail },
];
