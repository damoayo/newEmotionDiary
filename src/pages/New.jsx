import React from 'react';
import { useEffect } from "react";
import DiaryEditor from "../component/DiaryEditor";

const New = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감성 일기장 - 새일기 작성`;
  });
  return (
    <div>
      <DiaryEditor />
    </div>
  );
};

export default New;
