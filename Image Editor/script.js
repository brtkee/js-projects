const filters          = document.querySelectorAll('.filter');
const rangeInputEl     = document.querySelector('#range');
const rangeValue       = document.querySelector('#range-value');
const currentFilter    = document.querySelector('#current-filter');
const imageEl          = document.querySelector('#image');
const resetFilterBtn   = document.querySelector('#reset-filters');
const chooseImageBtn   = document.querySelector('#choose-image');
const inputFile        = document.querySelector('#file-input');
const saveImageBtn     = document.querySelector('#save-image');

let appliedFilters = []; 

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        filter.classList.toggle('scale');

        if (filter.classList.contains('scale')) {
            appliedFilters.push(filter.innerHTML.toLowerCase()); 
        } else {
            appliedFilters = appliedFilters.filter(f => f !== filter.innerHTML.toLowerCase()); 
        }

        currentFilter.innerText = appliedFilters.join(', '); 

        applyFilters(); 
    });
});

function applyFilters() {
    let filterValue = appliedFilters.map(filter => `${filter}(${rangeInputEl.value}%)`).join(' ');
    imageEl.style.filter = filterValue;
}

rangeInputEl.addEventListener('input', () => {
    rangeValue.innerText = `${rangeInputEl.value}%`;

    applyFilters(); 
});

chooseImageBtn.addEventListener('change', () => {
    const [file] = inputFile.files;

    if (file) {
        imageEl.src = URL.createObjectURL(file);
        appliedFilters = [];
        imageEl.style.filter = ''; 
        currentFilter.innerText = ''; 
    }
});

saveImageBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageEl.width;
    canvas.height = imageEl.height;
    canvas.style.filter = imageEl.style.filter;
    ctx.drawImage(imageEl, 0, 0, canvas.width, canvas.height);

    const downloadLink = document.createElement('a');
    downloadLink.href = canvas.toDataURL('image/png');
    downloadLink.download = 'filtered-image.png';

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink); 
});
