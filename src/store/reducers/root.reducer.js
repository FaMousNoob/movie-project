import { combineReducers } from 'redux';
import { bookingTicketReducer } from './booking-ticket.reducer';
import { movieReducer } from './movie.reducer';
import { activeLoginSignUpReducer } from './login-sign-up.reducer';
import { userReducer } from './user.reducer';

export const rootReducer = combineReducers({
  movie: movieReducer,
  activeLoginSignUp: activeLoginSignUpReducer,
  bookingTicket: bookingTicketReducer,
  user: userReducer,
});
