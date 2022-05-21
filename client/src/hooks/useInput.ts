import React, {useState} from 'react'

export const useInput = (initValue: any) => {
    const [value, setValue] = useState(initValue)
    const [error, setError] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

    const handleError = (val?: boolean | undefined) => setError(prev => val ? val : !prev)

    return {value, onChange, handleError, error}
}
