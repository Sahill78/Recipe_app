import React, { useState, useEffect } from "react";
import './App.css';
import SearchBar from "./components/SearchBar";
import RecipeCard from "./components/RecipeCard";
import { FaStar } from "react-icons/fa";

const apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
  };

  //function to search recipes
  const searchRecipes = async () => {
    setIsLoading(true);
    try {
      const url = apiUrl + query;
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      setRecipes(data.meals);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //use effect to search for recipes when the app loads
  useEffect(() => {
    searchRecipes();
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    searchRecipes();
  };

  const stars = Array(5).fill(0);

  const handleClick = value => {
    setCurrentValue(value);
  };

  const handleMouseOver = value => {
    setHoverValue(value);
  };

  const handleMouseLeave = value => {
    setHoverValue(undefined);
  };

  const styles = { 
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f5f5f5",
      borderTop: "1px solid #ddd"
    },
    stars: {
      display: "flex"
    }
  };

  return (
    <div className="container">
      <h2>Sahil's Recipe App</h2>
      <SearchBar
        handleSubmit={handleSubmit}
        value={query}
        onChange={event => setQuery(event.target.value)}
        isLoading={isLoading}
      />
      <div className="recipes">
        {recipes ? recipes.map(recipe => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
          />
        )) : "No Recipes !"}
      </div>
      <footer style={styles.container}>
        <h3>Ratings</h3>
        <div style={styles.stars}>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                style={{
                  marginRight: 10,
                  cursor: "pointer"
                }}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
      </footer>
    </div>
  );
};

export default App;