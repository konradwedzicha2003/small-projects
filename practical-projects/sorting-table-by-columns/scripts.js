
var table = document.querySelector("#myTable"),
    ths = table.querySelectorAll("thead th"),
    trs = table.querySelectorAll("tbody tr"),
    df = document.createDocumentFragment();

function makeArray(nodeList) {

    var arr = [];

    for(var i = 0;i < nodeList.length; i++) {

        arr.push(nodeList[i]);
    }

    return arr;
}

function clearClassName (nodeList) {

    for (var i = 0 ; i < nodeList.length ; i++) {

        nodeList[i].className = "";
    }
}



function sortBy(e) {

    var target = e.target,
        thsArr = makeArray(ths),
        trsArr = makeArray(trs),
        index = thsArr.indexOf(target),
        order = (target.className === "" || target.className === "desc") ? "asc" : "desc";

    clearClassName(ths);

    trsArr.sort(function(a, b) {

        var tdA = a.children[index].textContent,
            tdB = b.children[index].textContent;

        if(tdA < tdB) {
            return order === "asc" ? -1 : 1;
        } else if (tdA > tdB) {
            return order === "asc" ? 1 : -1;
        } else {
            return 0;
        }

    })

    trsArr.forEach(function (tr){
        df.appendChild(tr)
    })

    target.className = order;
    table.querySelector("tbody").appendChild(df);

}

for(var i = 0; i < ths.length; i++) {

    ths[i].onclick = sortBy;

}


