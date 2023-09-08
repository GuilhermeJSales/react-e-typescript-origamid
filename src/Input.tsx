import {Dispatch} from 'react'
import styles from './Input.module.css'

interface InputProps extends React.ComponentProps<'input'> {
  label:string;
  id: string;
  setState: Dispatch<React.SetStateAction<string>>;
}

export function Input({label, id ,setState, ...props}: InputProps) {
  
  return (
    <div>
      <label 
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
      <input 
        type="text" 
        id={id} 
        name={id} 
        className={styles.input}
        onChange={({currentTarget}) => setState(currentTarget.value)}
        {...props}
      />
    </div>
  )
}