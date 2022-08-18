import React, { useEffect, useState } from "react";

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  // meals state
  const [meals, setMeals] = useState([]);

  /**
   * fetchMeals is an async function, stores the HTTP GET request to firebase in the response,
   * once the promise is returned awaits the JSON data, then stored in responseData.
   * 
   * initializes the loadedMeals array, before reaching into the responseData JSON object
   * for each key pushing the key: value from responseData to loadedMeals transforming the data
   * this array is then passed to the meals state object above
   * 
   * effect hook has no dependencies, causing to only run on initial load
   */
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("https://meals-app-d0e44-default-rtdb.firebaseio.com/meals.json");
      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
        })
      }

      setMeals(loadedMeals);
    };
    fetchMeals();
  }, []);

  // A helper function, maps over the meals state object,
  // passing the data to MealItem.js in the 'meal' object as a prop.
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
