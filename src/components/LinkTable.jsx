import { useEffect, useState } from "react";
import { Icon, Loader, Table } from "semantic-ui-react"

const LinkTable = (props) => {

    const [links, setLinks] = useState([])
    // const [loaded, setLoaded] = useState(false)

    const loaded = props.loaded
    const setLoaded = props.setLoaded

    useEffect(() => {
        fetch("http://localhost:4000/api/links", {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setLinks(data.data)
            setLoaded(true)
        })
    }, [loaded])

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Documento</Table.HeaderCell>
                    <Table.HeaderCell>Edit</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {loaded ? (
                links.map(link => (
                    <Table.Row>
                        <Table.Cell>
                            <a href={link.url}>{link.title}</a>
                        </Table.Cell>
                        <Table.Cell>
                            <Icon name="wrench" />
                        </Table.Cell>
                    </Table.Row>
                ))
                ) : (
                    <Table.Row>
                        <Table.Cell>
                            <Loader active/>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )    
}

export default LinkTable;