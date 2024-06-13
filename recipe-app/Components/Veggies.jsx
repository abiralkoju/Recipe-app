import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Wrapper, Card, Gradient } from "../Styled_comp/global";

const Veggies = () => {
  const [veggies, setVeggies] = useState([]);

  useEffect(() => {
    getVeggies();
  }, []);

  const getVeggies = async () => {
    const check = localStorage.getItem("veggies");
    if (check) {
      setVeggies(JSON.parse(check));
    } else {
      const apiKey = import.meta.env.VITE_API_KEY;
      if (!apiKey) {
        console.log("API URL is not defined in environment variables");
        return;
      }
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=9&include-tags=vegetarian`
        );
        const data = await res.json();
        setVeggies(data.recipes);
        localStorage.setItem("veggies", JSON.stringify(data.recipes));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  return (
    <Wrapper>
      <h3>Veggies</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: true,
          pagination: false,
          drag: "free",
          gap: ".75rem",
        }}
      >
        {veggies.map((vegItem) => (
          <SplideSlide>
            <Card>
              <p>{vegItem.title}</p>
              <img src={vegItem.image} alt={vegItem.title} />
              <Gradient />
            </Card>
          </SplideSlide>
        ))}
      </Splide>
    </Wrapper>
  );
};

export default Veggies;
