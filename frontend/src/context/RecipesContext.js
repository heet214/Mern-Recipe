import { createContext, useReducer } from 'react';

export const RecipesContext = createContext();

export const recipesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECIPES':
      return {
        recipes: action.payload,
      };

    case 'CREATE_RECIPE':
      return {
        recipes: [action.payload, ...state.recipes],
      };

    case 'DELETE_RECIPE':
      return {
        recipes: state.recipes.filter((r) => r._id !== action.payload._id),
      };

    case 'UPDATE_RECIPE':
      // state.recipes.map((r) => {
      //   if (r._id === action.payload._id) {
      //     r = action.payload;
      //   } else {
      //     return r;
      //   }
      // });
      // console.log(state.recipes);
      // return {
      //   recipes: state.recipes,
      // };
      return {
        recipes: state.recipes.map((r) => {
          var temp = Object.assign({}, r);
          if (r._id === action.payload._id) {
            temp.title = action.payload.title;
            temp.duration = action.payload.duration;
            temp.preparation = action.payload.preparation;
          }
          return temp;
        }),
      };

    default:
      return state;
  }
};

export const RecipesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(recipesReducer, {
    recipes: null,
  });

  return (
    <RecipesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};
