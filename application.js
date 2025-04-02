// ✅ appication.js

// City card data
const city = [
    { id: 0, name: 'Paris, France', image: 'assets/pics/PARIS 2.jpg', about: 'The city of love and home to the Eiffel Tower.', cost: 674, people: 2 },
    { id: 1, name: 'New York, USA', image: 'assets/pics/nyc 5.jpg', about: 'The city that never sleeps, featuring Times Square.', cost: 574, people: 2 },
    { id: 2, name: 'Tokyo, Japan', image: 'assets/pics/tokyo.avif', about: 'A bustling metropolis blending tradition and modernity.', cost: 574, people: 2 },
    { id: 3, name: 'Swiss Alps, Switzerland', image: 'assets/pics/swiss 2.jpg', about: 'Stunning mountain ranges perfect for skiing and hiking.', cost: 574, people: 2 },
    { id: 4, name: 'Dubai, UAE', image: 'assets/pics/dubai 2.jpg', about: 'Famous for the Burj Khalifa and luxury lifestyle.', cost: 574, people: 2 },
    { id: 5, name: 'Sydney, Australia', image: 'assets/pics/sydney 3.jpg', about: 'Home to the Opera House and stunning beaches.', cost: 574, people: 2 },
    { id: 6, name: 'Rome, Italy', image: 'assets/pics/rome.jpg', about: 'The Eternal City with ancient ruins and rich history.', cost: 574, people: 2 },
    { id: 7, name: 'Bali, Indonesia', image: 'assets/pics/BALI 2.jpg', about: 'A tropical paradise known for its beaches and temples.', cost: 574, people: 2 },
    { id: 8, name: 'Maldives', image: 'assets/pics/maldives 2.jpg', about: 'Idyllic islands famous for luxury resorts and clear waters.', cost: 574, people: 2 },
    { id: 9, name: 'Select your own destination', image: 'assets/pics/Unknown 5.jpeg.jpg', about: "From cobblestone streets to breathtaking vistas, the world's hidden cities await." }
  ];
  
  const mybox = document.getElementById("main-box");
  
  if (mybox) {
    city.forEach(singlecity => {
      const card = document.createElement("div");
      card.className = "city-card";
      card.style.backgroundImage = `url('${singlecity.image}')`;
      card.innerHTML = `
        <div class="city-overlay">
          <h4 class="city-name">${singlecity.name}</h4>
          <p class="desc-1">${singlecity.about}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        openForm();
        if (singlecity.name === "Select your own destination") {
          document.getElementById("destination").value = "";
          document.getElementById("numPeople").value = "";
        } else {
          document.getElementById("destination").value = singlecity.name;
          document.getElementById("numPeople").value = "1";
        }
      });
      mybox.appendChild(card);
    });
  }
  
  // Show form popup
  function openForm() {
    document.getElementById("cityForm").style.display = "block";
  }
  
  // Close popup
  function closeForm() {
    document.getElementById("cityForm").style.display = "none";
  }
  
  // Toggle extra fields based on trip type
  function toggleFields() {
    const tripType = document.getElementById("tripType").value;
    const travelersField = document.getElementById("travelersField");
    const numPeopleInput = document.getElementById("numPeople");
  
    if (tripType === "Solo") {
      travelersField.style.display = "none";
      numPeopleInput.value = "1";
      numPeopleInput.setAttribute("readonly", true);
    } else if (tripType === "Couple") {
      travelersField.style.display = "block";
      numPeopleInput.value = "2";
      numPeopleInput.setAttribute("readonly", true);
    } else {
      travelersField.style.display = "block";
      numPeopleInput.value = "";
      numPeopleInput.removeAttribute("readonly");
    }
  }
  
  // Show/hide input field for custom location
  function toggleOtherField(selectId, inputId) {
    const selectElement = document.getElementById(selectId);
    const inputElement = document.getElementById(inputId);
  
    if (selectElement.value === "Other") {
      inputElement.style.display = "block";
      inputElement.required = true;
    } else {
      inputElement.style.display = "none";
      inputElement.value = "";
      inputElement.required = false;
    }
  }
  
  // Validate single field
  function validateField(id) {
    const field = document.getElementById(id);
    const warning = document.getElementById(id + "-warning");
  
    if (!field.value.trim()) {
      field.classList.add("error");
      if (warning) warning.style.display = "block";
    } else {
      field.classList.remove("error");
      if (warning) warning.style.display = "none";
    }
  }
  
  // Submit form and store data in localStorage
  function submitForm() {
    const fields = ["travelingFrom", "destination", "tripType", "budget", "numDays"];
    let isValid = true;
  
    fields.forEach(field => {
      validateField(field);
      if (!document.getElementById(field).value.trim()) isValid = false;
    });
  
    const tripType = document.getElementById("tripType").value;
    const numPeople = document.getElementById("numPeople").value;
    if (tripType !== "Solo" && !numPeople.trim()) {
      validateField("numPeople");
      isValid = false;
    }
  
    if (!isValid) return;
  
    const tripData = {
      destination: document.getElementById("destination").value,
      days: document.getElementById("numDays").value,
      budget: document.getElementById("budget").value,
      travelMode: document.getElementById("travelMode").value,
      health: document.getElementById("healthConditions").value,
      tripType,
      numPeople,
      travelingFrom: document.getElementById("travelingFrom").value,
      otherTravelingFrom: document.getElementById("otherTravelingFrom").value
    };
  
    localStorage.setItem("tripData", JSON.stringify(tripData));
    window.location.href = "outputPage.html";
  }
  
  // Autocomplete logic with GeoDB Cities API
  async function fetchCitySuggestions(query) {
    const list = document.getElementById("destination-suggestions");
    if (query.length < 2) return list.innerHTML = "";
  
    const res = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5&sort=-population`, {
      headers: {
        "X-RapidAPI-Key": "e7c7d61f31msh3bda6ec09f5d867p15a195jsn1cd35bebf69c",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
      }
    });
  
    const data = await res.json();
    list.innerHTML = data.data.map(city => `<li onclick="selectDestination('${city.city}, ${city.country}')">${city.city}, ${city.country}</li>`).join("");
  }
  
  function selectDestination(name) {
    document.getElementById("destination").value = name;
    document.getElementById("destination-suggestions").innerHTML = "";
  }
  
  async function fetchCitySuggestionsFrom(query) {
    const list = document.getElementById("from-suggestions");
    if (query.length < 2) return list.innerHTML = "";
  
    const res = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5&sort=-population`, {
      headers: {
        "X-RapidAPI-Key": "e7c7d61f31msh3bda6ec09f5d867p15a195jsn1cd35bebf69c",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com"
      }
    });
  
    const data = await res.json();
    list.innerHTML = data.data.map(city => `<li onclick="selectFrom('${city.city}, ${city.country}')">${city.city}, ${city.country}</li>`).join("");
  }
  
  function selectFrom(name) {
    document.getElementById("otherTravelingFrom").value = name;
    document.getElementById("from-suggestions").innerHTML = "";
  }  

/*
 // Function to show the team popup
 function showTeamPopup() {
     // Display the overlay popup
     document.getElementById("teamPopupOverlay").style.display = "block";

     // Optional: Disable background scroll when popup is open
     document.body.style.overflow = "hidden";
 }

 // Function to hide the team popup
 function hideTeamPopup() {
     // Hide the overlay popup
     document.getElementById("teamPopupOverlay").style.display = "none";

     // Re-enable background scroll when popup is closed
     document.body.style.overflow = "auto";
 }
*/

  
