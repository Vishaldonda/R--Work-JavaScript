
async function fucntProm() {

    const prom = new Promise((resolve, reject) => {
        response = true;
        setTimeout(() => {
            if (response) {
                resolve("Succesful response");
            }
            else {
                reject("failed");
            }
        }, 2000);
    });

    const resp = await prom;
    console.log(resp);
}

fucntProm()

// promise all -  bunch all the api promises
// promis erace - waits for first call

// setTimeout( ()=> fucntProm(),2000);



async function fucntFetchProm() {

    const prom = new Promise(async (resolve, reject) => {
        var encodeURL = "https://run.mocky.io/v3/2e7f616b-897b-402c-867b-eaa9b7e1c785";
        var response = await fetch(encodeURL);
        setTimeout(() => {
            if (response.ok) {
                // resolve("Succesful fetch");
                resolve(response)
            }
            else {
                reject("failed");
            }
        }, 2000);
    });

    const resp = await prom;
    console.log(resp);

    //console.log(prom);
    // prom.then(
    //     function(value){
    //         console.log(value);
    //     }
    // );

}

fucntFetchProm()
