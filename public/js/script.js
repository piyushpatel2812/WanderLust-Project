// JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//  flatpicker 

flatpickr("#dateRange", {
  mode: "range",
  minDate: "today",
  // inline: true,

  onChange: function(selectedDates) {
    if (selectedDates.length === 2) {

      let checkIn = selectedDates[0];
      let checkOut = selectedDates[1];

      // set hidden fields
      document.getElementById("checkIn").value = checkIn;
      document.getElementById("checkOut").value = checkOut;

      // calculate nights
      let nights = (checkOut - checkIn) / (1000 * 60 * 60 * 24);

      // listing price (EJS se lo)
      let pricePerNight = listing.price;

      let total = nights * pricePerNight;

      // show on UI
      document.getElementById("totalPrice").innerText =
        `Total: ₹${total} for ${nights} nights`;
    }
  }
});