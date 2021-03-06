import React from "react";
import { Todos } from "./index";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  tabList: {
    margin: 0,
  },
});

const SimpleTab = (props) => {
  const classes = useStyles();

  // props
  const { incompleteTodos, completeTodos } = props;

  return (
    <Tabs>
      <TabList className={classes.tabList}>
        <Tab>未完了リスト</Tab>
        <Tab>完了リスト</Tab>
      </TabList>
      <TabPanel>
        <Todos todos={incompleteTodos} />
      </TabPanel>
      <TabPanel>
        <Todos todos={completeTodos} />
      </TabPanel>
    </Tabs>
  );
};

export default SimpleTab;
