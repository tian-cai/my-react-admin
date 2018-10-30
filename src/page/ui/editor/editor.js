import React from "react"
import { message, Button } from "antd"
// 引入编辑器以及编辑器样式
import BraftEditor from "braft-editor"
import 'braft-editor/dist/index.css'
import './editor.css'

class UiEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      inputHtml: BraftEditor.createEditorState(''),
      outputHTML: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.preView = this.preView.bind(this)
  }

  handleChange(inputHtml) {
    this.setState({
      inputHtml: inputHtml
    })
  }
  preView() {
    let outputHTML = this.state.inputHtml.toHTML()
    this.setState({
      outputHTML: outputHTML
    })
  }

  render() {
    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preView
      }
    ]
    let {inputHtml,outputHTML}  = this.state
    return (
      <div>
        <div className="rich-text">
          <BraftEditor 
            value = {inputHtml} onChange={this.handleChange}
            extendControls={extendControls}  
          />
        </div>
        {outputHTML && <div className="mt10 p10 preview md" dangerouslySetInnerHTML={{ __html: outputHTML }}></div>}
      </div>
    )
  }
}

export default UiEditor