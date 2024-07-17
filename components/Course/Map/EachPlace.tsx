import React from "react";

import classnames from "classnames/bind"
import styles from "./EachPlace.module.css"

const cx = classnames.bind(styles)

interface Props {
  name: string,
  address: string,
  types: any[],
  photo: any[],
}
const EachPlace = ({name, address, types, photo}: Props) => {

  return (<div className={cx("each-place-container")}>

  </div>)
}

export default EachPlace;