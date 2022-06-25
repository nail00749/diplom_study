import React, {FC, useState, useRef, useEffect} from 'react'
import {Autocomplete, Box, IconButton, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ListIcon from "@mui/icons-material/List";

interface SortListByDragProps {
    options: any[]
    changeOptions: (list: any[]) => void
    initList?: any[]
    disabled: boolean
}

const SortListByDrag: FC<SortListByDragProps> = ({options, changeOptions, initList, disabled}) => {
    const [list, setList] = useState<any>(function () {
        if (!initList) {
            return []
        }
        return initList.map((item: any, i) => ({
            ...item,
            order: i
        }))
    })
    const [currentItem, setCurrentItem] = useState<any>(null)
    const [variants, setVariants] = useState<any>(options)

    const [valueSearchElement, setValueSearchElement] = useState<any>(null)
    const [valueInput, setValueInput] = useState('');
    const refInput = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        setVariants(options.filter((option: any) => list.findIndex((item: any) => option._id === item._id) === -1))
    }, [list])

    const onDragStart = (lesson: any) => () => {
        setCurrentItem(lesson)
    }

    const onDragLeave = () => {

    }

    const onDragEnd = () => {
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const onDrop = (card: any) => (e: React.DragEvent) => {
        e.preventDefault();
        setList((prev: any) => {
                const copy = prev.map((item: any) => {
                    if (item._id === card._id) {
                        return {...item, order: currentItem.order}
                    }
                    if (item._id === currentItem._id) {
                        return {...item, order: card.order}
                    }
                    return item
                })
                changeOptions(copy)
                return copy
            }
        )
        setCurrentItem(null)
    }

    const handleAdd = (e: any, newValue: any) => {
        if (newValue) {
            setList((prev: any) => {
                const copy = [...prev, {...newValue, order: prev.length ? prev.length + 1 : 1}]
                changeOptions(copy)
                return copy
            })
            setVariants((prev: any) => prev.filter((item: any) => item._id !== newValue._id))
            setValueSearchElement(null)
            setValueInput('')
            if (refInput && refInput.current) {
                refInput.current.blur()
            }

        }
    }

    const handleDelete = (card: any) => () => {
        setList((prev: any) => {
            const copy = prev.filter((item: any) => item._id !== card._id)
            changeOptions(copy)
            return copy
        })
        setVariants((prev: any) => [...prev, card])
    }

    const sortList = (a: any, b: any) => a.order > b.order ? 1 : -1

    return (
        <Box
            mx = {1}
        >
            {
                (list && list.length) ? list.sort(sortList).map((card: any, i: number) =>
                        <Box
                            sx = {{
                                m: 1,
                                mb: 3,
                                display: 'flex',
                                alignItems: 'center',
                                borderBottom: '1px solid',
                                justifyContent: 'space-between'
                            }}
                            draggable = {true}
                            onDragStart = {onDragStart(card)}
                            onDragLeave = {onDragLeave}
                            onDragEnd = {onDragEnd}
                            onDragOver = {onDragOver}
                            onDrop = {onDrop(card)}
                            key = {card._id}
                        >
                            <IconButton
                                onClick = {handleDelete(card)}
                            >
                                <CloseIcon/>
                            </IconButton>
                            <Typography
                                sx = {{
                                    flex: '1 1 70%'
                                }}
                            >
                                {`${i + 1}. ${card.title.substring(0, 20)}`}
                            </Typography>
                            <Box
                                ml={1}
                            >
                                <ListIcon/>
                            </Box>
                        </Box>
                    ) :
                    <Typography
                        my = {1}
                        color = 'text.primary'
                    >
                        Добавьте элементы
                    </Typography>
            }
            <Box mb = {3}>
                <Autocomplete
                    renderInput = {params =>
                        <TextField
                            {...params}
                            label = 'Элементы'
                            variant = 'filled'
                            fullWidth
                            inputRef = {refInput}
                        />
                    }
                    value = {valueSearchElement}
                    options = {variants as readonly any[]}
                    onChange = {handleAdd}
                    inputValue = {valueInput}
                    onInputChange = {(e, newValue) => {
                        setValueInput(newValue)
                    }}
                    getOptionLabel = {(option: any) => (option && option.title) || ''}
                    disabled = {disabled}
                    clearOnEscape
                    clearOnBlur
                />
            </Box>
        </Box>
    )

}

export default SortListByDrag
