import Button from "./Button"
import Input from "./Input"
import { useState } from "react"

import { useForm } from 'react-hook-form'
import { server_calls } from "../api/server"
import { useDispatch, useStore } from "react-redux"
import { chooseTitle, chooseAuthor, chooseLength, chooseCover, chooseISBN } from "../redux/slices/RootSlice"

// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ContactFormProps {
  id?: string[]
}

const ContactForm = ( props:ContactFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch = useDispatch();
  const store = useStore();

  let [ open, setOpen ] = useState(false);

  open = open
    const handleClose = () => {
        setOpen(false)
        setTimeout( () => {window.location.reload()}, 500)
    }

  const onSubmit = (data: any) => {

    console.log(`ID: ${typeof props.id}`);
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
      server_calls.update(props.id[0], data)
      console.log(`Updated: ${ data.first } ${ props.id }`)
    } else {
      dispatch(chooseTitle(data.title));
      dispatch(chooseAuthor(data.author));
      dispatch(chooseLength(data.length));
      dispatch(chooseCover(data.cover));
      dispatch(chooseISBN(data.isbn));

      server_calls.create(store.getState())
    }
  }

  // const [age, setAge] = useState(''); //todo

  // const handleChange = (event: SelectChangeEvent) => {
  //   setAge(event.target.value as string);
  // }; //make changes

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="title">Title</label>
                <Input {...register('title')} name='title' placeholder="Title" />
            </div>
            <div>
                <label htmlFor="author">Author</label>
                <Input {...register('author')} name='author' placeholder="Author" />
            </div>
            <div>
                <label htmlFor="length">Length</label>
                <Input {...register('length')} name='length' placeholder="Length" />
            </div>
            <div>
              {/* <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                // name='cover'
                {...register('cover')}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
              </Select>
              </FormControl> */}
                <label htmlFor="cover">Cover</label>
                <Input {...register('cover')} name='cover' placeholder="Cover" />
            </div>
            <div>
                <label htmlFor="isbn">ISBN</label>
                <Input {...register('isbn')} name='isbn' placeholder="ISBN" />
            </div>
            <div className="flex p-1">
            <Button className="flex justify-start m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white"
            onClick={handleClose}
            >
                Submit
            </Button>
            </div>
        </form>
    </div>
  )
}

export default ContactForm