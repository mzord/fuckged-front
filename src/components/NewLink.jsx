import { useState } from "react";
import { Form, Input, Button, Divider, Segment, Modal } from "semantic-ui-react";

const NewLink = (props) => {

    const open = props.open
    const setOpen = props.setOpen
    const [data, setData] = useState({title: "", url: ""})

    const handleFormSubmit = () => {
        fetch("http://localhost:8080/api/links", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "link": {
                    "title": data.title,
                    "url": data.url
                }
            })
        })
        .then(response => response.json())
        .then(data => {
            setOpen(false)
            props.setLoaded(false)
            setData({title: "", url: ""})
        })
    }

    return(
        <Modal
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            trigger={<Button color="green">New Link</Button>}
        >
            <Modal.Header>
                Crie um novo link para não ter que usar o GED.
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group>
                        <Form.Field 
                            control={Input} 
                            type="text" 
                            value={data.title}
                            onChange={(e) => setData({...data, title: e.target.value})} 
                            width={16}
                            label="Title" />
                            
                        <Form.Field 
                            control={Input} 
                            type="text" 
                            value={data.url}
                            onChange={(e) => setData({...data, url: e.target.value})} 
                            label="URL" />
                        <Form.Field control={Input} type="submit" onClick={handleFormSubmit} label="Criar" />
                    </Form.Group>
                </Form>
            </Modal.Content>
            
        </Modal>
    )
}

export default NewLink;