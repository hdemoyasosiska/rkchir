//Получаем элемент фона с деревом
const bgTree = document.getElementById("background-tree");
 
//При движении мышью вызываем функцию, которая меняет положение фона
document.addEventListener("mousemove", function (e) { MoveBackground(e); });
 
function MoveBackground(e)
{
   //Рассчитываем, насколько далеко от начала оси находится курсор: 0 - 0, 0.5 - середина экрана, 1 - ширина экрана (например, 1920)
   //Затем умножаем получившееся число на 30 - настолько будет сдвигаться фон
   //Например, если курсор находится посередине страницы (0.5), то при умножении получится 15
   //Далее отнимаем половину от 30, чтобы фон мог двигаться как влево, так и вправо
   let offsetX = (e.clientX / window.innerWidth * 50) - 15;
   let offsetY = (e.clientY / window.innerHeight * 40) - 5;
 
   //Меняем положение фона
   bgTree.setAttribute("style", "background-position: " + offsetX + "px " + offsetY + "px;");
}


//Создаём класс для частиц
class Particle
{
   //Конструктор принимает положение частицы по трём осям и цвет
   constructor(x, y, z, color)
   {
       this.x = x;
       this.y = y;
       this.z = z;
 
       //Размытие и скорость зависят от положения частицы по оси Z
       //Чем выше частица, тем более размытой она будет и тем быстрее она будет двигаться
       let blurs = [ 0, 2, 1, 0 ];
 
       this.blur = blurs[z];
       this.speed = z;
       this.color = color;
   }
 
   //Метод движения частицы
   Move(d)
   {
       this.y += this.speed * d;
   }
}
 
//Позиция полосы прокрутки
let scrollPosition = 0;
 
//Получаем контейнер для частиц
const particlesContainer = document.getElementById("particles");
 
//Создаём массив с частицами
const particles =
[
   new Particle(250, 600, 3, "#FF7019"),
   new Particle(120, 700, 1, "#FF7019"),
   new Particle(220, 200, 3, "#FF7019"),
   new Particle(600, 300, 1, "#FF7019"),
   new Particle(900, 350, 4, "#FF7019"),
   new Particle(1200, 300, 2, "#FF7019"),
];
 
//Это функция вывода частицы на страницу
Fill();
 
//При каждой прокрутке вызываем функцию Scroll(), которая двигает частицы
window.addEventListener("scroll", function (e) { Scroll(e); });
 
function Scroll(e)
{
   //Определяем, в каком направлении была прокрутка
   let d = 0;
 
   if(window.pageYOffset > scrollPosition)
   {
       d = 1;
   }
   else
   {
       d = -1;
   }
  
   scrollPosition = window.pageYOffset;
 
   //Двигаем все частицы в заданном направлении
   for(let i = 0; i < particles.length; i++)
   {
       particles[i].Move(d);
   }
 
   //Выводим всё на страницу
   Fill();
}
 
function Fill()
{
   //Очищаем контейнер
   particlesContainer.innerHTML = "";
 
   //Создаём новые элементы с обновлёнными свойствами и помещаем их в контейнер
   for(let i = 0; i < particles.length; i++)
   {
       let div = document.createElement("div");
       div.className = "particle";
 
       div.setAttribute("style", "top: " + particles[i].y + "px; left: " + particles[i].x + "px; z-index: " + particles[i].z + "px; filter: blur(" + particles[i].blur + "px); background: " + particles[i].color + "; ");
       particlesContainer.appendChild(div);
   }
}
