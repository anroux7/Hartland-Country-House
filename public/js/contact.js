document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("fq3k-VX3RFjwcvsY0"); // Replace with your actual EmailJS public key
  
    const form = document.getElementById("contact-form");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const formData = {
        from_name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        contact: document.getElementById("contact").value,
        message: document.getElementById("message").value,
        date: new Date().toLocaleString(), // Automatically adds submission date
        to_name: "Hartland Country House", // Optional: Change dynamically if needed
      };
  
      emailjs.send("service_76pl2bn", "template_zwbzutl", formData)
        .then(
          () => {
            alert("Message sent successfully!");
            form.reset();
          },
          (error) => {
            alert("Failed to send message. Please try again.");
            console.error("Error:", error);
          }
        );
    });
  });
  