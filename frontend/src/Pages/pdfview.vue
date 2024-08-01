<template>
    <div>
        <navbar />

        <!-- Container for iframe displaying PDF from base64 -->
        <div class="iframe-container">
            <iframe v-if="pdfDataUrl" :src="pdfDataUrl" frameborder="0" width="100%" height="500px"
                title="PDF Document"></iframe>
        </div>

        <!-- Save Button -->
        <button class="save-button" @click="save">Save</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pdfBase64: null, // This will hold the base64 string for the PDF
            pdfDataUrl: null, // This will hold the data URL for the PDF
        };
    },
    created() {
        this.fetchPdfData();
    },
    methods: {
        async fetchPdfData() {
            try {
                // Simulating a fetch request to get PDF data from the database
                const response = await fetch('/api/APihieraendern'); 
                const pdfBlob = await response.blob();

                // Convert the Blob to base64
                this.pdfBase64 = await this.convertBlobToBase64(pdfBlob);

                // Create the data URL for the iframe
                this.pdfDataUrl = `data:application/pdf;base64,${this.pdfBase64}`;
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        },
        convertBlobToBase64(blob) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result.split(',')[1]; // Extract base64 from Data URL
                    resolve(base64data);
                };
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(blob);
            });
        },
        save() {
            // Implement your save logic here
            console.log("Save button clicked");
        },
    },
};
</script>

<style scoped>
.iframe-container {
    margin: 20px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
}

.save-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.save-button:hover {
    background-color: #45a049;
}
</style>
