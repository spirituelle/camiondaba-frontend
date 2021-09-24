import React from 'react'
import PropTypes from 'prop-types';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';


import {Stepper, Step, StepLabel, StepConnector} from '@material-ui/core';
import {MdCheck} from 'react-icons/md'

import stepperStyle from '../../assets/jss/stepperStyle';

const QontoConnector = withStyles(stepperStyle.QontoConnector)(StepConnector);
const useQontoStepIconStyles = makeStyles(stepperStyle.useQontoStepIconStyles);

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <MdCheck className={classes.completed} /> : <div className={classes.circle} />}
      </div>
    );
}
QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
  };


export default function StepperManaging(props) {
    return (
        <Stepper alternativeLabel activeStep={props.activeStep} connector={<QontoConnector />}>
            {props.steps.map((label) => (
            <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
            </Step>
            ))}
        </Stepper>
    )
}
