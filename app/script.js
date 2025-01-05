const fileInput = document.getElementById('fileInput');
const browseButton = document.getElementById('browseButton');
const submitButton = document.getElementById('submitButton');
const resultDiv = document.getElementById('result');
const uploadedFileDiv = document.getElementById('uploadedFile');
const resetButton = document.getElementById('resetButton');

// Handle file selection via button
browseButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
        uploadedFileDiv.textContent = `Selected file: ${file.name}`;
        uploadedFileDiv.classList.remove('hidden');
        browseButton.classList.add('hidden');
        submitButton.classList.remove('hidden');
    } else {
        uploadedFileDiv.textContent = 'No file selected';
    }
});

submitButton.addEventListener('click', async () => {
    const file = fileInput.files[0];

    if (!file) {
        resultDiv.textContent = 'Please select an image.';
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        resultDiv.textContent = 'Predicting...';
        const response = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Prediction failed.');
        }

        const data = await response.json();
        resultDiv.textContent = `Prediction: ${data.class} (Confidence: ${(data.confidence * 100).toFixed(2)}%)`;
        submitButton.classList.add('hidden');
        resetButton.classList.remove('hidden');
    } catch (error) {
        resultDiv.textContent = 'Error: Unable to process the prediction.';
    }
});

resetButton.addEventListener('click', () => {
    fileInput.value = '';
    resultDiv.textContent = 'Upload an image to see predictions';
    uploadedFileDiv.textContent = 'No file selected';
    uploadedFileDiv.classList.add('hidden');
    resetButton.classList.add('hidden');
    browseButton.classList.remove('hidden');
});
