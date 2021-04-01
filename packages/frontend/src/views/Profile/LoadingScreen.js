import React from "react";

export const LoadingScreen = () => {

  setTimeout(() => {
    const elem = document.getElementById("loading-center")
    if (elem) elem.className = "zoomOut";
  }, 2400)
  setTimeout(() => {
    const elem = document.getElementById("loading")
    if (elem) elem.className = "slideDown";
  }, 3000);

  return (
    <>
      <div className="res-container">
        <div className="res-row">
          <div id="block-1 b3">
            <div id="loader-wrap">
              <div id="loading" className="bg-gradient-default">
                <div id="loading-center">
                  <div id="loading-center-absolute">
                      <img
                        id="object"
                        alt="..."
                        src={
                          require("../../assets/img/brand/logo-dark.png").default
                        }
                      />
                    <div id="loader"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="res-container">
        <div className="res-row">
          <div id="block-1">
            <div id="block-2"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoadingScreen;