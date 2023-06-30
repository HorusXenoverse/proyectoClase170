AFRAME.registerComponent("markerhandler",{
    init: async function(){
        this.el.addEventListener("markerFound", ()=>{
            console.log("Marcador encontrado")
            this.handlerMarkerFound()
        })

        this.el.addEventListener("markerLost", ()=>{
            console.log("Marcador perdido")
            this.handlerMarkerLost()
        })
    },

    handlerMarkerFound: function(){
        var buttons = document.getElementById("button-div")
        buttons.style.display = "flex"

        var order_button = document.getElementById("order-button")
        var raiting_button = document.getElementById("raiting-button")

        order_button.addEventListener("click", function(){
            swal({
                icon: "https://i.imgur.com/4NZ6uLY.jpg", title: "Gracias por tu pedido", text: "recibirás tu juguete pronto"
            })
        })

        raiting_button.addEventListener("click", function(){
            swal({
                icon: "warning", title: "Calificar juguete", text: "Gracias por calificar"
            })
        })
    },

    handlerMarkerLost: function(){
        var buttons = document.getElementById("buttons")
        buttons.style.display = "none"
    }
})