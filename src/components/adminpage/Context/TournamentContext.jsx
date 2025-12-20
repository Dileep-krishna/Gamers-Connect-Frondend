// import React, { createContext, useContext, useState } from "react";

// const TournamentContext = createContext();

// export const TournamentProvider = ({ children }) => {
//   const [tournaments, setTournaments] = useState([]);

//   const addTournament = (newTournament) => {
//     setTournaments((prev) => [
//       { id: Date.now(), ...newTournament, status: "Upcoming" },
//       ...prev,
//     ]);
//   };

//   const deleteTournament = (id) => {
//     setTournaments((prev) => prev.filter((t) => t.id !== id));
//   };

//   return (
//     <TournamentContext.Provider
//       value={{ tournaments, addTournament, deleteTournament }}
//     >
//       {children}
//     </TournamentContext.Provider>
//   );
// };

// export const useTournament = () => useContext(TournamentContext);
