
document.querySelectorAll(".item").forEach(element => {
    if(element.classList.contains("active")) {
      element.classList.remove("active")
    }
    element.addEventListener("click", function(e) {
      
      if(document.querySelector(".item.active")) {
        document.querySelector(".item.active").classList.remove("active")
      }
      if(element.classList.contains("active")) {
        element.classList.remove("active")
      } else {
        element.classList.add("active")
      }
  
    })
  })