export const sendCookie =  (res,token)=>{
    res.cookie("token",token,{
        secure : true,
        sameSite : "None",
        http : true,
        maxAge : 7* 24 * 60 * 60 *1000
    })
}