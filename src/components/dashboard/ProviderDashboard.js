import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {ProviderDetailConfig} from '../../config/DashboardConfig';
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

export default function ProviderDetailDashboard() {
  const classes = useStyles();
  const mapContext = useContext(MapContext);

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table stickyHeader className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              { mapContext.selectProvider ? mapContext.selectProvider[
                  ProviderDetailConfig.columns.featureId
                ] : "Provider Details" }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.columnHeader} align="center">{ mapContext.selectProvider ? (
                `Level ${mapContext.selectProvider[ProviderDetailConfig.columns.ratingId]}`
              ) : (
                "--"
              )
                }</TableCell>
            <TableCell className={classes.columnHeader} align="center">{ mapContext.selectProvider ? (
                mapContext.selectProvider[ProviderDetailConfig.columns.typeId]
              ) : (
                "--"
              )
                }</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ProviderDetailConfig.rows.map((row) => (
            <TableRow key={row.featureId}>
              <TableCell>{row.display}</TableCell>
              <TableCell align="center">{ mapContext.selectProvider ? (
                row.fmt(mapContext.selectProvider[row.featureId])
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