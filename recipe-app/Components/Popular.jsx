import React, { useEffect, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Wrapper, Card, Gradient } from "../Styled_comp/global";
import { Link } from "react-router-dom";

const Popular = () => {
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopularItems(JSON.parse(check));
    } else {
      const apiKey = import.meta.env.VITE_API_KEY;
      if (!apiKey) {
        console.log("API URL is not defined in environment variables");
        return;
      }
      try {
        const api = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9`
        );
        const data = await api.json();
        localStorage.setItem("popular", JSON.stringify(data.recipes));
        setPopularItems(data.recipes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  return (
    <Wrapper>
      <h3>Popular Picks</h3>
      <Splide
        options={{
          perPage: 3,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: "1.5rem",
        }}
      >
        {popularItems.map((recipe) => {
          return (
            <SplideSlide key={recipe.id}>
              <Card>
                <Link to={"/recipe/" + recipe.id}>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

export default Popular;
