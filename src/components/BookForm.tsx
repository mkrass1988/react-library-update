import Button from "./Button"
import Input from "./Input"
import { useState } from "react"

import { useForm } from 'react-hook-form'
import { server_calls } from "../api/server"
import { useDispatch, useStore } from "react-redux"
import { chooseTitle, chooseAuthor, chooseLength, chooseCover, chooseISBN } from "../redux/slices/RootSlice"

// import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ContactFormProps {
  id?: string[]
}

const BookForm = ( props:ContactFormProps) => {
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

  const [cover, setCover] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCover(event.target.value as string);
  }; //make changes

  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Input {...register('title')} name='title' placeholder="Title" />
            </div>
            <div>
                <Input {...register('author')} name='author' placeholder="Author" />
            </div>
            <div>
                <Input {...register('length')} name='length' placeholder="Length" />
            </div>
            <div>
                <Input {...register('isbn')} name='isbn' placeholder="ISBN" />
            </div>
            <div className="pt-3">
              <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cover</InputLabel>
              <Select
                // name='cover'
                {...register('cover')}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cover}
                label="Cover"
                onChange={handleChange}
              >
                <MenuItem value={'Paperback'}>Paperback</MenuItem>
                <MenuItem value={'Hardcover'}>Hardcover</MenuItem>
              </Select>
              </FormControl>
                {/* <label htmlFor="cover">Cover</label>
                <Input {...register('cover')} name='cover' placeholder="Cover" /> */}
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

export default BookForm