import React from 'react';
import "../App.css";

interface FilterMenuProps {
  onChange: (filterType: string, value: string) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({ onChange }) => {
  return (
    <div className="filter-menu d-flex flex-wrap">
      <div className="form-group">
        <label htmlFor="genderFilter">Gender</label>
        <select className="form-control" id="genderFilter" onChange={(e) => onChange('gender', e.target.value)}>
          <option value="">All</option>
          <option value="M">Men</option>
          <option value="W">Women</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="typeFilter">Type</label>
        <select className="form-control" id="typeFilter" onChange={(e) => onChange('type', e.target.value)}>
          <option value="">All</option>
          <option value="Jackets">Jackets</option>
          <option value="Pants">Pants</option>
          <option value="Shoes">Shoes</option>
          <option value="T-Shirts">T-Shirts</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="brandFilter">Brand</label>
        <select className="form-control" id="brandFilter" onChange={(e) => onChange('brand', e.target.value)}>
          <option value="">All</option>
          <option value="Timberland">Timberland</option>
          <option value="New Balance">New Balance</option>
          <option value="Birkenstock">Birkenstock</option>
          <option value="LLOYD">LLOYD</option>
          <option value="Asics">Asics</option>
          <option value="Asos">Asos</option>
          <option value="Ganni">Ganni</option>
          <option value="Bershka">Bershka</option>
          <option value="H&M">H&M</option>
          <option value="Human Made">Human Made</option>
          <option value="Libertine">Libertine</option>
          <option value="Mango">Mango</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="sizeFilter">Size</label>
        <select className="form-control" id="sizeFilter" onChange={(e) => onChange('size', e.target.value)}>
          <option value="">All</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>
    </div>
  );
};
