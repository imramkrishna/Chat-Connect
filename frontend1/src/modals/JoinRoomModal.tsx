interface JoinRoomModalProps {
    onOpen?: () => void;
    onClose?: () => void;
    onJoin: () => void;
    onCreate: () => void;
}
const JoinRoomModal:React.FC<JoinRoomModalProps> = (
    {
        onJoin,onCreate,onOpen,onClose
    }
) => {
    return (
        <div>
            <h1>JoinRoomModal</h1>
        </div>
    )
}
export default JoinRoomModal