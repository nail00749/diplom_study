import React, {FC} from 'react';
import {Grid} from "@mui/material";
import UsersData from "../components/UsersData";
import {useGetMeDataQuery} from "../services/userAPI";
import GenerateLink from "../components/GenerateLink";
import ButtonsContentModal from "../components/ButtonsContentModal";

const Admin: FC = () => {
    const {data: user} = useGetMeDataQuery()

    return (
        <>
            <Grid
                container
                pt = {5}
            >
                <Grid
                    item
                    xs = {12}
                    sm = {4}
                    md = {3}
                    px = {3}
                >
                    <ButtonsContentModal/>
                </Grid>
                {
                    (user && user.role === 'admin') &&
					<>
						<Grid
							item
							xs = {12}
							sm = {6}
							md = {3}
							p = {3}
						>
							<GenerateLink/>
						</Grid>
						<Grid
							item
							xs = {12}
							sm = {12}
							md = {6}
						>
							<UsersData/>
						</Grid>
					</>
                }
            </Grid>

        </>
    );
};

export default Admin;

