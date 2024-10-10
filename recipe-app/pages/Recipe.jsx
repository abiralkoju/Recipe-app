// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import styled from "styled-components";

// const Recipe = () => {
//   const [recipe, setRecipe] = useState({});
//   const [activeTab, setActiveTab] = useState("Instructions");
//   let params = useParams();

//   useEffect(() => {
//     getRecipe(params.name);
//   }, [params.name]);

//   const getRecipe = async (id) => {
//     const data = await fetch(
//       `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
//         import.meta.env.VITE_API_KEY
//       }`
//     );
//     const recipes = await data.json();
//     setRecipe(recipes);
//     console.log(recipes);
//   };

//   return (
//     <DetailWrapper>
//       <div>
//         <h2>{recipe.title}</h2>
//         <img src={recipe.image} alt={recipe.title} />
//       </div>
//       <Info>
//         <Button
//           className={activeTab === "Instructions" ? "active" : ""}
//           onClick={() => setActiveTab("Instructions")}
//         >
//           Instructions
//         </Button>
//         <Button
//           className={activeTab === "Ingredients" ? "active" : ""}
//           onClick={() => setActiveTab("Ingredients")}
//         >
//           Ingredients
//         </Button>
//         {activeTab === "Instructions" && (
//           <div>
//             <h3 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h3>
//             <h3 dangerouslySetInnerHTML={{ __html: recipe.instructions }}></h3>
//           </div>
//         )}
//         {activeTab === "Ingredients" && (
//           <ul>
//             {recipe.map((ingredient) => (
//               <li key={ingredient.id}>{ingredient.extendedIngredients}</li>
//             ))}
//           </ul>
//         )}
//       </Info>
//     </DetailWrapper>
//   );
// };

// const DetailWrapper = styled.div`
//   margin-top: 5rem;
//   margin-bottom: 5rem;
//   display: flex;
//   .active {
//     background: linear-gradient(35deg, #494949, #313131);
//     color: white;
//   }
//   img {
//     width: 22rem;
//   }
//   h2 {
//     margin-bottom: 1rem;
//   }
//   li {
//     font-size: 1.2rem;
//     line-height: 2.5rem;
//   }
//   ul {
//     margin-top: 2rem;
//   }
// `;

// const Button = styled.div`
//   padding: 0.75rem 1rem;
//   color: #313131;
//   background: white;
//   border: 2px solid black;
//   margin-right: 1rem;
//   font-weight: 600;
//   cursor: pointer;
//   width: 14rem;
// `;

// const Info = styled.div`
//   margin-left: 5rem;
//   display: flex;
//   gap: 0.3rem;
// `;

// export default Recipe;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Recipe = () => {
  const [recipe, setRecipe] = useState({});
  const [activeTab, setActiveTab] = useState("Instructions");
  let params = useParams();

  useEffect(() => {
    getRecipe(params.name);
  }, [params.name]);

  const getRecipe = async (id) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const recipes = await data.json();
    setRecipe(recipes);
    console.log(recipes);
  };

  return (
    <DetailWrapper>
      <div>
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <Info>
        <ButtonWrapper>
          <Button
            className={activeTab === "Instructions" ? "active" : ""}
            onClick={() => setActiveTab("Instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "Ingredients" ? "active" : ""}
            onClick={() => setActiveTab("Ingredients")}
          >
            Ingredients
          </Button>
        </ButtonWrapper>
        {activeTab === "Instructions" && (
          <Content>
            <h3 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: recipe.instructions }}></h3>
          </Content>
        )}
        {activeTab === "Ingredients" && (
          <Content>
            <ul>
              {recipe.extendedIngredients?.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
          </Content>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;

  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }

  img {
    width: 22rem;
    height: auto;
  }

  h2 {
    margin-bottom: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;

const Button = styled.div`
  padding: 0.75rem 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 600;
  cursor: pointer;
  width: 10rem;
  text-align: center;

  &.active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  @media (max-width: 768px) {
    width: 100%; /* Full width for mobile view */
  }
`;

const Info = styled.div`
  margin-left: 2rem;
  flex: 1;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const Content = styled.div`
  margin-top: 2rem;

  h3,
  li {
    font-size: 0.75rem;
    line-height: 1.2rem;
  }

  ul {
    margin-top: 1rem;
  }
`;

export default Recipe;
