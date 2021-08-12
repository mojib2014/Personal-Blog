import React, { useRef, useState, useEffect } from "react";

export default function EditableComponent({
  childRef,
  text,
  type = "text",
  placehoder,
  children,
  ...props
}) {
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef();
  const [task, setTask] = useState("");

  useEffect(() => {
    if (childRef && childRef.current && isEditing) {
      childRef.current.focus();
    }
  }, [childRef, isEditing]);

  const handleKeyDown = (event, type) => {
    // TO DO:
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey]; // All keys array

    /* 
    - For textarea, check only Escape and Tab key and set the state to false
    - For everything else, all three keys will set the state to false
  */
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setIsEditing(false);
    }
  };

  return (
    <section {...props} onClick={() => setIsEditing(true)}>
      {isEditing ? (
        <div
          onBlur={() => setIsEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          <input
            ref={inputRef}
            type="text"
            name="task"
            placeholder="Write a task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </div>
      ) : (
        <span>{text || placehoder || "Editable content"}</span>
      )}
    </section>
  );
}
