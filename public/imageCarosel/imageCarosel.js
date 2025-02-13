export const generateImageCarosel = (parentElement) => {
    let imgList = [];
    return {
        getImgList: () => {
            return imgList
        },
        setImgList: (newImgList) => {
            imgList = newImgList;
        },
        render: () => {
            let html = "";
            imgList.forEach((element, index) => {
                if (index == 1) {
                    html+='<div class="carousel-item active"><img src="' + element + '" class="d-block w-100" alt="..."></div>';
                } else {
                    html+='<div class="carousel-item"><img src="' + element + '" class="d-block w-100" alt="..."></div>';
                }
            });
            parentElement.innerHTML = html;
        }
    }
}