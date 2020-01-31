import React from "react";
import ComicList from "./comics/ComicList";
import ComicShow from "./comics/ComicShow";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={ComicList} />
          <Route path="/comics/:id" exact component={ComicShow} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
