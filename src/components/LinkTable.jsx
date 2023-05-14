import { useEffect, useState } from "react";
import { Confirm, Icon, Input, Loader, Table } from "semantic-ui-react"

const LinkTable = (props) => {

    const [links, setLinks] = useState([])
    // const [loaded, setLoaded] = useState(false)

    const loaded = props.loaded
    const setLoaded = props.setLoaded
    const setSelectedData = props.setSelectedData
    const setEditOpen = props.setEditOpen
    const [searchValue, setSearchValue] = useState()
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [selectedId, setSelectedId] = useState()

    useEffect(() => {
        fetch("http://localhost:8080/api/links", {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            setLinks(data.data)
            setSearchValue("")
            setLoaded(true)
        })
    }, [loaded])

    const handleRowSelection = (title, url, id) => {
        setSelectedData({title: title, url: url, id: id})
        setEditOpen(true)
    }

    const handleRowDelete = (id) => {
        console.log(id)
        fetch("http://localhost:8080/api/links/" + id, {
            method: "DELETE",
            mode: "cors"
        })
        .then(data => {
            setLoaded(false)
        })
    }

    const filteredLinks = links
    .filter(e => e.title.includes(searchValue)) 
    .map(e => <Table.Row>
        <Table.Cell>
            <a href={e.url} target="_blank">{e.title}</a>
        </Table.Cell>
        <Table.Cell>
            <Icon name="wrench" onClick={() => handleRowSelection(e.title, e.url, e.id)}/>
            <Icon name="x" color="red" onClick={() => {
                setSelectedId(e.id)
                setConfirmOpen(true)
            }}/>
            <Confirm 
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={() => {
                    setConfirmOpen(false)
                    handleRowDelete(selectedId)
                }}
            />
        </Table.Cell>
    </Table.Row>)

    return (
        <Table>
            <Table.Header>
                <Table.Row >
                    <Table.HeaderCell >
                        <Input 
                            type="text" 
                            placeholder="search" 
                            icon="search"
                            value={searchValue}
                            onChange={(e) => {
                                setSearchValue(e.target.value)
                            }}
                        />
                    </Table.HeaderCell>
                    <Table.HeaderCell >
                    </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>Documento</Table.HeaderCell>
                    <Table.HeaderCell>Edit</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {loaded ? (
                filteredLinks
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