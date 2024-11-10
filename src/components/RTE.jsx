import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form' 

//Control will be passed by parent form
export default function RTE({ name , label , control , defaultValues = "" }) {
  return (
    <div className="w-full">
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller
            name={name || "Control"}
            control={control}
            render={({ field: {onchange} }) => (<Editor 
                initialValue='default value'
                init={
                    {
                        branding: false,
                        height: 500,
                        menubar: true,
                        plugins: [
                            'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
                            'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
                            'media', 'table', 'emoticons', 'help'
                        ],
                        toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
                                'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
                                'forecolor backcolor emoticons | help',
                    }
                }
                onEditorChange={onchange}
            />)}
        />
    </div>
  )
}

// <Editor
//         initialValue='default value'
//         init={
//             {
//                 branding: false,
//                 height: 500,
//                 menubar: true,
//                 plugins: [
//                     'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
//                     'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
//                     'media', 'table', 'emoticons', 'help'
//                 ],
//                 toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
//                          'bullist numlist outdent indent | link image | print preview media fullscreen | ' +
//                          'forecolor backcolor emoticons | help',
//             }
//         }
//     />