export function ajax(singerName="Sonu+Nigam", callBack){
    const URL = `https://itunes.apple.com/search?term=${singerName}&limit=12.`;
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.onreadystatechange = function() {
        if((this.readyState==4) && (this.status==200)) {
            console.log("Type of Response ", typeof this.responseText)
            callBack(this.responseText);
        }
    }
    xmlHttpRequest.open('GET', URL, true);
    xmlHttpRequest.send(null);
}

