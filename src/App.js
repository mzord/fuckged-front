import { useState } from "react";
import { Container, Divider, Header, Segment } from "semantic-ui-react";
import EditLink from "./components/EditLink";
import LinkTable from "./components/LinkTable";
import NewLink from "./components/NewLink";

function App() {

  const [loaded, setLoaded] = useState(false)
  const [selectedData, setSelectedData] = useState({title: "", url: ""})
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  return (
    <div className="App">
      <Container>
        <Divider hidden/>
        <Header textAlign="center" as="h1">Fuck GED</Header>
        <Segment raised>
          <p><b>Seja feliz e evite acessar o GED :)</b></p> 
          <p><b>Aqui você registra os links dos procedimentos para que você não tenha o desprazer de utilizar esse site que a nossa empresa paga.</b></p>
        </Segment>
        <NewLink 
          setLoaded={setLoaded} 
          data={selectedData} 
          setData={setSelectedData}
          open={open} 
          setOpen={setOpen}/>
        <EditLink open={editOpen} setOpen={setEditOpen} setLoaded={setLoaded} data={selectedData} setData={setSelectedData} />
        <LinkTable loaded={loaded} setLoaded={setLoaded} setOpen={setOpen} setEditOpen={setEditOpen} setSelectedData={setSelectedData}/>
      </Container>
    </div>
  );
}

export default App;
