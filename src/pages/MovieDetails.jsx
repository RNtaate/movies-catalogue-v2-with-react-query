import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();

  const [singleMovie, setSingleMovie] = useState(null);

  useEffect(() => {
    if (!location.state) {
      navigate('/', { replace: true });
    } else {
      setSingleMovie({ ...location.state });
    }
  }, []);

  return <div>{singleMovie && <h1>{singleMovie.title}</h1>}</div>;
};

export default MovieDetails;
