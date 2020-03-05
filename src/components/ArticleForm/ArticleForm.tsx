import React, { useState, useEffect, useContext } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import Input from '../Input'
import Button from '../Button'
import BackendErrorMessages from '../BackendErrorMessages'
import { CurrentUserContext } from '@/context/currentUser'

type Props = {
   errors: object
   initValues: InitValues
   onSubmit: (data: object) => void
}

type InitValues = {
   title: string
   description: string
   body: string
   tagList: [] | string[]
}

const ArticleForm: React.FC<Props> = (
   { errors, initValues, onSubmit } :
   InferProps<typeof ArticleForm.propTypes>) => {
   
   const [title, setTitle] = useState<string>('')
   const [description, setDescription] = useState<string>('')
   const [body, setBody] = useState<string>('')
   const [tagList, setTaglist] = useState<string>('')

   const handleSubmit = (event: React.FormEvent): void => {
      event.preventDefault()
      
      const article = {
         title,
         description,
         body,
         tagList
      }
      onSubmit(article)
   }

   useEffect(() => {
      if (!initValues) {
         return
      }
      setTitle(initValues.title)
      setDescription(initValues.description)
      setBody(initValues.body)
      setTaglist(initValues.tagList.join(' '))

   }, [initValues])

   return (
      <div className="editor-page">
         <div className="container page">
            <div className="row">
               <div className="col-md-10 offset-md-1 col-xs-12">
                  {errors && <BackendErrorMessages backendErrors={errors} />}
                  <form onSubmit={handleSubmit}>
                     <fieldset>
                        <fieldset className="form-group">
                           <Input
                              value={title}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                              className="form-control form-control-lg"
                              placeholder="Article title"
                           />
                        </fieldset>

                        <fieldset className="form-group">
                           <Input
                              value={description}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                              className="form-control form-control-lg"
                              placeholder="What is this article about?"
                           />
                        </fieldset>

                        <fieldset>
                           <textarea
                              value={body}
                              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)}
                              className="form-control"
                              placeholder="Write about something..."
                              rows={8}
                           >
                              
                           </textarea>
                        </fieldset>

                        <fieldset className="form-group">
                           <Input
                              value={tagList}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTaglist(e.target.value)}
                              className="form-control form-control-lg"
                              placeholder="Specify tags"
                           />
                        </fieldset>

                        <fieldset className="form-group">
                           <Button
                              type="submit"
                              className="btn btn-lg pull-xs-right btn-primary"
                           >
                              Publish
                           </Button>
                        </fieldset>
                     </fieldset>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

ArticleForm.propTypes = {
   errors: PropTypes.object.isRequired,
   initValues: PropTypes.object.isRequired,
   onSubmit: PropTypes.func.isRequired
}

export default ArticleForm
