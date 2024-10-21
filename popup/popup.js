
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("refresh").addEventListener("click", getKeyAndCallRequest);
});


chrome.storage.local.get(["DOLAPIKEY"]).then((result) => {
    if (result.DOLAPIKEY === "undefined") {
        let response = window.prompt("Please enter your API Key:", "API key")

        chrome.storage.local.set({ DOLAPIKEY: response }).then(() => {
            console.log("key set = " + result.DOLAPIKEY);
        });
    }
    else {
        console.log(result.DOLAPIKEY);
    }
});

function getKeyAndCallRequest() {
    chrome.storage.local.get(["DOLAPIKEY"]).then((result) => {
        console.log("Value is " + result.DOLAPIKEY);
        GetAndListAllData(result.DOLAPIKEY)
    });
}

async function GetAndListAllData(ApiKey) {

    const response = await fetch(`http://dolibarr.local/api/index.php/tasks/`, {
        method: "GET",
        headers: {
            "DOLAPIKEY": ApiKey,
            "Content-Type": "application/json",
        }
    })
    try {
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        DisplayInfos(json)

        console.log(json)
    } catch (error) {
        console.error(error);
    }


}

function DisplayInfos(infos) {
    var n = 1

    while (n != infos.length) {
        var n2 = 1
        console.log(n);
        const li = document.createElement("li");

        document.querySelector("body > ul").appendChild(li);

        while (n2 != 6) {
            document.querySelector(`body > ul > li:nth-child(${n})`).appendChild(document.createElement("h2"))
            switch (n2) {
                case 1:
                    document.querySelector(`body > ul > li:nth-child(${n}) > h2:nth-child(1)`).innerHTML = infos[n].id
                    break;
                case 2:
                    document.querySelector(`body > ul > li:nth-child(${n}) > h2:nth-child(2)`).innerHTML = infos[n].ref
                    break;
                case 3:
                    document.querySelector(`body > ul > li:nth-child(${n}) > h2:nth-child(3)`).innerHTML = infos[n].label
                    break;
                case 4:
                    document.querySelector(`body > ul > li:nth-child(${n}) > h2:nth-child(4)`).innerHTML = infos[n].progress
                    break;
                case 5:
                    document.querySelector(`body > ul > li:nth-child(${n}) > h2:nth-child(5)`).innerHTML = infos[n].date_start
                    break;
                default:
                    break;
            }
            n2++
        }

        n++
    }

    //document.querySelector("body > ul > li > h2:nth-child(2)").innerHTML = infos[2].ref
    //document.querySelector("body > ul > li > h2:nth-child(3)").innerHTML = infos[2].label
    //document.querySelector("body > ul > li > h2:nth-child(6)").innerHTML = infos[2].priority
    //  document.querySelector("body > ul > li > h2:nth-child(4)").innerHTML = infos[2].date_c
    //    document.querySelector("body > ul > li > h2:nth-child(5)").innerHTML = infos[2].progress
}

// 