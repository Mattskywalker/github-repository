import { ArrowBack, Delete } from "@mui/icons-material";
import { Button, IconButton, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FavContext } from "../../contexts/FavContext";

import './Favorites.css'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90, },
    { field: 'name', headerName: 'Nome', width: 140 },
    { field: 'full_name', headerName: 'Nome completo', width: 240 },
    { field: 'html_url', headerName: 'URL', width: 440 },
    { field: 'description', headerName: 'Descrição', flex: 1 },
];

const Favorites = () => {

    const { removeSelection, favorites } = useContext(FavContext)
    const [selectionList, setSelection] = useState<GridSelectionModel>()

    const navigate = useNavigate();


    return (
        <div className="Favorites" >
            <div className="title" >
                <IconButton onClick={() => {
                    navigate('/')
                }} style={{ marginLeft: '14px', color: '#000000' }} ><ArrowBack /></IconButton>
                <span></span>
                <Typography variant="h4" >Favoritos</Typography>
                <span></span>
            </div>

            <div className="table-container" style={{ height: '500px', width: '100%', flex: 1 }}>
                <DataGrid

                    rows={favorites}
                    columns={columns}
                    pageSize={13}
                    rowsPerPageOptions={[13]}
                    onSelectionModelChange={(selection, details) => {
                        selectionList?.push(...selection);
                        setSelection([...selection])
                    }}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
            <div className="area-button" >
                <Button
                    disabled={!selectionList?.length}
                    className="delete-button"
                    variant="outlined"
                    startIcon={<Delete
                    />}
                    onClick={() => {
                        removeSelection(selectionList || [])
                    }}
                >Remover</Button>
            </div>


        </div >
    )
}

export default Favorites;