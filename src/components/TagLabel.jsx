import React from "react";
import Label from "./ui/Label";

export default function TagLabel(props) {
    const { name, color } = props.tag;

    return <Label text={name} classes={color} />
}