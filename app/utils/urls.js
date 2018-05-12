let localhost = 'http://127.0.0.1'
    // localhost='';
const urls = {
    getLogin: (data) => localhost + `/testdemo/app/control/login.php?username=${data.username}&password=${data.password}`,
    setRegister: (data)=>localhost+`/testdemo/app/control/register.php?username=${data.username}&password=${data.password}&tel=${data.tel}`,
    getLoginPeo:()=>localhost+`/testdemo/app/control/getLogin.php`,
    loginOut:(data)=>localhost+`/testdemo/app/control/loginout.php?id=${data}`,
    //addArtcle:(data)=>localhost+`/testdemo/app/control/addArticle.php?id=${data.id}&title=${data.title}&content=${data.content}`,
    addArtcle:()=>localhost+`/testdemo/app/control/addArticle.php`,
    getMyArticle:(data)=>localhost+`/testdemo/app/control/getMyArticle.php?id=${data}`,
    getEditArt:(data)=>localhost+`/testdemo/app/control/getEditArt.php?id=${data}`,
    editArt:()=>localhost+`/testdemo/app/control/editArt.php`,
    cancelEdi:(data)=>localhost+`/testdemo/app/control/cancelEdi.php?id=${data}`,
    reply:(data)=>localhost+`/testdemo/app/control/reply.php?id=${data.id}&yonghu=${data.yonghu}&xitong=${data.xitong}`,
    addShow:(data)=>localhost+`/testdemo/app/control/addShow.php?id=${data.id}&yonghu=${data.yonghu}`,
    addToupiao:(data)=>localhost+`/testdemo/app/control/addToupiao.php?id=${data.id}&title=${data.title}&xiangmu=${data.xiangmu}`,
    showToupiao:(data)=>localhost+`/testdemo/app/control/showToupiao.php?id=${data}`,
    addCount:(data)=>localhost+`/testdemo/app/control/addCount.php?id=${data.id}&xuanxiang=${data.value}`,
    showCount:(data)=>localhost+`/testdemo/app/control/showCount.php?id=${data}`,
    cancelToupiao:(data)=>localhost+`/testdemo/app/control/cancelToupiao.php?id=${data}`,
    isRegister:(data)=>localhost+`/testdemo/app/control/isRegister.php?username=${data}`,
    updata:()=>localhost+`/testdemo/app/control/updata.php`,
    getPageViwe:(id)=>localhost+`/testdemo/app/control/getPageView.php?id=${id}`,
}

export default urls