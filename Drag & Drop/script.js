const items = document.querySelectorAll('.item');
const containers = document.querySelectorAll('.container');

items.forEach(item => {
    item.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
    
    item.addEventListener('dragover', (event) => event.target.classList.add('opacity-25'));

    item.addEventListener('dragleave', (event) => event.target.classList.remove('opacity-25'))
});

containers.forEach(container => {
    container.addEventListener('dragover', (event) => {
        event.preventDefault();
    });

    container.addEventListener('drop', (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(data);

        if (container.children.length === 0 || event.target === container) {
            container.append(draggedElement);            
        } else {
            container.insertBefore(draggedElement, event.target);
            event.target.classList.remove('opacity-25');
        }
    });
});
