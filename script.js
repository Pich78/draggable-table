class BoxContainer {
    constructor(canvas, numberOfBoxes, boxSize) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.numberOfBoxes = numberOfBoxes;
        this.boxSize = boxSize;
        this.canvas.width = Math.sqrt(numberOfBoxes) * boxSize;
        this.canvas.height = Math.sqrt(numberOfBoxes) * boxSize;
        this.drawBoxes();
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    drawBoxes() {
        const rows = Math.sqrt(this.numberOfBoxes);
        const cols = Math.sqrt(this.numberOfBoxes);
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.ctx.fillStyle = this.getRandomColor();
                this.ctx.fillRect(col * this.boxSize, row * this.boxSize, this.boxSize, this.boxSize);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const wrapper = document.querySelector('.wrapper');

    // Create a BoxContainer with 1600 boxes, each 50x50 pixels
    new BoxContainer(canvas, 1600, 50);

    // Center the canvas view
    wrapper.scrollLeft = (canvas.width - wrapper.clientWidth) / 2;
    wrapper.scrollTop = (canvas.height - wrapper.clientHeight) / 2;

    // Drag functionality
    let isDragging = false;
    let startX, startY, scrollLeft, scrollTop;

    wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        wrapper.style.cursor = 'grabbing';
        startX = e.pageX - wrapper.offsetLeft;
        startY = e.pageY - wrapper.offsetTop;
        scrollLeft = wrapper.scrollLeft;
        scrollTop = wrapper.scrollTop;
    });

    wrapper.addEventListener('mouseleave', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mouseup', () => {
        isDragging = false;
        wrapper.style.cursor = 'grab';
    });

    wrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const y = e.pageY - wrapper.offsetTop;
        const walkX = (x - startX) * 1.5; // Adjust the scroll speed for smoothness
        const walkY = (y - startY) * 1.5; // Adjust the scroll speed for smoothness
        wrapper.scrollLeft = scrollLeft - walkX;
        wrapper.scrollTop = scrollTop - walkY;
    });
});