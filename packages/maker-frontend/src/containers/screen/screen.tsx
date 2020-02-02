import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Loading } from 'components/loading';
import { useUser } from 'graphqls/queries/USER';
import { LocalStateAutoUpdate } from 'local-state-auto-update';
import React, { FC, useCallback, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Col, GlobalStyle, Row } from 'ui';
import { Header } from './header';
import { Home } from './home';
import { LeftDrawer } from './left-drawer';
import { RightDrawer } from './right-drawer';
import { Team } from './team';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    leftDrawerContainer: {
      [theme.breakpoints.up('md')]: {
        width: 350,
        flexShrink: 0,
      },
    },
    leftDrawerHold: {
      width: 350,
      border: 'none',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      overflow: 'hidden',
    },
    leftDrawer: {
      width: 350,
      border: 'none',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'stretch',
      overflow: 'hidden',
    },
    rightDrawer: {
      width: 320,
      border: 'none',
    },
  }),
);

export const Screen: FC = () => {
  const { loading } = useUser();

  const drawerStyle = useStyles();
  const [leftDrawer, setLeftDrawer] = useState(false);
  const openLeftDrawer = useCallback(() => setLeftDrawer(true), []);
  const closeLeftDrawer = useCallback(() => setLeftDrawer(false), []);
  const [rightDrawer, setRightDrawer] = useState(false);
  const openRightDrawer = useCallback(() => setRightDrawer(true), []);
  const closeRightDrawer = useCallback(() => setRightDrawer(false), []);

  return (
    <Row height="100%" flex={1} justifyContent="unset" alignItems="unset">
      <Loading isLoading={loading} />
      <GlobalStyle />
      <LocalStateAutoUpdate />
      <nav className={drawerStyle.leftDrawerContainer}>
        <Hidden mdUp implementation="js">
          <Drawer
            variant="temporary"
            anchor="left"
            open={leftDrawer}
            onClose={closeLeftDrawer}
            classes={{ paper: drawerStyle.leftDrawer }}
          >
            <LeftDrawer closeDrawer={closeLeftDrawer} />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="js">
          <Drawer
            variant="permanent"
            anchor="left"
            open={leftDrawer}
            onClose={closeLeftDrawer}
            classes={{ paper: drawerStyle.leftDrawerHold }}
          >
            <LeftDrawer closeDrawer={closeLeftDrawer} />
          </Drawer>
        </Hidden>
      </nav>
      <Drawer anchor="right" open={rightDrawer} onClose={closeRightDrawer} classes={{ paper: drawerStyle.rightDrawer }}>
        <RightDrawer closeDrawer={closeLeftDrawer} />
      </Drawer>

      <Col width="100%" flex={1} justifyContent="unset" alignItems="unset">
        <Hidden mdUp implementation="js">
          <Header openRightSidebar={openRightDrawer} openLeftSidebar={openLeftDrawer} />
        </Hidden>
        <Hidden smDown implementation="js">
          <Header openRightSidebar={openRightDrawer} />
        </Hidden>
        <Switch>
          <Route path="/app/team" component={Team} />
          <Route path="/app/home" component={Home} />
        </Switch>
      </Col>
    </Row>
  );
};
