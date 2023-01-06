import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import MyHeader from "../component/MyHeader";
import DevButton from "../component/DevButton";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "./../App.jsx";
import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import { DateBox } from "devextreme-react/date-box";
import TextArea from "devextreme-react/text-area";

const dateNew = new Date();

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const contentRef = useRef();
  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(1);
  const [date, setDate] = useState(getStringDate(new Date()));

  /* const onCurrentValueChange = (e) => {
    setDate(e.value);
  }; */
  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const onValueChanged = (e) => {
    const newDate = new Date(e.value).toLocaleDateString();
    setDate(newDate);
  };
  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = () => {
    if (content.length < 3) {
      /////////////////////////////
      contentRef.current.instance.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    navigate(`/`, { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate(`/`, { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        leftChild={
          <DevButton
            width={"100%"}
            text={"뒤로가기"}
            type={"normal"}
            onClick={() => navigate(-1)}
          />
        }
        rightChild={
          isEdit && (
            <DevButton
              width={"100%"}
              text={"삭제가기"}
              type={"danger"}
              onClick={handleRemove}
            />
          )
        }
        headText={isEdit ? "일기 수정하기" : "새일기 쓰기"}
      />
      <div>
        <section>
          <h4>오늘의 날짜를 정해주세요?</h4>
          <div className="input_box">
            <DateBox
              id="selected_date"
              // type="date"
              value={date}
              onValueChanged={onValueChanged}
              defaultValue={dateNew}
              width={"60%"}
              displayFormat="yyyy-MM-dd"
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정을 선택해 주세요</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                onClick={handleClickEmote}
                key={it.emotion_id}
                {...it}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <TextArea
              id="textarea"
              height={"200px"}
              placeholder="오늘은 어땠나요? (3자 이상)"
              ref={contentRef}
              value={content}
              onValueChanged={(e) => setContent(e.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <DevButton
              text={"취소하기"}
              // type={"danger"}
              onClick={() => navigate(-1)}
            />
            <DevButton
              text={"작성완료"}
              type={"success"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
