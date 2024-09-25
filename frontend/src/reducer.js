export const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  basket: [],
};

export const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => item.amount + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "ADD_TO_BAG":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "ADD_EXIST_PRODUCT":
      let newBasket = [...state.basket];
      newBasket[action.index] = action.item;

      return {
        ...state,
        basket: newBasket,
      };

    case "REMOVE_FROM_BAG":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );

      let newBag = [...state.basket];

      if (index >= 0) {
        newBag.splice(index, 1);
      } else {
        console.warn(`
          can't remove product whose id is ${index}
          `);
      }

      return {
        ...state,
        basket: newBag,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default reducer;
