import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getVertexAI,
  getGenerativeModel,
  HarmBlockThreshold,
  HarmCategory
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-vertexai-preview.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBgwHVa9rF-yU5bNEEoHCEpFWe53z_Pj8U",
  authDomain: "sanchari-6a63a.firebaseapp.com",
  projectId: "sanchari-6a63a",
  storageBucket: "sanchari-6a63a.appspot.com",
  messagingSenderId: "930535667726",
  appId: "1:930535667726:web:84596cd17440e352ae245f",
  measurementId: "G-M2H1MX1GKM"
};

const app = initializeApp(firebaseConfig);
const vertexAI = getVertexAI(app);

// ✅ Gemini AI Setup
const model = getGenerativeModel(vertexAI, {
  model: "gemini-1.5-flash", // or use a valid model ID
  systemInstruction: `You are an AI-powered travel planner integrated into a website that processes user-submitted form data to generate a detailed travel itinerary along with relevant travel precautions. Your goal is to provide a seamless and personalized trip planning experience based on user preferences.

Core Functions:
1. Receive Form Data – Process user input from the travel form.
2. Generate Personalized Itinerary – Create a structured itinerary based on user selections.
3. Include Travel Precautions – Offer health and safety recommendations based on inputs.
4. Display Results on the Website – Show a well-formatted itinerary directly after form submission.
5. Allow Adjustments – Provide options to refine the itinerary if needed.

Workflow:
- Extract user details from the form:
  ✅ Travel Style (Solo, Family, Friends, Romantic)
  ✅ Destination (User input or AI-recommended if blank)
  ✅ Preferred Mode of Travel (Flight, Train, Car, Bike, Ship)
  ✅ Budget (Numeric input)
  ✅ Trip Duration (Number of days)
  ✅ Number of Travelers (Numeric input)
  ✅ Health Considerations (Asthma, Diabetes, None, etc.)

- Generate a Detailed Itinerary:
  1️⃣ Arrival & Transportation Details (flights, trains, car rentals)
  2️⃣ Accommodation Suggestions (budget, mid-range, luxury)
  3️⃣ Daily Activity Plan (sightseeing, adventure, relaxation)
  4️⃣ Packing Checklist & Weather Forecast
  5️⃣ Estimated Cost Breakdown

- Include Travel Precautions:
  ✅ Health considerations & travel insurance recommendations.
  ✅ Safety tips, emergency contacts, cultural etiquette.

- Display Itinerary:
  ✅ Well-formatted structure with a breakdown for each day.
  ✅ Highlight important budget & health tips.
  ✅ Provide download & share options.

Expected User Experience:
- User fills the form, submits, and sees a personalized itinerary instantly.
- They can modify details if needed.
- Option to save, share, or book the plan directly.

🚀 Sanchari - The Explorer: Your adventure, our plan! 🌍`,
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE }
  ]
});

// ✅ Load Data

const tripData = JSON.parse(localStorage.getItem("tripData"));

if (!tripData) {
  document.getElementById("ai-itinerary").innerText = "❌ No trip data found. Please go back and submit the form again.";
  throw new Error("No trip data");
}

// ✅ Use manually entered location if 'Other' is selected
const fromLocation =
  tripData.travelingFrom === "Other" && tripData.otherTravelingFrom
    ? tripData.otherTravelingFrom
    : tripData.travelingFrom;


// ✅ Fill Output Summary
document.getElementById("destination-output").textContent = tripData.destination;
document.getElementById("travelingFrom-output").textContent = fromLocation;
document.getElementById("tripType-output").textContent = tripData.tripType;
document.getElementById("duration-output").textContent = tripData.days;
document.getElementById("mode-output").textContent = tripData.travelMode;
document.getElementById("budget-output").textContent = tripData.budget;
document.getElementById("health-output").textContent = tripData.health;
document.getElementById("numPeople-output").textContent = tripData.numPeople;

// ✅ Prompt
const prompt = `I am planning a ${tripData.days}-days ${tripData.tripType} trip to ${tripData.destination} from ${fromLocation} with ${tripData.numPeople} people, a budget of ${tripData.budget} USD, traveling by ${tripData.travelMode}, and with the following health considerations: ${tripData.health}.


Please create a detailed, day-by-day travel itinerary that begins from my departure location (${fromLocation}) and continues through my stay at the destination (${tripData.destination}). For each day, include:

1. **Transportation** details (including flights, local travel, and how to reach specific places)
2. **Hotel recommendations** with estimated prices
3. **Famous local food to try** (mention both vegetarian and non-vegetarian options)
4. **Attractions or activities**, including:
   - The best time to visit (day or night)
   - **Official website links** for each attraction so travelers can book tickets in advance if needed
5. **Weather updates** and seasonal tips
6. **Safety precautions or travel tips** relevant to the area
7. Give itinerary based on the places which are nearer to each other on the same day.

Also include:
- A **budget breakdown** with approximate costs for flights(tell them to book way in advance), hotels, food, and local transportation.
- A **link to Skyscanner** for flight options: https://www.skyscanner.com
- A **link to Booking.com** for hotel bookings: https://www.booking.com

Ensure the output is structured, easy to read, and organized by each day. Use headings and formatting for clarity.`;


// ✅ Call Gemini
async function generateItinerary(prompt) {
  try {
    document.getElementById("ai-itinerary").innerText = "⏳ Generating your itinerary...";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const rawHtml = marked.parse(text);
    const newTabHtml = rawHtml.replace(/<a /g, '<a target="_blank" rel="noopener noreferrer" ');
    document.getElementById("ai-itinerary").innerHTML = newTabHtml;

  } catch (err) {
    console.error("AI Error:", err);
    document.getElementById("ai-itinerary").innerText = "❌ Failed to load itinerary.";
  }
}

generateItinerary(prompt);

// ✅ Download Output
window.downloadOutput = () => {
  const output = document.getElementById("ai-itinerary").innerText;
  const blob = new Blob([output], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "Travel_Itinerary.txt";
  link.click();
};

// ✅ Modify Plan → Go Back
window.modifyPlan = () => {
  window.location.href = "cityCards.html"; // or index.html depending on your flow
};
