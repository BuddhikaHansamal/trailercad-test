function loadSection(section) {
    let content = document.getElementById("content");

    switch (section) {
        case 'description':
            content.innerHTML = `
             <h2>Description</h2>
                <div class="scrollable-pdf-container">
                    <iframe id="pdf-viewer" src="../data/description.pdf" width="100%" height="100%"></iframe>
                </div>`;
            break;

        case 'rendering':
            content.innerHTML = ` <h2>Rendering Photos</h2>
<div class="rendering-gallery">
    <img id="main-image" src="../images/image-01.webp" alt="Large Rendering Image">
    <div class="thumbnail-container">
        <img class="thumbnail" src="../images/image-01.webp" onclick="changeImage(0)">
        <img class="thumbnail" src="../images/image-02.webp" onclick="changeImage(1)">
        <img class="thumbnail" src="../images/image-03.webp" onclick="changeImage(2)">
        <img class="thumbnail" src="../images/image-04.webp" onclick="changeImage(3)">
        <img class="thumbnail" src="../images/image-02.webp" onclick="changeImage(4)">
    </div>
</div>`;
            break;

        case 'drawings':
            content.innerHTML = `<h2>2D Drawings</h2>
<div class="drawing-gallery">
    <img id="main-drawing" src="../images/drw-03.webp" alt="Large Drawing Image">
   <div class="thumbnail-container">
        <img class="thumbnail" src="../images/drw-03.webp" onclick="changeDrawing(0)">
        <img class="thumbnail" src="../images/drw-04.webp" onclick="changeDrawing(1)">
        <img class="thumbnail" src="../images/drw-03.webp" onclick="changeDrawing(2)">
        <img class="thumbnail" src="../images/drw-04.webp" onclick="changeDrawing(3)">
        <img class="thumbnail" src="../images/drw-03.webp" onclick="changeDrawing(4)">
    </div>
    </div>`;
            break;

        case 'part-list':
            content.innerHTML = `<h2>Part List</h2>
            <div class="scrollable-table-container">
    <table id="part-list-table">
        <thead>
            <tr>
                <th>No</th>
                <th>Name of Part</th>
                <th>Qty</th>
                <th>Drawing No</th>
                <th>Material</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>`;
// Load Excel data dynamically
loadExcelData("../data/part-list.xlsx", "part-list-table");
            break;

        case 'material-list':
        content.innerHTML = `<h2>Material List</h2>
            <div class="scrollable-table-container">
    <table id="material-list-table">
        <thead>
            <tr>
                <th>No</th>
                <th>Item code</th>
                <th>Description</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Remarks</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>`;
// Load Excel data dynamically
loadExcelData("../data/material list.xlsx", "material-list-table");
            break;

        case 'cutting-plan':
            content.innerHTML = `<h2>Cutting Plan</h2><p>Detailed material list will be displayed here.</p>`;
            break;

        case 'prefab':
        content.innerHTML = `
             <h2>Prefab</h2>
                <div class="scrollable-pdf-container">
                    <iframe id="pdf-viewer" src="../data/prefab.pdf" width="100%" height="100%"></iframe>
                </div>`;
            break;

        case 'fabrication':
        content.innerHTML = `
             <h2>Fabrication</h2>
                <div class="scrollable-pdf-container">
                    <iframe id="pdf-viewer" src="../data/fabrication.pdf" width="100%" height="100%"></iframe>
                </div>`;
            break;

        case 'line':
        content.innerHTML = `
             <h2>Line</h2>
                <div class="scrollable-pdf-container">
                    <iframe id="pdf-viewer" src="../data/line.pdf" width="100%" height="100%"></iframe>
                </div>`;
            break;

        case 'painting':
        content.innerHTML = `
             <h2>Painting</h2>
                <div class="scrollable-pdf-container">
                    <iframe id="pdf-viewer" src="../data/painting.pdf" width="100%" height="100%"></iframe>
                </div>`;
            break;

        case 'assembly':
        content.innerHTML = `
             <h2>Assembling</h2>
                <div class="scrollable-pdf-container">
                    <iframe id="pdf-viewer" src="../data/assembly.pdf" width="100%" height="100%"></iframe>
                </div>`;
            break;

        case 'inspection':
        content.innerHTML = `
             <h2>Inspection</h2>
                <div class="scrollable-pdf-container">
                    <iframe id="pdf-viewer" src="../data/inspection.pdf" width="100%" height="100%"></iframe>
                </div>`;
            break;

        case 'maintenance':
        content.innerHTML = `
             <h2>Maintenance</h2>
                <div class="scrollable-pdf-container">
                    <iframe id="pdf-viewer" src="../data/Maintenance Instruction.pdf" width="100%" height="100%"></iframe>
                </div>`;
            break;

        case 'spare':
        content.innerHTML = `
             <h2>Spare part list</h2>
                <div class="scrollable-pdf-container">
                    <iframe id="pdf-viewer" src="../data/Sparepart List.pdf" width="100%" height="100%"></iframe>
                </div>`;
            break;
    }
}

function loadWordFile(filePath, containerId) {
fetch(filePath)
.then(response => response.arrayBuffer())
.then(data => {
    let reader = new FileReader();
    reader.onload = function(event) {
        let arrayBuffer = event.target.result;
        Mammoth.convertToHtml({ arrayBuffer: arrayBuffer })
            .then(function(result) {
                document.getElementById(containerId).innerHTML = result.value;
            })
            .catch(error => console.error("Error loading Word file:", error));
    };
    reader.readAsArrayBuffer(new Blob([data]));
})
.catch(error => console.error("Error fetching Word file:", error));
}

function toggleDropdown() {
    let dropdown = document.querySelector(".dropdown-content");
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
}

$(document).on("mouseenter", ".zoomable", function () {
    $(this).css("transform", "scale(1.5)");
}).on("mouseleave", ".zoomable", function () {
    $(this).css("transform", "scale(1)");
});

let images = [
"../images/image-01.jpg",
"../images/image-02.jpg",
"../images/image-03.jpg",
"../images/image-01.jpg",
"../images/image-02.jpg"
];
let currentIndex = 0;
let autoSlideInterval;

function changeImage(index) {
document.getElementById("main-image").src = images[index];
currentIndex = index; // Update the current index to prevent jumping
resetAutoSlide();
}

function autoSlideImages() {
autoSlideInterval = setInterval(() => {
currentIndex = (currentIndex + 1) % images.length;
document.getElementById("main-image").src = images[currentIndex];
}, 3000);
}

function resetAutoSlide() {
clearInterval(autoSlideInterval);
autoSlideImages();
}

document.addEventListener("DOMContentLoaded", () => {
autoSlideImages();
});

let drawings = [
"../images/drawing1.jpg",
"../images/drawing2.jpg",
"../images/drawing3.jpg",
"../images/drawing4.jpg",
"../images/drawing5.jpg"
];
let drawingIndex = 0;
let autoSlideDrawings;

function changeDrawing(index) {
document.getElementById("main-drawing").src = drawings[index];
drawingIndex = index; // Update the index to prevent jumping
resetAutoSlideDrawings();
}

function autoSlideDrawingsFunc() {
autoSlideDrawings = setInterval(() => {
drawingIndex = (drawingIndex + 1) % drawings.length;
document.getElementById("main-drawing").src = drawings[drawingIndex];
}, 3000);
}

function resetAutoSlideDrawings() {
clearInterval(autoSlideDrawings);
autoSlideDrawingsFunc();
}

document.addEventListener("DOMContentLoaded", () => {
autoSlideDrawingsFunc();
});

function loadExcelData(filePath, tableId) {
fetch(filePath)
.then(response => response.arrayBuffer())
.then(data => {
    let workbook = XLSX.read(data, { type: "array" });
    let sheetName = workbook.SheetNames[0]; // Read the first sheet
    let sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

    let tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = ""; // Clear previous rows

    sheet.slice(1).forEach(row => { // Skip header row
        let tr = document.createElement("tr");
        row.forEach(cell => {
            let td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    });
})
.catch(error => console.error("Error loading Excel file:", error));
}