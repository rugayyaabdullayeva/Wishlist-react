import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import CustomCard from './components/CustomCard';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [isWishlistOpen, setWishlistOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const BASE_URL = `https://www.omdbapi.com`;
  const API_KEY = "9fa6ce35";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=batman`);
        const data = await response.json();

        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          console.error(data.Error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (term) => {
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${term}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        console.error(data.Error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToWishlist = (movie) => {
    const isAlreadyInWishlist = wishlist.some((m) => m.imdbID === movie.imdbID);

    if (!isAlreadyInWishlist) {
      setWishlist((prevWishlist) => [...prevWishlist, movie]);
      setWishlistCount((prevCount) => prevCount + 1);
    }
  };

  const handleRemoveFromWishlist = (movie) => {
    setWishlist((prevWishlist) => prevWishlist.filter((m) => m.imdbID !== movie.imdbID));
    setWishlistCount((prevCount) => prevCount - 1);
  };

  const handleWishlistClick = () => {
    setWishlistOpen(!isWishlistOpen);
  };

  return (
    <div className="App">
      <Navbar
        onSearchButtonClick={handleSearch}
        onWishlistButtonClick={handleWishlistClick}
        wishlistCount={wishlistCount}
      />
      <div className='container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: "space-between", gap: "10px", marginTop: "40px" }}>
        {movies.map((movie) => (
          <CustomCard
            key={movie.imdbID}
            movie={movie}
            onAddToWishlist={() => handleAddToWishlist(movie)}
            onDeleteFromWishlist={() => handleRemoveFromWishlist(movie)}
            isAddedToWishlist={wishlist.some((m) => m.imdbID === movie.imdbID)}
          />
        ))}
      </div>

      <div className={`offcanvas offcanvas-start${isWishlistOpen ? ' show' : ''}`} tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Wishlist</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" onClick={handleWishlistClick}></button>
        </div>
        <div className="offcanvas-body">
          {wishlist.map((wishlistMovie) => (
            <CustomCard
              key={wishlistMovie.imdbID}
              movie={wishlistMovie}
              onDeleteFromWishlist={() => handleRemoveFromWishlist(wishlistMovie)}
              isAddedToWishlist
              isInWishlist
              style={{
                marginBottom: '10px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
