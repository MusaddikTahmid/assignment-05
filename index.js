// Array to store selected seats
const selectedSeats = [];
let totalPrice;

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
    selectedSeats.push({ name: seatName, price: 550 }); // Push seat data to the main array
    seat.classList.remove("bg-[#F7F8F8]");
    seat.classList.add("bg-[#1DD100]");
  } else {
    if (index !== -1) {
      selectedSeats.splice(index, 1); // Remove deselected seat from the main array
    }
    seat.classList.remove("bg-[#1DD100]");
    seat.classList.add("bg-[#F7F8F8]");
  }
  updateSeatCount();
  updateNextButtonState();
}

// Function to update seat count
function updateSeatCount() {
  const totalSeats = document.querySelectorAll(".seat").length;
  const selectedCount = selectedSeats.length;
  const remainingCount = totalSeats - selectedCount;

  document.getElementById("totalSeat").innerText = remainingCount;
  const selectedBookingSeats = document.getElementById("selectedBookingSeats");
  selectedBookingSeats.innerHTML = ""; // Clear previous content

  selectedSeats.forEach((seatData) => {
    const seatElement = document.createElement("div");
    seatElement.classList.add("flex", "justify-between", "my-4");
    seatElement.innerHTML = `
      <p class="text-[#03071299]">${seatData.name}</p>
      <p class="text-[#03071299]">Economy</p>
      <p class="text-[#03071299]">${seatData.price}</p>
    `;
    selectedBookingSeats.appendChild(seatElement);
  });

  document.getElementById("SeatCountToolTip").innerText = selectedSeats.length;

  totalPrice = selectedSeats.reduce((acc, seatData) => acc + seatData.price, 0); // Calculate total price
  document.getElementById("totalTicketPrice").innerText = totalPrice;

  if (selectedSeats.length === 4) {
    document.getElementById("applyButton").classList.remove("btn-disabled");
  }
}
function handleCouponCode() {
  const inputValue = document.getElementById("couponCode").value;
  if (inputValue == "NEW15" && selectedSeats.length === 4) {
    const discountedPrice = totalPrice * (15 / 100);
    const grandTotalPrice = totalPrice - discountedPrice;
    document.getElementById("discountedDiv").classList.remove("hidden");
    document.getElementById("discountedDiv").classList.add("block");
    document.getElementById("totalDiscountedPrice").innerText = discountedPrice;
    document.getElementById("totalGrandPrice").innerText =
      parseInt(grandTotalPrice);
    document.getElementById("couponDiv").classList.add("hidden");
    return;
  } else if (inputValue == "Couple 20") {
    const discountedPrice = totalPrice * (20 / 100);
    const grandTotalPrice = totalPrice - discountedPrice;
    document.getElementById("discountedDiv").classList.remove("hidden");
    document.getElementById("discountedDiv").classList.add("block");
    document.getElementById("totalDiscountedPrice").innerText = discountedPrice;
    document.getElementById("totalGrandPrice").innerText =
      parseInt(grandTotalPrice);
    document.getElementById("couponDiv").classList.add("hidden");
    return;
  } else {
    document.getElementById("couponCode").value = "";
    alert(
      "You Have Entered The Wrong Coupon Or You Have To Select 4 Seats to Active The Coupon"
    );
  }
}

// next button

const phoneNumberInput = document.getElementById("phoneNumber");
phoneNumberInput.addEventListener("input", updateNextButtonState);

// Function to update next button state
function updateNextButtonState() {
  const phoneNumberValue = phoneNumberInput.value.trim();
  const nextButton = document.getElementById("nextButton");

  // Check if both seats are selected and phone number is entered
  if (selectedSeats.length > 0 && phoneNumberValue.length > 0) {
    nextButton.classList.remove("btn-disabled");
  } else {
    nextButton.classList.add("btn-disabled");
  }
}

function blockHidden() {
  document.getElementById("main").classList.remove("block");
  document.getElementById("main").classList.add("hidden");
  document.getElementById("success").classList.remove("hidden");
  document.getElementById("success").classList.add("block");
}
function handleContinue() {
  location.reload();
}
// Add click event listeners to seats
const seats = document.querySelectorAll(".seat");
seats.forEach((seat) => {
  seat.addEventListener("click", () => {
    toggleSeatSelection(seat);
  });
});
