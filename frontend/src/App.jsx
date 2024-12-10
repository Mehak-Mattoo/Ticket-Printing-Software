import { useState } from 'react'

import './index.css'
import FileUpload from './components/FileUpload'
import Translator from './components/Translator'
import Transliterate from './components/Transliterate'

function App() {



  return (
    <>
 

    <FileUpload/>
    
    <hr /> <hr /><hr />
    {/* <Translator/> */}
    <hr /> <hr /><hr />
    <Transliterate/>
  </>
  )
}

export default App
