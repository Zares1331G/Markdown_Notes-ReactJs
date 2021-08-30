import React from "react";

export default function Editor({ item }) {
  return (
    <div className="editor">
      <div>
        <input className="title" />
      </div>
      <div className="editor-textarea">
        <textarea className="content"></textarea>
      </div>
    </div>
  );
}
