import { useState } from "react";
import "./App.css";

const WIDTH = 50;

export default function App() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [rectWidth, setRectWidth] = useState(WIDTH);
  const [rectHoverWidth, setRectHoverWidth] = useState(WIDTH);

  console.log(rating);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: WIDTH / 3,
        }}
        onMouseLeave={() => setHoverRating(0)}
      >
        {[0, 1, 2, 3, 4].map((item, index) => {
          return (
            <div
              key={index}
              style={{
                position: "relative",
              }}
            >
              <i
                className="fa-solid fa-star"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();

                  const x = e.pageX - rect.left;
                  const width = rect.width;
                  setRectWidth(x);

                  const xNormalized = Math.round((x / width) * 10) / 10;

                  setRating(index + xNormalized);
                }}
                onMouseOver={() => setHoverRating(index + 1)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.pageX - rect.left;
                  setRectHoverWidth(x);
                }}
                style={{
                  color: "#b5b5b5",
                  fontSize: WIDTH,
                  cursor: "pointer",
                }}
              ></i>
              {(hoverRating > 0 ? hoverRating > index : rating > index) && (
                <i
                  className="fa-solid fa-star"
                  style={{
                    color: "#f0ff24",
                    fontSize: WIDTH,
                    cursor: "pointer",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    clip: (
                      hoverRating > 0
                        ? hoverRating - 1 == index
                        : Math.ceil(rating) - 1 === index
                    )
                      ? `rect(0px,${
                          hoverRating > 0 ? rectHoverWidth : rectWidth
                        }px,${WIDTH}px,0px)`
                      : "auto",
                    pointerEvents: "none",
                  }}
                ></i>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
