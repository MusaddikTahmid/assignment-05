// Maximum number of seats allowed to be selected
const maxSeats = 4;

// Array to store selected seats
const selectedSeats = [];

// Function to toggle seat selection
function toggleSeatSelection(seat) {
  const seatName = seat.textContent.trim();
  const isSelected = seat.classList.toggle("selected");
  const index = selectedSeats.findIndex(
    (selectedSeat) => selectedSeat.name === seatName
  );

  if (isSelected && selectedSeats.length >= 4) {
    seat.classList.remove("selected");
    alert("You can only select up to 4 seats.");
    return;
  }

  if (isSelected && index === -1) {
    selectedSeats.push(seatName);
  } else {
    selectedSeats.splice(index, 1);
  }
  updateSeatCount();
}

// Function to update seat count
function updateSeatCount() {
  const totalSeats = document.querySelectorAll(".seat").length;
  const selectedCount = selectedSeats.length;
  const remainingCount = totalSeats - selectedCount;

  document.getElementById("totalSeat").innerText = remainingCount;
  const selectedBookingSeats = document.getElementById("selectedBookingSeats");
  selectedBookingSeats.innerHTML = ""; // Clear previous content

  selectedSeats.forEach((seatName) => {
    const seatElement = document.createElement("div");
    seatElement.classList.add("flex", "justify-between", "my-4");
    seatElement.innerHTML = `
      <p class="text-[#03071299]">${seatName}</p>
      <p class="text-[#03071299]">Economy</p>
      <p class="text-[#03071299]">550</p>
    `;
    selectedBookingSeats.appendChild(seatElement);
  });

  document.getElementById("SeatCountToolTip").innerText = selectedSeats.length;

  document.getElementById("totalTicketPrice").innerText =
    selectedSeats.length * 550;
}

// Add click event listeners to seats
const seats = document.querySelectorAll(".seat");
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    toggleSeatSelection(seat);
  });
});
