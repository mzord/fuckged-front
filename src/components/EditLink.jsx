import { useState } from "react";
import { Form, Input, Button, Divider, Segment, Modal } from "semantic-ui-react";

const EditLink = (props) => {

    const open = props.open
    const setOpen = props.setOpen
    const data = props.data
    const setData = props.setData

    const handleFormSubmit = () => {
        fetch("http://localhost:8080/api/links/" + props.data.id, {
            method: "PATCH",
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
        })
    }

    return(
        <Modal
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
        >
            <Modal.Header>
                EDITE UM LINK
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Form.Group>
                        <Form.Field 
                            control={Input} 
                            type="text" 
                            value={data.title}
                            onChange={(e) => setData({...data, title: e.target.value})} 
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

export default EditLink;