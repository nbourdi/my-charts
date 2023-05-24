import React from 'react';

const PricingCard = ({ title, price, features, selected, onSelect }) => {
  return (
    <div className={`pricing-card ${selected ? 'selected' : ''}`} onClick={onSelect}>
      <h2 className="title">{title}</h2>
      <div className="price">${price}</div>
      <ul className="features">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
