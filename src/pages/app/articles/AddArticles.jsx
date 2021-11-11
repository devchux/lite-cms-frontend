import { useState } from "react";
import {  EditorState } from "draft-js";
import TextEditor from "../../../components/text-editor/TextEditor";
import PageWrapper from "../../../components/wrappers/PageWrapper";
import { Button, Col, FormGroup, Input, Label, Row } from "reactstrap";
import { convertFromHTML, convertToHTML } from "draft-convert";
import DOMPurify from 'dompurify'

const AddArticles = () => {
  const [text, setText] = useState(EditorState.createEmpty());
  const [convertedState, setConvertedState] = useState("")

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(text.getCurrentContent())
    setConvertedState(currentContentAsHTML)
  }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  // console.log(convertFromHTML('<strong>Hello World<strong>'), text.getCurrentContent())

  return (
    <Row>
      {/* <div dangerouslySetInnerHTML={createMarkup(convertedState)}></div> */}
      <Col xs="12" md="7" className="mb-3">
        <PageWrapper className="rounded p-2">
          <TextEditor
            text={text}
            handleChange={(e) => {
              setText(e);
              convertContentToHTML()
            }}
          />
        </PageWrapper>
      </Col>
      <Col xs="12" md="5">
        <PageWrapper className="rounded p-1 px-2">
          <FormGroup>
            <Label htmlFor="title">Post title</Label>
            <Input type="text" placeholder="Enter Post Tiltle" name="title" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="videoUrl">Video Url</Label>
            <Input type="url" name="videoUrl" placeholder="https://" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="file">Attach files</Label>
            <input type="file" className="form-control" name="file" />
          </FormGroup>
          <hr />
          <FormGroup>
            <Button className="btn-default me-2">Save</Button>
            <Button color="primary">Publish</Button>
          </FormGroup>
        </PageWrapper>
      </Col>
    </Row>
  );
};

export default AddArticles;
