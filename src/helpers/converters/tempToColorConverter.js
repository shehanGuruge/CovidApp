export const tempToColor = (temp) => {
    if(temp <= 32){
        return "green"
    }else if(temp <= 42 && temp > 32){
        return "#ff9933"
    }else{
        return "red"
    }
    return "black"
}