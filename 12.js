let notificationCounter = 0; // Исходное количество уведомлений
let newNotificationCounter = 0; // Счетчик новых уведомлений
let isPaused = false;
let notificationsContainer = document.querySelector('.notifications');
let flag = 0;

function createNewNotification() {
  const newNotification = document.createElement('div');
  newNotification.className = 'notification';
  newNotification.style.position = 'relative';

  const notificationText = document.createElement('p');
  notificationText.textContent = `Новое уведомление ${++newNotificationCounter}`;
  newNotification.appendChild(notificationText);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Закрыть';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '0';
  closeButton.style.right = '0';
  closeButton.addEventListener('click', function () {
    newNotificationCounter--;
    document.querySelector('.notification-count').textContent = notificationCounter + newNotificationCounter;
    newNotification.remove();
  });
  newNotification.appendChild(closeButton);

  notificationsContainer.appendChild(newNotification);

  // ... Остальной код остается без изменений


  if (isPaused) {
    isPaused = false;
    return;
  }

  document.querySelector('.notification-count').textContent = notificationCounter + newNotificationCounter;

  if (notificationCounter + newNotificationCounter >= 7) {
    return;
  } else if (notificationCounter + newNotificationCounter > 0) {
    setTimeout(createNewNotification, 1000);
  } else {
    return;
  }
}


function removeNotifications() {
  const firstChild = notificationsContainer.firstChild;

  if (firstChild) {
    let h = notificationsContainer.childElementCount;
    firstChild.remove();

    if(notificationsContainer.childElementCount!=h){
        newNotificationCounter--;
        document.querySelector('.notification-count').textContent = notificationCounter + newNotificationCounter;
        
    }
    setTimeout(removeNotifications, 1000);
  }


}

document.getElementById('notification-label').onclick = function () {
  if (!isPaused) {
    isPaused = true;
    setTimeout(createNewNotification, 10000);
  }
};

createNewNotification();

function createList() {
  const list = document.getElementById('list');


  function addListItem() {
    let listItemContent = prompt('Ввод');

    if (!listItemContent) {
      return; // Прерываем добавление при пустом вводе
    }

    let listItem = document.createElement('li');
    listItem.textContent = listItemContent;
    list.appendChild(listItem);
    

  }

  // Добавляем кнопку для вызова функции добавления элемента
  const addButton = document.createElement('button');
  addButton.textContent = 'Добавить элемент';
  addButton.addEventListener('click', addListItem);
  document.body.appendChild(addButton);
}

  
  createList();