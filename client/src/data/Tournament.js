// src/data/Tournaments.js
import Tournament1 from "../assets/Tournament1.jpg";
import Tournament2 from "../assets/Tournament2.jpg";

export const tournaments = [
  {
    id: 1,
    name: "PREMIER CRICKET LEAGUE",
    sport: "Cricket",
    date: "November 29, 2024",
    location: "125 Anyshine St. Ary City, 28 3246",
    category: "T20",
    image: Tournament1,
    registrationDeadline: "November 10, 2024",
    prizePool: {
      first: 5500,
      second: 3200,
      third: 1800
    },
    teamComposition: "11 players + 4 substitutes",
    tournamentTime: "Day-Night (2:00 PM - 10:00 PM)"
  },
  {
    id: 2,
    name: "SUMMER CRICKET CUP",
    sport: "Cricket",
    date: "July 29, 2024",
    location: "100% Ayoyelone Ary City, 28 3246",
    category: "ODI",
    image: Tournament2,
    registrationDeadline: "July 12, 2024",
    prizePool: {
      first: 4800,
      second: 3800,
      third: 2200
    },
    teamComposition: "11 players + 3 substitutes",
    tournamentTime: "Day (9:00 AM - 5:00 PM)"
  },
  {
    id: 3,
    name: "CITY CRICKET CHAMPIONSHIP",
    sport: "Cricket",
    date: "July 29, 2024",
    location: "100% Bologna Dz. Amendola Ary City, 28 3246",
    category: "T20",
    image: Tournament1,
    registrationDeadline: "July 26, 2024",
    prizePool: {
      first: 5200,
      second: 3600,
      third: 2400
    },
    teamComposition: "7 players + 2 substitutes",
    tournamentTime: "Evening (4:00 PM - 9:00 PM)"
  },
  {
    id: 4,
    name: "WINTER CRICKET SERIES",
    sport: "Cricket",
    date: "January 24, 2025",
    location: "125 Anyshine St. Ary City, 28 3246",
    category: "Test",
    image: Tournament2,
    registrationDeadline: "January 10, 2025",
    prizePool: {
      first: 6000,
      second: 4000,
      third: 3000
    },
    teamComposition: "11 players + 2 substitutes",
    tournamentTime: "Multi-day (10:00 AM - 5:00 PM daily)"
  },
  {
    id: 5,
    name: "CRICKET PREMIER LEAGUE",
    sport: "Football",
    date: "June 25, 2024",
    location: "Ary City Cricket Stadium",
    category: "IPL Style",
    image: Tournament1,
    registrationDeadline: "June 10, 2024",
    prizePool: {
      first: 7500,
      second: 4500,
      third: 2800
    },
    teamComposition: "11 players + 5 substitutes",
    tournamentTime: "Night (6:00 PM - 11:00 PM)"
  },
  {
    id: 6,
    name: "SUMMER CRICKET BLAST",
    sport: "Foootball",
    date: "September 25-30, 2024",
    location: "125 Anyshine St. Ary City, 28 3246",
    category: "T10",
    image: Tournament2,
    registrationDeadline: "September 10, 2024",
    prizePool: {
      first: 4200,
      second: 3000,
      third: 1600
    },
    teamComposition: "5 players + 2 substitutes",
    tournamentTime: "Weekend (10:00 AM - 6:00 PM)"
  },
  {
    id: 7,
    name: "CRICKET T20 TOURNAMENT",
    sport: "Football",
    date: "Multiple Dates",
    location: "Ary City Cricket Club",
    category: "T20",
    image: Tournament1,
    registrationDeadline: "Rolling Basis",
    prizePool: {
      first: 3800,
      second: 2800,
      third: 1500
    },
    teamComposition: "8 players + 2 substitutes",
    tournamentTime: "Flexible timing (As per fixture)"
  },
  {
    id: 8,
    name: "GRAND CRICKET CHAMPIONSHIP",
    sport: "Basketball",
    date: "August 15-20, 2024",
    location: "Ary City International Ground",
    category: "Professional",
    image: Tournament2,
    registrationDeadline: "August 1, 2024",
    prizePool: {
      first: 8500,
      second: 5200,
      third: 3500
    },
    teamComposition: "11 players + 4 substitutes",
    tournamentTime: "Full Day (9:00 AM - 8:00 PM)"
  },
  {
    id: 9,
    name: "YOUTH CRICKET CUP",
    sport: "Basketball",
    date: "March 15-20, 2025",
    location: "City Youth Cricket Center",
    category: "Under-19",
    image: Tournament1,
    registrationDeadline: "March 1, 2025",
    prizePool: {
      first: 3200,
      second: 2000,
      third: 1200
    },
    teamComposition: "11 players + 3 substitutes",
    tournamentTime: "School Hours (8:00 AM - 3:00 PM)"
  }
];