import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (date) => {
    const dateArray = date.split("_");
    return (
      dateArray[0] +
      " " +
      months[parseInt(dateArray[1]) - 1] +
      ", " +
      dateArray[2]
    );
  };

  const value = { calculateAge, slotDateFormat };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
