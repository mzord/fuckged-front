import { Modal } from "semantic-ui-react"

const DeleteLink = (props) => {

    const open = props.deleteOpen
    const setOpen = props.setDeleteOpen

    return(
        <Modal
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
        >
            
        </Modal>
    )
}