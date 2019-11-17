import React, { useRef, useEffect, useState, useCallback } from "react";
import { useMount, useUpdateEffect } from "react-use";
import { observable } from "mobx";
import { observer } from "mobx-react";
export function FunctionProfilePage(props) {
  const ref = useRef("");
  useEffect(() => {
    ref.current = props.user;
  });
  const showMessage = () => {
    console.log("ref:", ref);
    alert("Followed " + props.user + "," + ref.current);
  };

  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };

  return <button onClick={handleClick}>function Follow</button>;
}

export class ClassProfilePage extends React.Component {
  showMessage = () => {
    alert("Followed " + this.props.user);
  };

  handleClick = () => {
    setTimeout(this.showMessage, 3000);
  };

  render() {
    return <button onClick={this.handleClick}>class Follow</button>;
  }
}
function Child(props) {
  console.log("rerender:");
  const [result, setResult] = useState("");
  const { fetchData } = props;
  useEffect(() => {
    fetchData().then(result => {
      setResult(result);
    });
  }, [fetchData]);
  return (
    <div>
      <div>query: {props.query}</div>
      <div>result:{result}</div>
    </div>
  );
}
export function Parent() {
  const [query, setQuery] = useState("react");
  const fetchData = useCallback(() => {
    const url = "https://hn.algolia.com/api/v1/search?query=" + query;
    return fetch(url).then(x => x.text());
  }, [query]);
  return (
    <div>
      <input onChange={e => setQuery(e.target.value)} value={query} />
      <Child fetchData={fetchData} query={query} refreshToken={query} />
    </div>
  );
}

export const VueParent = observer(() => {
  const [state] = useState(
    observable({
      query: "reqct"
    })
  );
  const fetchData = () => {
    const url = "https://hn.algolia.com/api/v1/search?query=" + state.query;
    return fetch(url).then(x => x.text());
  };
  return (
    <div>
      <input
        onChange={e => (state.query = e.target.value)}
        value={state.query}
      />
      <Child fetchData={fetchData} query={state.query} />
    </div>
  );
});

export const VueChild = observer(props => {
  const [result, setResult] = useState("");
  useMount(() => {
    props.fetchData().then(result => {
      setResult(result);
    });
  });
  useUpdateEffect(() => {
    props.fetchData().then(result => {
      setResult(result);
    });
  }, [props.query]);
  return (
    <div>
      <div>query: {props.query}</div>
      <div>result:{result}</div>
    </div>
  );
});
