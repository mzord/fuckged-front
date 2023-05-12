import { useState } from "react";
import { Container, Divider, Header, Segment } from "semantic-ui-react";
import LinkTable from "./components/LinkTable";
import NewLink from "./components/NewLink";

function App() {

  const [loaded, setLoaded] = useState(false)

  return (
    <div className="App">
      <Container>
        <Divider hidden/>
        <Header textAlign="center" as="h1">Fuck GED</Header>
        <p><b>Seja feliz e evite acessar o GED :).</b></p> 
        <p><b>Aqui você registra os links dos procedimentos para que você não tenha o desprazer de utilizar esse site que a nossa empresa paga.</b></p>
        <NewLink setLoaded={setLoaded}/>
        <LinkTable loaded={loaded} setLoaded={setLoaded}/>
      </Container>
    </div>
  );
}

export default App;
