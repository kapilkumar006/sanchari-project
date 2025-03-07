const cityCard=document.querySelector(".city-card")
const cityName=document.getElementById("city-name")
const tripCost=document.getElementById("trip-cost")
const travellingForm = document.getElementById('travelingFrom')
//trip-cost
//cityna


city = [
    {
        id: 0,
        name: 'Paris, France',
        image:'assets/pics/PARIS 2.jpg',
        about:'The city of love and home to the Eiffel Tower.',
        cost: 674,
        people: 2
    },
    {
        id: 1,
        name: 'New York, USA',
        image:'assets/pics/nyc\ 5.jpg',
        about:'The city that never sleeps, featuring Times Square.',
        cost: 574,
        people: 2
    },

    {
        id: 2,
        name: 'Tokyo, Japan',
       image: 'assets/pics/tokyo.avif',
       about:'A bustling metropolis blending tradition and modernity.',
        cost: 574,
        people: 2
    },

    {
        id: 3,
        name: 'Swiss Alps, Switzerland',
       image: 'assets/pics/swiss\ 2.jpg',
       about:'Stunning mountain ranges perfect for skiing and hiking.',
        cost: 574,
        people: 2
    },


    {
        id: 4,
        name: 'Dubai, UAE',
       image: 'assets/pics/dubai\ 2.jpg',
       about:'Famous for the Burj Khalifa and luxury lifestyle.',
        cost: 574,
        people: 2
    },



    {
        id: 5,
        name: 'Sydney, Australia',
       image: 'assets/pics/sydney\ 3.jpg',
       about:'Home to the Opera House and stunning beaches.',
        cost: 574,
        people: 2
    },

    {
        id: 6,
        name: 'Rome, Italy',
       image: 'assets/pics/rome.jpg',
       about:'The Eternal City with ancient ruins and rich history.',
        cost: 574,
        people: 2
    },

    {
        id: 7,
        name: 'Bali, Indonesia',
       image: 'assets/pics/BALI\ 2.jpg',
       about:'A tropical paradise known for its beaches and temples.',
        cost: 574,
        people: 2
    },

   

    {
        id: 8,
        name: 'Maldives',
       image: 'assets/pics/maldives\ 2.jpg',
       about:"Idyllic islands famous for luxury resorts and clear waters.",
        cost: 574,
        people: 2
    },
   
];
console.log(city);

const mybox=document.getElementById("main-box")

if(mybox){
    city.forEach(singlecity => {
        // console.log(singlecity.image);
        //console.log(element.name);
       
        mybox.innerHTML += `<div class="city-card" onclick=" openForm()"  id="card-${singlecity.id}"  style="background-image: url('${singlecity.image}');">
                        <div class="city-overlay">
                            <h4 class="city-name" >${singlecity.name}</h4>
                            <p class="desc-1">${singlecity.about}</p>
                             
                        </div>
                    </div>`;
    });

    mybox.addEventListener('click', function(e) 
{
    
    console.log(e);

    let clickedElement = e.target; // Get the clicked element
    let text = clickedElement.textContent; // Get its text content
    console.log("Clicked element text:", text);

    let cityName = clickedElement.querySelector(".city-name")?.textContent || "No .city-name";

document.getElementById("destination").value = cityName;



document.getElementById("numPeople").value="1";

})
}

// this one should not

//     const element = document.querySelector('#card-8'); // Select the element you want to check
//      const parent = element.parentNode; // Get the parent of the element

// if (element != parent.lastElementChild) {
   
// } 





// console.log(cityName);
//     let ele = e.target.id;
//     if(ele && ele.includes('city')){
//         console.log(document.querySelector(`#${ele}`).innerHTML)
//     }
   
    // console.log(ele.include())







// chat



// mybox.addEventListener('click', function (e) {
//     let clickedElement = e.target.closest(".city-card"); // Find the nearest .city-card
//     if (!clickedElement) return; // Exit if not clicking on a card
    
//     let cityNameElement = clickedElement.querySelector(".city-name");

//     if (cityNameElement) {
//         document.getElementById("destination").value = cityNameElement.textContent;
//     } else {
//         document.getElementById("destination").value = "Custom Destination"; // Handle last card
//     }

//     document.getElementById("numPeople").value = "1";
// });


// function addtwonumbers(a,b){
// let c =a+b;
// return c; 
// }

// console.log(addtwonumbers(2,4));





function openForm() {
    document.getElementById("cityForm").style.display = "block";
}

function closeForm() {
    document.getElementById("cityForm").style.display = "none";
}











//as

function toggleFields() {
    const tripType = document.getElementById("tripType").value;
    const travelersField = document.getElementById("travelersField");
    const numPeopleInput = document.getElementById("numPeople");

    if (tripType === "Solo" || tripType === "") {
        travelersField.style.display = "none";
        numPeopleInput.value = "";
        numPeopleInput.removeAttribute("readonly");
    } else {
        travelersField.style.display = "block";
    }

    if (tripType === "Couple") {
        numPeopleInput.value = "2";
        numPeopleInput.setAttribute("readonly", true);
    } else {
        numPeopleInput.value = "";
        numPeopleInput.removeAttribute("readonly");
    }
}



function validateField(id) {
    const field = document.getElementById(id);
    const warning = document.getElementById(id + "-warning");

    if (!field.value.trim()) {
        field.classList.add("error");
        warning.style.display = "block";
    } else {
        field.classList.remove("error");
        warning.style.display = "none";
    }
}




function submitForm() {
    const fields = ["travelingFrom", "destination", "tripType", "budget", "numDays"];
    let isValid = true;

    fields.forEach(field => {
        validateField(field);
        if (!document.getElementById(field).value.trim()) {
            isValid = false;
        }
    });

    const tripType = document.getElementById("tripType").value;
    const numPeople = document.getElementById("numPeople").value;
    
    if (tripType !== "Solo" && !numPeople.trim()) {
        validateField("numPeople");
        isValid = false;
    }

    if (!isValid) return;

    alert("Form submitted successfully!");
}
// Javascript for video slider navigation

const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
let currentIndex = 0;
let interval;

// Function to change video slides
const sliderNav = (manual) => {
    btns.forEach((btn) => btn.classList.remove("active"));
    slides.forEach((slide) => slide.classList.remove("active"));

    btns[manual].classList.add("active");
    slides[manual].classList.add("active");

    currentIndex = manual; // Update current index
};

// Function for auto-sliding every 5 seconds
const autoSlide = () => {
    interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        sliderNav(currentIndex);
    }, 5000); // Change slide every 5 seconds
};

// Event listeners for manual slide control
btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        clearInterval(interval); // Stop auto sliding when clicked
        sliderNav(i);
        autoSlide(); // Restart auto sliding
    });
});

sliderNav(0); // Initialize first slide
autoSlide();  // Start auto sliding
