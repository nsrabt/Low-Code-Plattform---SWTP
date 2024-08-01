<template>
    <navbar />
    <div class="pdf-viewer-container">
        <iframe v-if="pdfDataUrl" :src="pdfDataUrl" frameborder="0" width="100%" height="900px"
            title="PDF Document"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pdfDataUrl: null,
        };
    },
    created() {
        // Retrieve the base64 data from sessionStorage
        const base64Data = sessionStorage.getItem('pdfBase64');
        if (base64Data) {
            this.pdfDataUrl = `data:application/pdf;base64,${base64Data}`;
        } else {
            console.error('No PDF data found in sessionStorage');
        }
    },
};
</script>

<style scoped>
.pdf-viewer-container {
    margin: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
