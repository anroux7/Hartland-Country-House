document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("JQl2DwSabh9P5wKZG"); // Initialize EmailJS

    const form = document.getElementById("contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop default form submission

        console.log("Form submission started..."); // Debugging

        const formData = {
            from_name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            contact: document.getElementById("contact").value,
            message: document.getElementById("message").value,
            date: new Date().toLocaleString(),
            to_name: "Hartland Country House",
        };

        console.log("Form Data:", formData); // Debugging

        emailjs.send("service_15lxes1", "template_5jsi2gy", formData)
            .then(
                (response) => {
                    console.log("Email sent successfully!", response);
                    alert("Message sent successfully!");
                    form.reset();
                },
                (error) => {
                    console.error("EmailJS Error:", error);
                    alert("Failed to send message. Please try again.");
                }
            );
    });
});
