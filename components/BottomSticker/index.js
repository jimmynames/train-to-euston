import React, { useState, useEffect } from 'react';
import {BottomStickerComp, StickerComp, Content} from './styled'
import ChevronSVGComp from './ChevronSvg.js'


function BottomSticker () {
  const [showBottomSticker, setShowBottomSticker] = useState(false);

  const handleShowBottomSticker = () => {
    if (showBottomSticker) {
      setShowBottomSticker(false)
    } else {
      setShowBottomSticker(true)
    }
  }
  return (

      <StickerComp onClick={handleShowBottomSticker} show={showBottomSticker}>
        <div className='bottom-header'>

          <h3>Add to homepage</h3>
          <div className='chevron'>
            <ChevronSVGComp />
          </div>
          <h3>namesjam.es</h3>
        </div>

        <Content className='content' show={showBottomSticker}>
          <h3 className='title'>Add to homepage</h3>
          <div className='images'>
            <img src='/1.png' srcSet='/1.png 1x, /1@2x.png 2x' />
            <img src='/2.png' srcSet='/2.png 1x, /2@2x.png 2x' />
            <img src='/3.png' srcSet='/3.png 1x, /3@2x.png 2x' />
          </div>
          <hr />

          <h3 className='title'>Made by <a href="https://namesjam.es">namesjam.es</a></h3>
          <h3>Built as a tool for myself I've decided to share this to help those frequent travellers and commuters of Berkhamsted from having to search and input across various train-journey-apps the same fields of 'berkhamsted' to 'euston' or vice-versa..</h3>
          <h3>Providing accurate, live departure information sourced from transportapi.com and Network Rail, I've added an additional counter which informs you when the next train is coming to help those running to catch <i>that</i> train a bit of insight in how fast to run ;)</h3>
          <h3>I'm a Web Developer and Designer with half a decade's experience currently available for hire - please visit <a href="https://namesjam.es">https://namesjam.es</a> to get in contact :)</h3>
          <h3>Have a good day,</h3>
          <h3>James</h3>
          <a href="https://www.paypal.com/paypalme/jimmynames" className='button button-small'>Support costs</a>
        </Content>
      </StickerComp>

  )
}

export default BottomSticker
