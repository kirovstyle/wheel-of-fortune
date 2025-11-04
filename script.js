const wheel = document.getElementById('wheel');
const ctx = wheel.getContext('2d');

const radius = Math.min(wheel.width / 2, wheel.height / 2);

function drawSegment(angleStart, angleEnd, color, text) {
    ctx.beginPath();
    ctx.moveTo(radius, radius); // Центр круга
    ctx.arc(radius, radius, radius, angleStart, angleEnd);
    ctx.lineTo(radius, radius);
    ctx.fillStyle = color;
    ctx.fill();

    // Рисуем текст внутри сегмента
    let midAngle = (angleStart + angleEnd) / 2;
    let x = radius + (radius * 0.5) * Math.cos(midAngle);
    let y = radius + (radius * 0.5) * Math.sin(midAngle);
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
}

function drawWheel() {
    const segments = ['Приз', 'Попробуй снова!', 'Выигрыш!', 'Обнуление'];
    const colors = ['#ffa500', '#00bfff', '#00ff00', '#ff0000'];

    for(let i = 0; i < segments.length; i++) {
        let startAngle = (i * Math.PI * 2) / segments.length;
        let endAngle = ((i+1) * Math.PI * 2) / segments.length;

        drawSegment(startAngle, endAngle, colors[i], segments[i]);
    }
}

drawWheel(); // Отображаем начальное состояние колеса

let rotationAngle = 0;
let isSpinning = false;

function spinWheel() {
    if(isSpinning) return;
    isSpinning = true;

    const randomSpinTime = Math.random() * 5000 + 5000; // случайное вращение от 5 до 10 секунд
    const finalRotation = Math.floor(Math.random() * 4) * Math.PI * 2; // конечный угол поворота

    requestAnimationFrame(function spin(timestamp) {
        rotationAngle += timestamp / 1000; // увеличиваем угол постепенно
        ctx.clearRect(0, 0, wheel.width, wheel.height);
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(rotationAngle % (Math.PI * 2));
        ctx.translate(-radius, -radius);
        drawWheel();
        ctx.restore();

        if(rotationAngle >= finalRotation && !isNaN(finalRotation)) { // останавливаемся
            setTimeout(() => {
                alert(`Ваш выигрыш: ${segments[(finalRotation/(Math.PI*2)*segments.length)%segments.length]}`);
                isSpinning = false;
            }, 1000);
        } else {
            requestAnimationFrame(spin);
        }
    });
}