import React from "react";
interface ChatRoomModalProps {
    onOpen?: () => void;
    onClose?: () => void;
    onJoin: () => void;
    onCreate: () => void;
}
const ChatRoomModal = (
    {onJoin,onCreate }: ChatRoomModalProps,
) => {
    return (
        <div>
            <h1>ChatRoomModal</h1>
        </div>
    )
}
export default ChatRoomModal;
