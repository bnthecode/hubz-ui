import React from "react";
import { PlaidLink } from "react-plaid-link";
import { faPlus, faHSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography, withStyles, Grid, Slide, Paper } from "@material-ui/core";
import clsx from "clsx";
import EmptyPage from "../../components/EmptyPage/EmptyPage";
import { createAccountWorkflow } from "../../workflows/pages/account-workflow";
import { connect } from "react-redux";
import BottomPanel from "../../components/BottomPanel/BottomPanel";

const styles = (theme) => ({
  loader: {
    fontSize: 120,
    color: theme.palette.primary.contrastText,
  },
  bottomToolbar: {
    width: "99%",
    position: "absolute",
    bottom: 0,
    height: 60,
    boxShadow: `2px 2px 16px ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.dark,
    color: "white",
  },
  emptyContainer: {
    boxShadow: `2px 2px 16px ${theme.palette.primary.main}`,
    overflowX: "hidden",
    width: "100%",
    height: "calc(100vh - 140px)",
    backgroundColor: theme.palette.primary.dark,
  },
  btnIcon: {
    marginRight: 8,
  },
  loaderText: {
    color: "white",
    fontSize: 40,
    margin: "auto",
  },
  loaderIcon: {
    color: "white",
    fontSize: 100,
    margin: "25%",
  },
  helperText: {
    position: "fixed",
    bottom: 80,
    left: 400,
    color: theme.palette.primary.contrastText,
  },
  btnText: {
    color: "white",
    fontSize: 12,
    fontWeight: 600,
  },
});
class Accounts extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  setPanelOpen = (e) => {
    this.setState({
      bankPanel: e,
    });
  };

  determineContent = () => {
    const { accounts } = this.props;
    return accounts.length ? (
      accounts.map((acct, i) => (
        <Slide in direction="top" timeout={i * 250}>
          <Grid item xs={4}>
            Determining Content
          </Grid>
        </Slide>
      ))
    ) : (
      <EmptyPage
        title="You dont have any accounts."
        info="You can add an account below."
      />
    );
  };

  render() {
    const { classes, loading, createAccount } = this.props;
    const plaidLink = {
      cursor: "pointer",
      border: 'none',
      width: '100%',
      backgroundColor: "transparent",
    };

    const panelItems = [
      { content: <PlaidLink
        style={{ ...plaidLink }}
        clientName="Hubz"
        env="development"
        product={["transactions", "liabilities"]}
        publicKey="681829f372caa5ed8ceb64044a7fed"
        onExit={() => {}}
        onSuccess={createAccount}
      >
        <Typography className={classes.btnText}>
    
          Add an account
        </Typography>
      </PlaidLink>}

    ]

    return (
      <div>
        <Grid container spacing={4}>
          <Grid item xs={2}></Grid>
          <Grid item xs={12} style={{ maxHeight: 800 }}>
            <Grid container spacing={8}>
              {!loading ? (
                this.determineContent()
              ) : (
                <Typography className={classes.loaderText}>
                  <FontAwesomeIcon
                    className={clsx([classes.loader, "loader"])}
                    icon={faHSquare}
                    spin
                  ></FontAwesomeIcon>
                  <br />
                  Getting your accounts
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
       <BottomPanel panelItems={panelItems}/>
              
   
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accounts: state.page_data.accounts,
});

const mapDispatchToProps = {
  createAccount: createAccountWorkflow,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Accounts));
