var modal = document.querySelector(".modal-overlay");
var closeModal = modal.querySelector(".close-modal")
var cards = document.querySelectorAll(".card");
let iframe = modal.querySelector("iframe");

 
for (let card of cards) {
    let videoID = card.id;
  
    card.addEventListener("click", function () {
        modal.classList.add("active");
        iframe.src = `https://www.youtube.com/embed/${videoID}?autoplay=1&showinfo=0&fs=1&rel=0&iv_load_policy=3&allowfullscreen=1`
        window.location.href = `/video?id=${videoID}`

    }

    )

}

