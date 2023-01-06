import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./diaryList.css";
import DevButton from "./DevButton";
import DiaryItem from "./DiaryItem";

import "devextreme/dist/css/dx.light.css";
import DropDownButton from "devextreme-react/drop-down-button";

// 정렬기능을 구현
/* const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option value={it.value} key={idx}>
          {it.name}
        </option>
      ))}
    </select>
  );
}; */
const actions = [
  { id: 1, value: "latest", text: "최신순" },
  { id: 2, value: "oldest", text: "오랜된 순" },
];
const filterOptionList = [
  { id: 1, text: "전부다", value: "All" },
  { id: 2, text: "좋은감정만", value: "Good" },
  { id: 3, text: "나쁜감정만", value: "Bad" },
];

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("latest");
  const [filter, setFilter] = useState("All");
  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === "Good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filteredList =
      filter === "All" ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <div className="button1">
            <DropDownButton
              style={{ backgroundColor: "#ececec" }}
              width={"94px"}
              items={actions}
              keyExpr="id"
              displayExpr="text"
              useSelectMode={true}
              selectedItemKey={1}
              onItemClick={(e) => setSortType(e.itemData.value)}
            />
          </div>
          <div className="button2">
            <DropDownButton
              style={{ backgroundColor: "#ececec" }}
              width={"104px"}
              items={filterOptionList}
              keyExpr="id"
              displayExpr="text"
              useSelectMode={true}
              selectedItemKey={1}
              onItemClick={(e) => setFilter(e.itemData.value)}
            />
          </div>
        </div>
        <div className="right_col">
          <DevButton
            width={"100%"}
            text={"새일기 쓰기"}
            type={"success"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default React.memo(DiaryList);
