import React from 'react';
import {Spinner} from 'reactstrap';
import styles from './index.module.scss';

const CustomSpinner = () => {
  return (
    <div className={styles.page_wrapper}>
        <Spinner/>
    </div>
  )
}

export default CustomSpinner
