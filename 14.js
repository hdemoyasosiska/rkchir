document.addEventListener("DOMContentLoaded", function() {
    var listItems = document.querySelectorAll("#customList li");
  
    listItems.forEach(function(item) {
      item.addEventListener("click", function(event) {
        var ctrlPressed = event.ctrlKey || event.metaKey; // для поддержки Cmd на Mac
        if (ctrlPressed) {
          this.classList.toggle("selected");
        } else {
          listItems.forEach(function(li) {
            li.classList.remove("selected");
          });
          this.classList.add("selected");
        }
  
        event.preventDefault(); // предотвращаем стандартное выделение текста
      });
    });
  });
  