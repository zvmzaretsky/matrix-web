let pathArr = [];
let path = "";

let object = {
    rows: {
        hares: null,
        wolves: null
    }
}
let predict = {
    hares: null,
    wolves: null
}

function next(i) {
    pathArr[pathArr.length] = i;
    displayPath();
    if (pathArr.length === 5) {
        getMatrix();

    }
}

function previous() {
    pathArr.pop();
    displayPath();
}

function displayPath() {
    path = "";
    pathArr.forEach(element => path += element+"-");
    path = path.slice(0, -1);

    let pPath = document.getElementById("path");
    pPath.textContent = "path "+path;
}

function getMatrix() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', "https://matrix-method.herokuapp.com/matrix?path="+path);
    xhr.responseType = 'text';
    xhr.onload = function () {
        displayMatrix(xhr.responseText);
    }
    xhr.onerror = function () {
        console.error('could not download')
    }
    xhr.send();
}

function displayMatrix(json) {
    console.log(json);
    object = JSON.parse(json);

    let pMatrix = document.getElementById("matrix");
    pMatrix.textContent = object.rows.hares + " - зайці" + "\n" + object.rows.wolves + " - вовки";
}

function getPrediction() {

    const size = document.getElementById("input").value;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', "https://matrix-method.herokuapp.com/prediction?path="+path+"&size="+size);
    xhr.responseType = 'text';
    xhr.onload = function () {
        displayPrediction(xhr.responseText);
    }
    xhr.onerror = function () {
        console.error('could not download')
    }
    xhr.send();
}

function displayPrediction(json) {
    console.log(json)
    predict = JSON.parse(json);
    document.getElementById("pred").textContent = predict.hares + " - зайці" + "\n" + predict.wolves + " - вовки";
}