let n = 1

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


chrome.storage.local.get(["DOLAPIKEY"]).then((result) => {
    console.log("Value is " + result.DOLAPIKEY);
    GetAndListAllData(result.DOLAPIKEY)
});

async function GetAndListAllData(ApiKey) {

    const response = await fetch(`http://localhost/dolibarr/api/index.php/tasks/${n++}`, {
        method: "GET",
        headers: {
            "DOLAPIKEY": ApiKey,
            "Content-Type": "application/json",
        }
    })
    try {
        if (!response.ok) {
            n = 1
            throw new Error(`Response status: ${response.status}`);
        }

        const json = response.json();
        console.log(json);
        GetAndListAllData(ApiKey)
    } catch (error) {
        console.error(error);
    }
} // L'api à un bug et ne permet pas de lister toute les tache sauf une par une