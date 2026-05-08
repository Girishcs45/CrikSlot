import mongoose from "mongoose";
import Turf from "../models/turfs.js"; // adjust path if needed
import dotenv from "dotenv";
dotenv.config();

const turfs = [
  {
    name: "Battle Ground",
    location: "Pimpalgaon Bahula Nashik",
    price: 900,
    rating: 4.8,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQbHstjLyNrHN-V5p0Y4cBd1ZJ2IL8ZFROqg&s",
    area: "Ashok Nagar"
  },
  {
    name: "Cover Drive",
    location: "Pimpalgaon Bahula Nashik",
    price: 900,
    rating: 4.9,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS84YzmKYBEVLCKVYncZUjDHZM2fl7-E-9ryA&s",
    area: "Ashok Nagar"
  },
  {
    name: "Ranangan Ground",
    location: "Pimpalgaon Bahula Nashik",
    price: 900,
    rating: 4.9,
    image: "", // local image not needed for DB
    area: "Ashok Nagar"
  },
  {
    name: "Girish Box Cricket Academy",
    location: "Pimpalgaon Bahula Nashik",
    price: 900,
    rating: 4.8,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQbHstjLyNrHN-V5p0Y4cBd1ZJ2IL8ZFROqg&s",
    area: "Ashok Nagar"
  },
  {
    name: "Vebu the Turf",
    location: "Pimpalgaon Bahula Nashik",
    price: 900,
    rating: 4.6,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS84YzmKYBEVLCKVYncZUjDHZM2fl7-E-9ryA&s",
    area: "Ashok Nagar"
  },
  {
    name: "Renu Turf",
    location: "Pimpalgaon Bahula Nashik",
    price: 900,
    rating: 4.9,
    image: "",
    area: "Ashok Nagar"
  }
];

const seedTurfs = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.CRICKSLOT_DB_URL);

    console.log("📥 Inserting new turf data...");
    await Turf.insertMany(turfs);

    console.log("✅ Turf seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding turf data:", error);
    process.exit(1);
  }
};

seedTurfs();
