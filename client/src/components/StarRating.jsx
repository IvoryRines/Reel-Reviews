import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { UN_RATE_MOVIE } from "../utils/mutations";
import { useMutation } from "@apollo/client";
// import { handleError } from "@apollo/client/link/http/parseAndCheckHttpResponse";
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};
const starContainerStyle = {
  display: "flex",
};
StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
  // handleAddRated: PropTypes.func,
};
export default function StarRating({
  maxRating = 5,
  color = "#FCC419",
  size = 48,
  className = "",
  defaultRating = 0,
  onSetRating,
  onAddRated,
  movie,
  userData,
  // handleAddRated,
}) {
  console.log("star", userData);
  console.log("movie", movie);

  const [rating, setRating] = useState(defaultRating);
  const [hoverRating, setHoverRating] = useState(0);
  const [unrateMovie] = useMutation(UN_RATE_MOVIE);

  useEffect(() => {
    // Check if the movie is already rated

    if (userData) {
      const ratedMovie = userData?.ratedMovies?.filter(
        (checkMovie) => checkMovie.movieId === movie.imdbID
      );
      setRating(ratedMovie[0]?.rating);
    }
  }, []);

  function handleRating(rating) {
    setRating(rating);
    onSetRating(rating);
  }

  async function handleStarReset(movieId) {
    const { data } = await unrateMovie({
      variables: { movieId },
    });
    console.log(data);
    setHoverRating("");
    setRating("");
  }

  return (
    <div
      style={containerStyle}
      className={`mt-1 mb-1 flex flex-col ${className}`}
    >
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setHoverRating(i + 1)}
            onHoverOut={() => setHoverRating(0)}
            color={color}
            size={size}
            onAddRated={() => onAddRated()}
            movie={movie}
            // onClick={handleAddRated}
          />
        ))}
      </div>
      <button onClick={() => handleStarReset(movie.imdbID)} className="mb-4">
        Clear Rating
      </button>
    </div>
  );
}
function Star({
  onRate,
  full,
  onHoverIn,
  onHoverOut,
  color,
  size,
  // onAddRated,
  // movie,
}) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  // const stupid = JSON.stringify(movie);
  // console.log(stupid);
  return (
    <span
      role="button"
      style={starStyle}
      onClick={() => onRate()}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
