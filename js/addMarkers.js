AFRAME.registerComponent("addmarker",{
    init: async function(){
        var saveScene = document.querySelector("#mainScene")
        var dishes = await this.getDishes()
        dishes.map(dish =>{
            var marker = document.createElement("a-marker")
            marker.setAttribute("id", dish.id)
            marker.setAttribute("type", "pattern")
            marker.setAttribute("url", dish.marker_pattern_url)
            marker.setAttribute("cursor", {rayOrigin: "mouse"}) 
            marker.setAttribute("markerhandler", {})

            saveScene.appendChild(marker)

            var model = document.createElement("a-entity")
            model.setAttribute("id", `model-${dish.id}`)
            model.setAttribute("position", dish.model_geometry.position)
            model.setAttribute("rotation", dish.model_geometry.rotation)
            model.setAttribute("scale", dish.model_geometry.scale)
            model.setAttribute("gltf-model", `url(${dish.model_url})`)
            model.setAttribute("gesture-handler", {})

            marker.appendChild(model)

            
            var Juguete = document.createElement("a-plane")
            Juguete.setAttribute("id", `plane-${dish.id}`)
            Juguete.setAttribute("position", {x: 0, y: 0, z: 0})
            Juguete.setAttribute("rotation", {x: -90, y: 0, z: 0} )
            Juguete.setAttribute("width", 1.7)
            Juguete.setAttribute("height", 1.5)

            marker.appendChild(Juguete)

            var title = document.createElement("a-plane")
            title.setAttribute("id", `planeTitle-${dish.id}`)
            title.setAttribute("position", {x: 0, y: 0.89, z: 0.02})
            title.setAttribute("rotation", {x: 0, y: 0, z: 0} )
            title.setAttribute("width", 1.69)
            title.setAttribute("height", 0.3)
            title.setAttribute("material", {color: "#F0C30F"})

            ingredientes.appendChild(title)

            var titleText = document.createElement("a-entity")
            titleText.setAttribute("id", `titleText-${dish.id}`)
            titleText.setAttribute("position", {x: 0, y: 0, z: 0.1})
            titleText.setAttribute("rotation", {x: 0, y: 0, z: 0} )
            titleText.setAttribute("text", {
                font: "monoid",
                color: "black",
                width: 1.8,
                height: 1,
                align: "center",
                value: dish.nombre.toUpperCase()
            })

            title.appendChild(titleText)

            var ingText = document.createElement("a-entity")
            ingText.setAttribute("id", `ingText-${dish.id}`)
            ingText.setAttribute("position", {x: 0.3, y: 0, z: 0.1})
            ingText.setAttribute("rotation", {x: 0, y: 0, z: 0} )
            ingText.setAttribute("text", {
                font: "monoid",
                color: "black",
                width: 1.8,
                height: 1,
                align: "left",
                value: `${dish.Juguete.join("\n\n")}`
            })

            Juguete.appendChild(ingText)
        })

    },
    getDishes: async function(){
        return await firebase
        .firestore()
        .collection("juguetes")
        .get()
        .then(snap=>{
            return snap.docs.map(doc=>doc.data())
        })
    }
})