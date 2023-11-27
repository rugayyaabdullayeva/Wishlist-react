import React, { useState } from 'react';

const Navbar = ({ onSearchButtonClick, onWishlistButtonClick, wishlistCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isWishlistOpen, setWishlistOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchButtonClick(searchTerm);
  };

  const handleWishlistClick = () => {
    setWishlistOpen(!isWishlistOpen);
  };

  return (
    <nav className="navbar bg-primary text-light">
      <div className="container d-flex justify-content-between align-items-center text-light">
        <div>
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-light" type="submit">
              Search
            </button>
          </form>
        </div>
        <div>
          <button className="btn btn-light" type="button" onClick={onWishlistButtonClick}>
            Wishlist {wishlistCount}
          </button>

        </div>
      </div>

      <div className={`offcanvas offcanvas-start${isWishlistOpen ? ' show' : ''}`} tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Wishlist</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" onClick={handleWishlistClick}></button>
        </div>
        <div className="offcanvas-body">
        </div>
      </div>
    </nav>
  );
};

export default Navbar;