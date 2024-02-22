import qr from "qr-image";
import $ from "jquery";

initializePage();

function initializePage(){
    $("#create").on("click", handleCreateQRCodeClick);
}

async function handleCreateQRCodeClick(){

    toogleLoader();

    // await createQRCode

    // Remove loader

    let imageSource = await createQRCode();

    toogleLoader();

    $(".qrcode").attr("src", imageSource);
    $("#solution").css("display", "flex");
    $("#download").attr("download", "qrcode.png");
    $("#download").attr("href", imageSource);
}

async function createQRCode(){
    
    let source = $("input[type='text']").val();
    let type = getType(source);

    let qrCode = qr.imageSync(source, { type: 'png', margin: 3, size: 12 });
 
    let imageSource = URL.createObjectURL(
        new Blob([qrCode.buffer], { type: 'image/png' })
    );

    await timeout(2000);

    return imageSource; 
}

function toogleLoader(){

    let isLoading = $(".loader-container").css("display") !== "none";
    if(isLoading){
        $(".loader-container").css("display", "none");
    }
    else {
        $("#solution").css("display", "none");
        $(".logo").css("display", "none");
        $(".loader-container").css("display", "flex");
    }   
}

function getType(source){
    //TODO: lógica para identificar tipo do texto
    return "email";
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

