import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MealDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (response.data.meals) {
          setMeal(response.data.meals[0]);
        } else {
          console.error("No meal found with this ID");
        }
      } catch (error) {
        console.error("Error fetching meal details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!meal) {
    return <div className="text-center mt-20">Meal not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6 px-4">
      {/* Header */}
      <div className="w-full bg-orange-500 text-white p-4 text-center text-lg font-bold shadow-md">
        Meal Details
      </div>

      {/* Back Button */}
      <button
        className="mt-4 px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Main Content - Grid Layout */}
      <div className="bg-white shadow-lg rounded-lg mt-6 p-6 w-full max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Meal Image */}
          <div className="col-span-1 flex justify-center">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Meal Information */}
          <div className="col-span-1 flex flex-col justify-start">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
              {meal.strMeal}
            </h1>
            <p className="text-center text-gray-600 mb-6">
              <strong>Category:</strong> {meal.strCategory} |{" "}
              <strong>Area:</strong> {meal.strArea}
            </p>

            {/* Ingredients Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Ingredients
              </h2> 
              <ul className="list-disc list-inside text-gray-700 md:h-full h-40 md:overflow-hidden overflow-y-scroll">
                {Array.from({ length: 20 }).map((_, index) => {
                  const ingredient = meal[`strIngredient${index + 1}`];
                  const measure = meal[`strMeasure${index + 1}`];
                  return (
                    ingredient &&
                    ingredient.trim() && (
                      <li key={index}>
                        {ingredient} - {measure}
                      </li>
                    )
                  );
                })}
              </ul>
            </div>

            {/* Instructions Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Instructions
              </h2>
              <p className="text-gray-600 md:h-full h-40 md:overflow-hidden overflow-y-scroll">{meal.strInstructions}</p>
            </div>
          </div>
        </div>

        {/* YouTube Video Embed */}
        {meal.strYoutube && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-700">Video Tutorial</h2>
            <div className="mt-2">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
