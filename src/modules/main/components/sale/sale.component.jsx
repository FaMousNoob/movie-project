import React from 'react';
import { NavLink } from 'react-router-dom';
import './sale.component.scss';

function Sale() {
  const renderSale = () => {
    const numberOfSale = [1, 2, 3, 4];
    return numberOfSale.map((sale, index) => (
      <li key={index}>
        <NavLink to='/404'>
          <img src={`/images/khuyen-mai-${sale}.jpg`} alt='' />
          <button>CHI TIẾT</button>
        </NavLink>
      </li>
    ));
  };
  return (
    <section className='container sale'>
      <h3>TIN KHUYẾN MÃI</h3>
      <ul>{renderSale()}</ul>
    </section>
  );
}

export default Sale;
