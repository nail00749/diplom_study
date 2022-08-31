import {Box, Typography} from '@mui/material';
import React, {FC} from 'react';
import StreamItem from "./StreamItem";

const streams = [1, 2, 3]


const StreamContainer: FC = () => {
    return (
        <Box
            sx = {{
                borderRadius: 3,
                minWidth: '25vw',
            }}
            p = {3}
        >
            <Typography
                component = 'h3'
                mb = {3}
            >
                Streams
            </Typography>
            {
                streams && streams.length ?
                    streams.map(stream =>
                        <StreamItem
                            key={stream}
                        />
                    ) : <Typography>No active stream</Typography>
            }
        </Box>
    );
};

export default StreamContainer;


