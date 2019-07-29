addSelectionBoxes();
createTooltipButtons();

function addSelectionBoxes(){

    let color_container = document.querySelector(".color-bead-selection");
    let num_color_beads = 4;
    for (let i = 0; i < num_color_beads; ++i){

        let bracelet_pos;
        switch (i){
            case 0: bracelet_pos = 1;
                    break;
            case 1: bracelet_pos = 5;
                break;
            case 2: bracelet_pos = 7;
                break;
            case 3: bracelet_pos = 11;
        }
        let new_bead = document.createElement("div");
        new_bead.setAttribute("class", "color-bead");
        new_bead.setAttribute("id", "color-" + i);
        new_bead.setAttribute("bracelet-pos", bracelet_pos);
        new_bead.addEventListener("click", onBeadClicked, false )
        color_container.appendChild(new_bead);
    }

    let metal_container = document.querySelector(".metal-bead-selection");
    let num_metal_beads = 7;
    for (let i = 0; i < num_metal_beads; ++i){

        let bracelet_pos;
        switch (i){
            case 0: bracelet_pos = 2;
                    break;
            case 1: bracelet_pos = 3;
                break;
            case 2: bracelet_pos = 4;
                break;
            case 3: bracelet_pos = 6;
                    break;
            case 4: bracelet_pos = 8;
                    break;
            case 5: bracelet_pos = 9;
                    break;
            case 6: bracelet_pos = 10;
        }
        let new_bead = document.createElement("div");
        new_bead.setAttribute("class", "metal-bead");
        new_bead.setAttribute("id", "metal-" + i);
        new_bead.setAttribute("bracelet-pos", bracelet_pos);
        new_bead.addEventListener("click", onBeadClicked, false )
        metal_container.appendChild(new_bead);
    }
}

function addBead(){
    let container = document.querySelector(".bead-container");
    let tooltips = document.querySelectorAll(".tooltip");
    
    while (container.firstChild){
        container.removeChild(container.firstChild);
    }
    
    for (let i = 0; i < tooltips.length; ++i){
        container.appendChild(tooltips[i]);
        tooltips[i].style.display = "none";
    }
    let num_beads = 11;

    for (let i = 0; i < num_beads; ++i){

        let bead = document.createElement("div");

        bead.setAttribute("class", "bead");
        bead.setAttribute("id", "bead" + i);
        bead.addEventListener("click", onBeadClicked, false )
        
        container.appendChild(bead);
        let containerWidth = container.offsetWidth /2 ;
        container.setAttribute("style", "margin-left: -" + containerWidth +"px;");
    }
}


let clicked_bead_id = null;

function onBeadClicked(e){
    let target = e.target;
    if (target.className !== "metal-bead" && target.className !== "color-bead" && target.className !== "bracelet-bead"){
        return;
    }

    if (target.className === "bracelet-bead"){
        target = target.parentNode;
    }
    
    if (target.className === "color-bead"){
        
        openTooltip("color", target);
        
        hideTooltip("metal");
    }
    else if (target.className === "metal-bead"){
        
        openTooltip("metal", target);

        hideTooltip("color");

    }
}

function openTooltip(type, target){
    let tooltip = document.querySelector("#" + type + "-tooltip");

    tooltip.style.display = "block";

    target.appendChild(tooltip);
    clicked_bead_id = target.getAttribute("id");

}
function hideTooltip(type){

    let tooltip = document.querySelector("#" + type + "-tooltip");

    tooltip.style.display = "none";
}



loadBeads()

function loadBeads(){
    let color_tooltip = document.querySelector(".color-bead-box");
    let metal_tooltip = document.querySelector(".metal-bead-box");

    for (let i = 0; i < jsonObject.length; ++i){
        
        let div = document.createElement('div');
        div.setAttribute("class", "bead-img");

        let beadImg = document.createElement("img");
        beadImg.setAttribute("src", "images/beads/" + jsonObject[i].path);
        beadImg.addEventListener("click", setBead);
        beadImg.setAttribute("id", jsonObject[i].name);
        beadImg.setAttribute("class", "tooltip-bead");
        div.appendChild(beadImg);
        
        if (jsonObject[i].type == "color"){
            color_tooltip.appendChild(div);
        }
        else if(jsonObject[i].type == "metal"){
            metal_tooltip.appendChild(div);
        }
    }
}

function setBead(e){
    let beadPos = document.getElementById(clicked_bead_id);
 
    let bead_name = e.target.getAttribute("id");
    beadPos.setAttribute("current-bead", bead_name);

    let newBead = document.createElement("img");
    let filename = e.target.getAttribute("src");

    newBead.setAttribute("src", filename);
    newBead.setAttribute("class", "bracelet-bead");


    if (beadPos.childNodes.length > 0){
        let children = beadPos.childNodes
        for (let i = 0; i < children.length; ++i){
            if (children[i].getAttribute("class") == "bracelet-bead"){
                beadPos.removeChild(children[i]);
            }
        }
    }
    beadPos.appendChild(newBead);
}

function copyInfo(){
    let bracelet_beads = document.querySelector(".bead-container").children;
    for (let i = 0; i < bracelet_beads.length; ++i){
        let id_name = bracelet_beads[i].getAttribute("current-bead");
        console.log( (i+1) + " " + id_name);
    }
}

function hasColor(bead, taglist){
    for (let i = 0; i < taglist.length; ++i){
        if (bead.color == taglist[i]){
            return true;
        }
    }
    return false;
}

function toggleTooltip(){
    let tooltip = document.querySelector(".tooltip");
    if (tooltip.style.display === "none"){
        tooltip.style.display = "block";
    }
    else{
        tooltip.style.display = "none";
    }

    createPreview();
}

function createPreview(){
    addBead();

    let bracelet_pos = document.querySelectorAll(".bead");
    let color_beads = document.querySelectorAll(".color-bead");
    for (let i = 0; i < color_beads.length; ++i){

        let current = color_beads[i];
        let bead_img_path = null;


        for (let j = 0; j < current.childNodes.length; ++j){
            if( current.childNodes[j].className == "bracelet-bead"){
                bead_img_path = current.childNodes[j].getAttribute("src");
            }
        }
        
        if (bead_img_path === null){
            continue;
        }

        let new_img = document.createElement("img");
        new_img.setAttribute("src", bead_img_path);
        new_img.setAttribute("class", "tooltip-bead");

        let bead_pos = color_beads[i].getAttribute("bracelet-pos");
        bead_pos = parseInt(bead_pos, 10) - 1;

        bracelet_pos[bead_pos].appendChild(new_img);


    }
    let metal_beads = document.querySelectorAll(".metal-bead");

    for (let i = 0; i < metal_beads.length; ++i){

        let current = metal_beads[i];
        let bead_img_path = null;
        for (let j = 0; j < current.childNodes.length; ++j){
            if( current.childNodes[j].className == "bracelet-bead"){
                bead_img_path = current.childNodes[j].getAttribute("src");
            }
        }


        if (bead_img_path === null){
            continue;
        }

        let new_img = document.createElement("img");
        new_img.setAttribute("src", bead_img_path);
        new_img.setAttribute("class", "tooltip-bead");

        let bead_pos = metal_beads[i].getAttribute("bracelet-pos");
        bead_pos = parseInt(bead_pos, 10) - 1;

        bracelet_pos[bead_pos].appendChild(new_img);


    }
    //used for dom-to-img
    create_hidden_clone()

}

function createTooltipButtons(){
    let color_ttip = document.querySelector("#color-tooltip");
    let color_btn = document.createElement("button");
    color_btn.setAttribute("class", "close-button");
    color_btn.setAttribute("ttip-type", "color");
    color_btn.addEventListener("click", function(){
        hideTooltip("color");
    });
    color_btn.innerText = "X";
    color_ttip.appendChild(color_btn);

    let metal_ttip = document.querySelector("#metal-tooltip");
    let metal_btn = document.createElement("button");
    metal_btn.setAttribute("class", "close-button");
    metal_btn.setAttribute("ttip-type", "metal");
    metal_btn.addEventListener("click", function(){
        hideTooltip("metal");
    });
    metal_btn.innerText = "X";
    metal_ttip.appendChild(metal_btn);
}

function download_bracelet_img(){
    
    let clone = document.getElementById("clone");
    if (clone == null){
        return;
    }
    domtoimage.toJpeg(clone, { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'custom-bracelet.jpeg';
        link.href = dataUrl;
        link.click();
    });
}

function create_hidden_clone(){
    let bracelet = document.getElementById("bracelet");
    let clone = bracelet.cloneNode(true);
    clone.setAttribute("style", "padding-bottom: 50px; margin: 0px; background-color: white; z-index: -1;");
    clone.setAttribute("id", "clone");

    let box = document.querySelector(".offscreen");
    if(box.childNodes.length > 0){
        box.removeChild(box.childNodes[0]);
    }
    box.appendChild(clone);

}