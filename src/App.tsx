import React from 'react';
import './App.css';

import Table from "./components/Table/Table";

function App() {
  const [state, setState] = React.useState({
    data: null,
    error: false,
    loading: true,
  })

  const [searchStr, setSearchStr] = React.useState('')

  function onInput(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement
    setSearchStr(target.value)
  }

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('db.json')
        const data = await response.json()
        console.log(data)
        setState({
          data,
          error: false,
          loading: false
        })
      } catch {
        setState({
          data: null,
          error: true,
          loading: false
        })
      }
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Dashboard</h1>
        <div className="search-form">
          <input
            type="text"
            placeholder="What test are you looking for?"
            value={searchStr}
            onInput={onInput}
          />
        </div>
        {state.loading ?
          <div>Loading...</div> :
          (state.error ?
            <div>Error happened</div> :
              <Table
                // @ts-ignore
                sites={state.data.sites}
                // @ts-ignore
                tests={state.data.tests}
                searchStr={searchStr}
              />
          )
        }
      </div>
    </div>
  );
}

export default App;
