import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTours, removeTour } from "../redux/features/tourSlice";

const TourList = () => {
  const dispatch = useDispatch();
  const { tours, loading, error } = useSelector((state) => state.tour);

  useEffect(() => {
    dispatch(fetchTours());
  }, [dispatch]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {tours.slice(0, 6).map((tour) => (
        <div
          key={tour.id}
          className="p-4 shadow-lg rounded bg-white hover:scale-105 transition"
        >
          <h2 className="font-bold text-lg">{tour.title}</h2>
          <p className="text-gray-600">{tour.body}</p>
          <button
            onClick={() => dispatch(removeTour(tour.id))}
            className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default TourList;
