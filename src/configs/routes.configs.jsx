import BookingTicket from '../modules/main/components/booking-ticket/booking-ticket.component';
import Error from '../modules/main/components/error/error';
import MovieDetail from '../modules/main/components/movie-detail/movie-detail.component';
import Booking from '../modules/main/pages/booking/booking.component';
import Home from '../modules/main/pages/home/home.component';
import Movie from '../modules/main/pages/movie/movie.component';
import SaleInfo from '../modules/main/pages/sale-info/sale-info.component';
import User from '../modules/main/pages/user/user.component';

export const mainRoutes = [
  { path: '/', Element: Home },
  { path: '/booking', Element: Booking },
  { path: '/khuyen-mai', Element: SaleInfo },
  { path: '/movie', Element: Movie },
  { path: '/movie-detail/:id', Element: MovieDetail },
  { path: '/404', Element: Error },
];

export const mainUserRoutes = [
  { path: '/user', Element: User },
  { path: '/booking/:id', Element: BookingTicket },
];
