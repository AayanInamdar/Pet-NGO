document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    fetch("signup.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.error);
        })
        .catch(error => console.error("Error:", error));
});


<
script >
    document.getElementById("signin-form").addEventListener("submit", function(event) {
        event.preventDefault();

        let formData = new FormData(this);

        fetch("signin.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert("Welcome, " + data.name);
                } else {
                    alert(data.error);
                }
            })
            .catch(error => console.error("Error:", error));
    }); <
/script>