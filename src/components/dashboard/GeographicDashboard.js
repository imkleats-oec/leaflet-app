import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DashboardConfig from '../../config/DashboardConfig';
import MapContext from '../../contexts/MapContext';

const useStyles = makeStyles({
  root: {
    height: '50%'
  },
  table: {
    width: '100%'
  },
  columnHeader: {
    width: '33%'
  }
});

export default function Dashboard() {
  const classes = useStyles();
  const mapContext = useContext(MapContext);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table stickyHeader className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Geographic Details
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.columnHeader}>Metrics</TableCell>
            <TableCell className={classes.columnHeader} align="center">{ mapContext.mouseOver ? (
                mapContext.mouseOver[DashboardConfig.columns.featureId]
              ) : (
                "--"
              )
                }</TableCell>
            <TableCell className={classes.columnHeader} align="center">{ mapContext.selectLayer ? (
                mapContext.selectLayer[DashboardConfig.columns.featureId]
              ) : (
                "**Click on an Area to compare**"
              )
                }</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {DashboardConfig.rows.map((row) => (
            <TableRow key={row.featureId}>
              <TableCell>{row.display}</TableCell>
              <TableCell align="center">{ mapContext.mouseOver ? (
                row.fmt(mapContext.mouseOver[row.featureId])
              ) : (
                "--"
              )
                }</TableCell>
              <TableCell align="center">{ mapContext.selectLayer ? (
                row.fmt(mapContext.selectLayer[row.featureId])
              ) : (
                "--"
              )
                }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}