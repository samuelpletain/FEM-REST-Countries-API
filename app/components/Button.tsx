'use client'

import { ReactElement, useState } from "react";
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Button(props: any): ReactElement {
  return (
    <button className={props.className} onClick={() => props.setDarkMode(!props.mode)}>
      <FontAwesomeIcon icon={props.mode ? faSun : faMoon} className="pr-2" />
      {props.mode ? "Light mode" : "Dark mode"}
    </button>);
}