const generateRoomId=():string=>{
    const Id=Math.floor(Math.random()*10000+1)
    return Id.toString();
}
export default generateRoomId