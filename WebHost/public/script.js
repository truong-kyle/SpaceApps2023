document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const imagePreview = document.getElementById('imagePreview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        }
        
        reader.readAsDataURL(file);
    }
});

function uploadImage() {
    const formData = new FormData();
    const imageInput = document.getElementById('imageInput');
    formData.append('photo', imageInput.files[0]);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').textContent = `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
