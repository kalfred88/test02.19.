function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var data = xhttp.responseText;
    data = JSON.parse(data);
    // Innen, ide dolgozz... Itt hívd meg a függvényeid stb. A json file tartalma innen érhető csak
    // Live servert használd mindig
    createTable(data);
    calculate(data);
    nodeTrick(message);


}

getData('js/meteorits.json', successAjax);

/* 
    A kapott JSON file a Föld-be csapódott meteoritok adatait tartalmazza.

    FELADATOK:
    1. Írasd ki egy táblázatba a következő adatait a meteoritoknak:
        id
        mass
        name
        nametype
        recclass
        reclat
        reclong
        year

     Pozitív, ha ezeket az elemeket nem az innerHTML segítségével hozod létre. 

    2. A táblázatban formázd a tömeget 2 tizedes jegy pontosan. Ha kell kerekíts a legközelebbi egészre.
       A matamatikai kerekítés szabályait használd. Ha valahol egész érték van, ott is legyen a 00 kiiratva
       az egész érték után .
       Formázd a dátumot az alábbi formátumba: 1990. 01. 02. 
    
    3. A táblázat fejlécére kattintva növekvő sorrendbe lehessen rendezni a táblázat adatait az alábbi
       meteorit tulajdonságok szerint: id, mass, name, és reclass.
       Az id és a mass szerinti rendezés számok alapján rendezzen.

    4.  Valósítsd meg a rendezést úgy, hogy nem csak növekvő, hanem csökkenő sorrendbe is lehessen az adatokat rendezni.
        Ha az adatok még nincsenek rendezve, akkor az adott fejlév/tulajdonság alapján növekvő sorrendbe rendezze az adatokat kattintásra.
        Amennyiben még egyszer ugyanarra a fejlécre kattintanak, akkor a sorrend legyen csökkenő. És így tovább....
        Amennyiben egy új fejlécre kattintanak, először mindig növekvő sorrend szerint legyenek az  adatok rendezve.

    5. A táblázat alá az alábbi adatokat ki kell iratni/számolni:

        Az összes meteorit összsúlya
        A legkönyebb meteorit súlya
        A legnehezebb meteorit súlya
        A meteoritok súlyának átlaga
        Hány darab meteorit csapódott be 1990-ben
        Hány darab meteorit súlya legalább 10000

        Ezeket az elemeket ne az innerHTML segítségével hozd létre. Használd az ismert node metódusokat. KÖTELEZŐEN!

    6. Legyen szép a táblázat és az adatok. HAsználj CSS-t a formázáshoz.

    7. Töltsd fel az elkészült fileokat egy github repoba, és küld el a repo elérhetőségét.

    8. Szusszanj egyet.

*/

function createTable(datas) {
    var table = '';

    for (var i = 0; i < datas.length; i++) {
        table += '<tr>';
        table += ` <td> ${datas[i].id} </td>`
        table += ` <td> ${Math.round(datas[i].mass).toFixed(2)} </td>`
        table += ` <td> ${datas[i].name} </td>`
        table += ` <td> ${datas[i].nametype} </td>`
        table += ` <td> ${datas[i].recclass} </td>`
        table += ` <td> ${datas[i].reclat} </td>`
        table += ` <td> ${datas[i].reclong} </td>`
        table += ` <td> ${datas[i].year} </td>`
        table += '</tr>';
    }
    document.getElementById('tbody').innerHTML = table;
}

var message = ""; //Tudom, hogy nem a legelegánsabb megoldás...

function calculate(datas) {
    var min = Number.MAX_VALUE;
    var max = Number.MIN_VALUE;
    var sum = 0;
    var ninety = 0;
    var massive = 0;

    for (var i = 0; i < datas.length; i++) {
        min = datas[i].mass < min ? min = datas[i].mass : min;
        max = datas[i].mass > max ? max = datas[i].mass : max;

        if (isNaN(datas[i].mass) == false) {
            sum += parseInt(datas[i].mass);
        }

        if (datas[i].year && datas[i].year.toString().search(/^1990/) == 0) {
            ninety++;
        }
        if (datas[i].mass >= 10000) {
            massive++;
        }
    }
    var avg = sum / datas.length;

    message = `Az összes meteorit összsúlya: ${sum}\n\r
    A legkönyebb meteorit súlya: ${min}\n\r
    A legnehezebb meteorit súlya: ${max}\n\r
    A meteoritok súlyának átlaga: ${avg}\n\r
    Hány darab meteorit csapódott be 1990-ben: ${ninety}\n\r
    Hány darab meteorit súlya legalább 10000: ${massive}\n\r`;
}

function nodeTrick(str) {
    var para = document.createElement("p");
    var node = document.createTextNode(str);
    para.appendChild(node);
    var element = document.getElementById("div1");
    element.appendChild(para);
}