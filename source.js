function addEnterprice(id){
    var tbody = document.getElementById(id).getElementsByTagName("TBODY")[0];
    var row = document.createElement("TR");

    var td1 = document.createElement("TH");
    var buttonDelete = document.createElement("input");
    var attribute1 = document.createAttribute("onclick");
    var attribute2 = document.createAttribute("type");
    var attribute3 = document.createAttribute("value");
    var attribute4 = document.createAttribute("class");
    attribute1.value = 'deleteEnterprice(this);';
    attribute2.value = "Button";
    attribute3.value = "Видалити";
    attribute4.value = "button-del-class";
    buttonDelete.setAttributeNode(attribute1);
    buttonDelete.setAttributeNode(attribute2);
    buttonDelete.setAttributeNode(attribute3);
    buttonDelete.setAttributeNode(attribute4);
    td1.appendChild(buttonDelete);

    var td2 = document.createElement("TD");
    attribute1 = document.createAttribute("contenteditable");
    attribute2 = document.createAttribute("onblur");
    attribute2.value = "updateDiagram()";
    td2.setAttributeNode(attribute1);
    td2.setAttributeNode(attribute2);
    td2.appendChild (document.createTextNode("AO-4"));

    var td3 = document.createElement("TD");
    attribute1 = document.createAttribute("contenteditable");
    attribute2 = document.createAttribute("onblur");
    attribute3 = document.createAttribute("onkeypress");
    attribute2.value = "updateDiagram()";
    attribute3.value = "isInputNumber(event)";
    td3.setAttributeNode(attribute1);
    td3.setAttributeNode(attribute2);
    td3.setAttributeNode(attribute3);
    td3.appendChild (document.createTextNode("40"));

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    tbody.appendChild(row);

    //////////////////////////////// Добавление колонок диагармы
    var mainDiv = document.getElementById('id-diagram');
    var nameDiv = document.getElementById('id-enterprice-name');
    var childs = mainDiv.children;
    //console.log(childs.length);

    var diagram = [];
    var nameDiagram = [];
    var attribute = [];
    var attribute1 = [];
    var addName;
    var table = document.getElementById('my-table');

    var i = table.rows.length-1 - childs.length;

    for (i;i>0;i--)
    {

        diagram[i] = document.createElement("div");
        nameDiagram[i] = document.createElement("div");
        attribute[i] = document.createAttribute("class");
        attribute1[i] = document.createAttribute("class");

        attribute[i].value = "class-diagram m-2 flex-fill";
        attribute1[i].value = "m-2 flex-fill";

        diagram[i].setAttributeNode(attribute[i]);
        nameDiagram[i].setAttributeNode(attribute1[i]);
        mainDiv.appendChild(diagram[i]);
        nameDiv.appendChild(nameDiagram[i]);

        addName = document.getElementById('my-table').getElementsByTagName("TBODY")[0].getElementsByTagName("tr")[childs.length-1].getElementsByTagName("td")[0].textContent;
        nameDiv.getElementsByTagName("div")[childs.length-1].innerHTML = addName;
    }
    updateDiagram();
}

function updateDiagram()
{
    var table = document.getElementById('my-table');
    var massNumeric = [];
    var textNumeric = [];
    var max = 0;
    var res = 0;
    var mainDiv = document.getElementById('id-diagram');
    var massDivs = []; 
    var attribute = [];

    var nameDiv = document.getElementById('id-enterprice-name');
    var nameDiagram = [];

    for (i = 0;i<table.rows.length-1;i++)
    {
        massNumeric[i] = document.getElementById('my-table').getElementsByTagName("TBODY")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[1];
        console.log(massNumeric[i]);
        textNumeric[i] = massNumeric[i].textContent;
        if(max<textNumeric[i]) {max = parseFloat(textNumeric[i]); }
    }
    for (i = 0;i<table.rows.length-1;i++)
    {
        massDivs[i] = mainDiv.getElementsByTagName("div")[i];
        attribute[i] = document.createAttribute("style");
        res = (parseFloat(document.getElementById('my-table').getElementsByTagName("TBODY")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].textContent)*100) / max;
        console.log(res);
        attribute[i].value = "height:" + res + "%;";
        massDivs[i].setAttributeNode(attribute[i]);

        nameDiagram[i] = document.getElementById('my-table').getElementsByTagName("TBODY")[0].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].textContent;
        console.log(nameDiagram[i]);
        nameDiv.getElementsByTagName("div")[i].innerHTML = nameDiagram[i];
    }   
}

function deleteEnterprice(r)
{
    //console.log(r);
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("my-table").deleteRow(i);


    var oldDiv = document.getElementById("id-diagram").getElementsByTagName("div")[i-1];
    if (oldDiv.parentNode) 
    {
        oldDiv.parentNode.removeChild(oldDiv);
    }

    var oldName = document.getElementById("id-enterprice-name").getElementsByTagName("div")[i-1];
    if (oldName.parentNode) 
    {
        oldName.parentNode.removeChild(oldName);
    }
    updateDiagram();
}

function isInputNumber(evt)
{
    var ch = String.fromCharCode(evt.which);
    if(!(/[0-9]/.test(ch))) evt.preventDefault(); 
}