import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { map } from 'lodash'


import Dropzone from 'react-dropzone'

// Path within Database for metadata (also used for file Storage path)
//const filesPath = 'userImages'

// const handlers = {
//   // Uploads files and push's objects containing metadata to database at dbPath
//   onFilesDrop: props => files => {
//     // uploadFiles(storagePath, files, dbPath)
//     return props.firebase.uploadFiles(filesPath, files, filesPath)
//   },
//   onFileDelete: props => (file, key) => {
//     // deleteFile(storagePath, dbPath)
//     return props.firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
//   }
// }

// const enhancerPropsTypes = {
//   firebase: PropTypes.object.isRequired
// }

function Uploader({ uploadedFiles,  onFilesDrop }) {
  return (
    <div>
      <Dropzone onDrop={onFilesDrop}>
        <div>Drag and drop files here or click to select</div>
      </Dropzone>
      {uploadedFiles && (
        <div>
          <h3>Uploaded file(s):</h3>
          {map(uploadedFiles, (file, key) => (
            <div key={file.name + key}>
              <span>{file.name}</span>
              
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

Uploader.propTypes = {
  firebase: PropTypes.object.isRequired,
  
}

// Apply enhancer to component on export
export default connect()(Uploader)