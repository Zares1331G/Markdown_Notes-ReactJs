import React from "react";

export default function Status({ statusCode }) {
  return (
    <div className="statusCodeContainer">
      {(statusCode.status === 0) ? "" : ""}
      {(statusCode.status === 1) ? "saving..." : ""}
      {(statusCode.status === 2) ? "document saved" : ""}
    </div>
  );
}
