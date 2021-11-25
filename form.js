const userImgFile = document.getElementById("userImg")
const userIDImgFile = document.getElementById("userIDImg")

const userImgPlace = document.getElementById("userImgPlace")
const userIDImgPlace = document.getElementById("userIDImgPlace")

const userImgPrevBox = document.getElementById("userImgPrevBox")
const userIDImgPrevBox = document.getElementById("userIDImgPrevBox")

const userPrevImg = document.querySelector("#userImgPrevBox .prevImg")
const userIDPrevImg = document.querySelector("#userIDImgPrevBox .prevImg")

function userImgFileRemove(e){
    // e.preventDefault()
    userImgFile.files[0] = null;
}
function userIDImgFileRemove(e){

    userIDImgFile.files[0] = null;
}

userImgFile.addEventListener("change", function(){
    var file = this.files[0];

    if (file != undefined){
        var reader = new FileReader();

        reader.onload = function () {
            userPrevImg.setAttribute("src", reader.result);
            userImgPrevBox.style.display = "block";
            userImgPlace.style.display = "none";
            // console.log(reader.result)
        }

        reader.readAsDataURL(file);
    } else {
            userImgPrevBox.style.display = "none";
            userImgPlace.style.display = "block";
            userPrevImg.setAttribute("src", "");
    
            this.files[0] = null
    }
})

userIDImgFile.addEventListener("change", function(){
    var file = this.files[0];

    if (file != undefined){
        var reader = new FileReader();

        reader.onload = function () {
            userIDPrevImg.setAttribute("src", reader.result);
            userIDImgPrevBox.style.display = "block";
            userIDImgPlace.style.display = "none";
            // console.log(reader.result)
        }

        reader.readAsDataURL(file);
    } else {
            userIDImgPrevBox.style.display = "none";
            userIDImgPlace.style.display = "block";
            userIDPrevImg.setAttribute("src", "");
    
            this.files[0] = null
    }
})



// sending files to server

const regForm = document.querySelector("#infoForm")

regForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    // styling
    document.body.style.overflow = "hidden";
    document.querySelector("body > section.modal > div.modalText").style.display = "block";
    document.querySelector("body > section.modal > div.modalBack").style.display = "block";
    
    const userFullName = regForm['userFullName'].value;
    const userNickName = regForm['userNickName'].value;
    const userRoll = regForm['userRoll'].value;
    const userSection = regForm['userSection'].value;
    const userPhone = regForm['userPhone'].value;
    const userFb = regForm['userFb'].value;
    const userTwt = regForm['userTwt'].value;
    const userInsta = regForm['userInsta'].value;
    const userYt = regForm['userYt'].value;
    const userWhats = regForm['userWhats'].value;
    const userPresentAdd = regForm['userPresentAdd'].value;
    const userBio = regForm['userBio'].value;

    var sendTime = new Date();

    var userImgFile = regForm['userImg'].files[0];
    var userImgFileName = sendTime.getHours() + "-" + "date:" + sendTime.getDate()+ "-" + sendTime.getMonth() + "months(index)" + "-" + sendTime.getFullYear() + userImgFile.name;
    let userImgLink;

    var userIDImgFile = regForm['userIDImg'].files[0];
    var userIDImgFileName = sendTime.getHours() + "-" + "date:" + sendTime.getDate()+ "-" + sendTime.getMonth() + "months(index)" + "-" + sendTime.getFullYear() + userIDImgFile.name;
    let userIdImgLink;

    storage.child(userImgFileName).put(userImgFile)
        .then(ss => ss.ref.getDownloadURL())
        .then(url1 => {
            userImgLink = url1;
            
            storage.child(userIDImgFileName).put(userIDImgFile)
                .then(kk => kk.ref.getDownloadURL())
                .then(url2 => {
                    userIdImgLink = url2;

                    document.querySelector("body > section.modal > div.modalText").innerText = "Data sent !!!"

                    db.collection("pending").add({
                        userFullName,
                        userNickName,
                        userRoll,
                        userSection,
                        userPhone,
                        userFb,
                        userTwt,
                        userInsta,
                        userYt,
                        userWhats,
                        userPresentAdd,
                        userBio,
                        userImgLink,
                        userIdImgLink
                    }).then(()=>{
                        // styling
                        document.querySelector("body > section.modal > div.modalText").style.display = "none";
                        document.querySelector("body > section.modal > div.modalBack").style.display = "none";
                        document.body.style.overflow = "auto";
                    }).catch(err=>console.log(err))
                })
        })
})