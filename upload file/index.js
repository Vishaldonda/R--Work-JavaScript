function submitFile(e){
    console.log(e)
    // e.preventDefault();
    // debugger
    // To upload files with the Fetch API, we need to create a request body that includes the file data.
    // We can do this using the FormData object

    //const file = fileInput.files[0];

    async function uploadfile(){
        var endpoint = "http://localhost:3000/upload";

        const fileupload = document.getElementById('fileInput').files[0];
        const formData = new FormData();

        formData.append('file', fileupload);
        // console.log(formData);

        const myHeaders = new Headers();
        //myHeaders.append("Content-Type", "multipart/form-data");
        
        const response = await fetch(endpoint, {
        method: "POST",
        body : formData,
        //headers: myHeaders,
        });

        if (response.ok) {
        console.log("Sucessfully uploaded");
        debugger;
        }else{
            console.log("upload failed")
        }
    }
    
    console.log("upload button clicked")
    uploadfile()

}

