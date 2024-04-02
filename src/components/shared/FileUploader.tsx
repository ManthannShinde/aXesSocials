import React, { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '../ui/button'
import { type } from 'os'

type FileUploaderProps = {
  fieldChange : (FILES : File[]) => void;
  mediaUrl : string;
}

const FileUploader = ({fieldChange, mediaUrl} : FileUploaderProps) => {

  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setFile] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles : FileWithPath[] ) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
  }, [file]);

  const {getRootProps, getInputProps} = useDropzone({
    onDrop, 
    accept : {'image/*' : ['.png', '.jpeg', '.jpg', '.svg']
  }
})

  return (
    <div>
       <div {...getRootProps()} className='flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer p-2'>
          <input {...getInputProps()} className='cursor-pointer'/>
          {
            fileUrl ? (
              <>
                <div className='flex flex-1 justify-center w-full p-5 lg:p-10'>
                  <img 
                    src= {fileUrl} alt='Image' className='file_uploader-img'
                  />
                </div>
                  <p className='file_uploader-label'>Click Or Drag to Replace the Photo</p>
              </>
            ) : (
              <div className='file_uploader-box'>
                <img src='/assets/icons/file-upload.svg' width={96} height={77} alt='file-upload'/>
                <h3 className='text-light-2 base-medium mb-2 mt6-'>Drag Photos Here</h3>
                <p className='text-light-4 small-regular mb-6'>SVG, PNG, JPG</p>
                
                <Button className='shad-button_dark_4'>
                    Select from Device
                </Button>
              </div>
              
            )
          }
      </div>

    </div>
  );
}

export default FileUploader;