import { Tooltip, Whisper } from "rsuite"

const IconButton = ({ ...props }) => {
    return (
        <Whisper placement="top" controlId="control-id-hover" trigger="hover" speaker={<Tooltip>{props.title}</Tooltip>}>
            <button {...props} >
                <i className={props.icon}></i>
            </button>
        </Whisper>
    )
}

export default IconButton;