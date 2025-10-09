import React from "react";
interface CreateRoomModalProps {
    onOpen?: () => void;
    onClose?: () => void;

}
const CreateRoomModal:React.FC<CreateRoomModalProps> = (
    {
        onOpen,onClose
    }
) => {
    return (
        <div>
            <h1>CreateRoomModal</h1>
        </div>
    )
}
export default CreateRoomModal;
