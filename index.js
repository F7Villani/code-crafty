import qr from "qr-image";
import $ from "jquery";

initializePage();

function initializePage(){
    $("#create").on("click", createQRCode);
}

function createQRCode(){
    
    let source = $("input[type='text']").val();
    let type = getType(source);

    //if(type === 'email'){
    //    source = `mailto:${source}`;
    //}

    let qrCode = qr.imageSync(source, { type: 'png', margin: 3, size: 12 });
 
    let image = URL.createObjectURL(
        new Blob([qrCode.buffer], { type: 'image/png' })
    );

    $(".qrcode").attr("src", image);
    $("#solution").css("visibility", "visible");
    $("#download").attr("download", `${type}.png`);
    $("#download").attr("href", image);''

}

function getType(source){
    //TODO: lógica para identificar tipo do texto
    return "email";
}