exports.getdate=function () {
    const today = new Date();
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    }
    return  today.toLocaleDateString("en-us", options);   
} 
exports.getday=function(){
    const today = new Date();
    const options = {
        weekday: "long"
    }
    return today.toLocaleDateString("en-us", options);
}  