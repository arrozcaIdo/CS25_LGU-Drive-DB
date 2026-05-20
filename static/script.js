const modalOverlay = document.getElementById("modalOverlay");

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const cancelBtn = document.getElementById("cancelBtn");

const carType = document.getElementById("CarType");
const passengerFields = document.getElementById("passengerFields");

const searchInput = document.getElementById("searchInput");

const tableRows = document.querySelectorAll("#vehicleTable tbody tr");

// OPEN MODAL

openModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

// CLOSE MODAL

function closeModal() {
  modalOverlay.style.display = "none";
}

closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// CLOSE IF OUTSIDE

modalOverlay.addEventListener("click", (e) => {

  if(e.target === modalOverlay){
    closeModal();
  }

});

// SHOW PASSENGER FIELDS

function togglePassengerFields(){

  if(carType.value === "Passenger Car"){
    passengerFields.style.display = "block";
  }

  else{
    passengerFields.style.display = "none";
  }

}

carType.addEventListener("change", togglePassengerFields);

togglePassengerFields();

// SEARCH FILTER

searchInput.addEventListener("keyup", () => {

  const value = searchInput.value.toLowerCase();

  tableRows.forEach((row) => {

    const text = row.innerText.toLowerCase();

    if(text.includes(value)){
      row.style.display = "";
    }

    else{
      row.style.display = "none";
    }

  });

});