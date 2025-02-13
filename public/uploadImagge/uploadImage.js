export const generateUploadImage = () => {

    const inputFile = document.querySelector('#file');
    const button = document.querySelector("#button");

    let list = [];

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append("file", inputFile.files[0]);
        try {
            const res = await fetch("/upload", {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            list.push(data);
        } catch (e) {
            console.log(e);
        }
        console.log(list)
    }

    const getFileList = () => {
        fetch("/filelist")
            .then(res => {return res.json();})
            .then(files => { 
                list = files
            });
    }

    return {
        uploadImage: async function() {
            button.onclick = handleSubmit;
        }, 
        returnImageList: function() {
            getFileList();
            return list;
        }
    }
};
