import React from 'react';

// const htmlDecode = (content) => {
//   let e = document.createElement('div');
//   e.innerHTML = content;
//   return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
// }
export default function Html({ state, content, styles, css }) {

  return (
    <>
      <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <style
            dangerouslySetInnerHTML={{
              __html: css,
            }}
          />

          {styles}
      </>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{
        __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};`,
      }} />
    </>
  );
}
